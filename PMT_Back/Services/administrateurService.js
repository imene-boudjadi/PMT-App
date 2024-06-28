const pool = require('../database.js');
const bcrypt = require('bcrypt');

/****************** Affichage des utilisateurs ****************** */
async function retournerUtilisateurs(){
  const connection = await pool.getConnection();
  try {
    const query = `
    SELECT matricule, nom, prenom 
    FROM utilisateur u
    WHERE profil = 'user';
    
    `;
    const [results] = await connection.query(query);


    if (results.length === 0) {
      throw new Error("Pas d'utilisateurs");
    }

    // Transform the results to group employees with their corresponding posts
    const users = results.reduce((acc, row) => {
      const { matricule, nom, prenom } = row;

    
  

      // Check if the employee exists in the accumulator
      const existingUsers = acc.find(user => user.matricule === matricule);
      if (existingUsers) {
        console.log("this user exists");
      } else {
        
        acc.push({
          matricule,
          nom,
          prenom,
        });

      }
     
      return acc;
    }, []);

    return users;
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}

/****************** Affichage des informations d'un utilisateur ****************** */
async function retournerUtilisateur(matricule){
  const connection = await pool.getConnection();
  try {
    
    const [user] = await connection.query(`
    SELECT matricule, nom, prenom 
    FROM utilisateur u
    WHERE matricule = ?;
    
    `, [matricule]);


    if (user.length === 0) {
      throw new Error("Pas d'utilisateurs");
    }


    return user;
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}




/********* Statistiques par Activités ********** */
async function calculerEmployeParAct(){

  const connection = await pool.getConnection();

  try {
    //on calcule le nombre total d'employes:
    const nbrEmployeQuery = `select count(matricule) as nbEmploye
    from Employe; `; 

    const nbEmployeResult = await connection.query(nbrEmployeQuery);
    console.log('nbEmployeResult:', nbEmployeResult);
    const { nbEmploye } = nbEmployeResult[0][0];
    console.log('nbEmploye:', nbEmploye);
    

    //on calcule le nombre d'employes qui ont la fonction FSP:
    const nbFSPQuery = `select count(fonction) as nbFSP
      from (
          SELECT e.matricule, a.*
          FROM Employe e
          LEFT JOIN occupe o ON e.matricule = o.matricule
          LEFT JOIN Poste p ON o.idPoste = p.idPoste
          JOIN activite a ON a.code = p.codeAct
          where e.etat = 'enActivite'
        ) as A
      where A.fonction = 'FSP'  `;

    const nbFSPResult = await connection.query(nbFSPQuery); 
    const {nbFSP} = nbFSPResult[0][0];

    //on calcule le nombre d'employes qui ont la fonction FST:
    const nbFSTQuery = `select count(fonction) as nbFST
      from (
          SELECT e.matricule, a.*
          FROM Employe e
          LEFT JOIN occupe o ON e.matricule = o.matricule
          LEFT JOIN Poste p ON o.idPoste = p.idPoste
          JOIN activite a ON a.code = p.codeAct
          where e.etat = 'enActivite'
        ) as A
      where A.fonction = 'FST'; `;

      const nbFSTResult = await connection.query(nbFSTQuery); 
      const {nbFST} = nbFSTResult[0][0];


    //on calcule le nombre d'employes qui ont la fonction FCM:
    const nbFCMQuery = `select count(fonction) as nbFCM
      from (
          SELECT e.matricule, a.*
          FROM Employe e
          LEFT JOIN occupe o ON e.matricule = o.matricule
          LEFT JOIN Poste p ON o.idPoste = p.idPoste
          JOIN activite a ON a.code = p.codeAct
          where e.etat = 'enActivite'
        ) as A
      where A.fonction = 'FCM'; `;

    const nbFCMResult = await connection.query(nbFCMQuery); 
    const {nbFCM} = nbFCMResult[0][0];


    const data = {
      FST: nbFST,
      FSP: nbFSP,
      FCM: nbFCM,
      nbEmploye: nbEmploye
    };
    

    console.log('data: ', data);


    await connection.commit();
    return data;

  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }


}


/********* Statistiques par CSP ********** */
async function calculerEmployeParCSP(){

  const connection = await pool.getConnection();

  try {

    //on calcule le nombre d'employes qui ont le CSP ING+:
    const nbINGQuery = `select count(csp) as nbING
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite'
      ) as A
    where A.csp = 'ING+'; `;

    const nbINGResult = await connection.query(nbINGQuery); 
    const {nbING} = nbINGResult[0][0];


    //on calcule le nombre d'employes qui ont le CSP CU:
    const nbCUQuery = `select count(csp) as nbCU
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite'
      ) as A
    where A.csp = 'CU'; `;

    const nbCUResult = await connection.query(nbCUQuery); 
    const {nbCU} = nbCUResult[0][0];


    //on calcule le nombre d'employes qui ont le CSP AC:
    const nbACQuery = `select count(csp) as nbAC
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite'
      ) as A
    where A.csp = 'AC'; `;

    const nbACResult = await connection.query(nbACQuery); 
    const {nbAC} = nbACResult[0][0];


    //on calcule le nombre d'employes qui ont le CSP CS:
    const nbCSQuery = `select count(csp) as nbCS
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite'
      ) as A
    where A.csp = 'CS'; `;

    const nbCSResult = await connection.query(nbCSQuery); 
    const {nbCS} = nbCSResult[0][0];


    //on calcule le nombre d'employes qui ont le CSP TS:
    const nbTSQuery = `select count(csp) as nbTS
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite') as A
    where A.csp = 'TS'; `;

    const nbTSResult = await connection.query(nbTSQuery); 
    const {nbTS} = nbTSResult[0][0];

    //on calcule le nombre d'employes qui ont le CSP Technicien:
    const nbTechnicienQuery = `select count(csp) as nbTechnicien
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite') as A
    where A.csp = 'TECHNICIEN'; `;

    const nbTechnicienResult = await connection.query(nbTechnicienQuery); 
    const {nbTechnicien} = nbTechnicienResult[0][0];

    //on calcule le nombre d'employes qui ont le CSP Technique:
    const nbTechniqueQuery = `select count(csp) as nbTechnique
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite') as A
    where A.csp = 'TECHNIQUE'; `;

    const nbTechniqueResult = await connection.query(nbTechniqueQuery); 
    const {nbTechnique} = nbTechniqueResult[0][0];


    //on calcule le nombre d'employes qui ont le CSP Autre:
    const nbAutreQuery = `select count(csp) as nbAutre
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite') as A
    where A.csp = 'AUTRE'; `;

    const nbAutreResult = await connection.query(nbAutreQuery); 
    const {nbAutre} = nbAutreResult[0][0];


    //on calcule le nombre d'employes qui ont le CSP ADM:
    const nbADMQuery = `select count(csp) as nbADM
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite') as A
    where A.csp = 'ADM'; `;

    const nbADMResult = await connection.query(nbADMQuery); 
    const {nbADM} = nbADMResult[0][0];


    //on calcule le nombre d'employes qui ont le CSP Aide:
    const nbAideQuery = `select count(csp) as nbAide
    from
      (SELECT e.matricule, p.csp
            FROM Employe e
            LEFT JOIN occupe o ON e.matricule = o.matricule
            LEFT JOIN Poste p ON o.idPoste = p.idPoste
            where e.etat = 'enActivite') as A
    where A.csp = 'AIDE'; `;

    const nbAideResult = await connection.query(nbAideQuery); 
    const {nbAide} = nbAideResult[0][0];


    
    const data = [
      nbING,
      nbCU,
      nbAC,
      nbCS,
     nbTS,
      nbTechnicien,
       nbTechnique,
     nbAutre,
     nbADM,
     nbAide,
    ];
    

    console.log('data: ', data);


    await connection.commit();
    return data;

  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }


}


/********* Suppression d'un utilisateur ********** */
async function supprimerUtilisateur(matricule) {
  const connection = await pool.getConnection();

  try {
    // exécution de la requete (recherche de l'administrateur qui a comme adresse , l'adresse entrée)
    console.log(matricule);
    
    await connection.query(
      `DELETE FROM utilisateur WHERE matricule = ?;`,
      [matricule]
    );
    
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}


/*************** show tables *********/
async function showtables() {
  const connection = await pool.getConnection();
  try {
  const [res] = await connection.query("show tables");
  return res;
  } finally {
  connection.release();
  }
 }
 
 /****************** Affichage des employes *******************/
 async function retournerEmployees() {
  const connection = await pool.getConnection();
  try {
  const query = `
  SELECT e.*, p.*, s.*, d.*
  FROM Employe e
  LEFT JOIN occupe o ON e.matricule = o.matricule
  LEFT JOIN Poste p ON o.idPoste = p.idPoste
  LEFT JOIN Structure s ON o.idStructure = s.idStructure
  JOIN Diplome d ON e.codeDipl = d.idDipl
  WHERE e.etat = "enActivite"; 
  `; //filtrer les employés with etat = enActivite
 
  const [results] = await connection.query(query);
 
 
  if (results.length === 0) {
  throw new Error("Pas d'employes");
  }
  // Le nombre d'emolyé
  const totalEmployees = results.length;
 
  // Transform the results to group employees with their corresponding posts
  const employees = results.reduce((acc, row) => {
  const { matricule, nom, prenom, dateNaiss, dateRecrut, sexe, lieuTravail,idPoste, intituleP, echelle, codeSTR,csp, idStructure, designationS, idDipl, designationD, valeurD } = row;
  
  // Extract the first 10 characters of dateNaiss and dateRecrut
  const dateNaissObj = new Date(dateNaiss);
  const dateRecrutObj = new Date(dateRecrut);
 
  // Format Date objects to extract the first 10 characters
  const formattedDateNaiss = dateNaissObj.toISOString().substring(0, 10);
  const formattedDateRecrut = dateRecrutObj.toISOString().substring(0, 10);
 
  
  
 
  // Check if the employee exists in the accumulator
  const existingEmployee = acc.find(emp => emp.matricule === matricule);
  if (existingEmployee) {
  existingEmployee.postes.push({ idPoste, intituleP, echelle, codeSTR ,csp });
  existingEmployee.structures.push({ idStructure, designationS });
  existingEmployee.diplomes.push({ idDipl, designationD, valeurD });
  } else {
  // console.log("echelle", echelle)
  // let cspTemp = '';
  // if (echelle >= 9 && echelle <= 14) {
  // cspTemp = 'E';
  // } else if (echelle >= 15 && echelle <= 20) {
  // cspTemp = 'M';
  // } else if (echelle >= 21 && echelle <= 27) {
  // cspTemp = 'C';
  // } else if ((echelle >= 28 && echelle <= 39) || (echelle == '28A') || (echelle == '28B')) {
  // cspTemp = 'CS';
  // }
  // console.log('csp: ', cspTemp);
  acc.push({
  matricule,
  nom,
  prenom,
  dateNaiss: formattedDateNaiss,
  dateRecrut: formattedDateRecrut,
  sexe,
  lieuTravail,
  postes: [{ idPoste, intituleP, echelle, codeSTR ,csp}],
  structures: [{ idStructure, designationS }],
  diplomes: [{idDipl, designationD, valeurD}]
  });
 
  }
  
  return acc;
  }, []);
 
  return { totalEmployees, employees };
  } catch (e) {
  throw e;
  } finally {
  connection.release();
  }
 }
 
 /*************** Login ****************/
 async function login(
  matricule,
  password
  ){
  const connection = await pool.getConnection();
  try {
  
  // exécution de la requete (recherche de l'administrateur qui a comme adresse , l'adresse entrée)
  const [results] = await connection.query(
  'SELECT * FROM utilisateur WHERE matricule = ?;',
  [matricule]
  );
  console.log(matricule);
  if (results.length == 0) {
  throw new Error("Matricule incorrect");
  }

  

  // affectation de l'administrateur trouvé à la constante administrateur
  const administrateur = results[0];

  console.log('administrateur: ', administrateur.password )

  // Vérification du mot de passe
  // Comparaison du mot de passe entré avec le mot de passe haché stocké dans la base de données
  const passwordMatch = await bcrypt.compare(password, administrateur.password);
  console.log('Password Match:', passwordMatch); 
  if (!passwordMatch) {
  // si cette condition n'est pas vérifiée c'est à dire que "le mot de passe entré est incorrect"
  throw new Error("Mot de passe incorrect");
  }
  // Sinon retourner l'id de l'utilisateur connecté
  const administrateurId = administrateur.matricule;
  const profil = administrateur.profil;
  return { administrateurId, profil };
  } catch (e) {
  throw e;
  } finally {
  connection.release();
  }
  }
 
 
 /*************** Ajouter Personnel *************/
 async function ajouterPersonnel(
  matricule,
  nom,
  prenom,
  dateNaiss,
  dateRecrut,
  sexe,
  lieuTravail,
  intituleP,
  echelle,
  codeSTR,
  csp,
  designationS,
  designationD,
  valeurD
 ) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  //Restriction sur la taille de matricule: 
  if (matricule.length > 6){
  throw new Error("Erreur : Le matricule est trop long.")
  }
  // Restriction sur la structure du matricule 
  const matriculeVerif = /^\d{5}[A-Za-z]$/;
  if (!matriculeVerif.test(matricule)) {
  throw new Error ("Erreur: Le matricule n'est pas valide.")
  }
 
  //MODIFICATION DE LA VALEUR DE SEXE:
  if(sexe == "Feminin"){
  sexe = 'F'
  }
  else if(sexe == "Masculin"){
  sexe = 'M'
  }
 
 
  // Check if employe with the same matricule already exists
  const checkEmployeQuery = `
  SELECT COUNT(*) AS employeCount FROM Employe WHERE matricule = ?;
  `;
  const [checkResult] = await connection.query(checkEmployeQuery, [matricule]);
  if (checkResult[0].employeCount > 0) {
  throw new Error("Employe existe déjà");
  }
  // else 
  
  // Insertion ou récupération de l'ID du diplôme
  let diplId;
  const selectDiplIdQuery = `
  SELECT idDipl FROM Diplome WHERE designationD = ? AND valeurD = ? LIMIT 1;
  `;
  const selectDiplIdValues = [designationD, valeurD];
  const [diplIdResult] = await connection.query(selectDiplIdQuery, selectDiplIdValues);
  if (diplIdResult.length === 0) {
  const insertDiplomeQuery = `
  INSERT INTO Diplome (designationD, valeurD)
  VALUES (?, ?)
  ON DUPLICATE KEY UPDATE idDipl=LAST_INSERT_ID(idDipl);
  `;
  const insertDiplomeValues = [designationD, valeurD];
  await connection.query(insertDiplomeQuery, insertDiplomeValues);
  
  const [newDiplIdResult] = await connection.query(selectDiplIdQuery, selectDiplIdValues);
  diplId = newDiplIdResult[0].idDipl;
  } else {
  diplId = diplIdResult[0].idDipl;
  }
 
  // Insertion ou récupération de l'ID du poste
  let posteId;
  const selectPosteIdQuery = `
  SELECT idPoste FROM Poste WHERE codeSTR = ? LIMIT 1;
  `;
  const selectPosteIdValues = [codeSTR];
  const [posteIdResult] = await connection.query(selectPosteIdQuery, selectPosteIdValues);
  if (posteIdResult.length === 0) {
  const insertPosteQuery = `
  INSERT INTO Poste (intituleP, echelle, codeSTR, csp, codeAct)
  VALUES (?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE idPoste=LAST_INSERT_ID(idPoste);
  `;
  const codeAct = codeSTR.substring(0, 2); // Deduct codeAct from codeSTR (les 2 premiers chiffres)
  const insertPosteValues = [intituleP, echelle, codeSTR,csp, codeAct];
  await connection.query(insertPosteQuery, insertPosteValues);
 
  const [newPosteIdResult] = await connection.query(selectPosteIdQuery, selectPosteIdValues);
  posteId = newPosteIdResult[0].idPoste;
  } else {
  posteId = posteIdResult[0].idPoste;
  }
 
  // Insertion ou récupération de l'ID de la structure
  let structId;
  const selectStructIdQuery = `
  SELECT idStructure FROM Structure WHERE designationS = ? LIMIT 1;
  `;
  const selectStructIdValues = [designationS];
  const [structIdResult] = await connection.query(selectStructIdQuery, selectStructIdValues);
  if (structIdResult.length === 0) {
  const insertStructureQuery = `
  INSERT INTO Structure (designationS)
  VALUES (?)
  ON DUPLICATE KEY UPDATE idStructure=LAST_INSERT_ID(idStructure);
  `;
  const insertStructureValues = [designationS];
  await connection.query(insertStructureQuery, insertStructureValues);
 
  const [newStructIdResult] = await connection.query(selectStructIdQuery, selectStructIdValues);
  structId = newStructIdResult[0].idStructure;
  } else {
  structId = structIdResult[0].idStructure;
  }
 
 
  // Insertion de l'employé et de l'association occupe
  const insertEmployeQuery = `
  INSERT INTO Employe (matricule, nom, prenom, dateNaiss, dateRecrut, sexe, lieuTravail, Etat, codeDipl)
  VALUES (?, ?, ?, ?, ?, ? , ?, ?, ?);
  `;
  const insertEmployeValues = [matricule, nom, prenom, dateNaiss, dateRecrut, sexe, lieuTravail,"enActivite", diplId];
  await connection.query(insertEmployeQuery, insertEmployeValues);
 
  const insertOccupeQuery = `
  INSERT INTO occupe (matricule, idPoste, idStructure)
  VALUES (?, ?, ?);
  `;
  const insertOccupeValues = [matricule, posteId, structId];
  await connection.query(insertOccupeQuery, insertOccupeValues);
 
  // insert dans Necessite if not exist 
  const NecessiteValues = [posteId, diplId];
  const verifNecessiteQuery = await connection.query(`SELECT * FROM necessite WHERE idPoste = ? and codeDipl = ? LIMIT 1;`, NecessiteValues); 
 
  if (verifNecessiteQuery.length === 0){
  const insertNecessiteQuery = `
  INSERT INTO necessite (idPoste, codeDipl)
  VALUES (?, ?);
  `;
  await connection.query(insertNecessiteQuery, insertNecessiteValues);
  }
  // else (si cette ligne existe , on insere rien)
 
  await connection.commit();
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }
 
/*************** Modifier Personnel *************/
async function modifierPersonnel(
  matricule,
  nom,
  prenom,
  dateNaiss,
  dateRecrut,
  sexe,
  lieuTravail,
  intituleP,
  echelle,
  codeSTR,
  csp,
  designationS,
  designationD,
  valeurD
) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    //MODIFICATION DE LA VALEUR DE SEXE:
    if (sexe === "Feminin") {
      sexe = 'F';
    } else if (sexe === "Masculin") {
      sexe = 'M';
    }

    // Check if employe with the same matricule already exists
    const checkEmployeQuery = `
      SELECT COUNT(*) AS employeCount FROM Employe WHERE matricule = ?;
    `;
    const [checkResult] = await connection.query(checkEmployeQuery, [matricule]);
    if (checkResult[0].employeCount === 0) {
      throw new Error("Employe n'existe pas");
    }

    // Get the current codeDipl
    const selectCurrentDiplQuery = `SELECT codeDipl FROM Employe WHERE matricule = ?;`;
    const [currentDiplResult] = await connection.query(selectCurrentDiplQuery, [matricule]);
    const currentCodeDipl = currentDiplResult[0].codeDipl;

    // Update diplome information
    const selectDiplQuery = `SELECT idDipl FROM Diplome WHERE designationD = ? AND valeurD = ? LIMIT 1;`;
    const [diplResult] = await connection.query(selectDiplQuery, [designationD, valeurD]);

    let NewCodeDipl;
    if (diplResult.length === 0) {
      // Insert new diplome if not exist
      const insertDiplQuery = `
        INSERT INTO diplome(designationD,valeurD)
        VALUES (?,?);
      `;
      const insertDiplValues = [designationD, valeurD];
      await connection.query(insertDiplQuery,insertDiplValues);
      // const [diplidResult] = await connection.query(`SELECT idDipl from diplome where designationD = ? and valeurD = ? ;`,insertDiplValues);
      const [diplidResult] = await connection.query(`SELECT LAST_INSERT_ID() AS NewDiplId;`);
      NewCodeDipl = diplidResult[0].NewDiplId;
    } else {
      NewCodeDipl = diplResult[0].idDipl;
    }

    // Update employe's information
    const updateEmployeQuery = `
    UPDATE Employe
    SET nom = ?, prenom = ?, dateNaiss = ?, dateRecrut = ?, sexe = ?, lieuTravail = ? , codeDipl = ?
    WHERE matricule = ?;
  `;
    const updateEmployeValues = [nom, prenom, dateNaiss, dateRecrut, sexe, lieuTravail, NewCodeDipl, matricule];
    await connection.query(updateEmployeQuery, updateEmployeValues);


  //   const countDiplEmployeQuery = `
  //   SELECT COUNT(*) AS employeCount FROM Employe WHERE codeDipl = ?;
  // `;
  //   const [countDiplEmployeResult] = await connection.query(countDiplEmployeQuery, [currentCodeDipl]);
  //   if (countDiplEmployeResult[0].employeCount === 0) {
  //     const deleteDiplQuery = `DELETE FROM Diplome WHERE idDipl = ?;`;
  //     await connection.query(deleteDiplQuery, [currentCodeDipl]);
  //   }
  // }
      // recuperer les anciennes valeurs de idstructure et idPoste 
      const recupQuery = `SELECT idStructure, idPoste from occupe where matricule = ? LIMIT 1 ;`;
      const [recupQueryResult] = await connection.query(recupQuery, [matricule]);
      const StructId = recupQueryResult[0].idStructure;
      const PosteId = recupQueryResult[0].idPoste;

   // check structure 
   const checkStructQuery = `
   SELECT idStructure FROM Structure WHERE designationS = ?;
  `;
   const [checkStructResult] = await connection.query(checkStructQuery , [designationS]);
   let NewStructId;
  if (checkStructResult.length === 0) { // la nouvelle structure n'existe pas
       const insertStructQuery = `
       INSERT INTO Structure (designationS)
       VALUES (?);
      `;
      await connection.query(insertStructQuery, [designationS]);
      const [structidResult] = await connection.query(`SELECT LAST_INSERT_ID() AS NewStructId;`);
      NewStructId = structidResult[0].NewStructId;
 }
 else {
      NewStructId = checkStructResult[0].idStructure;
 }

    // Delete old structure if it is not used by any other employe (n'existe pas dans la table "occupe")
    // À discuter : est-ce qu'on la laisse ou on l'enlève ?
    // const countStructmployeQuery = `SELECT COUNT(*) AS structureCount FROM occupe WHERE idStructure = ? ;`;
    // const [countStructmployeResult] = await connection.query(countStructmployeQuery, [StructId]);
    // if (countStructmployeResult[0].structureCount === 0) {
    //   const deletestructQuery = `DELETE FROM Structure WHERE idStructure = ?;`;
    //   await connection.query(deletestructQuery, [StructId]);
    // }




  //check poste 
  const checkPosteQuery = `
  SELECT * FROM Poste WHERE codeSTR = ?;
 `;
  const [checkPosteResult] = await connection.query(checkPosteQuery , [codeSTR]);
  let NewPosteId;
  const codeA = codeSTR.substring(0,2);
  if (checkPosteResult.length === 0) { // le nouveau poste n'existe pas
     const insertPosteQuery = `
     INSERT INTO poste (intituleP,echelle,codeSTR,csp,codeAct)
     VALUES (?,?,?,?,?);
    `;
    await connection.query(insertPosteQuery, [intituleP,echelle,codeSTR,csp,codeA]);
    const [PosteInsertResult] = await connection.query(`SELECT idPoste FROM Poste WHERE codeSTR = ? LIMIT 1 `,codeSTR);
    NewPosteId = PosteInsertResult[0].idPoste;
}
else {
     if ((checkPosteResult[0].intituleP != intituleP) || (checkPosteResult[0].echelle != echelle) || (checkPosteResult[0].csp != csp)){
         await connection.query(`UPDATE poste SET intituleP= ?, echelle = ?, csp=? WHERE codeSTR = ?;`,[intituleP,echelle,csp,codeSTR]);
     }
     NewPosteId = checkPosteResult[0].idPoste;
}

   // Delete old poste if it is not used by any other employe (n'existe pas dans la table "occupe")
   // À discuter : est-ce qu'on la laisse ou on l'enlève ?
  //  const countSPostemployeQuery = `SELECT COUNT(*) AS posteCount FROM occupe WHERE idPoste = ? ;`;
  //  const [countPostemployeResult] = await connection.query(countSPostemployeQuery, [PosteId]);
  //  if (countPostemployeResult[0].posteCount === 0) {
  //    const deletePosteQuery = `DELETE FROM Poste WHERE idPoste = ?;`;
  //    await connection.query(deletePosteQuery, [PosteId]);
  //  }


  // Update existing occupe row
    const updateOccupeQuery = `
    UPDATE occupe
    SET idPoste = ?, idStructure = ?
    WHERE matricule = ?;
   `;
    const updateOccupeValues = [NewPosteId, NewStructId, matricule];
    await connection.query(updateOccupeQuery, updateOccupeValues);

    // // insert the new data in necessite table  
    // const insertNecessiteQuery = `
    // INSERT INTO necessite(idPoste,codeDipl) 
    // VALUES (?, ?)
    // `;
    // const insertNecessiteValues = [NewPosteId, NewCodeDipl,PosteId,currentCodeDipl];
    // await connection.query(insertNecessiteQuery, insertNecessiteValues);

// or update mais il faut verifier que idPoste,codeDipl qu'on va modifie n'existe pas pour un autre employe
    // // Update existing necessite row 
    //     const updateNecessiteQuery = `
    //     UPDATE necessite
    //     SET idPoste = ?, codeDipl= ?
    //     WHERE idPoste = ? and codeDipl= ?;
    //   `;
    // const updateNecessiteValues = [NewPosteId, NewCodeDipl,PosteId,currentCodeDipl];
    // await connection.query(updateNecessiteQuery, updateNecessiteValues);
// pour supprimer les anciens Postes et diplomes il faut le faire spres la modification de necessite ou bien ne les supprime pas

    await connection.commit();
  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
}

 
 /****************** Affichage des employes archivés *******************/
 async function retournerArchiveEmployees() {
  const connection = await pool.getConnection();
  try {
  const query = `
  SELECT e.*, p.*, s.*, d.*
  FROM Employe e
  LEFT JOIN occupe o ON e.matricule = o.matricule
  LEFT JOIN Poste p ON o.idPoste = p.idPoste
  LEFT JOIN Structure s ON o.idStructure = s.idStructure
  JOIN Diplome d ON e.codeDipl = d.idDipl
  WHERE e.etat != "enActivite"; 
  `; //filtrer les employés with etat != enActivite ie soit retraite, soit mute ou bien demissionne
 
  const [results] = await connection.query(query);
 
 
  if (results.length === 0) {
  throw new Error("Pas d'employes archivés");
  }
  
  // Le nombre d'employés archivés
  const totalArchiveEmployees = results.length;
 
  // Transform the results to group employees with their corresponding posts
  const ArchiveEmployees = results.reduce((acc, row) => {
  const { matricule, nom, prenom, dateNaiss, dateRecrut, sexe, lieuTravail,etat,idPoste, intituleP, echelle, codeSTR,csp, idStructure, designationS, idDipl, designationD, valeurD } = row;
  
  // Extract the first 10 characters of dateNaiss and dateRecrut
  const dateNaissObj = new Date(dateNaiss);
  const dateRecrutObj = new Date(dateRecrut);
 
  // Format Date objects to extract the first 10 characters
  const formattedDateNaiss = dateNaissObj.toISOString().substring(0, 10);
  const formattedDateRecrut = dateRecrutObj.toISOString().substring(0, 10);
 
  
  
 
  // Check if the employee exists in the accumulator
  const existingEmployee = acc.find(emp => emp.matricule === matricule);
  if (existingEmployee) {
  existingEmployee.postes.push({ idPoste, intituleP, echelle, codeSTR });
  existingEmployee.structures.push({ idStructure, designationS });
  existingEmployee.diplomes.push({ idDipl, designationD, valeurD });
  } else {
  console.log("echelle", echelle)
  // let cspTemp = '';
  // if (echelle >= 9 && echelle <= 14) {
  // cspTemp = 'E';
  // } else if (echelle >= 15 && echelle <= 20) {
  // cspTemp = 'M';
  // } else if (echelle >= 21 && echelle <= 27) {
  // cspTemp = 'C';
  // } else if ((echelle >= 28 && echelle <= 39) || (echelle == '28A') || (echelle == '28B')) {
  // cspTemp = 'CS';
  // }

  acc.push({
  matricule,
  nom,
  prenom,
  dateNaiss: formattedDateNaiss,
  dateRecrut: formattedDateRecrut,
  sexe,
  lieuTravail,
  etat,
  postes: [{ idPoste, intituleP, echelle, codeSTR }],
  csp, //: cspTemp,
  structures: [{ idStructure, designationS }],
  diplomes: [{idDipl, designationD, valeurD}]
  });
 
  }
  
  return acc;
  }, []);
 
  return {totalArchiveEmployees,ArchiveEmployees};
  } catch (e) {
  throw e;
  } finally {
  connection.release();
  }
 }



 
/****************** Ajouter un depart (mutation ou bien demission) *******************/
async function AjouterDepart(
  matricule,
  motif, // mutation ou demission 
  anneDeb,
  observation // c'est la structure qui va etre modifie dans employe en cas de mutation sinon c'est une simple observation
){
  const connection = await pool.getConnection();
  try {
    console.log("aneeDeb:" ,anneDeb);

    await connection.beginTransaction();
    const PMTquery = `
    SELECT idPmt
    FROM PMTexistants
    WHERE anneeDeb = ?;
  `;
  const [PMTresults] = await connection.query(PMTquery,[anneDeb]);
  if (PMTresults.length === 0){
    throw new Error ("Erreur : PMT inexistant")
  }
  else { // si le pmt exist
    //on verifie si l'employe existe
    if(matricule.length != 6) {throw new Error("Erreur : matricule invalide")}
    const Employequery = `
    SELECT *
    FROM Employe
    WHERE matricule = ?;
    `;
    const [Employeresults] = await connection.query(Employequery,[matricule]);
    console.log("Employeresults :",Employeresults)
    if (Employeresults.length === 0){
      throw new Error ("Erreur : Employe n'existe pas")
    }

    //on verifie si ce depart exist 
    const Departquery = `
    SELECT *
    FROM etreConcerne
    WHERE matricule = ? and annee = ? and codeDep = ?;
    `;
    const [Departresults] = await connection.query(Departquery,[matricule,anneDeb,motif]);
    if (Departresults.length > 0){
      throw new Error ("Erreur : Previson de depart deja existante")
    }
    else { // si cette prevision n'existe pas
      //verifie que cette personne n'est pas deja demissionne ou muté ou bien il est concerne par une previson de retraite verifie
      const [checkQuery] = await connection.query(` SELECT codeDep, verifie
      FROM etreConcerne
      WHERE matricule = ?
      ORDER BY annee DESC
      LIMIT 1`,[matricule])
      if (checkQuery.length>0){
        if (checkQuery[0].codeDep === "demission") {throw new Error ("Erreur : cet employé est deja demissionné");}
        else if (checkQuery[0].codeDep === "retraite" && checkQuery[0].verifie === 1) {
          throw new Error("Erreur : cet employé est déjà retraité");
        }
        else if (checkQuery[0].codeDep === "mutation") {throw new Error ("Erreur : cet employé est deja muté");}
      }
      // else 
        const [check] = await connection.query(`SELECT * FROM previsionDepart WHERE motif =?;`,[motif]);
        if (check.length === 0) { // si ce motif n'existe pas on l'ajoute 
          await connection.query(`INSERT INTO previsionDepart (motif) VALUES (?)`,[motif])
        }
        insertDepQuery = `INSERT INTO etreConcerne (matricule,annee,codeDep,verifie,observation) 
        VALUES (?,?,?,?,?);`;
        insertValues = [matricule,anneDeb,motif,1,observation];
        // si c'est une demission on insere directement
        if (motif==="demission"){
          await connection.query(insertDepQuery,insertValues);
          // update le champ "etat" dans employe de "EnActivite" à "demissionne"
          await connection.query(`UPDATE Employe SET etat = ? WHERE matricule = ?;`,["demissionne",matricule]);
        }
        else { // si c'est une mutation
          // il faut verifie que la nouvelle structure/departement n'est pas le meme que l'ancienne
          const [idStruct] = await connection.query(`SELECT idStructure FROM Occupe WHERE matricule =?`,[matricule]);
          const verifValues = idStruct[0].idStructure;
          const [VerifResult] = await connection.query(`SELECT designationS FROM Structure WHERE idStructure =?`,verifValues);
          if (VerifResult[0].designationS === observation){ // si c'est la meme structure throw erreur
            throw new Error ("Erreur : la nouvelle structure est la meme que l'ancienne")
          }
          else { // si ce n'est pas le cas, on insere la prevision
            await connection.query(insertDepQuery,insertValues);
            // om mofie la structure/departement de l'employe 
            // la table structure
            const checkStructQuery = `
            SELECT idStructure FROM Structure WHERE designationS = ?;
          `;
            const [checkStructResult] = await connection.query(checkStructQuery , [observation]);
            let NewStructId;
          if (checkStructResult.length === 0) { // la nouvelle structure n'existe pas
                const insertStructQuery = `
                INSERT INTO Structure (designationS)
                VALUES (?);
              `;
              await connection.query(insertStructQuery, [observation]);
              const [structidResult] = await connection.query(`SELECT LAST_INSERT_ID() AS NewStructId;`);
              NewStructId = structidResult[0].NewStructId;
          }
          else {
              NewStructId = checkStructResult[0].idStructure;
          }

            // update la table occupe 
            const updateOccupeQuery = `
            UPDATE occupe
            SET idStructure = ?
            WHERE matricule = ?;
          `;
            const updateOccupeValues = [NewStructId, matricule];
            await connection.query(updateOccupeQuery, updateOccupeValues);
          }
        // update le champ "etat" dans employe de "EnActivite" à "mute"
        await connection.query(`UPDATE Employe SET etat = ? WHERE matricule = ?;`,["mute",matricule]);

        // //on supprime les previsions retraite where leur annee est égale à anneeDeb
        // await connection.query(
        // `DELETE FROM etreConcerne WHERE matricule = ? AND annee = ? AND codeDep = ?`,
        // [matricule, anneDeb, 'retraite']
      // );
        }

          //on supprime les previsions retraite where leur annee est >= à anneeDeb
          await connection.query(
          `DELETE FROM etreConcerne WHERE matricule = ? AND annee >= ? AND codeDep = ?`,
          [matricule, anneDeb, 'retraite']
          );
      
    }
  }

    await connection.commit();
  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
}
 
 /****************** Ajouter un pmt (ajouter automatiquement les departs qui ont le motif "retraite" (on utilisant la date de naissance)) *******************/
 async function AjouterPmt(
  anneDeb,
  duree
 ) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  //verify if the pmt already exists 
  const [PmtVerif] = await connection.query(`SELECT idPmt FROM PMTexistants where anneeDeb=?`,[anneDeb]);
  if (PmtVerif.length > 0) {
  throw new Error("Erreur : PMT exist deja ");
  }
  else{ 
  //add the new PMT 
  await connection.query(`INSERT INTO PMTexistants (anneeDeb, anneeFin)
  VALUES (?,?);`,[anneDeb,anneDeb+duree]);
 
  for (let i = anneDeb; i <= anneDeb + duree; i++) {
  const [employeQuery] = await connection.query(
  `SELECT matricule, YEAR(dateNaiss) as dateNaiss FROM Employe WHERE ? - YEAR(dateNaiss) >= 60 and etat="enActivite"`,
  [i]
  );
  
  for (const row of employeQuery) {
  if (i-row.dateNaiss===60){
  await connection.query(
  'INSERT INTO etreConcerne (matricule, annee, codeDep, verifie, observation) SELECT ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM etreConcerne WHERE matricule = ? AND annee = ? AND codeDep = ?)',
  [row.matricule, i, 'retraite', 0, "", row.matricule, i, 'retraite']
  ); 
  }
  else {
  if (i===anneDeb){
  const [checkRet] = await connection.query (`SELECT * FROM etreConcerne WHERE matricule=? and annee=? and codeDep = ? and verifie = ?`,[row.matricule,anneDeb-1,'retraite',1]);
  if (checkRet.length === 0){
  await connection.query(
  'INSERT INTO etreConcerne (matricule, annee, codeDep, verifie, observation) SELECT ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM etreConcerne WHERE matricule = ? AND annee = ? AND codeDep = ?)',
  [row.matricule, i, 'retraite', 0, "", row.matricule, anneDeb, 'retraite'] 
  ); 
  }
  }
  }
  }
  }
  }
  await connection.commit();
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }
 
 /********************** Afficher les PMT existants **********************/
 async function AfficherPMTExistants() {
  const connection = await pool.getConnection();
  try {
  // SELECT all from la table PMTExistants
  const PMTquery = `
  SELECT idPmt, anneeDeb, anneeFin
  FROM PMTexistants;
  `;
  const [PMTresults] = await connection.query(PMTquery);
 
  // Return the PMTresults as a JSON array
  return PMTresults.map(pmt => ({
  // idPmt: pmt.idPmt,
  anneeDeb: pmt.anneeDeb,
  anneeFin: pmt.anneeFin
  }));
  } catch (error) {
  throw error;
  } finally {
  connection.release();
  }
 }
 
 /****************** Valider la retraite d'un employé *******************/
 async function validerRetraite(
  matricule,
  annee
  ) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  // modifier l'état de l'employe à "retraite"
  await connection.query(
  'UPDATE Employe SET etat = ? WHERE matricule = ?',
  ['retraite', matricule]
  );
 
  // modifier la ligne correspondante dans "etreConcerne" 
  await connection.query(
  'UPDATE etreConcerne SET verifie = ? WHERE matricule = ? AND annee = ? AND codeDep = ?',
  [1, matricule, annee, 'retraite']
  );
  //supprimer les prevesions de retraite qui ont une annee > annee
  await connection.query(
  `DELETE FROM etreConcerne WHERE matricule = ? AND annee > ? AND codeDep = ?`,
  [matricule, annee, 'retraite']
  );
 
  await connection.commit();
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }
 
 /****************** Afficher Previsions de départ ******************/
 async function AfficherPrevDep(anneePMT) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  // Check if the given year exists in PMTexistants
  const [checkPmt] = await connection.query(`SELECT anneeFin FROM PMTexistants WHERE anneeDeb = ?`, [anneePMT]);
  if (checkPmt.length === 0) {
  throw new Error("Erreur : PMT inexistant");
  } else {
  const anneeFin = checkPmt[0].anneeFin;
 
  const [previsions] = await connection.query(`SELECT e.matricule, emp.nom, emp.prenom, act.code as codeAct,post.intituleP , post.csp, act.fonction, emp.lieuTravail, e.codeDep, e.annee, e.observation ,e.verifie
  FROM etreConcerne e
  JOIN Employe emp ON e.matricule = emp.matricule
  LEFT JOIN Occupe oc ON emp.matricule = oc.matricule
  LEFT JOIN Poste post ON oc.idPoste = post.idPoste
  LEFT JOIN Activite act ON post.codeAct = act.code
  WHERE e.annee >= ? AND e.annee <= ?
  AND (e.codeDep != 'retraite' OR (e.codeDep = 'retraite' AND e.annee = (SELECT MIN(ec.annee) FROM etreConcerne ec WHERE ec.matricule = e.matricule AND ec.codeDep = 'retraite')))
  `,[anneePMT, anneeFin]);
 
  await connection.commit();
  return previsions;
  }
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }
 
 /********* Ajout d'un utilisateur ***********/
 async function ajouterUtilisateur(matricule, nom, prenom, profil) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  console.log('matricule:', matricule);
 
  const [existingUser] = await connection.query(
  'SELECT COUNT(matricule) AS nbUser FROM utilisateur WHERE matricule = ?;',
  [matricule]
  );
 
  if (existingUser[0].nbUser > 0) {
  throw new Error('Erreur : utilisateur existe déjà.');
  }
 
  // Restriction sur la taille de matricule:
  if (matricule.length > 6) {
  throw new Error('Erreur : Le matricule est trop long.');
  }
 
  // Restriction sur la structure du matricule
  const matriculeVerif = /^\d{5}[A-Za-z]$/;
  if (!matriculeVerif.test(matricule)) {
  throw new Error('Erreur: Le matricule n\'est pas valide.');
  }
  
  // on hache le mot de pass par défaut 
  const password = await bcrypt.hash('sonatrach', 10); // Utilisez bcrypt pour hacher le mot de passe
 
 
  const AjoutUserQuery = `
  INSERT INTO utilisateur (nom, prenom, matricule, password, profil)
  VALUES (?, ?, ?, ?, ?);
  `;
 
  const AjoutUserValues = [nom, prenom, matricule, password, profil];
  await connection.query(AjoutUserQuery, AjoutUserValues);
  await connection.commit();
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }
 
 /****************** Ajouter previsions de recrutement permanent ******************/
 async function AjouterPrevRecrut(
  anneepmt, //annee debut du pmt
  motif, // Rempl, deficit ou PDvp
  modeP, // INT ou EXT
  NiveauRequis,
  Diplome,
  Specialite,
  Experience,
  SpecifitesPoste,
  lieuTravail,
  anneeRecrut,
  intituleP,
  echelle,
  codeSTR,
  csp,
  nbEmploye,
  observation
 ) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  const PMTquery = `
  SELECT idPmt , anneeFin
  FROM PMTexistants
  WHERE anneeDeb = ?;
  `;
  const [PMTresults] = await connection.query(PMTquery, [anneepmt]);
  if (PMTresults.length === 0) {
  throw new Error("Erreur : PMT inexistant");
  } else {
 
  //verifier que anneeRecrut > anneePmtDebut et anneeRecrut > anneePmtDebut
  const idPmt = PMTresults[0].idPmt;
  const anneeFin = PMTresults[0].anneeFin;
 
  if ((anneeRecrut<anneepmt)||(anneeRecrut>anneeFin)){
  throw new Error("Erreur : cette année n'appartient pas à ce PMT");
  }
 // else 
  // Check si cette prevision de recrutement existe déja 
  const [existPrev] = await connection.query(
  `SELECT ed.*, pmt.*, pr.*, p.*, a.*
  FROM etreDemande ed
  LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
  LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
  LEFT JOIN Poste p ON ed.idPoste = p.idPoste
  LEFT JOIN Activite a ON p.codeAct = a.code
  WHERE p.codeSTR = ? AND ed.annee = ? AND pmt.anneeDeb = ? 
  AND pr.motif = ? AND pr.modeP = ? AND pr.NiveauRequis = ? 
  AND pr.Diplome = ? AND pr.Specialite = ? AND pr.Experience = ? 
  AND pr.SpecifitesPoste = ? AND pr.LieuTravail = ?`,
  [
  codeSTR,
  anneeRecrut,
  anneepmt,
  motif,
  modeP,
  NiveauRequis,
  Diplome,
  Specialite,
  Experience,
  SpecifitesPoste,
  lieuTravail,
  ]
  );
  if (existPrev.length > 0) {
  throw new Error("Erreur : Cette prévision de recrutement existe déjà pour ce poste, cette année et ces paramètres.");
  }
  
  //else : on cree la prevision
 
  // Check si la prevision de recrutement existe deja dans la table PrevisionRecrut
  const [checkExisting] = await connection.query(
  `SELECT * FROM PrevisionRecrut WHERE 
  motif = ? AND modeP = ? AND NiveauRequis = ? AND Diplome = ? 
  AND Specialite = ? AND Experience = ? AND SpecifitesPoste = ? 
  AND LieuTravail = ?`,
  [motif, modeP, NiveauRequis, Diplome, Specialite, Experience, SpecifitesPoste, lieuTravail]
  );
  let idRecrut;
  if (checkExisting.length > 0) { // si oui : on recupere son id 
  idRecrut = checkExisting[0].idRecrut;
  } else { // si non : on l'insere et on recupere l'id 
  const InsertPrevRecrutQuery = `
  INSERT INTO PrevisionRecrut (motif, modeP, NiveauRequis, Diplome, Specialite, Experience, SpecifitesPoste, LieuTravail)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const InsertPrevRecrutValues = [
  motif,
  modeP,
  NiveauRequis,
  Diplome,
  Specialite,
  Experience,
  SpecifitesPoste,
  lieuTravail,
  ];
  const [InsertPrevRecrutResult] = await connection.query(InsertPrevRecrutQuery,InsertPrevRecrutValues);
  idRecrut = InsertPrevRecrutResult.insertId;
  console.log(idRecrut);
  }
 
  // Check si le poste existe deja 
  const [getPoste] = await connection.query(
  `SELECT * FROM Poste WHERE codeSTR = ?`,
  [codeSTR]
  );
  let posteId;
  if (getPoste.length === 0) { // si non : on l'insere et on recupere l'id 
  const InsertPosteQuery = `
  INSERT INTO Poste (intituleP, echelle, codeSTR, csp, codeAct)
  VALUES (?, ?, ?, ?, ?);
  `;

  const codeA = codeSTR.substring(0,2);

  const InsertPosteValues = [intituleP, echelle, codeSTR, csp, codeA];
  const [insertedPoste] = await connection.query(InsertPosteQuery,InsertPosteValues);
  posteId = insertedPoste.insertId;
  console.log(posteId);
  } else { // else (si oui) : recuperer l'id
  posteId = getPoste[0].idPoste; 
  }
 
  // Inserer dans etreDemande
  const InsertEtreDemandeQuery = `
  INSERT INTO etreDemande (idPoste, annee, idRecrut,idPmt,nbEmploye, observation)
  VALUES (?, ?, ?, ?, ?, ?);
  `;
  const InsertEtreDemandeValues = [
  posteId,
  anneeRecrut,
  idRecrut,
  idPmt,
  nbEmploye,
  observation,
  ];
  await connection.query(InsertEtreDemandeQuery,InsertEtreDemandeValues);
 
  await connection.commit();
  }
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }
 
 /****************** Afficher les prévisions de recrutement permanent *******************/
 async function AfficherPrevRecrut(
  anneeDebPmt
  ) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  const query = `
  SELECT ed.*, pmt.*, pr.*, p.*, a.*
  FROM etreDemande ed
  LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
  LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
  LEFT JOIN Poste p ON ed.idPoste = p.idPoste
  LEFT JOIN Activite a ON p.codeAct = a.code
  WHERE pmt.anneeDeb = ?;
  `;
 
  const [results] = await connection.query(query,[anneeDebPmt]);
 
  if (results.length === 0) {
  throw new Error("Pas de prévisions de recrutement permanent");
  }
 
  const prevRecrutList = results.map(row => {
  const {
  annee,
  idPmt,
  idRecrut,
  motif,
  modeP,
  NiveauRequis,
  Diplome,
  Specialite,
  Experience,
  SpecifitesPoste,
  LieuTravail,
  nbEmploye,
  observation,
  idPoste,
  intituleP,
  echelle,
  codeSTR,
  csp,
  codeAct,
  fonction
  } = row;
 
  return {
  annee,
  idPmt,
  idRecrut,
  motif,
  modeP,
  NiveauRequis,
  Diplome,
  Specialite,
  Experience,
  SpecifitesPoste,
  LieuTravail,
  nbEmploye,
  observation,
  poste: {
  idPoste,
  intituleP,
  echelle,
  codeSTR,
  csp
  },
  activite: {
  codeAct,
  fonction,
  }
  };
  });
 
  await connection.commit();
  return prevRecrutList;
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }
 
 /****************** Supprimer une prévision de recrutement permanent ******************/
 async function DeletePrevRecrut(
  anneeRecrut, // année de la prévision de recrutement
  idPoste, // id du poste associé à la prévision
  idRecrut, // id de la prévision de recrutement
  idPmt // id du PMT associé à la prévision
 ) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  // Vérifier l'existence de la prévision à supprimer
  const [checkQuery] = await connection.query(
  `SELECT ed.*, pmt.*, pr.*, p.*, a.*
  FROM etreDemande ed
  LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
  LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
  LEFT JOIN Poste p ON ed.idPoste = p.idPoste
  LEFT JOIN Activite a ON p.codeAct = a.code
  WHERE pmt.idPmt = ? and p.idPoste = ? and annee = ? and pr.idRecrut = ?;`,
  [idPmt,idPoste,anneeRecrut,idRecrut]
  );
  if (checkQuery.length === 0) {
  throw new Error("Erreur : la prévision à supprimer n'existe pas.");
  }
  console.log(anneeRecrut,idPmt,idPoste,idRecrut)
 
  // Supprimer les données liées à la prévision
  // commencant par etreDemande
  await connection.query(
  `DELETE FROM etreDemande WHERE idPoste = ? AND annee = ? AND idRecrut = ? and idPmt = ?;`,
  [idPoste, anneeRecrut, idRecrut,idPmt]
  );
  
  // Ensuite, PrevisionRecrut
  // Vérifier si la prévision existe dans etreDemande
  const [prevExiste] = await connection.query(
  `SELECT idRecrut FROM etreDemande WHERE idRecrut = ?;`,
  [idRecrut]
  );
  
  if (prevExiste.length === 0) {
  // Si la prévision n'existe plus dans etreDemande, supprimer de PrevisionRecrut
  await connection.query(
  `DELETE FROM PrevisionRecrut WHERE idRecrut = ?;`,
  [idRecrut]
  );
  }
  // si elle existe , on fait rien 
 
 
  await connection.commit();
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }
 
 /****************** Modifier profil pour l'admin ******************/
async function modifierProfilAdmin(
  matricule, 
  nom, 
  prenom, 
  ancienMotDePasse, 
  nouveauMotDePasse) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // // Vérification de l'ancien mot de passe
     if (ancienMotDePasse && nouveauMotDePasse) {
      const [user] = await connection.query(
        'SELECT password FROM utilisateur WHERE matricule = ?',
         [matricule]
       );

      if (user.length === 0) {
        throw new Error("Utilisateur n'existe pas");
      }

      const isPasswordCorrect = await bcrypt.compare(ancienMotDePasse, user[0].password);
       if (!isPasswordCorrect) {
       throw new Error('Erreur : ancien mot de passe incorrect.');
       }
     }

     //modifier les informations du profil
   const updateQuery = `
     UPDATE utilisateur
       SET nom = ?, prenom = ?, password = ?
       WHERE matricule = ?;
     `;
     const hashedNewPassword = await bcrypt.hash(nouveauMotDePasse, 10);
     const updateValues = [nom, prenom, hashedNewPassword, matricule];
     await connection.query(updateQuery, updateValues);

    await connection.commit();
  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
}
 /****************** Modifier info de user par l'admin ******************/
 async function modifierUtilisateur(
  matricule, 
  nom, 
  prenom
  ) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
  
  
  // verifie que cet utilisateur exist 
  const [existingUser] = await connection.query(
  'SELECT COUNT(matricule) AS nbUser FROM utilisateur WHERE matricule = ?;',
  [matricule]
  );
 
  if (existingUser[0].nbUser === 0) {
  throw new Error('Erreur : utilisateur non trouvé.');
  }
 
  const modifierUserQuery = `
  UPDATE utilisateur
  SET nom = ?, prenom = ?
  WHERE matricule = ?;
  `;
 
  const modifierUserValues = [nom, prenom, matricule];
  await connection.query(modifierUserQuery, modifierUserValues);
  await connection.commit();
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();

  }
 }
 
 /****************** Modifier mot de passe user par le user ******************/
 async function modifierPassword(
  matricule,
  ancienMotDePasse, 
  nouveauMotDePasse
  ) {
  const connection = await pool.getConnection();
  try {
  await connection.beginTransaction();
 
  // verifie que cet utilisateur exist 
  const [existingUser] = await connection.query(
  'SELECT COUNT(matricule) AS nbUser, password FROM utilisateur WHERE matricule = ?;',
  [matricule]
  );
 
  if (existingUser[0].nbUser === 0) {
  throw new Error('Erreur : utilisateur non trouvé.');
  }
 
  // Comparer le mot de passe haché existant de l'utilisateur avec l'ancien mot de passe saisi comme parametre
  const isPasswordCorrect = await bcrypt.compare(ancienMotDePasse, existingUser[0].password);
  if (!isPasswordCorrect) {
  throw new Error('Erreur : ancien mot de passe incorrect.');
  }
 
  // Hacher le nouveau mot de passe et le modifier dans la base de données
  const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10); 
  const updatePasswordQuery = `
  UPDATE utilisateur SET password = ? WHERE matricule = ?;
  `;
  await connection.query(updatePasswordQuery, [hashedPassword, matricule]);
 
  await connection.commit();
  } catch (e) {
  await connection.rollback();
  throw e;
  } finally {
  connection.release();
  }
 }

/****************** Affichage de mouvements des effectifs par csp *******************/
async function AfficherMvmCSP(anneeDebPmt){

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    const PMTquery = `
    SELECT idPmt , anneeFin
    FROM PMTexistants
    WHERE anneeDeb = ?;
    `;

    const [PMTresults] = await connection.query(PMTquery, [anneeDebPmt]);
    if (PMTresults.length === 0) {
      throw new Error("Erreur : PMT inexistant");
    }
    const cspVal = ['ING+', 'CU', 'AC', 'CS', 'TS', 'TECHNICIEN', 'TECHNIQUE', 'AUTRE', 'ADM', 'AIDE']; // Les valeurs possibles de csp

    const query = `
    SELECT
        p.csp,
        SUM(CASE WHEN YEAR(e.dateRecrut) <= ? THEN 1 ELSE 0 END) AS RappelEffectifs
    FROM
        Employe e
    LEFT JOIN
        Occupe o ON e.matricule = o.matricule
    LEFT JOIN
        Poste p ON o.idPoste = p.idPoste
    LEFT JOIN 
        etreConcerne ec ON e.matricule = ec.matricule
    WHERE 
        (e.etat = 'enActivite' OR (e.etat != 'enActivite' AND ec.annee > ? AND ec.verifie = 1))
    GROUP BY
        p.csp;
  `;
  

    const result = await connection.query(query, [anneeDebPmt - 2,anneeDebPmt - 2]);
    const data = {};

    for (const csp of cspVal) {
      data[csp] = {
        RappelEffectifs: 0,
        PrevisionsCloture : {
          Departs: {
            Definitifs: 0,
            Internes: 0,
            Total : 0,
          },
          Recrutements: {
            Externes: 0,
            Internes: 0,
            Total : 0,
          },
          Effectifs : 0,
        },
        Previsions : {
          Departs: {
            Definitifs: 0,
            Internes: 0,
            Total : 0,
          },
          Recrutements: {
            Externes: 0,
            Internes: 0,
            Total : 0,
          },
          Effectifs : 0,
        },
      };
    }


    for (const row of result[0]) {
      if (data[row.csp]) {
        data[row.csp].RappelEffectifs = row.RappelEffectifs;
      }
    }

    for (const csp of cspVal) {
    // previsions de cloture
      // Requête pour le nombre de recrutements externes, internes et le total
      const recrutementsQuery = `
        SELECT p.csp,
        COALESCE(SUM(CASE WHEN pr.modeP = 'INT' THEN ed.nbEmploye ELSE 0 END), 0) AS RecrutementsInternes,
        COALESCE(SUM(CASE WHEN pr.modeP = 'EXT' THEN ed.nbEmploye ELSE 0 END), 0) AS RecrutementsExternes,
        COALESCE(SUM(CASE WHEN pr.modeP = 'INT' THEN ed.nbEmploye ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN pr.modeP = 'EXT' THEN ed.nbEmploye ELSE 0 END), 0) AS TotalRecrutements
        FROM etreDemande ed 
        LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
        LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
        LEFT JOIN Poste p ON ed.idPoste = p.idPoste
        WHERE p.csp = ? AND ed.annee = ? AND pmt.anneeDeb = ?;
        `;

      const recrutementsExternesResult = await connection.query(recrutementsQuery, [csp, anneeDebPmt-1,anneeDebPmt-1]);
      data[csp].PrevisionsCloture.Recrutements.Externes = recrutementsExternesResult[0][0].RecrutementsExternes;
      data[csp].PrevisionsCloture.Recrutements.Internes = recrutementsExternesResult[0][0].RecrutementsInternes;
      data[csp].PrevisionsCloture.Recrutements.Total = recrutementsExternesResult[0][0].TotalRecrutements;


      // Requête pour le nombre de départs definitifs, internes et le total
      const departsQuery = `
        SELECT p.csp,
        COALESCE(SUM(CASE WHEN ec.codeDep = 'retraite' OR ec.codeDep = 'demission' THEN 1 ELSE 0 END), 0) AS DepartsDefinitifs,
        COALESCE(SUM(CASE WHEN ec.codeDep = 'mutation' THEN 1 ELSE 0 END), 0) AS DepartsInternes,
        COALESCE(SUM(CASE WHEN ec.codeDep = 'retraite' OR ec.codeDep = 'demission' THEN 1 ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN ec.codeDep = 'mutation' THEN 1 ELSE 0 END), 0) AS TotalDeparts
        FROM etreConcerne ec
        LEFT JOIN Employe e ON ec.matricule = e.matricule
        LEFT JOIN Occupe oc ON e.matricule = oc.matricule
        LEFT JOIN Poste p ON oc.idPoste = p.idPoste
        WHERE p.csp = ? AND ec.annee = ?;
      `;

      const departsResult = await connection.query(departsQuery, [csp, anneeDebPmt - 1]);
      data[csp].PrevisionsCloture.Departs.Definitifs = departsResult[0][0].DepartsDefinitifs;
      data[csp].PrevisionsCloture.Departs.Internes = departsResult[0][0].DepartsInternes;
      data[csp].PrevisionsCloture.Departs.Total = departsResult[0][0].TotalDeparts;

      // Efectifs 
      data[csp].PrevisionsCloture.Effectifs = parseInt(data[csp].RappelEffectifs) + parseInt(data[csp].PrevisionsCloture.Recrutements.Total)- parseInt(data[csp].PrevisionsCloture.Departs.Total);


    // previsions
      // Requête pour le nombre de recrutements externes, internes et le total
      const recrutementQuery = `
        SELECT p.csp,
        COALESCE(SUM(CASE WHEN pr.modeP = 'INT' THEN ed.nbEmploye ELSE 0 END), 0) AS RecrutementsInternes,
        COALESCE(SUM(CASE WHEN pr.modeP = 'EXT' THEN ed.nbEmploye ELSE 0 END), 0) AS RecrutementsExternes,
        COALESCE(SUM(CASE WHEN pr.modeP = 'INT' THEN ed.nbEmploye ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN pr.modeP = 'EXT' THEN ed.nbEmploye ELSE 0 END), 0) AS TotalRecrutements
        FROM etreDemande ed 
        LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
        LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
        LEFT JOIN Poste p ON ed.idPoste = p.idPoste
        WHERE p.csp = ? AND ed.annee = ? AND pmt.anneeDeb = ?;
        `;

      const recrutementExterneResult = await connection.query(recrutementQuery, [csp, anneeDebPmt,anneeDebPmt]);
      data[csp].Previsions.Recrutements.Externes = recrutementExterneResult[0][0].RecrutementsExternes;
      data[csp].Previsions.Recrutements.Internes = recrutementExterneResult[0][0].RecrutementsInternes;
      data[csp].Previsions.Recrutements.Total = recrutementExterneResult[0][0].TotalRecrutements;


      // Requête pour le nombre de départs definitifs, internes et le total
      const departQuery = `
        SELECT p.csp,
        COALESCE(SUM(CASE WHEN ec.codeDep = 'retraite' OR ec.codeDep = 'demission' THEN 1 ELSE 0 END), 0) AS DepartsDefinitifs,
        COALESCE(SUM(CASE WHEN ec.codeDep = 'mutation' THEN 1 ELSE 0 END), 0) AS DepartsInternes,
        COALESCE(SUM(CASE WHEN ec.codeDep = 'retraite' OR ec.codeDep = 'demission' THEN 1 ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN ec.codeDep = 'mutation' THEN 1 ELSE 0 END), 0) AS TotalDeparts
        FROM etreConcerne ec
        LEFT JOIN Employe e ON ec.matricule = e.matricule
        LEFT JOIN Occupe oc ON e.matricule = oc.matricule
        LEFT JOIN Poste p ON oc.idPoste = p.idPoste
        WHERE p.csp = ? AND ec.annee = ?;
      `;

      const departResult = await connection.query(departQuery, [csp, anneeDebPmt]);
      data[csp].Previsions.Departs.Definitifs = departResult[0][0].DepartsDefinitifs;
      data[csp].Previsions.Departs.Internes = departResult[0][0].DepartsInternes;
      data[csp].Previsions.Departs.Total = departResult[0][0].TotalDeparts;

      // Efectifs 
      data[csp].Previsions.Effectifs = parseInt(data[csp].PrevisionsCloture.Effectifs) + parseInt(data[csp].Previsions.Recrutements.Total)- parseInt(data[csp].Previsions.Departs.Total);

    }

    // const organizedData = cspVal.map(csp => ({
    //   csp: csp,
    //   RappelEffectifs: data[csp].RappelEffectifs,
    //   PrevisionsCloture: {
    //     Departs: {
    //       Definitifs: data[csp].PrevisionsCloture.Departs.Definitifs,
    //       Internes: data[csp].PrevisionsCloture.Departs.Internes,
    //       Total: data[csp].PrevisionsCloture.Departs.Total,
    //     },
    //     Recrutements: {
    //       Internes: data[csp].PrevisionsCloture.Recrutements.Internes,
    //       Externes: data[csp].PrevisionsCloture.Recrutements.Externes,
    //       Total: data[csp].PrevisionsCloture.Recrutements.Total,
    //     },
    //     Effectifs: data[csp].PrevisionsCloture.Effectifs,
    //   },
    //   Previsions: {
    //     Departs: {
    //       Definitifs: data[csp].Previsions.Departs.Definitifs,
    //       Internes: data[csp].Previsions.Departs.Internes,
    //       Total: data[csp].Previsions.Departs.Total,
    //     },
    //     Recrutements: {
    //       Internes: data[csp].Previsions.Recrutements.Internes,
    //       Externes: data[csp].Previsions.Recrutements.Externes,
    //       Total: data[csp].Previsions.Recrutements.Total,
    //     },
    //     Effectifs: data[csp].Previsions.Effectifs,
    //   },
    // }));
    


    await connection.commit();
    return data;

  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
}

/****************** Affichage de mouvements des effectifs par activité *******************/
async function AfficherMvmActivite(anneeDebPmt){

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    const PMTquery = `
    SELECT idPmt , anneeFin
    FROM PMTexistants
    WHERE anneeDeb = ?;
    `;

    const [PMTresults] = await connection.query(PMTquery, [anneeDebPmt]);
    if (PMTresults.length === 0) {
      throw new Error("Erreur : PMT inexistant");
    }

    const ActVal = ['Recherche Hydrocarbures', 'Exploitation Gisements', 'Transport Hydrocarbures','Transformation Hydrocarbures','Commercialisation Hydrocarbures','Etudes Développement','Suivi Réalisation','Maintenance Industrielle','Sécurité Industrielle','Gestion des Stocks','Organisation / Planification','Finances / Comptabilité','Juridique','Ressources Humaines','Informatique','Réalisation','Agriculture','Filiere Secretariat','Moyens Généraux','Oeuvres S.','Relations Extérieures']; // Les valeurs possibles d'activité

    const query = `
        SELECT
            a.code, a.titre, a.fonction,
            SUM(CASE WHEN YEAR(e.dateRecrut) <= ? THEN 1 ELSE 0 END) AS RappelEffectifs
        FROM
            Employe e
        LEFT JOIN
            Occupe o ON e.matricule = o.matricule 
        LEFT JOIN
            Poste p ON o.idPoste = p.idPoste
        LEFT JOIN 
            Activite a ON p.codeAct = a.code 
        LEFT JOIN 
            etreConcerne ec ON e.matricule = ec.matricule
        WHERE
            (e.etat = 'enActivite' OR (e.etat != 'enActivite' AND ec.annee > ? And ec.verifie = 1))
        GROUP BY
            a.titre, a.fonction, a.code;
    `;

const result = await connection.query(query, [parseInt(anneeDebPmt) - 2, parseInt(anneeDebPmt) - 2]);
console.log(result[0]);

    const data = {};

    for (const Act of ActVal) {
      data[Act] = {
        code : '' ,
        fonction : '',
        RappelEffectifs: 0,
        PrevisionsCloture : {
          Departs: {
            Definitifs: 0,
            Internes: 0,
            Total : 0,
          },
          Recrutements: {
            Externes: 0,
            Internes: 0,
            Total : 0,
          },
          Effectifs : 0,
        },
        Previsions : {
          Departs: {
            Definitifs: 0,
            Internes: 0,
            Total : 0,
          },
          Recrutements: {
            Externes: 0,
            Internes: 0,
            Total : 0,
          },
          Effectifs : 0,
        },
      };
    }


    for (const row of result[0]) {
      if (data[row.titre]) {
        data[row.titre].RappelEffectifs = row.RappelEffectifs;
      }
    }
  
    for (const Act of ActVal) {

      const codeFonction = await connection.query('SELECT code, fonction FROM activite WHERE titre = ?;',[Act]);
      if (codeFonction[0].length> 0){
        console.log(codeFonction[0])
      const codeActivite = codeFonction[0][0].code;
      const fonc = codeFonction[0][0].fonction;
      data[Act].code = codeActivite;
      data[Act].fonction=fonc;
      }
    // previsions de cloture
      // Requête pour le nombre de recrutements externes, internes et le total
      const recrutementsQuery = `
      SELECT
      a.code,
      a.titre,
      a.fonction,
      COALESCE(SUM(CASE WHEN pr.modeP = 'INT' THEN ed.nbEmploye ELSE 0 END), 0) AS RecrutementsInternes,
      COALESCE(SUM(CASE WHEN pr.modeP = 'EXT' THEN ed.nbEmploye ELSE 0 END), 0) AS RecrutementsExternes,
      COALESCE(SUM(CASE WHEN pr.modeP = 'INT' THEN ed.nbEmploye ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN pr.modeP = 'EXT' THEN ed.nbEmploye ELSE 0 END), 0) AS TotalRecrutements
      FROM
          etreDemande ed
      LEFT JOIN
          PMTexistants pmt ON ed.idPmt = pmt.idPmt
      LEFT JOIN
          PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
      LEFT JOIN
          Poste p ON ed.idPoste = p.idPoste
      LEFT JOIN
          Activite a ON p.codeAct = a.code
      WHERE
          a.titre = ? AND ed.annee = ? AND pmt.anneeDeb = ?;  
      `

      const recrutementsExternesResult = await connection.query(recrutementsQuery, [Act, parseInt(anneeDebPmt)-1,parseInt(anneeDebPmt)-1]);
      // console.log("recrutementsExternesResult : ",recrutementsExternesResult);
      data[Act].PrevisionsCloture.Recrutements.Externes = recrutementsExternesResult[0][0].RecrutementsExternes;
      data[Act].PrevisionsCloture.Recrutements.Internes = recrutementsExternesResult[0][0].RecrutementsInternes;
      data[Act].PrevisionsCloture.Recrutements.Total = recrutementsExternesResult[0][0].TotalRecrutements;


      // Requête pour le nombre de départs definitifs, internes et le total
      const departsQuery = `
      SELECT a.code, a.titre, a.fonction,
      COALESCE(SUM(CASE WHEN ec.codeDep = 'retraite' OR ec.codeDep = 'demission' THEN 1 ELSE 0 END), 0) AS DepartsDefinitifs,
      COALESCE(SUM(CASE WHEN ec.codeDep = 'mutation' THEN 1 ELSE 0 END), 0) AS DepartsInternes,
      COALESCE(SUM(CASE WHEN ec.codeDep = 'retraite' OR ec.codeDep = 'demission' THEN 1 ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN ec.codeDep = 'mutation' THEN 1 ELSE 0 END), 0) AS TotalDeparts
      FROM etreConcerne ec
      LEFT JOIN Employe e ON ec.matricule = e.matricule
      LEFT JOIN Occupe oc ON e.matricule = oc.matricule
      LEFT JOIN Poste p ON oc.idPoste = p.idPoste
      LEFT JOIN Activite a on p.codeAct = a.code
      WHERE a.titre = ? AND ec.annee = ?;
    `;

      const departsResult = await connection.query(departsQuery, [Act, parseInt(anneeDebPmt) - 1]);
      data[Act].PrevisionsCloture.Departs.Definitifs = departsResult[0][0].DepartsDefinitifs;
      data[Act].PrevisionsCloture.Departs.Internes = departsResult[0][0].DepartsInternes;
      data[Act].PrevisionsCloture.Departs.Total = departsResult[0][0].TotalDeparts;

      // Efectifs 
      data[Act].PrevisionsCloture.Effectifs = parseInt(data[Act].RappelEffectifs) + parseInt(data[Act].PrevisionsCloture.Recrutements.Total)- parseInt(data[Act].PrevisionsCloture.Departs.Total);


    // previsions
      // Requête pour le nombre de recrutements externes, internes et le total
      const recrutementQuery = `
      SELECT a.code, a.titre, a.fonction,
        COALESCE(SUM(CASE WHEN pr.modeP = 'INT' THEN ed.nbEmploye ELSE 0 END), 0) AS RecrutementsInternes,
        COALESCE(SUM(CASE WHEN pr.modeP = 'EXT' THEN ed.nbEmploye ELSE 0 END), 0) AS RecrutementsExternes,
        COALESCE(SUM(CASE WHEN pr.modeP = 'INT' THEN ed.nbEmploye ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN pr.modeP = 'EXT' THEN ed.nbEmploye ELSE 0 END), 0) AS TotalRecrutements
        FROM etreDemande ed 
        LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
        LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
        LEFT JOIN Poste p ON ed.idPoste = p.idPoste
        LEFT JOIN Activite a on p.codeAct = a.code
        WHERE a.titre= ? AND ed.annee = ? AND pmt.anneeDeb = ?;
        `;

      const recrutementExterneResult = await connection.query(recrutementQuery, [Act, anneeDebPmt,anneeDebPmt]);
      data[Act].Previsions.Recrutements.Externes = recrutementExterneResult[0][0].RecrutementsExternes;
      data[Act].Previsions.Recrutements.Internes = recrutementExterneResult[0][0].RecrutementsInternes;
      data[Act].Previsions.Recrutements.Total = recrutementExterneResult[0][0].TotalRecrutements;


      // Requête pour le nombre de départs definitifs, internes et le total
      const departQuery = `
        SELECT a.code, a.titre, a.fonction, 
        COALESCE(SUM(CASE WHEN ec.codeDep = 'retraite' OR ec.codeDep = 'demission' THEN 1 ELSE 0 END), 0) AS DepartsDefinitifs,
        COALESCE(SUM(CASE WHEN ec.codeDep = 'mutation' THEN 1 ELSE 0 END), 0) AS DepartsInternes,
        COALESCE(SUM(CASE WHEN ec.codeDep = 'retraite' OR ec.codeDep = 'demission' THEN 1 ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN ec.codeDep = 'mutation' THEN 1 ELSE 0 END), 0) AS TotalDeparts
        FROM etreConcerne ec
        LEFT JOIN Employe e ON ec.matricule = e.matricule
        LEFT JOIN Occupe oc ON e.matricule = oc.matricule
        LEFT JOIN Poste p ON oc.idPoste = p.idPoste
        LEFT JOIN Activite a on p.codeAct = a.code
        WHERE a.titre = ? AND ec.annee = ?;
      `;

      const departResult = await connection.query(departQuery, [Act, anneeDebPmt]);
      data[Act].Previsions.Departs.Definitifs = departResult[0][0].DepartsDefinitifs;
      data[Act].Previsions.Departs.Internes = departResult[0][0].DepartsInternes;
      data[Act].Previsions.Departs.Total = departResult[0][0].TotalDeparts;

      // Efectifs 
      data[Act].Previsions.Effectifs = parseInt(data[Act].PrevisionsCloture.Effectifs) + parseInt(data[Act].Previsions.Recrutements.Total)- parseInt(data[Act].Previsions.Departs.Total);

    }
    
    await connection.commit();
    return data;

  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
}


/****************** Evolution des effectifs par csp *******************/
async function EvolEffectifsCSP(anneeDebPmt){

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    const PMTquery = `
    SELECT idPmt , anneeFin
    FROM PMTexistants
    WHERE anneeDeb = ?;
    `;

    const [PMTresults] = await connection.query(PMTquery, [anneeDebPmt]);
    if (PMTresults.length === 0) {
      throw new Error("Erreur : PMT inexistant");
    }
    const cspVal = ['ING+', 'CU', 'AC', 'CS', 'TS', 'TECHNICIEN', 'TECHNIQUE', 'AUTRE', 'ADM', 'AIDE']; // Les valeurs possibles de csp
    //Effectifs
    const query = `
    SELECT
        p.csp,
        SUM(CASE WHEN YEAR(e.dateRecrut) <= ? THEN 1 ELSE 0 END) AS RealisationAn
    FROM
        Employe e
    LEFT JOIN
        Occupe o ON e.matricule = o.matricule
    LEFT JOIN
        Poste p ON o.idPoste = p.idPoste
    LEFT JOIN 
        etreConcerne ec ON e.matricule = ec.matricule
    WHERE 
        (e.etat = 'enActivite' OR (e.etat != 'enActivite' AND ec.annee > ? AND ec.verifie = 1))
    GROUP BY
        p.csp;
  `;
  
    //Realisation Effectifs de anneeDebPmt - 2
    const result1 = await connection.query(query, [parseInt(anneeDebPmt) - 2,parseInt(anneeDebPmt) - 2]);
    //Realisation Effectifs de anneeDebPmt - 1
    const result2 = await connection.query(query, [parseInt(anneeDebPmt) - 1,parseInt(anneeDebPmt) - 1]);
    const data = {};
    
  // Calculer la durée du pmt choisi
  const duree = PMTresults[0].anneeFin - anneeDebPmt;

    for (const csp of cspVal) {
      data[csp] = {

        Effectifs : {
          RealisationAn2: 0,
          RealisationAn1: 0,
          PrevCL: 0,
        },
        EvolutionEffectifs : {
          PrevisionAn: 0,
          PrevisionAn1: 0,
          PrevisionAn2: 0,
          PrevisionAn3: 0,
          PrevisionAn4: 0,
          PrevisionAn5: 0,
        },
      };
    }


    for (const row of result1[0]) {
      if (data[row.csp]) {
        data[row.csp].Effectifs.RealisationAn2 = row.RealisationAn;
      }
    }
    for (const row of result2[0]) {
      if (data[row.csp]) {
        data[row.csp].Effectifs.RealisationAn1 = row.RealisationAn;
      }
    }

    for (const csp of cspVal) {
    // previsions de cloture AnneeDebPmt-1 (recrutement)
      const recrutementsQuery = `
        SELECT p.csp,
        COALESCE(SUM(ed.nbEmploye), 0) AS PrevCL
        FROM etreDemande ed 
        LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
        LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
        LEFT JOIN Poste p ON ed.idPoste = p.idPoste
        WHERE p.csp = ? AND ed.annee = ? AND pmt.anneeDeb = ?;
        `;

      const recrutementsResult = await connection.query(recrutementsQuery, [csp, parseInt(anneeDebPmt)-1,parseInt(anneeDebPmt)-1]);
      data[csp].Effectifs.PrevCL = recrutementsResult[0][0].PrevCL;

      //Evolution Des Effectifs
      //Requête pour le nombre total des previsions de recretements (nbEmploye total)

      const EvolutionQuery = `
        SELECT p.csp,
        COALESCE(SUM(ed.nbEmploye), 0) AS EvolutionEffectifs
        FROM etreDemande ed 
        LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
        LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
        LEFT JOIN Poste p ON ed.idPoste = p.idPoste
        WHERE p.csp = ? AND ed.annee = ? AND pmt.anneeDeb = ?;
        `;
      // Evolution es effectifs pourAnneeDebPmt
      const EvolutionResult1 = await connection.query(EvolutionQuery, [csp, anneeDebPmt,anneeDebPmt]);
      data[csp].EvolutionEffectifs.PrevisionAn = EvolutionResult1[0][0].EvolutionEffectifs;
      // Evolution des effectifs pour les autres années du PMT choisi (qui a comme anneeDeb : AnneeDebPmt)

      for (let i = 1; i <= duree; i++) {
        const Ann = parseInt(anneeDebPmt) + i;
        console.log("annee : ",Ann);
        const EvolutionResult = await connection.query(EvolutionQuery, [csp, Ann, anneeDebPmt]);
        data[csp].EvolutionEffectifs[`PrevisionAn${i}`] = EvolutionResult[0][0].EvolutionEffectifs;
      }

    // Supprimer les prévisions non nécessaires si la durée est inférieure à 5
    if (duree < 5) {
      for (let i = duree +1 ; i <= 5; i++) {
        delete data[csp].EvolutionEffectifs[`PrevisionAn${i}`];
      }
    }


    }

    await connection.commit();
    return data;

  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
}



/************** Recherche des employes avec plusieurs mots cles *****************/
async function rechercherEmployees(motsCles) {

  const connection = await pool.getConnection();
  try {
    console.log("motsCles1:", motsCles);
    if (motsCles.length === 0){
      throw new Error('Erreur: Mot cle vide');
    }
    // Divisez la chaîne de mots-clés en un tableau
    const motsClesArray = motsCles.split(" ");
    console.log("motsCles2:", motsClesArray)

    // Créer une liste de conditions de recherche pour chaque champ
    const conditions = motsClesArray.map(mot => `
      e.matricule LIKE '%${mot}%'
      OR e.nom LIKE '%${mot}%'
      OR e.prenom LIKE '%${mot}%'
      OR p.intituleP LIKE '%${mot}%'
      OR p.csp LIKE '%${mot}%'
      OR s.designationS LIKE '%${mot}%'
      OR d.designationD LIKE '%${mot}%'
    `).join(" OR ");
    
    const query = `
    SELECT e.*, p.*, s.*, d.*
    FROM Employe e
    LEFT JOIN occupe o ON e.matricule = o.matricule
    LEFT JOIN Poste p ON o.idPoste = p.idPoste
    LEFT JOIN Structure s ON o.idStructure = s.idStructure
    JOIN Diplome d ON e.codeDipl = d.idDipl
    WHERE e.etat = "enActivite"
      AND (${conditions});
    `;

    const [results] = await connection.query(query);

    if (results.length === 0) {
      throw new Error("Aucun employé trouvé");
    }
    const totalEmployees = results.length;

    // Transform the results as needed
    const employees = results.reduce((acc, row) => {
      const { matricule, nom, prenom, dateNaiss, dateRecrut, sexe, lieuTravail,idPoste, intituleP, echelle, codeSTR,csp, idStructure, designationS, idDipl, designationD, valeurD } = row;

      // Format Date objects to extract the first 10 characters
      const formattedDateNaiss = new Date(dateNaiss).toISOString().substring(0, 10);
      const formattedDateRecrut = new Date(dateRecrut).toISOString().substring(0, 10);

            // Check if the employee exists in the accumulator
            const existingEmployee = acc.find(emp => emp.matricule === matricule);
            if (existingEmployee) {
              existingEmployee.postes.push({ idPoste, intituleP, echelle, codeSTR ,csp });
              existingEmployee.structures.push({ idStructure, designationS });
              existingEmployee.diplomes.push({ idDipl, designationD, valeurD });
            } else {
              acc.push({
                matricule,
                nom,
                prenom,
                dateNaiss: formattedDateNaiss,
                dateRecrut: formattedDateRecrut,
                sexe,
                lieuTravail,
                postes: [{ idPoste, intituleP, echelle, codeSTR ,csp}],
                structures: [{ idStructure, designationS }],
                diplomes: [{idDipl, designationD, valeurD}]
              });
      
            }
            return acc;
          }, []);

    return {totalEmployees , employees};
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}

/************** Recherche des employes archivés avec plusieurs mots cles *****************/
async function rechercherArchiveEmployees(motsCles) {

  const connection = await pool.getConnection();
  try {
    console.log("motsCles:", motsCles);
    if (motsCles.length === 0){
      throw new Error('Erreur: Mot cle vide');
    }
    // Divisez la chaîne de mots-clés en un tableau
    const motsClesArray = motsCles.split(" ");
    console.log(motsClesArray)

    // Créer une liste de conditions de recherche pour chaque champ
    const conditions = motsClesArray.map(mot => `
      e.matricule LIKE '%${mot}%'
      OR e.nom LIKE '%${mot}%'
      OR e.prenom LIKE '%${mot}%'
      OR e.etat LIKE '%${mot}%'
      OR p.intituleP LIKE '%${mot}%'
      OR p.csp LIKE '%${mot}%'
      OR s.designationS LIKE '%${mot}%'
      OR d.designationD LIKE '%${mot}%'
    `).join(" OR ");
    
    const query = `
    SELECT e.*, p.*, s.*, d.*
    FROM Employe e
    LEFT JOIN occupe o ON e.matricule = o.matricule
    LEFT JOIN Poste p ON o.idPoste = p.idPoste
    LEFT JOIN Structure s ON o.idStructure = s.idStructure
    JOIN Diplome d ON e.codeDipl = d.idDipl
    WHERE e.etat != "enActivite" 
      AND (${conditions});
    `;

    const [results] = await connection.query(query);

    if (results.length === 0) {
      throw new Error("Aucun employé trouvé");
    }
    const totalEmployees = results.length;

    // Transform the results as needed
    const employees = results.reduce((acc, row) => {
      const { matricule, nom, prenom, dateNaiss, dateRecrut, sexe, lieuTravail,etat,idPoste, intituleP, echelle, codeSTR,csp, idStructure, designationS, idDipl, designationD, valeurD } = row;

      // Format Date objects to extract the first 10 characters
      const formattedDateNaiss = new Date(dateNaiss).toISOString().substring(0, 10);
      const formattedDateRecrut = new Date(dateRecrut).toISOString().substring(0, 10);

            // Check if the employee exists in the accumulator
            const existingEmployee = acc.find(emp => emp.matricule === matricule);
            if (existingEmployee) {
              existingEmployee.postes.push({ idPoste, intituleP, echelle, codeSTR ,csp });
              existingEmployee.structures.push({ idStructure, designationS });
              existingEmployee.diplomes.push({ idDipl, designationD, valeurD });
            } else {
              acc.push({
                matricule,
                nom,
                prenom,
                dateNaiss: formattedDateNaiss,
                dateRecrut: formattedDateRecrut,
                sexe,
                lieuTravail,
                etat,
                postes: [{ idPoste, intituleP, echelle, codeSTR ,csp}],
                structures: [{ idStructure, designationS }],
                diplomes: [{idDipl, designationD, valeurD}]
              });
      
            }
            return acc;
          }, []);

    return {totalEmployees , employees};
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}

/****************** Recherche des Previsions de départ ******************/
async function RecherchePrevDep(anneePMT,motsCles) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Check if the given year exists in PMTexistants
    const [checkPmt] = await connection.query(`SELECT anneeFin FROM PMTexistants WHERE anneeDeb = ?`, [anneePMT]);
    if (checkPmt.length === 0) {
      throw new Error("Erreur : PMT inexistant");
    } else {
      const anneeFin = checkPmt[0].anneeFin;
      if (motsCles.length === 0){
        throw new Error('Erreur: Mot cle vide');
      }
      // Divisez la chaîne de mots-clés en un tableau
      const motsClesArray = motsCles.split(" ");
      console.log(motsClesArray)

      // Créer une liste de conditions de recherche pour chaque champ
      const conditions = motsClesArray.map(mot => `
        emp.matricule LIKE '%${mot}%'
        OR emp.nom LIKE '%${mot}%'
        OR emp.prenom LIKE '%${mot}%'
        OR emp.lieuTravail LIKE '%${mot}%'
        OR e.codeDep LIKE '%${mot}%'
        OR post.intituleP LIKE '%${mot}%'
        OR post.csp LIKE '%${mot}%'
        OR act.fonction LIKE '%${mot}%'
        OR e.annee LIKE '%${mot}%'
        OR e.observation LIKE '%${mot}%'
      `).join(" OR ");

      const [previsions] = await connection.query(`SELECT e.matricule, emp.nom, emp.prenom, act.code as codeAct,post.intituleP , post.csp, act.fonction, emp.lieuTravail, e.codeDep, e.annee, e.observation ,e.verifie
      FROM etreConcerne e
      JOIN Employe emp ON e.matricule = emp.matricule
      LEFT JOIN Occupe oc ON emp.matricule = oc.matricule
      LEFT JOIN Poste post ON oc.idPoste = post.idPoste
      LEFT JOIN Activite act ON post.codeAct = act.code
      WHERE e.annee >= ? AND e.annee <= ?
      AND (e.codeDep != 'retraite' OR (e.codeDep = 'retraite' AND e.annee = (SELECT MIN(ec.annee) FROM etreConcerne ec WHERE ec.matricule = e.matricule AND ec.codeDep = 'retraite')))
      AND (${conditions});
      `,[anneePMT, anneeFin]);

      if (previsions.length === 0) {
        throw new Error("Aucune prevision trouvé");
      }

      await connection.commit();
      return previsions;
    }
  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
}

/****************** Recherche des Previsions de recrutement ******************/
async function RecherchePrevRecrut(anneeDebPmt,motsCles) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    if (motsCles.length === 0){
      throw new Error('Erreur: Mot cle vide');
    }
      // Divisez la chaîne de mots-clés en un tableau
      const motsClesArray = motsCles.split(" ");
      console.log(motsClesArray)

      // Créer une liste de conditions de recherche pour chaque champ
      const conditions = motsClesArray.map(mot => `
        a.code LIKE '%${mot}%'
        OR a.fonction LIKE '%${mot}%'
        OR p.intituleP LIKE '%${mot}%'
        OR p.csp LIKE '%${mot}%'
        OR pr.LieuTravail LIKE '%${mot}%'
        OR pr.NiveauRequis LIKE '%${mot}%'
        OR pr.Diplome LIKE '%${mot}%'
        OR pr.Specialite LIKE '%${mot}%'
        OR pr.Experience LIKE '%${mot}%'
        OR pr.SpecifitesPoste LIKE '%${mot}%'
        OR pr.motif LIKE '%${mot}%'
        OR pr.modeP LIKE '%${mot}%'
        OR ed.observation LIKE '%${mot}%'
        OR ed.annee LIKE '%${mot}%'
      `).join(" OR ");


      const [previsions] = await connection.query(`
      SELECT ed.*, pmt.*, pr.*, p.*, a.*
      FROM etreDemande ed
      LEFT JOIN PMTexistants pmt ON ed.idPmt = pmt.idPmt
      LEFT JOIN PrevisionRecrut pr ON ed.idRecrut = pr.idRecrut
      LEFT JOIN Poste p ON ed.idPoste = p.idPoste
      LEFT JOIN Activite a ON p.codeAct = a.code
      WHERE pmt.anneeDeb = ?
      AND (${conditions});
      `,[anneeDebPmt]);

      if (previsions.length === 0) {
        throw new Error("Aucune prevision trouvé");
      }

      const prevRecrutList = previsions.map(row => {
        const {
          annee,
          idPmt,
          idRecrut,
          motif,
          modeP,
          NiveauRequis,
          Diplome,
          Specialite,
          Experience,
          SpecifitesPoste,
          LieuTravail,
          nbEmploye,
          observation,
          idPoste,
          intituleP,
          echelle,
          codeSTR,
          csp,
          codeAct,
          fonction
        } = row;
  
        return {
          annee,
          idPmt,
          idRecrut,
          motif,
          modeP,
          NiveauRequis,
          Diplome,
          Specialite,
          Experience,
          SpecifitesPoste,
          LieuTravail,
          nbEmploye,
          observation,
          poste: {
            idPoste,
            intituleP,
            echelle,
            codeSTR,
            csp
          },
          activite: {
            codeAct,
            fonction,
          }
        };
      });
  
      await connection.commit();
      return prevRecrutList;
    
  } catch (e) {
    await connection.rollback();
    throw e;
  } finally {
    connection.release();
  }
}





 
 
 
 
  module.exports = {
  retournerUtilisateurs,  //done
  retournerUtilisateur,   //done
  calculerEmployeParAct,  //done
  calculerEmployeParCSP, //done
  supprimerUtilisateur, //done
  ajouterUtilisateur,  //done
  AjouterPrevRecrut,    //done
  showtables,        //done
  retournerEmployees,  //done
  login,                //done
  ajouterPersonnel,     //done
  modifierPersonnel,   
  retournerArchiveEmployees,  //done
  AjouterDepart,       //done
  AjouterPmt,         //done
  AfficherPMTExistants, //done
  validerRetraite,    //done
  AfficherPrevDep,  //done
  AfficherPrevRecrut,  //done
  DeletePrevRecrut,  //done
  modifierProfilAdmin,    //done
  modifierUtilisateur,   //done
  modifierPassword,
  AfficherMvmCSP,  //done
  AfficherMvmActivite, //done
  EvolEffectifsCSP,
  rechercherEmployees,
  rechercherArchiveEmployees,
  RecherchePrevDep,
  RecherchePrevRecrut,
  };
  
 
INSERT INTO `pmt`.`diplome` (`idDipl`, `designationD`, `valeurD`) VALUES ('1', 'ING D\'ETAT EN INFORMATIQUE OPT: SI (INST, UNIV) ', '185');
INSERT INTO `pmt`.`diplome` (`idDipl`, `designationD`, `valeurD`) VALUES ('2', 'TECHN SUP EN INFORMATIQUE', '65');
INSERT INTO `pmt`.`diplome` (`idDipl`, `designationD`, `valeurD`) VALUES ('3', 'CAP SECRETAIRE', '90');
INSERT INTO `pmt`.`diplome` (`idDipl`, `designationD`, `valeurD`) VALUES ('4', 'ING D\'ETAT EN ELECTRONIQUE OPT: INSTRUMENTATION(UNIV, INST)', '185');

insert Employe set matricule = "83511F", nom = "ABADOU", prenom= "FARAH", dateNaiss = "1995-03-05", dateRecrut= "2020-09-10", lieuTravail = "ALGER" , sexe = 'F', etat = 'enActivite' ,codeDipl = 1;
insert Employe set matricule = "73451L", nom = "HANAFI", prenom= "WALID", dateNaiss = "1973-12-07", dateRecrut= "2004-02-01", lieuTravail = "TIPAZA", sexe = 'M', etat = 'demissionne' ,codeDipl = 2;
insert Employe set matricule = "67145Q", nom = "BOUZOUAWA", prenom= "SAMIRA", dateNaiss = "1968-07-29", dateRecrut= "1990-08-10", lieuTravail = "ORAN", sexe = 'F', etat = 'enActivite' , codeDipl = 4;
insert Employe set matricule = "22511S", nom = "LARABI", prenom= "DJAMEL", dateNaiss = "1965-11-18", dateRecrut= "1995-04-24", lieuTravail = "BLIDA", sexe = 'M', etat = 'retraite' ,codeDipl = 3;
insert Employe set matricule = "13578Z", nom = "YAMANI", prenom= "DALAL", dateNaiss = "1984-05-03", dateRecrut= "2013-01-14", lieuTravail = "BEDJAIA", sexe = 'F', etat = 'enActivite' ,codeDipl = 2;
insert Employe set matricule = "93341M", nom = "WALI", prenom= "OTHMANE", dateNaiss = "1963-03-05", dateRecrut= "1996-10-28", lieuTravail = "BOUIRA", sexe = 'M', etat = 'enActivite' ,codeDipl = 1;

INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('1', 'Recherche Hydrocarbures', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('2', 'Exploitation Gisements', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('3', 'Transport Hydrocarbures', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('4', 'Transformation Hydrocarbures', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('5', 'Commercialisation Hydrocarbures', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('6', 'Etudes Développement', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('7', 'Suivi Réalisation', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('8', 'Maintenance Industrielle', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('9', 'Sécurité Industrielle', 'FCM');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('11', 'Gestion des Stocks', 'FST');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('13', 'Organisation / Planification', 'FST');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('14', 'Finances / Comptabilité', 'FST');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('15', 'Juridique', 'FST');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('16', 'Ressources Humaines', 'FST');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('10', 'Réalisation', 'FSP');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('17', 'Filiere Secretariat', 'FSP');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('12', 'Agriculture', 'FSP');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('18', 'Moyens Généraux', 'FSP');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('19', 'Oeuvres S.', 'FSP');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('20', 'Relations Extérieures', 'FSP');
INSERT INTO `pmt`.`activite` (`code`, `titre`, `fonction`) VALUES ('21', 'Informatique', 'FST');


INSERT INTO `pmt`.`poste` (`idPoste`, `intituleP`, `echelle`,`codeSTR`,`csp` ,`codeAct`) VALUES ('1', 'ING ETUD DEV INFORMATIQ PPL N2', '26', '214578','ING+','21');
INSERT INTO `pmt`.`poste` (`idPoste`, `intituleP`, `echelle`,`codeSTR`, `csp`,`codeAct`) VALUES ('2', 'TECHN TELECOM', '16','219685','CU', '21');
INSERT INTO `pmt`.`poste` (`idPoste`, `intituleP`, `echelle`,`codeSTR`, `csp`,`codeAct`) VALUES ('3', 'GESTIONNAIRE ADM PPL','18', '174593','AUTRE','17');

INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('1','DC DSI -  ');
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('2','DC DSI - DEPARTEMENT SUPPORT');
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('3',"DC DSI - ASSISTANT");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('4','DISIT - DEPARTEMENT RESEAUX & TELECOMMUNICATIONS');
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('5','DISIT - DEPARTEMENT HEBERGEMENT & DATA CENTER');
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('6','DISIT - DEPARTEMENT SYSTEMES & SERVICES IT');
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('7','DISIT - DEPARTEMENT HELP DESK');
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('8',"DISIT - DEPARTEMENT CENTRE D'INNOVATION");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('9',"DISI - DEPARTEMENT DEVELOPPEMENT & MAINTENANCE APPLICATIVE");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('10',"DISI - DEPARTEMENT INTEGRATION SI GESTION");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('11',"DISI - DEPARTEMENT INTEGRATION SI METIERS");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('12',"DISI - DEPARTEMENT GESTION & INTEGRITE DATA");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('13',"DISI - DEPARTEMENT ADMINISTRATION BDD & APPLICATION");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('14',"DPAQ - DEPARTEMENT QUALITE & METHODES");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('15',"DPAQ - DEPARTEMENT PLANIFICATION, SUIVI DES REALISATIONS & REPORTING");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('16',"DPAQ - DEPARTEMENT ASI");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('17',"DSSI - DEPARTEMENT MANAGEMENT SECURITE SI");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('18',"DSSI - DEPARTEMENT SECURITE OPERATIONNELLE SI");
INSERT INTO `pmt`.`STRUCTURE` (`idStructure`, `designationS`) VALUES ('19',"DSSI - DEPARTEMENT SECURITE SYSTEMES INFORMATIQUES INDUSTRIELS");


INSERT INTO `pmt`.`occupe` (`idPoste`, `idStructure`, `matricule`) VALUES ('1', '2', '83511F');
INSERT INTO `pmt`.`occupe` (`idPoste`, `idStructure`, `matricule`) VALUES ('3', '3', '67145Q');
INSERT INTO `pmt`.`occupe` (`idPoste`, `idStructure`, `matricule`) VALUES ('1', '1', '73451L');
INSERT INTO `pmt`.`occupe` (`idPoste`, `idStructure`, `matricule`) VALUES ('2', '4', '22511S');
INSERT INTO `pmt`.`occupe` (`idPoste`, `idStructure`, `matricule`) VALUES ('2', '4', '13578Z');
INSERT INTO `pmt`.`occupe` (`idPoste`, `idStructure`, `matricule`) VALUES ('1', '9', '93341M');


INSERT INTO `pmt`.`necessite` (`idPoste`, `codeDipl`) VALUES ('1', '1');
INSERT INTO `pmt`.`necessite` (`idPoste`, `codeDipl`) VALUES ('2', '2');
INSERT INTO `pmt`.`necessite` (`idPoste`, `codeDipl`) VALUES ('3', '3');

INSERT INTO `pmt`.`utilisateur` (`nom`, `prenom`, `matricule`, `password`, `profil`) VALUES ('IRATHENE', 'OTHMANE', '12345P','$2b$10$09Fxjg19Ajn4SR8oAGAD5O2xG9Uom.aDXmJoFIVJccAGDPwx0MUBq', 'admin');
INSERT INTO `pmt`.`utilisateur` (`nom`, `prenom`, `matricule`, `password`, `profil`) VALUES ('NEFFAH', 'MOHAMED', '12345M','$2b$10$09Fxjg19Ajn4SR8oAGAD5O2xG9Uom.aDXmJoFIVJccAGDPwx0MUBq', 'admin');
INSERT INTO `pmt`.`utilisateur` (`nom`, `prenom`, `matricule`, `password`, `profil`) VALUES ('BENMIMOUNE', 'RAHIM', '54321P','$2b$10$MIsEk.rbsQnAmF97NBxu5.HRsDayvjlzHR2oGEpAeZ8IVOQosmV1K', 'user');



INSERT INTO  `pmt`.`previsionDepart` (`motif`) VALUES ('retraite');
INSERT INTO  `pmt`.`previsionDepart` (`motif`) VALUES ('mutation');
INSERT INTO  `pmt`.`previsionDepart` (`motif`) VALUES ('demission');

INSERT INTO  `pmt`.`previsionRecrut` (`idRecrut`, `motif`, `modeP`, `NiveauRequis`, `Diplome`, `Specialite`, `Experience`, `SpecifitesPoste`, `LieuTravail`) VALUES ('1', 'Rempl', 'INT', 'BAC + 5', 'INGENIEUR', 'INFORMATIQUE', '2 ANS', '/', 'ALGER');
INSERT INTO  `pmt`.`previsionRecrut` (`idRecrut`, `motif`, `modeP`, `NiveauRequis`, `Diplome`, `Specialite`, `Experience`, `SpecifitesPoste`, `LieuTravail`) VALUES ('2', 'Deficit', 'EXT', 'BAC + 5', 'INGENIEUR', 'INFORMATIQUE', '3 ANS', '/', 'TIPAZA');

INSERT INTO  `pmt`.`PMTexistants` (`idPMT`, `anneeDeb`, `anneeFin`) VALUES ('1', '2022', '2025');
INSERT INTO  `pmt`.`PMTexistants` (`idPMT`, `anneeDeb`, `anneeFin`) VALUES ('2', '2023', '2027');


INSERT INTO `pmt`.`etreConcerne` (`matricule`, `annee`, `codeDep`,`verifie`,`observation`)VALUES ('22511S', '2025','retraite',1 ,'');
INSERT INTO `pmt`.`etreConcerne` (`matricule`, `annee`, `codeDep`,`verifie`,`observation`)VALUES ('73451L', '2023','demission',1,'');
INSERT INTO `pmt`.`etreConcerne` (`matricule`, `annee`, `codeDep`,`verifie`,`observation`)VALUES ('93341M', '2023','retraite',0,'');

INSERT INTO `pmt`.`etreDemande` (`idPoste`, `annee`, `idRecrut`,`idPmt`,`nbEmploye`,`observation`)VALUES (1, 2023,1,2,9,"/");
INSERT INTO `pmt`.`etreDemande` (`idPoste`, `annee`, `idRecrut`,`idPmt`,`nbEmploye`,`observation`)VALUES (2, 2022,2,1,25,"/");



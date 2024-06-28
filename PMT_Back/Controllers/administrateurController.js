const express = require('express');
const administrateurService = require('../Services/administrateurService');

const administrateurController = express.Router();




/************** Affichage des ustilisateurs **************** */
administrateurController.get('/users', async(req, res, next) => {
  try {

    const users = await administrateurService.retournerUtilisateurs();
    res.status(200).json({users});
    //next();
    
  } catch (error) {
    res.status(500).send(error.message );
  }

});


/****************** Affichage des informations d'un utilisateur ****************** */
administrateurController.get('/user/:matricule', async(req, res, next) => {
  try {
    const matricule = req.params.matricule; 
    const user = await administrateurService.retournerUtilisateur(matricule);
    res.status(200).json({user});
    //next();
    
  } catch (error) {
    res.status(500).send(error.message );
  }

});




/*************** calculer les Employe Par Activite *************/
administrateurController.get("/calculerActPers", 
async(req, res, next) => {
  try {
    const statistic = await administrateurService.calculerEmployeParAct();

    res.status(200).json({ statistic });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

});



/*************** calculer les Employe Par CSP *************/
administrateurController.get("/calculerCSPPers", 
async(req, res, next) => {
  try {
    const statistic = await administrateurService.calculerEmployeParCSP();

    res.status(200).json({ statistic });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

});
 


/*************** supprimer un utilisateur *************/
administrateurController.delete("/supprimerUser/:matricule",
async(req, res, next) => {
  try {
    const matricule = req.params.matricule;
    users = await administrateurService.supprimerUtilisateur(matricule);
    res.status(200).send("Utilisateur supprime avec succés");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
} 
);


// *************** show tables ********
administrateurController.get("/showtables", async (req, res, next) => {
  try {
    const result = await administrateurService.showtables();
    res.status(200).send(result);
    next();
  } catch (e) {
    res.status(500).send(e.message);
  }
});


/************** Affichage des employes **************** */
administrateurController.get('/employees', async(req, res, next) => {
  try {

    const {totalEmployees , employees } = await administrateurService.retournerEmployees();
    res.status(200).json({totalEmployees, employees});
    next();
    
  } catch (error) {
    res.status(500).send(error.message );
  }

});
 


/*************** Login *************/
administrateurController.post("/login", async (req, res, next) => {
    try {
      const {administrateurId , profil }= await administrateurService.login(
        req.body.matricule,
        req.body.password
      );
      res.status(200).json({ administrateurId , profil });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });



/*************** Ajouter Personnel *************/
 administrateurController.post("/ajouterPers",
  async (req, res, next) => {
    try {
      await administrateurService.ajouterPersonnel(
        req.body.matricule,
        req.body.nom,
        req.body.prenom,
        req.body.dateNaiss,
        req.body.dateRecrut,
        req.body.sexe,
        req.body.lieuTravail,
        req.body.intituleP,
        req.body.echelle,
        req.body.codeSTR,
        req.body.csp,
        req.body.designationS,
        req.body.designationD,
        req.body.valeurD
      );
      res.status(200).send("Employé ajouté avec succés");
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }

  }
);

 
 
/*************** Modifier Personnel *************/
administrateurController.post("/modifierPers",
async (req, res, next) => {
  try {
    await administrateurService.modifierPersonnel(
      req.body.matricule,
      req.body.nom,
      req.body.prenom,
      req.body.dateNaiss,
      req.body.dateRecrut,
      req.body.sexe,
      req.body.lieuTravail,
      req.body.intituleP,
      req.body.echelle,
      req.body.codeSTR,
      req.body.csp,
      req.body.designationS,
      req.body.designationD,
      req.body.valeurD
    );
    res.status(200).send("Employé modifié avec succés");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

}
);


/************** Affichage des employes archivés **************** */
administrateurController.get('/ArchiveEmployees', async(req, res, next) => {
  try {
    const {totalArchiveEmployees,ArchiveEmployees} = await administrateurService.retournerArchiveEmployees();
    res.status(200).json({totalArchiveEmployees,ArchiveEmployees});
    next();
    
  } catch (error) {
    res.status(500).send(error.message );
  }

});


/*************** Afficher les pmt Existants *************/
administrateurController.get('/PMTexistants', async(req, res, next) => {
  try {
    const pmtExistants = await administrateurService.AfficherPMTExistants();
    res.json(pmtExistants);
    next();
  } catch (error) {
    res.status(500).send(error.message );
  }
});

/*************** Ajouter un Depart (mutation/demission) *************/
administrateurController.post("/ajouterDep",
async (req, res, next) => {
  try {
    await administrateurService.AjouterDepart(
      req.body.matricule,
      req.body.motif,
      req.body.anneDeb,
      req.body.observation
    );
    res.status(200).send("Départ ajouté avec succés");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

}
);

/*************** Ajouter un PMT (retraites automatiquement) *************/
administrateurController.post("/ajouterPmt",
async (req, res, next) => {
  try {
    await administrateurService.AjouterPmt(
      req.body.anneDeb,
      req.body.duree
    );
    res.status(200).send("PMT ajouté avec succés");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

}
);

/*************** Valider la retraite d'un employé *************/
administrateurController.post("/validerRet",
async (req, res, next) => {
  try {
    await administrateurService.validerRetraite(
      req.body.matricule,
      req.body.annee
    );
    res.status(200).send("Retraite validé avec succés");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

}
);

/*************** Afficher Previsions de départ *************/
administrateurController.get('/PrevDep/:anneePMT', async(req, res, next) => {
  try {
    const PrevisionsDepart = await administrateurService.AfficherPrevDep(
      req.params.anneePMT
    );
    res.json(PrevisionsDepart);
    next();
  } catch (error) {
    res.status(500).send(error.message );
  }
});

/********* Ajout d'un utilisateur ***********/
administrateurController.post("/ajoutUser",
async (req, res, next) => {
  try {
    await administrateurService.ajouterUtilisateur(
      req.body.matricule,
      req.body.nom,
      req.body.prenom,
      req.body.profil
    );
    res.status(200).send("Utilisateur ajouté avec succés");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

}
);

/****************** Ajouter previsions de recrutement permanent ******************/
administrateurController.post("/AjouterPrevRecrut",
async (req, res, next) => {
  try {
    await administrateurService.AjouterPrevRecrut(
      req.body.anneepmt,
      req.body.motif,
      req.body.modeP,
      req.body.NiveauRequis,
      req.body.Diplome,
      req.body.Specialite,
      req.body.Experience,
      req.body.SpecifitesPoste,
      req.body.lieuTravail,
      req.body.anneeRecrut,
      req.body.intituleP,
      req.body.echelle,
      req.body.codeSTR,
      req.body.csp,
      req.body.nbEmploye,
      req.body.observation
    );

    res.status(200).send("Prévison de recrutement ajouté avec succés");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}
);

/************** Affichage des prévisions de recrutement permanent ****************/
administrateurController.get('/AfficherPrevRecrut/:anneeDebPmt', async (req, res, next) => {
  try {
    const prevRecrutList = await administrateurService.AfficherPrevRecrut(
      req.params.anneeDebPmt
    );
    res.status(200).json({ prevRecrutList });
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/************** Supprimer une prévision de recrutement permanent ****************/
administrateurController.delete('/DeletePrevRecrut/:anneeRecrut/:idPoste/:idRecrut/:idPmt', async (req, res, next) => {
  try {
    const anneeRecrut = req.params.anneeRecrut;
    const idPoste = req.params.idPoste;
    const idRecrut = req.params.idRecrut;
    const idPmt = req.params.idPmt;

    await administrateurService.DeletePrevRecrut(anneeRecrut,idPoste,idRecrut,idPmt);
    
    res.status(200).send("Prévision de recrutement supprimée avec succès.");
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/****************** Modifier profil pour l'admin ******************/     
administrateurController.put("/modifierProfilAdmin",
  async (req, res, next) => {
    try {
      await administrateurService.modifierProfilAdmin(
      req.body.matricule,
      req.body.nom,
      req.body.prenom,
      req.body.ancienMotDePasse,
      req.body.nouveauMotDePasse,
      );

      res.status(200).send("Profil modifié avec succès.");
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

/****************** Modifier info de user par l'admin ******************/
administrateurController.put("/modifierUser",
async (req, res, next) => {
  try {
    await administrateurService.modifierUtilisateur(
      req.body.matricule,
      req.body.nom,
      req.body.prenom
    );

    res.status(200).send("Utilisateur modifié avec succès.");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}
);

/****************** Modifier mot de passe user par le user ******************/
administrateurController.put("/modifierPassword",
  async (req, res, next) => {
    try {
      await administrateurService.modifierPassword(
      req.body.matricule,
      req.body.ancienMotDePasse,
      req.body.nouveauMotDePasse,
      );

      res.status(200).send("Mot de passe modifié avec succès.");
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);


/****************** Affichage de mouvements des effectifs par csp *******************/
administrateurController.get("/AfficherMvmCSP/:anneeDebPmt", 
async(req, res, next) => {
  try {
    const MvmCSP = await administrateurService.AfficherMvmCSP(
      req.params.anneeDebPmt
      );

    res.status(200).json(MvmCSP);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

/****************** Affichage de mouvements des effectifs par activité *******************/
administrateurController.get("/AfficherMvmActivite/:anneeDebPmt", 
async(req, res, next) => {
  try {
    const MvmActivite = await administrateurService.AfficherMvmActivite(
      req.params.anneeDebPmt
      );

    res.status(200).json(MvmActivite);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


/****************** Evolution des effectifs par csp *******************/
administrateurController.get("/EvolEffectifsCSP/:anneeDebPmt", 
async(req, res, next) => {
  try {
    const EvolEffect = await administrateurService.EvolEffectifsCSP(
      req.params.anneeDebPmt
      );

    res.status(200).json(EvolEffect);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


/************** Recherche des employes avec plusieurs mots cles *****************/
administrateurController.get('/RechercherEmployees/:motsCles', async(req, res, next) => {
  try {
    const motsCles = req.params.motsCles;
    // const keywordsArray = Array.isArray(motsCles) ? motsCles : [motsCles];

    const {totalEmployees , employees } = await administrateurService.rechercherEmployees(motsCles);
    res.status(200).json({totalEmployees, employees});
    next();
    
  } catch (error) {
    res.status(500).send(error.message );
  }

});

/************** Recherche des employes archivés avec plusieurs mots cles *****************/
administrateurController.get('/RechercherArchiveEmployees/:motsCles', async(req, res, next) => {
  try {
    const motsCles = req.params.motsCles;
    // const keywordsArray = Array.isArray(motsCles) ? motsCles : [motsCles];

    const {totalEmployees , employees } = await administrateurService.rechercherArchiveEmployees(motsCles);
    res.status(200).json({totalEmployees, employees});
    next();
    
  } catch (error) {
    res.status(500).send(error.message );
  }

});
 
/****************** Recherche des Previsions de départ ******************/
administrateurController.get('/RecherchePrevDep/:anneePMT/:motsCles', async(req, res, next) => {
  try {
    anneePMT = req.params.anneePMT;
    const motsCles = req.params.motsCles;
    // const keywordsArray = Array.isArray(motsCles) ? motsCles : [motsCles];

    const previsions = await administrateurService.RecherchePrevDep(anneePMT,motsCles);
    res.status(200).json(previsions);
    next();
    
  } catch (error) {
    res.status(500).send(error.message );
  }

});

/****************** Recherche des Previsions de recrutement ******************/
administrateurController.get('/RecherchePrevRecrut/:anneeDebPmt/:motsCles', async(req, res, next) => {
  try {
    anneeDebPmt = req.params.anneeDebPmt;
    const motsCles = req.params.motsCles;
    // const keywordsArray = Array.isArray(motsCles) ? motsCles : [motsCles];

    const previsions = await administrateurService.RecherchePrevRecrut(anneeDebPmt,motsCles);
    res.status(200).json(previsions);
    next();
    
  } catch (error) {
    res.status(500).send(error.message );
  }

});


  module.exports = administrateurController;
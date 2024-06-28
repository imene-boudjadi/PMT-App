CREATE DATABASE IF NOT EXISTS pmt;

CREATE TABLE Diplome(
    idDipl int primary key not null auto_increment,
    designationD varchar(100),
    valeurD int
);

CREATE TABLE Employe(
    matricule VARCHAR(6) primary key not null ,
    nom varchar(100),
    prenom varchar(100),
    dateNaiss date,
    dateRecrut date,
	sexe enum('F', 'M'),
    lieuTravail varchar(30),
    etat enum('retraite', 'enActivite', 'demissionne','mute'),
    codeDipl int, 
    foreign key (codeDipl) REFERENCES Diplome(idDipl)
);


CREATE TABLE Structure(
    idStructure int primary key not null auto_increment,
    designationS varchar(100)
);


CREATE TABLE Activite(
    code int primary key not null ,
    titre varchar(100),
	fonction enum('FSP','FCM','FST')
);


CREATE TABLE Poste(
    idPoste int primary key not null auto_increment,
    intituleP varchar(100),
    echelle varchar(5),
    codeSTR varchar(20) unique not null,
    csp enum('ING+', 'CU', 'AC', 'CS', 'TS', 'TECHNICIEN', 'TECHNIQUE', 'AUTRE', 'ADM', 'AIDE'),
    codeAct int,
    foreign key (codeAct) references Activite(code)
    
);

CREATE TABLE Utilisateur(
    idUser int primary key not null auto_increment,
    nom varchar(100),
    prenom varchar(100),
    matricule varchar(6) UNIQUE,
    password varchar(100),
	profil enum('admin', 'user')

);

CREATE TABLE previsionDepart(
    motif enum('retraite', 'mutation', 'demission') primary key not null
);

CREATE TABLE Occupe(
    idPoste int not null,
    idStructure int not null,
    matricule VARCHAR(6) not null,
    primary key (matricule, idPoste, idStructure ),
    foreign key (idPoste) REFERENCES Poste(idPoste),
    foreign key (idStructure) REFERENCES Structure(idStructure),
    foreign key (matricule) REFERENCES Employe(matricule)
);

CREATE TABLE Necessite(
    idPoste int not null,
    codeDipl int not null,
    primary key (idPoste, codeDipl ),
    foreign key (idPoste) REFERENCES Poste(idPoste),
    foreign key (codeDipl) REFERENCES Diplome(idDipl)
);

CREATE TABLE etreConcerne (
    matricule varchar(6) not null,
    annee YEAR not null,
    codeDep enum('retraite', 'mutation', 'demission') not null,
    verifie boolean,
    observation varchar(100),
    primary key (matricule, annee, codeDep),
    foreign key (matricule) REFERENCES Employe(matricule),
    foreign key (codeDep) REFERENCES previsionDepart(motif)
);

CREATE TABLE PMTexistants (
    idPmt int primary key not null AUTO_INCREMENT,
    anneeDeb YEAR CHECK (LENGTH(anneeDeb) = 4),
    anneeFin YEAR CHECK (LENGTH(anneeFin) = 4)
);

CREATE TABLE PrevisionRecrut(
    idRecrut int primary key not null auto_increment,
    motif enum ('Rempl', 'Deficit','PDvp'),
    modeP enum ('INT','EXT'),
    NiveauRequis varchar(100),
    Diplome varchar(100),
	Specialite varchar(100),
    Experience varchar(100),
    SpecifitesPoste varchar(100),
    LieuTravail varchar(100)
);


CREATE TABLE etreDemande(
    idPoste int not null,
    annee YEAR not null,
    idRecrut int not null,
    idPmt int not null,
    nbEmploye int,
    observation varchar(100),
    primary key (idPoste, annee, idRecrut,idPmt),
    foreign key (idPoste) REFERENCES Poste(idPoste),
    foreign key (idRecrut) REFERENCES PrevisionRecrut(idRecrut),
    foreign key (idPmt) REFERENCES PMTexistants(idPmt)
);



create table Utilisateur (
    id integer,
    pseudo varchar(30) not null,
    num_authent integer not null,
    nitro boolean,
    num_tel varchar(10),
    primary key(id)
);

create table Serveur (
    id integer,
    nom varchar(30),
    capacite integer not null,
    createur integer not null,
    primary key(id)
);

create table Role (
    nom varchar(30),
    couleur varchar(30),
    position integer,
    primary key(position)
);

create table EstMembre (
    id_utilisateur integer,
    id_serveur integer,
    sanction boolean,
    role integer,
    primary key(id_utilisateur,id_serveur,role),
    constraint utilisateur_membre foreign key (id_utilisateur) references Utilisateur(id),
    constraint serveur_membre foreign key (id_serveur) references Serveur(id),
    constraint role_membre foreign key (role) references Role(position)
);

create table Commande (
    nom varchar(30),
    description varchar(100),
    parametre varchar(30),
    id_serveur integer,
    primary key(nom,parametre),
    constraint serveur_commande foreign key (id_serveur) references Serveur(id)
);

create table AttributionRole(
    role int,
    nom_commande varchar(30),
    parametre varchar(30),
    primary key(role,nom_commande,parametre),
    constraint attri_role foreign key (role) references Role(position),
    constraint attr_commande_nom foreign key (nom_commande,parametre) references Commande(nom,parametre)
);

create table Salon (
    nom varchar(30),
    type varchar(30),
    categorie varchar(30),
    id_serveur integer,
    primary key(nom,type),
    constraint serveur_salon foreign key (id_serveur) references Serveur(id)
);

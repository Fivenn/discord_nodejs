create table Utilisateur (
    id bigint,
    pseudo varchar(30) not null,
    num_authent integer not null,
    nitro boolean,
    num_tel varchar(10),
    primary key(id)
);

create table Serveur (
    id bigint,
    nom varchar(30),
    token varchar(30),
    capacite integer not null,
    createur bigint not null,
    primary key(id)
);

create table Role (
    nom varchar(30),
    couleur varchar(30),
    position integer,
    primary key(nom,position)
);

create table Sanction (
    tmp boolean,
    duree integer,
    raison varchar(100),
    atom varchar(10),
    primary key(raison,atom)
);

create table EstMembre (
    id_utilisateur bigint,
    id_serveur bigint,
    position_role integer,
	nom_role varchar(30),
	sanction_raison varchar(100),
    sanction_atom varchar(10),
    primary key(id_utilisateur,id_serveur,position_role,nom_role),
    constraint utilisateur_membre foreign key (id_utilisateur) references Utilisateur(id),
    constraint serveur_membre foreign key (id_serveur) references Serveur(id),
    constraint role_membre foreign key (position_role,nom_role) references Role(position,nom),
	constraint sanction_membre foreign key (sanction_raison,sanction_atom) references Sanction(raison,atom)
);

create table Salon (
    nom varchar(30),
    type varchar(30),
    categorie varchar(30),
    id_serveur bigint,
    primary key(nom,type),
    constraint serveur_salon foreign key (id_serveur) references Serveur(id)
);

create table SanctionSalon (
    sanction_raison varchar(100),
    sanction_atom varchar(10),
    nom_salon varchar(30),
    type_salon varchar(30),
    primary key(sanction_raison,sanction_atom,nom_salon,type_salon),
    constraint sanctionSalon_sanction foreign key (sanction_raison,sanction_atom) references Sanction(raison,atom),
    constraint sanctionSalon_salon foreign key (nom_salon,type_salon) references Salon(nom,type)
);

create table Commande (
    nom varchar(30),
    atom varchar(10),
    nom_salon varchar(30),
    type_salon varchar(30),
    primary key(nom,atom),
    constraint salon_commande foreign key (nom_salon,type_salon) references Salon(nom,type)
);

create table AttributionRole(
    position_role int,
	nom_role varchar(30),
    nom_commande varchar(30),
    atom_commande varchar(30),
    primary key(position_role,nom_role,nom_commande,atom_commande),
    constraint attri_role foreign key (position_role,nom_role) references Role(position,nom),
    constraint attr_commande_nom foreign key (nom_commande,atom_commande) references Commande(nom,atom)
);

 GRANT ALL PRIVILEGES ON TABLE attributionrole, Commande, estmembre, role, sanction, sanctionsalon, serveur, utilisateur, salon TO bot_discord;
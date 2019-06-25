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

insert into Utilisateur values(1,'bob','456',false,'0000000000');
insert into Utilisateur values(2,'harry','677',false,'0000000000');
insert into Utilisateur values(3,'Fiven','555',true,'0000000000');
insert into Utilisateur values(4,'Loken','333',false,'0000000000');
insert into Utilisateur values(5,'Birlak','888',false,'0000000000');

insert into Serveur values(1,'IMR',null,30,4);
insert into Serveur values(2,'Return null',null,10,3);

insert into Salon values('general','textuel','general',1);
insert into Salon values('general','vocal','general',1);
insert into Salon values('nsfw','vocal','adulte',2);

insert into role values('delegue','bleu',2);
insert into role values('sbire','rouge',3);
insert into role values('modo','vert',1);

insert into Sanction values(true, 3600, 'relou','KICK');
insert into Sanction values(true, 3600, 'spam','KICK');
insert into Sanction values(false, null, 'giga relou', 'BAN');

insert into SanctionSalon values('relou','KICK','nsfw','vocal');

insert into EstMembre values(1,2,3,'sbire','relou','KICK');
insert into EstMembre values(1, 1, 3,'sbire','giga relou', 'BAN');
insert into EstMembre values(3,2,1,'modo',null,null);
insert into EstMembre values(4,1,2,'delegue',null,null);
insert into EstMembre values(4,2,3,'sbire',null,null);
insert into EstMembre values(5,2,3,'sbire',null,null);


insert into Commande values('kikoo','KICK','general','textuel');
insert into Commande values('yo','KICK','general','vocal');
insert into Commande values('wesh','MUTE','nsfw','vocal');

insert into AttributionRole values(1,'modo','kikoo','KICK');
insert into AttributionRole values(2,'delegue','wesh','MUTE');

 GRANT ALL PRIVILEGES ON TABLE attributionrole, Commande, estmembre, role, sanction, sanctionsalon, serveur, utilisateur, salon TO bot_discord;

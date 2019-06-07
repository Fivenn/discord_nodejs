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

insert into Utilisateur values(1,'bob','456',false,'0000000000');
insert into Utilisateur values(2,'harry','677',false,'0000000000');
insert into Utilisateur values(3,'Fiven','555',true,'0000000000');
insert into Utilisateur values(4,'Loken','333',false,'0000000000');
insert into Utilisateur values(5,'Birlak','888',false,'0000000000');

insert into Serveur values(1,'IMR',30,4);
insert into Serveur values(2,'Return null',10,3);

insert into role values('delegue','bleu',2);
insert into role values('sbire','rouge',3);
insert into role values('modo','vert',1);

insert into EstMembre values(1,2,null,3);
insert into EstMembre values(3,2,null,1);
insert into EstMembre values(4,1,null,2);
insert into EstMembre values(4,2,null,3);

insert into Commande values('kikoo','dit salut','',1);
insert into Commande values('yo','dit salut','',1);
insert into Commande values('wesh','dit salut','',2);

insert into AttributionRole values(1,'kikoo','');
insert into AttributionRole values(2,'wesh','');

insert into Salon values('general','textuel','general',1);
insert into Salon values('general','vocal','general',1);
insert into Salon values('nsfw','vocal','adulte',2);

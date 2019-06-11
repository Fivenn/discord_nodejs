-- Récupérer les joueurs ayant des sanctions sur plusieurs serveurs.
select utilisateur.pseudo, count(serveur.nom) as nb_sanctions from estmembre join utilisateur on id_utilisateur = utilisateur.id join serveur on id_serveur = serveur.id where estmembre.sanction_raison is not null group by utilisateur.pseudo having count(serveur.nom) > 1

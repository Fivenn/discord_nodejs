-- Récupérer les sanctions liées à un joueur, et leur nombre.
select utilisateur.pseudo, count(estmembre.sanction_atom) from estmembre join utilisateur on id_utilisateur = utilisateur.id join serveur on id_serveur = serveur.id where estmembre.sanction_raison is not null and utilisateur.pseudo = 'bob' group by utilisateur.pseudo
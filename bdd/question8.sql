select Utilisateur.pseudo from Utilisateur join EstMembre on Utilisateur.id = id_utilisateur group by Utilisateur.id having count(id_serveur) >= 2;
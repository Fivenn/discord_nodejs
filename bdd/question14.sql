-- Récupérer la liste de joueurs ayant des sanctions sur différents serveurs partageant une temporalité commune.
select pseudo from Utilisateur natural join EstMembre as A1, EstMembre as A2 where A1.sanction_atom = A2.sanction_raison and A1.sanction_raison = A2.sanction_atom and A1.id_serveur != A2.id_serveur and A1.id_utilisateur = A2.id_utilisateur;

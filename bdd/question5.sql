-- Appliquer une sanction à un utilisateur sur un serveur Discord
UPDATE estmembre
SET sanction_raison = 'giga relou', sanction_atom = 'BAN'
FROM utilisateur, serveur
WHERE utilisateur.pseudo = 'Loken' and utilisateur.id = estmembre.id_utilisateur and serveur.id = estmembre.id_serveur and serveur.nom = 'Return null'
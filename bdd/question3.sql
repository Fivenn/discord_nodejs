-- Mettre à jour le rôle d'un membre à grade lié à la modération
update estmembre
set role = role.position
from role, utilisateur, serveur
where utilisateur.id = estmembre.id_utilisateur and serveur.id = estmembre.id_serveur and utilisateur.pseudo = 'Fiven' and role.nom = 'sbire' and serveur.nom = 'Return null';

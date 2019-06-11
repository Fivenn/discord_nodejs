-- Récupérer l'ensemble des grades liées à la modération d'un serveur Discord.
-- Pour information on définit le rôle de modérateur à partir de la position 3 dans la hérarchie.
select * from Role where position < 3;
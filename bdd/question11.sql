-- Il nous est impossible de réaliser cette requête (récupérer la liste des sanctions infligées par un modérateur) sur notre base
--  car nous ne gardons aucune trace de qui inflige un sanction. Dans l’idéal, il faudrait modifier notre schéma pour ajouter
--  dans sanction un ID représentant l’ID du modérateur qui inflige cette section.
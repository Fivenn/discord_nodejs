# Modèle relationnel et dictionnaire de données

Utilisateur(__id__, pseudo, num_anthent, nitro, num_tel)
<table>
    <tr>
        <th>Utilisateur</th>
    </tr>
    <tr>
        <td>id</td>
        <td>L'identifiant d'un utilisateur discord</td>
    </tr>
        <tr>
        <td>pseudo</td>
        <td>Le pseudo d'un utilisateur discord</td>
    </tr>
        <tr>
        <td>num_authent</td>
        <td>Le numéro d'authentification d'un utilisateur discord</td>
    </tr>
        <tr>
        <td>nitro</td>
        <td>Abonnement Discord Nitro</td>
    </tr>
        <tr>
        <td>num_tel</td>
        <td>Numéro de téléphone d'un utilisateur</td>
    </tr>
</table>

Serveur(__id__, nom, capacite, createur)
<table>
    <tr>
        <th>Serveur</th>
    </tr>
    <tr>
        <td>id</td>
        <td>L'identifiant d'un serveur discord</td>
    </tr>
    <tr>
        <td>nom</td>
        <td>Le nom d'un serveur discord</td>
    </tr>
        <tr>
        <td>capacite</td>
        <td>La capacite d'un serveur Discord</td>
    </tr>
    <tr>
        <td>createur</td>
        <td>Le nom du créateur d'un serveur Discord</td>
    </tr>
</table>

Role(nom, couleur, __position__)
<table>
    <tr>
        <th>Role</th>
    </tr>
    <tr>
        <td>nom</td>
        <td>Le nom d'un rôle</td>
    </tr>
    <tr>
        <td>couleur</td>
        <td>La couleur associée à un rôle</td>
    </tr>
        <tr>
        <td>position</td>
        <td>La position d'un rôle dans la hiérarchie linéaire</td>
    </tr>
</table>

Sanction(duree, __raison__, __atom__)
<table>
    <tr>
        <th>Sanction</th>
    </tr>
    <tr>
        <td>duree</td>
        <td>Le choix de mettre une durée sur une sanction</td>
    </tr>
    <tr>
        <td>raison</td>
        <td>La raison de la sanction</td>
    </tr>
    <tr>
        <td>atom</td>
        <td>Les différentes variantes sanctions possibles</td>
    </tr>
</table>

EstMembre(__id_utilisateur__#, __id_serveur__#, role#, sanction_raison#, sanction_atom#)
<table>
    <tr>
        <th>EstMembre</th>
    </tr>
    <tr>
        <td>id-utilisateur</td>
        <td>Le choix de mettre une durée sur une sanction</td>
    </tr>
    <tr>
        <td>id_serveur</td>
        <td>La raison de la sanction</td>
    </tr>
    <tr>
        <td>role</td>
        <td>Le rôle associé à un membre</td>
    </tr>
    <tr>
        <td>sanction_raison</td>
        <td>La raison d'une sanction associée à un membre</td>
    </tr>
    <tr>
        <td>sanction_atom</td>
        <td>Les différentes variantes de sanctions possibles pour une membre</td>
    </tr>
</table>

Salon(__nom__, __type__, categorie, id_serveur#)
<table>
    <tr>
        <th>Salon</th>
    </tr>
    <tr>
        <td>nom</td>
        <td>Le nom d'un salon</td>
    </tr>
    <tr>
        <td>type</td>
        <td>Le type d'un salon (textuel ou vocal)</td>
    </tr>
    <tr>
        <td>categorie</td>
        <td>La catégorie du salon</td>
    </tr>
    <tr>
        <td>id_serveur</td>
        <td>L'identifiant du serveur auquel est associé un salon</td>
    </tr>
</table>

SanctionSalon(__sanction_raison__#, __sanction_atom__#, __nom_salon__#, __type_salon__#)
<table>
    <tr>
        <th>SanctionSalon</th>
    </tr>
    <tr>
        <td>sanction_raison</td>
        <td>Raison d'une sanction d'un salon</td>
    </tr>
    <tr>
        <td>sanction_atom</td>
        <td>Les différentes variantes de sanctions possibles d'un salon</td>
    </tr>
    <tr>
        <td>nom_salon</td>
        <td>Le nom d'une sanction d'un salon</td>
    </tr>
    <tr>
        <td>type_salon</td>
        <td>Le type de salon (textuel ou vocal) auquel est appliqué la sanction</td>
    </tr>
</table>

Commande(__nom__, __atom__, nom_salon#, type_salon#)
<table>
    <tr>
        <th>Commande</th>
    </tr>
    <tr>
        <td>nom</td>
        <td>Le nom de la commande</td>
    </tr>
    <tr>
        <td>atom</td>
        <td>Les différentes variantes de commandes possible</td>
    </tr>
    <tr>
        <td>nom_salon</td>
        <td>Le nom du salon auquel est associé la commande</td>
    </tr>
    <tr>
        <td>type_salon</td>
        <td>Le type salon (textuel ou vocal) auquel est associé la commande</td>
    </tr>
</table>

AttributionRole(__role__#, __nom_commande__#, __atom_commande__#)
<table>
    <tr>
        <th>AttributionRole</th>
    </tr>
    <tr>
        <td>role</td>
        <td>Le nom d'un rôle</td>
    </tr>
    <tr>
        <td>nom_commande</td>
        <td>Le nom d'une commande associé à un rôle</td>
    </tr>
    <tr>
        <td>atom_commande</td>
        <td>Les différentes variantes de commandes possibles pour un rôle</td>
    </tr>
</table>
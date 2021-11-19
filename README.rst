
DSIA-5102A : Application Full Stack Data
==========================================
**Développé par Xianli LI et Céline SISAVANH**

Dans le cadre de l'unité DSIA-5102A de 5ème année à l'ESIEE Paris, nous devons créer une application web en réfléchissant à l'utilité du produit.
Pour cela, nous devons décorréler la partie backend de l'application du frontend de celle-ci. Nous avons donc créer deux sous projets de l'application avec deux technologies différentes : 

- backend : **FastApi**
- frontend : **React JS**

Nous avons donc décidé de créer une application de e-commerce. 
Cette application contient un formulaire d'utilisateur, son authentification et la gestion de produits ajoutés.

Lancement du projet
-------------------

Cloner la base du projet : https://github.com/Xianlilxl/Projet_E_Commerce_FastAPI.git

Il y a deux façon différentes de lancer le projet selon vos préférences et les capacités de votre ordinateur.

1. *La première possibilité est de lancer les deux sous projets sous docker.*

Mettez-vous dans le dossier contenant cette base de projet puis lancer cette commande dans un terminal/prompt :   

.. code-block:: bash

  > docker-compose up --build

2. *La deuxième possibilité est de lancer les sous projets l'un après l'autre.*

C'est à dire que le back-end peut être lancé sous docker et le front-end est quant à lui lancé de son côté.
Pour faire cela, il suffit de ne pas appeler le service react sous docker.
Ainsi, il faut modifier le fichier **docker_compose.yml**. Il faut mettre en commentaire le code de la **ligne 29 à la ligne 39**.

.. image:: ./images/react.JPG
   :width: 200

Puis, il faut également modifier le fichier **frontend/package.json**. Il faut remplacer la **ligne 31**, qui est actuellement adapté pour le lancement sous docker, par la commande ci-dessous :

.. image:: ./images/npm_start.JPG
   :width: 300

.. code-block:: bash

  > "start": "react-scripts start",

Suite à ces modifications, vous pouvez lancer le projet.

Pour cela, placez vous à la base du projet et lancez le back-end :

.. code-block:: bash

  > docker-compose up --build

Puis, lancez le front-end en parallèle :

.. code-block:: bash

  > cd frontend
  > npm install
  > npm start


L’application web sera accessible sur votre localhost du port 3000 : http://localhost:3000/.

Et l'interface intéractive du backend est disponible sur le port 5000 : http://localhost:5000/docs/.


Back-end et Front-end
-------------------
Back-end : Développement des fonctionnalités de l'application
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Le back-end n'est pas visible pour un utilisateur d'une application mais c'est la partie qui permet de définir toutes les fonctionnalités d'une application. 
Cette partie est alors essentielle au bon fonctionnement d'une appication, notamment afin de développer et mettre en intéraction ces trois pilliers : 

- Le serveur d'hébergement
- L'application web
- La base de données

Ainsi, pour cette partie, nous avons majoritairement codé en **Python** et **SQL**. Et nous avons choisis d'utiliser le framework **FastAPI** pour notre application.

Le développement de cette partie a été étudié grâce à l'interface intéractive accessible sur le port 5000 du localhost : http://localhost:5000/docs/.

Front-end : Développement de l'interface graphique
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Le front-end représente la partie visible de l'application. En effet, cette partie va mettre en place tous les éléments graphiques qui permettent à l'utilisateur de se répérer sur l'application. C'est à dire que les intéractions, l'esthétique, les animations et d'autres sont gérés par le frontend. 
Cette partie repose évidemment sur la partie back-end. C'est alors dans le frontend que l'on fait appel au back-end permettant alors de les connecter.

Ainsi, pour cette partie du projet, nous avons majoritairement codé en **JavaScript** et en **CSS**. Et nous avons choisis d'utiliser le framework **React JS** afin de créer le front-end de notre application.

Afin de pouvoir lier ces deux parties, nous avons essentiellement utiliser **Axios** qui est une bibliothèque JavaScript. 


Visualisation et explication des pages
--------------------------------------

La **page d'accueil** contient l'affichage de tous les produits.

.. image:: ./images/home.JPG
   :width: 500
   
Sur cette page, il est possible de rechercher les produits que l'on souhaite voir par mots clé ou encore par catégorie. Il suffit d'écrire ce que l'on cherche dans la barre de recherche et/ou de choisir la catégorie voulue, puis de cliquer sur FILTRER.

Cette application contient une barre de navigation où vous pouvez vous connecter ou encore accéder à votre panier.

Lorsque vous appuyez sur Connexion, une page de connexion apparaît ou si vous ne posséder pas encore de compte, vous avez la possibilité de créer un compte.

La **page d'inscription** ressemble à l'image ci-dessous : 

.. image:: ./images/inscription.JPG 
   :width: 600

Il suffit de renseigner les informations demandées. La base de données n'accepte pas les noms d'utilisateur et adresse email déjà existants.

Quant à la **page de connexion** : 

.. image:: ./images/login.JPG
   :width: 600
   
Puis, une fois connecté, le nom de l'utilisateur est affiché en haut à droite et plusieurs options sont désormais possibles et apparaîssent en dessous du nom de l'utilisateur.
Plus précisément, les options sont : 

- l'accès au information du compte
- la gestion des produits
- la liste des utilisateurs
- la déconnexion

Voici, un aperçu des options disponibles :

.. image:: ./images/compte.png
   :width: 600

La première option est l'accès au **profil du compte connecté**. Cette option comprend la modification du compte. 

.. image:: ./images/profile.JPG
   :width: 600
   
Puis, en étant connecté, vous pouvez gérer les produits, c'est à dire voir **la liste de tous les produits**, ajouter de nouveaux produits, les modifier ou encore les supprimer.

.. image:: ./images/liste_produit.JPG
   :width: 600
   
Sur cette page, il est possible alors possible d'accéder aux pages qui permettent d'ajouter un produit, en modifier un selon son identifiant ou encore le supprimer.

**La page d'ajout de produit** :

.. image:: ./images/ajout_produit.JPG
   :width: 600
   
**La page de modification de produit** : 

.. image:: ./images/modif_produit.JPG
   :width: 600
   
Ensuite, quant à la visualisation de **la liste des utilisateurs**, il est également possible d'en supprimer un. 

.. image:: ./images/list_user.JPG
   :width: 600
   
Ensuite, si vous vous placez sur la page d'accueil, il est possible de cliquer sur un produit qui vous intéresse. Cela vous redigigera vers **la fiche descriptif du produit**. Sur cette page, il vous sera possible d'ajouter le produit dans votre panier en choisissant la quantité souhaité.

.. image:: ./images/produit.JPG
   :width: 600
   
Enfin, nous avons également créer une page pour **le panier**. Cette page regroupe tous les articles ajoutés au panier et le prix selon la quantité choisis.
Voici un exemple : 

.. image:: ./images/panier.JPG
   :width: 600
     
   
Amélioration
------------  
Nous avons donc créer une application fullstack complète, c'est à dire contenant une partie back-end et une partie front-end fonctionnelles.

Nous proposons néanmoins quelques axes d'amélioration : 

- l'ajoût de commentaires et d'une note d'un utilisateur sur un produit,
- la distinction de l'application d'un utilisateur lambda et d'un utilisateur administrateur. 

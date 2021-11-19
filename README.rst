
DSIA-5102A : Application Full Stack Data
==========================================

Dans le cadre de l'unité DSIA-5102A de 5ème année à l'ESIEE Paris, nous devons créer une application web en réfléchissant à l'utilité du produit.
Pour cela, nous devons décorréler la partie backend de l'application du frontend de celle-ci. Nous avons donc créer deux sous projets de l'application avec deux technologies différentes : 
- backend : FastApi
- frontend : React

Nous avons donc décidé de créer une application de e-commerce. 
Cette application contient un formulaire d'utilisateur, son authentification et la gestion de produits ajoutés.

Lancement du projet
-------------------

Cloner la base du projet : https://github.com/Xianlilxl/Projet_e_Commerce_FastAPI.git

Mettez-vous dans le dossier contenant cette base de projet puis lancer cette commande dans un terminal/prompt :   

.. code-block:: bash

  > docker-compose up --build

L’application web sera accessible sur votre localhost du port 3000 : http://localhost:3000/.

Et l'interface intéractive du backend est disponible sur le port 5000 : http://localhost:5000/docs/.

Visualisation et explication des pages
--------------------------------------

La page d'accueil contient l'affichage de tous les produits.

.. image:: ./images/home.JPG
   :width: 500
Sur cette page, il est possible de rechercher les produits que l'on souhaite voir par mots clé ou encore par catégorie. Il suffit d'écrire ce que l'on cherche dans la barre de recherche et/ou de choisir la catégorie voulue, puis de cliquer sur FILTRER.

Cette application contient une barre de navigation où vous pouvez vous connecter ou encore accéder à votre panier.

Lorsque vous appuyez sur Connexion, une page de connexion apparaît ou si vous ne posséder pas encore de compte, vous avez la possibilité de créer un compte.

La page d'inscription ressemble à l'image ci-dessous : 

.. image:: ./images/inscription.JPG 
   :width: 600

Quant à la page de connexion : 

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

La première option est l'accès au profil du compte connecté. Cette option comprend la modification du compte. 

.. image:: ./images/profile.JPG
   :width: 600
   
Puis, en étant connecté, vous pouvez gérer les produits, c'est à dire voir la liste de tous les produits, ajouter de nouveaux produits, les modifier ou encore les supprimer.

.. image:: ./images/liste_produit.JPG
   :width: 600
   
Sur cette page, il est possible alors possible d'accéder aux pages qui permettent d'ajouter un produit, en modifier un selon son identifiant ou encore le supprimer.

La page d'ajout de produit :

.. image:: ./images/ajout_produit.JPG
   :width: 600
   
La page de modification de produit : 

.. image:: ./images/modif_produit.JPG
   :width: 600
   
Ensuite, quant à la visualisation de la liste des utilisateurs, il est également possible d'en supprimer un. 

.. image:: ./images/list_user.JPG
   :width: 600
   
Ensuite, si vous vous placez sur la page d'accueil, il est possible de cliquer sur un produit qui vous intéresse. Cela vous redigigera vers la fiche descriptif du produit. Sur cette page, il vous sera possible d'ajouter le produit dans votre panier en choisissant la quantité souhaité.

.. image:: ./images/produit.JPG
   :width: 600
   
Enfin, nous avons également créer une page pour le panier. Cette page regroupe tous les articles ajoutés au panier et le prix selon la quantité choisis.
Voici un exemple : 

.. image:: ./images/panier.JPG
   :width: 600
     
   
Amélioration
------------  

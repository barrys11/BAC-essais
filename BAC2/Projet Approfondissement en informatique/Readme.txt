************Acceder a la page manuellement******************************************************************************

Pour lancer le serveur , il faut:
 - Dezipper le fichier .zip et récuperer le dossier qui se nomme Projet_final;
 - Ouvrer votre invite de commende (cmd);
 - Installer:
	- express et express session;
	- hogang;

 - Ouvrer sur votre cmd le lien vers le Prjot_final;
 - Utiliser les commendes suivantes sur votre cmd:
	- mongod --dbpath mongo_path; (obligatoire)
	- mongoimport -d database -c depot data/depot.json (si vous voulez avoir des document ou lancement du projet);
	- node server.js (obligatoire pour que le server demare), 
 - Ouvrer votre navigateur et lancé la commende suivante:
	- https://localhost:10;

*******************fin*****************************************************************************************************

*************Acceder a la page avec des tests******************************************************************************

 - Ce que vous devez Installer:
	- Installer selenium avec npm install selenium-webdriver selenium ;
	- Installer jest avec npm install jest;
	- Installer la dernière version de chrome-drive et mettez jour votre chrome;

 -Si vous avez un anti-virus veillez a desactiver la partie pour les sites qui nim pas de certificats.
 
 -Les commendes a utilisées:
	- Lancer le serveur comme au dessus;
	- Ouvrivre une nouvelle cmd;
	- npm install jest --save;
	- npm test;

*******************fin******************************************************************************************************

			Bonne Chance!!!!!!!!!!!!
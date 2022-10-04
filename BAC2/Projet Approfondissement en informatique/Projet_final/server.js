var express = require('express');
var consolidate = require('consolidate');
var session = require('express-session');

MongoClient = require('mongodb').MongoClient;
Server = require('mongodb').Server;

var app = express ()

var bodyParser = require("body-parser");

var https = require('https');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
  secret: "propre123",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    path: '/', 
    httpOnly: true,
  }
}));

//ajout

var vm=require('vm');
var fonc = fs.readFileSync('function-aux.js')
vm.runInThisContext(fonc)
//fin de l'ajout

app.engine ( 'html', consolidate.hogan );
app.set('views', 'content');

//lien pour les serveur auxilliaire
const identifications=require("./server-aux/identifiction-server")
const search=require("./server-aux/search-server")
const select_depot= require("./server-aux/server-select-depot")
const succes_panier= require("./server-aux/server-succes-panier")
const graphique_ser= require("./server-aux/graphique-server")

var acheter=[];
var vendu=[];
var selectionne=selection();

MongoClient.connect("mongodb://localhost:27017",function(err,db){
    dbm=db.db("database");
    if(err) throw err;
    //page d'identification
    app.post("/display",identifications);

    //identification
    app.get("/connect",identifications);

    // accès au nouveau Compte
    app.get("/ident",identifications);
    
    // Creer un nouveau compte
    app.post("/enregistrement",identifications);

    //mot de passe oublier 
    app.get("/oublier",identifications);

    //Nouveau mot de passe
    app.post("/nouveau_pswd",identifications)

    //page Depot de livre
    app.post("/depot",select_depot);

    //pour aller a la page de selectionne et si tu click sur le boutton annuler

    app.get("/achat",(req,res)=>{
        dbm.collection("depot").find({}).toArray((err,doc)=>{
            if(err) throw err;
            res.render("select.html",{livre: doc,utilisateur:req.session.utilisateur,date: date()})
            vendu=[];
            acheter=[];
        })
    });

      //afficher la page de depot//

    app.get("/vente",(req,res)=>{
        res.render("depot.html",{utilisateur:req.session.utilisateur});
    });

    //page de selectionne
    app.post("/select",succes_panier);

    //page de confirmation d'achat

    app.get("/confirmer",(req,res)=>{
        res.render("carte_banque.html",{utilisateur:req.session.utilisateur});
    });

    //corfirmer l'achat pas fini faut ajouter la supression du document.

    app.post("/succes",succes_panier);

    //pour retourner a l'acceuil a tout moment.

    app.get("/acceuil",(req,res)=>{
        if (req.session.utilisateur){
            dbm.collection("depot").find({}).toArray((err,doc)=>{
                if(err) throw err;
                else {
                    res.render("page_principale.html",{livre:doc,utilisateur:req.session.utilisateur,date: date()});
                }
            });
        }else{
            res.redirect("/")
        };
    });

    //pour le graphique
    app.get("/graphique",graphique_ser);
    app.get("/graph2",graphique_ser);

    //search
    app.post("/search",search);

    app.post("/search2",search);

    // Le profil
    app.get("/profile",(req,res)=>{
        dbm.collection("utilisateurs").find({"utilisateur":req.session.utilisateur}).toArray((err,doc)=>{
            if(err) throw err;
            res.render("profile.html",{profile:doc,utilisateur:req.session.utilisateur});
        })
    });

    // affiche la page des livres Vendus
    app.get("/vendu",(req,res)=>{
        dbm.collection("vendu").find({utilisateur:req.session.utilisateur}).toArray((err,doc)=>{
            if(err) throw err;
            res.render("vendu.html",{livre: doc,utilisateur:req.session.utilisateur})
        });
    });

    //affiche la pages des livres acheter
    app.get("/achete",(req,res)=>{
        dbm.collection("acheter").find({utilisateur:req.session.utilisateur}).toArray((err,doc)=>{
            if(err) throw err;
            res.render("achete.html",{livre: doc,utilisateur:req.session.utilisateur})
        });
    });

    //affiche la page du panier
    app.get("/paniers",succes_panier);

    //depot sur le panier

    app.post("/panier",succes_panier);

    //suprime dans le panier
    app.post("/sup_panier",succes_panier);

    //quitter la page du panier vers la page carte.html
    app.get("/confirme",succes_panier);

    //se doconnecter
    app.get('/deconnect',function(req,res){
        req.session.utilisateur=null;
        res.redirect('/');
    });

    //affiche la page index
    app.get("/",(req,res)=>{
        dbm.collection("depot").find({}).toArray((err,doc)=>{
            if(err) throw err;
            res.render("index.html",{livre: doc,date: date()})
        });
    });

});

app.use(express.static('static'));

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'barrys'
}, app).listen(10);
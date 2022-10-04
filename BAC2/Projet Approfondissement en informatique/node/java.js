var express = require('express');
var consolidate = require('consolidate');
var session = require('express-session');


MongoClient = require('mongodb').MongoClient;
Server = require('mongodb').Server;

var app = express ()

var bodyParser = require("body-parser");
var https = require('https');
var fs = require('fs');

app.engine ( 'html', consolidate.hogan );
app.set('views', 'priv');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
  secret: "propre123",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    path: '/', 
    httpOnly: true, 
    maxAge: 3600000
  }
}));

const date=new Date();
const mois=date.getMonth()+1;
const d=date.getDate()+'/'+mois+'/'+date.getFullYear();
//connection avec le serveur

MongoClient.connect("mongodb://localhost:27017",function(err, db){
  dbm = db.db('incidents');
  if (err) throw err;
  app.post('/display',function(req,res){//verifications du nom d'utilisateur et mots de passe.
    dbm.collection('utilisateurs').findOne({"utilisateur":req.body.utilisateur,"mot_de_passe":req.body.mot_de_passe},(err,doc) => {
      if (err) throw err;
      else if(doc!=null){
        //acceder a la base de donner si l'utilisateur et le mot de passe est correcte.
        req.session.utilisateur=req.body.utilisateur; //ajouter un cookie
        dbm.collection('incidents').find({}).toArray((err, doc) =>{
          if (err) throw err;
          res.render('page1.html', {data: doc,utilisateur:req.session.utilisateur});
        });
      }else{
        res.render('compte.html');}
    });
  })
  
  app.get('/lien',function(req,res){//lien vers la page pour ajouter des incidents.
    res.render('page2.html',{Lien_pour_ajouter_un_incident: req.query.q="Lien pour ajouter un incident",utilisateur:req.session.utilisateur});
  });
  

  app.get('/des',function(req,res){ // ajouter les donnez dans la db.
    dbm.collection("incidents").insertOne({"incident":req.query.incident,"adresse":req.query.adresse,"date":d}, function(err, doc){
      if(err) throw err;
      /*trouve une description null et le supprime*/
      if(req.query.incident==""){
        dbm.collection("incidents").deleteOne({"incident":req.query.incident},function(err,cod){
          if(err) throw err;
        });
      };
      /*----------------------------*/
      dbm.collection('incidents').find({}).toArray((err, doc) =>{
        if (err) throw err;
          res.render('page1.html', {data: doc,utilisateur:req.session.utilisateur});
        });
    });
    //res.render('page1.html',{description:req.query.description,adresse:req.query.adresse})
  })

  app.get('/connect',function(err,res){
    res.render('compte.html')
  })
  
  app.get('/ident',function(req,res){//ajouter un nouveau utilisateur.
    res.render('nCompte.html',{Nouveau_Compte: req.query.q="Nouveau_Compte"});
  });

  app.get('/enregistre',function(req,res){//ajouter un utilisateur dans la base.
    if(req.query.utilisateur=="" || req.query.mot_de_passe=="" || req.query.nom=="" || req.query.prenom=="" || req.query.mail==""){
      res.render('nCompte.html') 
    }
    else{
      dbm.collection('utilisateurs').findOne({"utilisateur":req.query.utilisateur},(err,doc)=>{
        if (err) throw err;
        else if (doc!=null){
          res.render('nCompte.html',{utilisateur:"Le nom d'utilisateur existe"})//ne fonctionne pas a corrigé.
        }else{
          dbm.collection('utilisateurs').insertOne({"utilisateur":req.query.utilisateur,"mot_de_passe":req.query.mot_de_passe,"nom":req.query.nom,"prenom":req.query.prenom,"mail":req.query.mail});
          req.session.utilisateur=req.query.utilisateur;//ajouter un cookie
          dbm.collection('incidents').find({}).toArray((err, doc) =>{
            if (err) throw err;
            res.render('page1.html', {data: doc,utilisateur:req.session.utilisateur});
          });
        }
      });
    }
  });

  /*methode search*/
  app.get('/search',function(req,res){
    dbm.collection('incidents').find({$or:[{incident:{$regex:req.query.text.toLowerCase()}},{adresse:{$regex:req.query.text}}]}
      ).toArray((err,doc)=>{
      if (err) throw err;
      if(req.session.utilisateur){
        if(doc==[]){
          res.render('page1.html', {data: "doc",utilisateur:req.session.utilisateur});
        }else{
          res.render('page1.html', {data: doc,utilisateur:req.session.utilisateur});
        };
      }else{
        if(doc==[]){
          texte="il n'existe pas";
          res.render('index.html', {echec:"il n'existe pas"});
        }else{
          res.render('index.html', {data: doc});
        };
      }
    })
  });

  app.get('/',function(req,res){ //affiche la page principale sans l'utilisateur.
    dbm.collection('incidents').find({}).toArray((err, doc) =>{
      if (err) throw err;
      res.render('index.html', {data: doc});
    });
  });

});

app.use(express.static('static'));

https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'ingi'
}, app).listen(80);
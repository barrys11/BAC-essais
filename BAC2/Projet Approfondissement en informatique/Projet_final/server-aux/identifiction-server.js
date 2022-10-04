const express=require('express');
const routeur=express.Router();
module.exports = routeur;

var fs = require('fs');
var vm=require('vm');
var fonc = fs.readFileSync('function-aux.js')
vm.runInThisContext(fonc)

routeur.get("/connect",(req,res)=>{
    res.render("identification.html")
});

// accès au nouveau Compte
routeur.get("/ident",(req,res)=>{
    res.render("creation_compte.html")
});

//page d'identification
routeur.post("/display",(req,res)=>{
    dbm.collection("utilisateurs").findOne({"utilisateur":req.body.utilisateur,"mot_de_passe":req.body.mot_de_passe},(err,cle)=>{
        if(err) throw err;
        else if(cle==null){
            let message=erreur()
            res.render("identification.html",{erreur:message});
        }
        else{
            req.session.utilisateur=req.body.utilisateur;
            dbm.collection("depot").find({}).toArray((err,doc)=>{
                if(err) throw err;
                res.render("page_principale.html",{livre: doc,utilisateur:req.session.utilisateur,date:date()})
            });
        }
    })
});


// Creer un nouveau compte
routeur.post("/enregistrement",(req,res)=>{
    if(req.body.utilisateur=="" || req.body.mot_de_passe=="" || req.body.nom=="" || req.body.prenom=="" || req.body.mail==""){
        res.render("creation_compte.html")
    }else{
        dbm.collection("utilisateurs").findOne({"utilisateur":req.body.utilisateur},(err,doc)=>{
            if(err) throw err;
            else if(doc!=null){
                let exist=existe();
                res.render("creation_compte.html",{existe:exist})
            }else{
                dbm.collection("utilisateurs").insertOne({"utilisateur":req.body.utilisateur,"mot_de_passe":req.body.mot_de_passe,"nom":req.body.nom,"prenom":req.body.prenom,"mail":req.body.mail},(err,doc)=>{
                    if(err) throw err;
                    req.session.utilisateur=req.body.utilisateur;
                    dbm.collection("depot").find({}).toArray((err,doc)=>{
                        if(err) throw err;
                        res.render("page_principale.html",{livre: doc,utilisateur:req.session.utilisateur,date: date()})
                    })
                })
            }
        });
    };
});

//mot de passe oublier
routeur.get("/oublier",(req,res)=>{
    res.render("nouveau_mot_passe.html")
})

//creation de nouveau mot de passe
routeur.post("/nouveau_pswd",(req,res)=>{
    dbm.collection("utilisateurs").findOne({"utilisateur":req.body.utilisateur},(err,doc)=>{
        if (err) throw err
        else if(doc==null&&req.body.mot_de_passe!=req.body.conf_mot_de_passe){
            res.render("nouveau_mot_passe.html",{"error":error()[0]})
        }

        else if(doc==null){
            res.render("nouveau_mot_passe.html",{"error":error()[1]})
        }
        else{
            if(req.body.mot_de_passe==req.body.conf_mot_de_passe){
                req.session.utilisateur=req.body.utilisateur
                dbm.collection("utilisateurs").updateOne({"utilisateur":req.body.utilisateur},{$set:{mot_de_passe:req.body.mot_de_passe}},(err,doc)=>{
                    if (err) throw err
                    dbm.collection("depot").find({}).toArray((err,doc)=>{
                        if(err) throw err;
                        res.render("page_principale.html",{livre: doc,utilisateur:req.session.utilisateur,date:date()})
                       
                    })
                });
            }
            else{
                res.render("nouveau_mot_passe.html",{"error":error()[2]})
            }
        }
    })
})

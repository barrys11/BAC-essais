const express=require('express');
const routeur=express.Router();
module.exports = routeur;

var fs = require('fs');
var vm=require('vm');
var fonc = fs.readFileSync('function-aux.js')
vm.runInThisContext(fonc)

//search pour les page index et principle
routeur.post("/search",(req,res)=>{
    let search={$regex:req.body.search, $options:'i'};
    let notfound=pasTrouver();
    dbm.collection("depot").find({$or:[{titre:search},{auteur:search},{edition:search},{prix:search}]}).toArray((err,doc)=>{
        if(req.session.utilisateur){
            if(doc!=[]){
                res.render("page_principale.html",{livre:doc,utilisateur:req.session.utilisateur});
            }else
                res.render("page_principale.html",{n_trouver:notfound,utilisateur:req.session.utilisateur});    
        }else{
            if(doc!=[]){
                res.render("index.html",{livre: doc});
            }else{
                res.render("index.html",{n_trouver:notfound});
            };
        }; 
    });
    });

// search pour la page select.
routeur.post("/search2",(req,res)=>{
    let search1={$regex:req.body.texte, $options:'i'};
    let notfound=pasTrouver();
    dbm.collection("depot").find({$or:[{titre:search1},{auteur:search1},{edition:search1},{prix:search1}]}).toArray((err,doc)=>{
        if(doc!=[]){
            res.render("select.html",{livre:doc,utilisateur:req.session.utilisateur});
        }else
            res.render("select.html",{n_trouver:notfound,utilisateur:req.session.utilisateur});    
    });
})
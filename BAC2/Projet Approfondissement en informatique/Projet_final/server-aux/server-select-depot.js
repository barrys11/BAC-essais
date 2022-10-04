const express=require('express');
const routeur=express.Router();
module.exports = routeur;

var fs = require('fs');
var vm=require('vm');
var fonc = fs.readFileSync('function-aux.js')
vm.runInThisContext(fonc)

//depôt
routeur.post("/depot",(req,res)=>{
    dbm.collection("depot").insertOne({"utilisateur":req.session.utilisateur,"titre":req.body.titre,"auteur":req.body.auteur,"edition":req.body.edition,"prix":req.body.prix,"date":date()},(err,doc)=>{
        if(err) throw err;
        dbm.collection("depot").find({}).toArray((err,doc)=>{
            if(err) throw err;
            res.render("page_principale.html",{livre: doc,utilisateur:req.session.utilisateur,date:date()})
        });
    });
});
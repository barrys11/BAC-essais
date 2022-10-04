const express=require('express');
const routeur=express.Router();
module.exports = routeur;

var fs = require('fs');
var vm=require('vm');
var fonc = fs.readFileSync('function-aux.js')
vm.runInThisContext(fonc)

//graph1

routeur.get("/graphique",(req,res)=>{
    let label=[];
    dbm.collection("depot").find({"utilisateur":req.session.utilisateur}).toArray((err,doc1)=>{
        if(err) throw err;
        if(doc1.length!=0){
            label.push(label_graph(doc1));
        }else{
            label.push(zero());
        }
        dbm.collection("vendu").find({"utilisateur":req.session.utilisateur}).toArray((err,doc2)=>{
            if(err) throw err;
            if(doc2.length!=0){
                label.push(label_graph(doc2));
            }else{
                label.push(zero());
            }
            dbm.collection("acheter").find({"utilisateur":req.session.utilisateur}).toArray((err,doc3)=>{
                if(err) throw err;
                if(doc3.length!=0){
                    label.push(label_graph(doc3));
                }else{
                    label.push(zero());
                }
                res.render("graph.html",{utilisateur:req.session.utilisateur,donner1: label});
            });
        });
    });
});

//graph2
routeur.get("/graph2",(req,res)=>{
    let data=[];
    dbm.collection("depot").find({"utilisateur":req.session.utilisateur}).toArray((err,doc1)=>{
        if(err) throw err;
        if(doc1!=[]){
            data.push(counte(doc1));
        }else{
            data.push(0);
        }
        dbm.collection("vendu").find({"utilisateur":req.session.utilisateur}).toArray((err,doc2)=>{
            if(err) throw err;
            if(doc2!=[]){
                data.push(counte(doc2));
            }else{
                data.push(0);
            }
            dbm.collection("acheter").find({"utilisateur":req.session.utilisateur}).toArray((err,doc3)=>{
                if(err) throw err;
                if(doc3!=[]){
                    data.push(counte(doc3));
                }else{
                    data.push(0);
                }
                res.render("graph2.html",{utilisateur:req.session.utilisateur,donner: data});
            });
        });
    });
});
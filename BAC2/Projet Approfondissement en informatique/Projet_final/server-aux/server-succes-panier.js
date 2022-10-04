const express=require('express');
const routeur=express.Router();
module.exports = routeur;

const { ObjectId } = require("bson");

function object(str){
    return ObjectId(str);
};


var fs = require('fs');
var vm=require('vm');
var fonc = fs.readFileSync('function-aux.js')
vm.runInThisContext(fonc)

var acheter=[];
var vendu=[];
var lst_panier=[];
var selectionne=selection();

//-----------------Debut Du Panier-------------------------------------------------------------------//

//ajoute dans la collection de panier
routeur.post("/panier",(req,res)=>{
    if(req.body.ecri!=""){
        let p=[];
        let text=lecture(req.body.ecri);
        text.forEach(element=>{
            p.push(object(element));
        });
        dbm.collection("depot").find({"_id":{"$in":p}}).toArray((err,doc)=>{
            doc.forEach(element=>{
                element.utilisateur=req.session.utilisateur;
            });
            dbm.collection("paniers").insertMany(doc,(err,d)=>{
                dbm.collection("depot").find({}).toArray((err,list)=>{
                    res.render("select.html",{livre:list,utilisateur:req.session.utilisateur,date: date()});
                })
            });
        })
    }else{
        let erreur=remplie();
        dbm.collection("depot").find({}).toArray((err,doc)=>{
            if(err) throw err;
            res.render("select.html",{livre: doc,utilisateur:req.session.utilisateur,date:date(),m_erreur:erreur})
        })
    }
});

//supprime dans le panier
routeur.post("/sup_panier",(req,res)=>{
    let texte= lecture(req.body.ec_panier);
    let l=[];
    texte.forEach(element=>{
        l.push(object(element))
    })
    dbm.collection("paniers").find({"_id":l[0]}).toArray((err,doc)=>{
        doc.forEach(element=>{
            dbm.collection("paniers").deleteOne(element);
        })
        res.redirect("/paniers");
    });
});

//affiche la page du panier
routeur.get("/paniers",(req,res)=>{
    dbm.collection("paniers").find({"utilisateur":req.session.utilisateur}).toArray((err,doc)=>{
        if (err) throw err;
        total=prix_total(doc);
        res.render("panier.html",{utilisateur:req.session.utilisateur,livre:doc,montant:total})
    });
});

//quitter la page du panier vers la page carte.html
routeur.get("/confirme",(req,res)=>{
    dbm.collection("paniers").find({}).toArray((err,doc)=>{
        doc.forEach(element=>{
            lst_panier.push(element);
        });
        if(lst_panier!=[]){
            lst_panier.forEach(element=>{
                dbm.collection("depot").findOne({"_id":element._id},(err,doc1)=>{
                    if(doc1==null){
                        dbm.collection("depot").findOne({"titre":element.titre,"auteur":element.auteur,
                        "edition":element.edition,"prix":element.prix},(err,dico)=>{
                            if(dico==null){
                                dbm.collection("paniers").find({"utilisateur":req.session.utilisateur}).toArray((err,doc)=>{
                                    if (err) throw err;
                                    total=prix_total(doc);
                                    res.render("panier.html",{utilisateur:req.session.utilisateur,livre:doc,montant:total,erreur:error()[3]});
                                    
                                });
                            }else{
                                vendu.push(dico);
                                acheter.push(dico);
                                res.redirect("/confirmer");
                            }
                        })
                    }else{
                        vendu.push(doc1);
                        acheter.push(doc1);
                        res.redirect("/confirmer");
                    }
                })
            });
        }else{
            dbm.collection("paniers").find({"utilisateur":req.session.utilisateur}).toArray((err,doc)=>{
                if (err) throw err;
                total=prix_total(doc);
                res.render("panier.html",{utilisateur:req.session.utilisateur,livre:doc,montant:total,erreur:console.error()[5]});
            });
        };
    });
});
//-----------------Fin Du Panier----------------------------------------------------------------------------------------//

//----------------Debut du select---------------------------------------------------------------------------------------//

//page de selectionne
routeur.post("/select",(req,res)=>{
    if(req.body.ecrie==""){
        let erreur=remplie();
        dbm.collection("depot").find({}).toArray((err,doc)=>{
            if(err) throw err;
            res.render("select.html",{livre: doc,utilisateur:req.session.utilisateur,date: date(),m_erreur:erreur})
            vendu=[];
            acheter=[];
        })
    }else{
        let texte= lecture(req.body.ecrie);
        let l=[];
        texte.forEach(element=>{
            l.push(object(element))
        })
        dbm.collection("depot").find({"_id":{"$in":l}}).toArray((err,doc)=>{
            m_total=prix_total(doc);
            doc.forEach(element=>{
                vendu.push(element);
            });
            doc.forEach(i=>{
                acheter.push(i);
            })
            if(err) throw err;
            res.render("vente.html",{livre: doc,montant:m_total,utilisateur:req.session.utilisateur,date: date()});
        });
    };
});

//corfirmer l'achat

routeur.post("/succes",(req,res)=>{
    let c_dat=(interval(req.body.c_date));
    if(c_dat=="true"){
        vendu.forEach(document=>{
            dbm.collection("depot").deleteOne(document);
        });
        dbm.collection("vendu").insertMany(vendu,(err,doc)=>{
            acheter.forEach(element=>{
                element.utilisateur=req.session.utilisateur;
            });
            dbm.collection("acheter").insertMany(acheter,(err,def)=>{
                if(lst_panier!=[]){
                    lst_panier.forEach(element=>{
                        dbm.collection("paniers").deleteOne(element);
                    });
                    lst_panier=[];
                }
                acheter=[];
            });
        });
        dbm.collection("depot").find({}).toArray((err,doc)=>{
            if(err) throw err;
            vendu=[];
            res.render("page_principale.html",{livre: doc,utilisateur:req.session.utilisateur,date:date()});
        });
    }else{
        res.render("carte_banque.html",{utilisateur:req.session.utilisateur,expire: error()[4]});
    }
});
//---------------Fin Du Select-----------------------------------------------------------------------------//
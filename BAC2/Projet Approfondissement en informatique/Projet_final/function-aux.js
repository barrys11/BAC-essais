function date(){ //pour créer la date qui se trouver sur les pages.
    const date=new Date();
    const mois=date.getMonth()+1;
    const d=date.getDate()+'/'+mois+'/'+date.getFullYear();
    return d;
}

function lecture(texte){ //a un str en paramettre et le transforme en liste
    var string=texte;
    var str =string.split(","); 
    return str;  
}

function prix_total(l){// utilise une liste de document pour calculer le prix des elements selectionner.
    var montant=0;
    l.forEach(element => {
        montant+=parseFloat(element.prix);
    });
    return montant;
}
function counte(lst){//utilise une liste de document pour compter le nombre de document.
    var cont=0
    lst.forEach(element=>{
        cont+=1;
    });return cont;
}

function verif(text){
    let stre=text
    let t=stre.split("/");
    return t;
}

function interval(texte){
    let vrai=[];
    let veri = verif(texte);
    const inter=new Date();
    let stre=String(inter.getFullYear());
    let anner = stre.slice(2,4);
    let anner_int=parseInt(anner);
    if(anner_int-5<=parseInt(veri[1]) && parseInt(veri[1])<=anner_int+5){
        vrai.push("true");
        if(parseInt(veri[0])>=1 && parseInt(veri[0])<=12){
            vrai.push("true")
        }else{
            vrai.push("false");
        }
    }else{
        vrai.push("false");
    };
    for(let i=0; i<vrai.length;i++){
        if(vrai[i]=="false"){
            return "false"
        }
    }return "true";
}

function label_graph(l){
    let lab=dico_graphe(l);
    let label=[];
    for(x in lab){
        label.push(lab[x]);
    }return label;
}

function dico_graphe(l){
    let dic_graphe={12:0,10:0,11:0,09:0,08:0,07:0,06:0,05:0,04:0,03:0,02:0,01:0};
    for(let i=0;i<l.length;i++){
        let str_dico=verif(l[i].date);
        dic_graphe[parseInt(str_dico[1])]+=1;
    }return dic_graphe;
}

function zero(){
    let co=[]
    for(let i=0;i<12;i++){
        co.push(0);
    }return co;
}

/*--------------------Debut des functions d'erreur-------------------------------------*/
function selection(){
    return "Veillez selectionner les livres que vous voulez acheter";
}


function erreur(){
    return "Le nom d'utilisateur et ou le mots de passe est incorrecte."
}

function pasTrouver(){
    return "Votre recherche n'existe pas dans la base de donner"
}

function remplie(){
    return "Veillez selectionner un document ou appuyer sur le boutton Acceuil pour revenir en arrière"
}

function existe(){
    return "Le nom d'utilisateur existe dans la base de donner choisissez un autre"
};
function error(){
    return ["Le nom d'utilisateur n'est pas valide et les mots de passe sont differents","Le nom d'utilisateur est incorrecte , veillez renseigner un nom d'utilisateur valide.",
    "Les mots de passe sont differents.","Un des Livre n'est plus disponible","verefier la date"]
}

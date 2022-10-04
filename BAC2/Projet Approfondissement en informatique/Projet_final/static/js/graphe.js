function graph(data1){
    var list=[];
    let lst=[];
    for(let i=0;i<data1.length;i++){
        if(i==data1.length-1){
            lst.push(data1[i]);
            list.push(lst);
        }else{
            lst.push(data1[i]);
            if(lst.length==12){
                list.push(lst);
                lst=[];
            }
        }
    };   
}
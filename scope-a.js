//スコープには
//browse > global > function(blode)
let a = 1;
console.log(a);

(function(){
    console.log(a);
})();

(function(){
    let a = 3;
    console.log(a);
    (function(){
        console.log(a);
    })();
    (function(a){
        console.log(a);
    })(4);
})();

function himitsu(){
    a++;
}


module.exports = {
    a: a
}



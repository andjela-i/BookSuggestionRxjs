import { knjige } from "../src";
import { Book } from "../src/book";

    export var kontPretraga = document.createElement("div");
    document.body.appendChild(kontPretraga);
    export var divUnos=document.createElement("div");
    kontPretraga.appendChild(divUnos);
    divUnos.className="divUnos";
    export var prikazKnjiga=document.createElement("div");
    prikazKnjiga.className="polica";
    export var clear=document.createElement("div");
    kontPretraga.appendChild(clear);
    kontPretraga.appendChild(prikazKnjiga);
    export var btn=document.createElement("button");
    clear.appendChild(btn);
    btn.innerHTML="Clear books";
    btn.onclick=(()=>{prikazKnjiga=clearBooks(prikazKnjiga)});
    export var polOceni=document.createElement("div");
    polOceni.className="pol2";
    export var btn2=document.createElement("button");
    btn2.innerHTML="Rate books";
    btn2.onclick=(()=>{getRandomBooks()});
    var divv=document.createElement("div");
    divv.className="divv";
    document.body.appendChild(divv);
    divv.appendChild(btn2);
    divv.appendChild(polOceni);
    


export function drawBook(knjiga:Book,kontejner:HTMLDivElement){

    var div=document.createElement("div");
    div.className="okvirKnjige";
    kontejner.appendChild(div);
    var lblNaslov=document.createElement("h3");
    lblNaslov.textContent=knjiga.title;
    var lblAutor=document.createElement("p");
    lblAutor.textContent=knjiga.autor;
    div.appendChild(lblNaslov);
    div.appendChild(lblAutor);
    var myImg=new Image();
    myImg.src=knjiga.slika;
    myImg.onclick=(()=>{vratiOpis(kontejner,knjiga)})
    myImg.width=150;
    myImg.height=200;
    div.appendChild(myImg);
    

}

function vratiOpis(div:HTMLDivElement,knjiga:Book){
    var opis=document.createElement("p");
    opis.innerHTML=knjiga.opis;
    div.appendChild(opis);
}

export function clearBooks(kontejner:HTMLDivElement){
    kontPretraga.removeChild(kontejner);
    var div = document.createElement("div");
    div.className="polica";
    kontPretraga.appendChild(div);
    return div;
}

export function clearInput(unos:HTMLInputElement){
    unos.value="";
}

function getRandomBooks(){
    var randKnjiga
    for(let i=0;i<5;i++){
    randKnjiga = knjige[Math.floor(Math.random()*knjige.length)];
    console.log(randKnjiga)
    drawBook(randKnjiga,polOceni)
    }
}

import { Book } from "../src/book";


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
    myImg.width=200;
    myImg.height=280;
    div.appendChild(myImg);

}

export function clearBooks(kontejner:HTMLDivElement){
    document.body.removeChild(kontejner);
    var div = document.createElement("div");
    div.className="polica";
    document.body.appendChild(div);
    return div;
}


import { fromEvent,debounceTime,map,filter,from,Observable,switchMap } from "rxjs";
import { drawBook,clearBooks} from "../view/draw";
import { Book } from "./book"

    var divUnos=document.createElement("div");
    document.body.appendChild(divUnos);
    var prikazKnjiga=document.createElement("div");
    prikazKnjiga.className="polica";
    var clear=document.createElement("div");
    document.body.appendChild(clear);
    document.body.appendChild(prikazKnjiga);
    var btn=document.createElement("button");
    clear.appendChild(btn);
    btn.innerHTML="Clear books";
    btn.onclick=(()=>{prikazKnjiga=clearBooks(prikazKnjiga)});



const URL = "http://localhost:3000/books/";
var knjiga: Book = {
    id: "drakula",
    title: "Drakula",
    zanr: "Horor",
    godina: 1897,
    autor: "Brem Stoker",
    slika: "../assets/5107.jpg"
} ;


function movieInput(){
    const unos = document.createElement("input");
    divUnos.appendChild(unos);

    fromEvent(unos,"input").pipe(
        debounceTime(500),
        map((ev:InputEvent)=>(<HTMLInputElement>ev.target).value),
        filter((txt:string)=>txt.length>=3),
        switchMap(title=>getBook(title))
    ).subscribe(obj=>{
        console.log("---",obj);
        console.log(obj.zanr);
        knjiga.id=obj.id
        knjiga.godina=obj.godina;
        knjiga.slika=obj.slika;
        knjiga.title=obj.title;
        knjiga.zanr=obj.zanr;
        drawBook(knjiga,prikazKnjiga);
        clearInput(unos)
    });
        
}

function clearInput(unos:HTMLInputElement){
    unos.value="";
}

movieInput();

/* function crtaj(knjiga:Book){
if (knjiga!=undefined){
    const p = document.createElement("p");
    p.textContent= knjiga.title;
    console.log("boze molim te",knjiga);
    const d = document.createElement("div");
    document.body.appendChild(d);
    d.appendChild(p);
    var myImg=new Image();
    myImg.src=knjiga.slika;
    myImg.width=200;
    myImg.height=350;
    d.appendChild(myImg);
}
} */

//crtaj();

function getBook(title:string):Observable<Book>{
    const title2=title.split(" ").join("_").toLowerCase();
    console.log(title2);
    const promis = fetch(URL+title2)
    .then(response =>{
        if(!response.ok){
            throw new Error("nema te knjige");
        }
        else{
            return response.json()
        }
    })
    .catch(err=>console.error(err));
    return from(promis)
}



//getBook("Drakula").subscribe(book=>console.log(book))



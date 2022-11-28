import { fromEvent,debounceTime,map,filter,from,Observable,switchMap } from "rxjs";
import { drawBook,clearBooks, divUnos, prikazKnjiga, clearInput} from "../view/draw";
import { environments } from "../view/enviroment";
import { Book } from "./book"
import { vratiSveKnjige } from "./controller"
import { getBook } from "./controller";

export var knjige:Book[]=[];

var knjiga: Book = {
    id: "drakula",
    title: "Drakula",
    zanr: "Horor",
    godina: 1897,
    autor: "Brem Stoker",
    slika: "../assets/5107.jpg",
    opis:""
} ;


function bookInput(){
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
        knjiga.id=obj.id;
        knjiga.opis=obj.opis;
        knjiga.godina=obj.godina;
        knjiga.slika=obj.slika;
        knjiga.title=obj.title;
        knjiga.zanr=obj.zanr;
        drawBook(knjiga,prikazKnjiga);
        clearInput(unos)
    });
};

vratiSveKnjige().subscribe(lista=>{
    console.log(lista);
    knjige=lista;    
    console.log(knjige);
});



bookInput();




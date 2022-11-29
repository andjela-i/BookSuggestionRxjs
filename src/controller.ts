import { filter, from, map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { knjige } from ".";
import { environments } from "../view/enviroment";
import { Book } from "./book";

export function vratiSveKnjige():Observable<Book[]>{
    const promise = fetch(environments.API_URL)
    .then(response=>{
        if(!response.ok){
            throw new Error("greska u f-ji vrati sve knjige");
        }
        else{
            return response.json()
        }
    })
    .catch(err=>console.error(err));
    return from(promise)
}

export function getBook(title:string):Observable<Book>{
    const title2=title.split(" ").join("_").toLowerCase();
    console.log(title2);
    const promis = fetch(environments.API_URL+"/"+title2)
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


export function vratiRandZanr(zanr:string){

    var knjigeZanr:Book[];
    vratiSveKnjige().pipe(
        map(items=>
            items.filter(book=>book.zanr==zanr))
    ).subscribe((data)=>{
        knjigeZanr=data;
        ispisiPredlog(knjigeZanr);
        }
        );

    
}

function ispisiPredlog(knjige:Book[]){
    var div=document.querySelector(".divv");
    var pol=document.querySelector(".pol2");
    div.removeChild(pol);
    var polll=document.createElement("div");
    div.appendChild(polll);
    var p = document.createElement("p");
    knjige.forEach(elem =>{
        p.innerHTML=elem.title;
        polll.appendChild(p);
    })
    polll.className="pol2";
}

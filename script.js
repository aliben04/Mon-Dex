import { creatures } from "./data.js";
// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------
let section=document.querySelector("#grid")
let filters=document.querySelector("#filters")

let types=[]
creatures.forEach((creat)=>{
    let typeShape=""
    switch(creat.type){
        case "Feu": typeShape+="bg-orange-500"; break;
        case "Eau": typeShape+="bg-blue-500"; break;
        case "Plante": typeShape+="bg-green-500"; break;
        case "Électrik": typeShape+="bg-yellow-500 "; break;
        case "Psy": typeShape+="bg-purple-500 "; break;
        case "Fée": typeShape+="bg-pink-200 "; break;
        case "Normal": typeShape+=" bg-black"; break;
        case "Ténèbres": typeShape+="bg-purple-950"; break;
        case "Combat": typeShape+="bg-yellow-950"; break;
    }
     if (!types.includes(creat.type)) {
        types.push(creat.type);
    } 
    let article=document.createElement("article")
    article.innerHTML=`
        <article class="flex flex-col gap-3 rounded-card border-2 border-red-500 bg-white p-3 pb-4 hover:translate-y-2">
          <div class="relative flex h-40 items-center justify-center rounded-xl bg-brand-light">
            <img src="${creat.image}" 
          class="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
          alt="">
            <span class="absolute left-3 top-2 font-mono text-sm text-muted">${creat.id}</span>
          </div>
          <div class="flex items-center justify-between gap-2 flex-col md:flex-row">
            <h3 class="font-display text-xl font-semibold">${creat.name}</h3>
            <span class="rounded-full ${typeShape} px-3 py-1 text-sm font-bold text-white ">${creat.type}</span>
          </div>
          <p class="text-sm text-muted text-center md:text-start">${creat.level} · Total ${creat.stats.attack+creat.stats.defence}</p>
          <button type="button" class="btn-outline  bg-red-500 text-white" >Ajouter à l'équipe</button>
        </article>
    
    `

// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------
    let idPok=document.querySelector("#idPok")
    let imgDetails=document.querySelector("#imgDetails")
    let nameDetails=document.querySelector("#nameDetails")
    let descriptionDeatls=document.querySelector("#descriptionDeatls")
    let pv=document.querySelector("#pv")
    let attaque=document.querySelector("#attaque")
    let defense=document.querySelector("#defense")
    let type=document.querySelector("#type")
    article.addEventListener("click",()=>{
      idPok.innerHTML=creat.id
      imgDetails.setAttribute("src",`${creat.image}`)
      nameDetails.innerHTML=creat.name 
      descriptionDeatls.innerHTML=creat.description 
      pv.innerHTML=`
      <span class="font-bold">PV</span>
      <span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full ${typeShape}" style="width: ${creat.stats.hp}%"></span></span>
      <span class="text-right font-mono">${creat.stats.hp}</span>
      `
      attaque.innerHTML=`
      <span class="font-bold">Attaque</span>
      <span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full ${typeShape}" style="width: ${creat.stats.attack}%"></span></span>
      <span class="text-right font-mono">${creat.stats.attack}</span>
      `
      defense.innerHTML=`
      <span class="font-bold">Defece</span>
      <span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full ${typeShape}" style="width: ${creat.stats.defence}%"></span></span>
      <span class="text-right font-mono">${creat.stats.defence}</span>
      `
      type.innerHTML=creat.type
      
      type.setAttribute("class",`rounded-full ${typeShape} px-3 py-1 text-sm font-bold text-white`)
   


    })
    section.append(article)
})
  
types.forEach((t)=>{
    let button=document.createElement("button")
    button.innerHTML=`<button type="button" class="chip shrink-0">${t}</button>`
    filters.append(button)
})



function deatails(){

}
// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------

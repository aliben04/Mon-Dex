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
let cmp=document.querySelector("#cmp")

let teams = JSON.parse(localStorage.getItem("teams")) || [];
let tem = teams;

function afficherCard(cart){
  let typeShape=""
    
    switch(cart.type){
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
      let article=document.createElement("article")
    article.innerHTML=`
        <article class="flex flex-col gap-3 rounded-card border-2  bg-white p-3 pb-4 hover:translate-y-2">
          <div class="relative flex h-40 items-center justify-center rounded-xl bg-brand-light">
            <img src="${cart.image}" 
          class="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
          alt="">
            <span class="absolute left-3 top-2 font-mono text-sm text-muted">${cart.id}</span>
          </div>
          <div class="flex items-center justify-between gap-2 flex-col md:flex-row">
            <h3 class="font-display text-xl font-semibold">${cart.name}</h3>
            <span class="rounded-full ${typeShape} px-3 py-1 text-sm font-bold text-white ">${cart.type}</span>
          </div>
          <p class="text-sm text-muted text-center md:text-start">${cart.level} · Total ${cart.stats.attack+cart.stats.defence}</p>
          <button id="ajouter" type="button" class="btn-outline ${typeShape} text-white " >Ajouter à l'équipe</button>
        </article>
    `
    let btnA=article.querySelector("#ajouter")
    let btnDisabled=false
      btnA.addEventListener("click",()=>{
      let card={
          id:cart.id,
          img:cart.image,
          name:cart.name,
      }
      if(teams.length<6){
        teams.push(card)

        localStorage.setItem("teams", JSON.stringify(teams));
        addcartInTeam()
      }
      cmp.textContent=teams.length
      btnDisabled=true
      btnA.disabled=true
      btnA.classList="btn-outline bg-grey-500 text-black "
      })
      
      if(btnDisabled){
        btnA.disabled=true
      }
      



// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------
  
   
    article.addEventListener("click",()=>{

      detail.innerHTML=`
      
          <div class="flex items-center justify-between">
            <span  class="font-mono text-sm text-muted">${cart.id}</span>
            <button id="close" type="button" aria-label="Fermer le détail" class="btn-outline bg-red-500 w-11 px-0">✕</button>
          </div>
          <div class="flex h-48 items-center justify-center rounded-2xl bg-brand-light">
            <img src="${cart.image}"
          class="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
          alt="">
          </div>
          <div class="flex items-center justify-between">
            <h2  class="font-display text-3xl font-extrabold">${cart.name}</h2>
            <span id="type" class="rounded-full ${typeShape} px-3 py-1 text-sm font-bold text-white">${cart.type}</span>
          </div>
          <p class="text-gray-700">${cart.description}</p>
          <div class="flex flex-col gap-2 text-sm">
            <div id="pv" class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold">PV</span>
                    <span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full ${typeShape}" style="width:${cart.stats.hp}%"></span></span>
                    <span class="text-right font-mono">${cart.stats.hp}</span>
            </div>
            <div id="attaque" class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
              <span class="font-bold">Attaque</span>
              <span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full ${typeShape}" style="width: ${cart.stats.attack}%"></span></span>
              <span class="text-right font-mono">${cart.stats.attack}</span>
            </div>
            <div id="defense" class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
              <span class="font-bold">Defece</span>
              <span class="h-3 rounded-full bg-ground"><span class="block h-3 rounded-full ${typeShape}" style="width: ${cart.stats.defence}%"></span></span>
              <span class="text-right font-mono">${cart.stats.defence}</span>
            </div>
          </div>
          <button id="ajouter" type="button" class="btn-primary ${typeShape}">Ajouter à l'équipe</button>
      
      `
      detail.querySelector("#close").addEventListener("click", () => {
          detail.innerHTML = '<h1 class="text-center font-bold">Aucun Pokémon sélectionné</h1>';
      });
      let btnA=detail.querySelector("#ajouter")
      btnA.addEventListener("click",()=>{
      let card={
          id:cart.id,
          img:cart.image,
          name:cart.name,
      }
      if(teams.length<6){
        teams.push(card)
        addcartInTeam()
      }
      cmp.textContent=teams.length
      btnDisabled=true
      btnA.disabled=true
      btnA.classList="btn-outline bg-grey-500 text-black "
      })
      if(btnDisabled){
        btnA.disabled=true
      }
      
    })
    
    section.append(article)

}

cmp.textContent=teams.length
let section=document.querySelector("#grid")
let filters=document.querySelector("#filters")
let detail=document.querySelector("#detail")



creatures.forEach((pok)=>{
  afficherCard(pok)
})
      
// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------

let search=document.querySelector("#search")

search.addEventListener("input",()=>{
  section.innerHTML = "";
  creatures.forEach((creat)=>{
    if(creat.name.toLowerCase().includes(search.value.toLowerCase())){
      afficherCard(creat)
  }
  
  })
  if (section.innerHTML === "") {
        section.innerHTML = "<h1 class='text-center font-bold rounded-card border-2 border-ink bg-white p-6'>Aucun Pokémon trouvé !</h1>";
  }

})

// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------
let types=[]
creatures.forEach((pok)=>{
      if (!types.includes(pok.type)) {
          types.push(pok.type);
      } 
})
let tous=document.querySelector("#tous")
tous.addEventListener("click",()=>{
    section.innerHTML = "";
      creatures.forEach((pok)=>{
        afficherCard(pok)
      })
    tous.className=`chip shrink-0 focus:${typeShape} focus:text-white focus:border-red-500`
  })
function filterWithType(type){
  section.innerHTML = "";
    creatures.forEach((pok)=>{
      if(pok.type===type){
        afficherCard(pok)
      }
    })
}

types.forEach((t)=>{
    let button=document.createElement("button")
    button.textContent=t;
    button.className="chip shrink-0 "
    button.addEventListener("click",()=>{
      filterWithType(t)  
      button.className="chip shrink-0 focus:bg-red-500 focus:text-white focus:border-red-500"
      tous.className="chip shrink-0"
    })
    filters.append(button)
})

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

console.log(teams)


let listT=document.querySelector("#listT")
function addcartInTeam() {
    listT.innerHTML = "";

    teams.forEach((te) => {
        let div = document.createElement("div");

        div.innerHTML = `
            <div  class="relative border flex flex-col rounded-lg p-2">
             <button id="removePok" ><i class="fa-solid fa-xmark text-[16px] absolute right-0 top-1 text-red-500"></i></button>
                <img src="${te.img}" alt="${te.name}" class="py-3">
                <h3 class="text-[16px] font-bold text-center">
                    ${te.name}
                </h3>
            </div>
        `;

        listT.append(div);
        div.querySelector("#removePok").addEventListener("click",()=>{
          teams.splice(teams.indexOf(te),1)
          localStorage.setItem("teams", JSON.stringify(teams));
          cmp.textContent=teams.length
          addcartInTeam();
        })
  
    });
}
addcartInTeam()
// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------

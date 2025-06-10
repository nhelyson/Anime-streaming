if (document.getElementById("body_search")) {
 let perPage = 20;
 let passenger = 0;

function view(urlBase, line , contains_bouton) {
  contains_bouton.innerHTML = ""
  const offset = passenger * perPage;
  console.log(offset)
  const url = `${urlBase}&page[limit]=${perPage}&page[offset]=${offset}`;
  console.log(offset)
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const animes = data.data;
      console.log(animes)
      let meta = data.meta.count
      let count = Math.ceil(meta/perPage)
      console.log(count)
      let reload = document.getElementById("back")
       if (!reload) {
        reload = document.createElement("button");
        reload.id = "back";
        reload.className = "btn btn-transparent  me-3";
        reload.innerHTML= 
        `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11 19L4 12L11 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M18 19L11 12L18 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
        `;
        reload.style.fontSize = "0.9rem"
        contains_bouton.appendChild(reload);
        reload.addEventListener("click", () => {
        if (passenger >1) {
          passenger -= 1;
          view(urlBase, line, contains_bouton);
        }

      });
      
      }
      // Ajouter les nouveaux animes sans effacer les précédents
      animes.forEach(anime => {
        const div = document.createElement("div");
        div.className = "col";
        div.style.cursor = "pointer"
        const card = document.createElement("div");
        card.className = "card border-0";

        const img = document.createElement("img");
        img.className = "img-fluid";
        img.style.objectFit = "cover";
        img.style.width = "100%";
        img.style.height = "100%";
        img.src = anime.attributes.posterImage?.large || "";
        img.alt = anime.attributes.canonicalTitle;

        const div_title = document.createElement("p");
        div_title.className = "mt-3 fw-bold";
        div_title.style.fontSize = "0.8rem";
        div_title.textContent = anime.attributes.canonicalTitle;

        card.appendChild(img);
        card.appendChild(div_title);
        div.appendChild(card);
        line.appendChild(div);

        div.addEventListener("click", () => {
            const history = {
           Anime_title: anime.attributes.titles.en || anime.attributes.canonicalTitle,
           Anime_image: img.src,
           Anime_id:anime.id
           };
          
    
          let historique_recept = JSON.parse(localStorage.getItem('historique')) || [];
          historique_recept.unshift(history);
          localStorage.setItem('historique', JSON.stringify(historique_recept));

          window.location.href = `manga_info.html?Anime_name=${encodeURIComponent(anime.attributes.canonicalTitle)}&id=${anime.id}&page=false`;
        });
      });

      if(count >=100){
        count = Math.ceil(count/75)
        console.log(count)
       }
       const count_page = document.createElement("button")
       for(i=1; i<=count; i++){
        const pagination = document.createElement("button")
        pagination.className = "btn text-dark"
        pagination.innerHTML = `${i}`
        pagination.style.backgroundColor = "#e3f0fcff"
        pagination.dataset.number= `${i}`
        contains_bouton.appendChild(pagination)
        pagination.addEventListener("click", function(){
        line.innerHTML = ""
        passenger=0
        passenger += parseInt(this.textContent)
         view(urlBase, line, contains_bouton);
        })
        
        if(passenger === parseInt(pagination.textContent)){
          pagination.className = "btn text-white border-0"
          pagination.style.backgroundColor = "#2980b9ff"
        }
      }

       // Crée le bouton "Charger plus" une seule fois
      let load = document.getElementById("loadMoreButton");
      if (!load) {
        load = document.createElement("button");
        load.id = "loadMoreButton";
        load.className = "btn btn-transparent text-dark";
        load.style.fontSize = "0.9rem"
        load.innerHTML = `
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M13 5L20 12L13 19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M6 5L13 12L6 19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`
        contains_bouton.appendChild(load);
        load.addEventListener("click", () => {
           passenger += 1;
          if(passenger >=count){
           load.setAttribute("disabled", "true");
          }
              view(urlBase, line, contains_bouton);
        });
      }
      count_page.className = "btn text-dark mt-3 ms-auto"
      count_page.innerHTML = `<p class="">Page:${passenger}/${count}</p>`
      contains_bouton.appendChild(count_page)
    })
    .catch(error => {
      console.error("Erreur lors du chargement :", error);
    });
}

fetch("https://kitsu.io/api/edge/anime?filter[status]=current&page[limit]=4&sort=popularityRank")
  .then(res => res.json())
  .then(data => {
    const animes = data.data;
    console.log(animes)
    const btn =  document.getElementById("btn-place")
    const row = document.getElementById("Anime");
    row.innerHTML = "";
    const button_view = document.createElement('button');
    button_view.className = "btn btn-transparent text-end border-0 ms-auto me-2";
    button_view.style.fontSize = "1rem"
    button_view.style.width = "6rem";
    button_view.textContent = "voir plus";

    animes.forEach(anime => {
      const div = document.createElement('div');
      div.className = "col";

      const card = document.createElement('div');
      card.className = "card border-0";
      card.style.cursor = "pointer";

      const img = document.createElement('img');
      img.className = "img-fluid img";
      img.style.objectFit = "cover";
      img.style.width = "100%";
      img.style.height = "100%";
      img.src = anime.attributes.posterImage?.large || "";
      img.alt = anime.attributes.canonicalTitle;

      const div_title = document.createElement('p');
      div_title.className = "mt-3 fw-bold";
      div.setAttribute("style", "font-size:0.9rem");
      div_title.innerHTML = anime.attributes.canonicalTitle;

      card.appendChild(img);
      card.appendChild(div_title);
      div.appendChild(card);
      row.appendChild(div);

      div.addEventListener("click", () => {
        window.location.href = `manga_info.html?Anime_name=${encodeURIComponent(anime.attributes.canonicalTitle)}&id=${anime.id}&page=false`;
      });
    });

    btn.appendChild(button_view);

  button_view.addEventListener("click", function () {
  row.innerHTML = "";
  btn.remove()
  passenger = 0; // on réinitialise pour partir de la première page
  view(`https://kitsu.io/api/edge/anime?filter[status]=current&filter[subtype]=TV&sort=popularityRank`, 
       document.getElementById("Anime"),
       document.getElementById("pagination"));
  passenger = 1;
});

  })
  .catch(err => {
    console.error("Erreur :", err);
  });

  fetch("https://kitsu.io/api/edge/anime?page[limit]=4&sort=popularityRank")
  .then(res => res.json())
  .then(data => {
    const animes = data.data;
    console.log(animes)
    const btn =  document.getElementById("btn_trend")
    const row = document.getElementById("trending");
    row.innerHTML = "";
    const button_view = document.createElement('button');
    button_view.className = "btn btn-transparent text-end border-0 ms-auto me-2";
    button_view.style.fontSize = "1rem"
    button_view.style.width = "6rem";
    button_view.textContent = "voir plus";

    animes.forEach(anime => {
      const div = document.createElement('div');
      div.className = "col";

      const card = document.createElement('div');
      card.className = "card border-0";
      card.style.cursor = "pointer";

      const img = document.createElement('img');
      img.className = "img-fluid img";
      img.style.objectFit = "cover";
      img.style.width = "100%";
      img.style.height = "100%";
      img.src = anime.attributes.posterImage?.large || "";
      img.alt = anime.attributes.canonicalTitle;

      const div_title = document.createElement('p');
      div_title.className = "mt-3 fw-bold";
      div.setAttribute("style", "font-size:0.9rem");
      div_title.innerHTML = anime.attributes.canonicalTitle;

      card.appendChild(img);
      card.appendChild(div_title);
      div.appendChild(card);
      row.appendChild(div);

      div.addEventListener("click", () => {
        window.location.href = `manga_info.html?Anime_name=${encodeURIComponent(anime.attributes.canonicalTitle)}&id=${anime.id}&page=false`;
      });
    });

    btn.appendChild(button_view);

  button_view.addEventListener("click", function () {
  row.innerHTML = "";
  btn.remove()
  passenger = 0; // on réinitialise pour partir de la première page
  view(`https://kitsu.io/api/edge/anime?sort=popularityRank`, 
       document.getElementById("trending"),
       document.getElementById("pagination_trend"));
      passenger = 1;
    });

  })
  .catch(err => {
    console.error("Erreur :", err);
  });

  //code pour l'historique de navigation
  const hist = JSON.parse(localStorage.getItem('historique')) || [];
  const historique = document.getElementById("historique");
  const recept_hist = document.querySelector('.recept-hist');
  const contains_historique = document.createElement('div');

  contains_historique.style.display = "none";
  contains_historique.style.overflowX = "hidden";
  contains_historique.style.overflowY = "scroll";
  contains_historique.style.borderRadius = "10px";
  contains_historique.className = "p-3 contains-historique";
  contains_historique.style.background = "black";
  contains_historique.style.color = "white";
  contains_historique.style.position = "relative";
  contains_historique.style.maxHeight = "85vh"; 
  const screenWidth = window.innerWidth;
  if (screenWidth <= 576) { 
    contains_historique.style.width = "90vw";
    contains_historique.style.left = "0";
    contains_historique.style.right = "0";
    contains_historique.style.margin = "auto";
  } else if (screenWidth <= 768) { 
    contains_historique.style.width = "70vw";
    contains_historique.style.left = "2rem";
  } else { 
    contains_historique.style.width = "20rem";
    contains_historique.style.left = "5rem";
  }

  recept_hist.appendChild(contains_historique);

  hist.forEach(retrace => {
    const div = document.createElement('div');
    div.className = "d-flex flex-row card border-0 bg-transparent mb-4";
    div.style.cursor = "pointer";

    const img = document.createElement('img');
    img.src = retrace.Anime_image;
    img.alt = retrace.Anime_title;
    img.style.width = "100px";

    const div_body = document.createElement('div');
    div_body.className = "card-body";

    const p = document.createElement('p');
    p.className = "text-white";
    p.textContent = retrace.Anime_title;

    div_body.appendChild(p);
    div.appendChild(img);
    div.appendChild(div_body);
    contains_historique.appendChild(div);

    div.addEventListener("click", function () {
      window.location.href = `manga_info.html?Anime_name=${encodeURIComponent(retrace.Anime_title)}&id=${encodeURIComponent(retrace.Anime_id)}`;
    });
  });

  historique.addEventListener("click", function () {
    contains_historique.classList.toggle('active_historique');
  });
const contain = document.querySelector('.contains-queries') 
const div = document.createElement('div');
div.className = "menu-queries mt-5"

const ul = document.createElement('ul');
ul.className = 'p-2 w-50 me-auto ms-0'
ul.style.display = "flex";
ul.style.flexDirection = "column";
ul.style.gap = "20px"; 
ul.style.marginRight = "50rem"
div.appendChild(ul);

function menu(href, contains) {
  const li = document.createElement('li');
  li.className = "nav-item";

  const a = document.createElement('a');
  a.className = "nav-links";
  a.innerHTML = contains;
  a.href = href;

  a.style.color = "rgb(239, 239, 239)";
  a.style.fontSize = "0.9rem"
  a.style.textDecoration = "none";

  a.addEventListener("mouseover", () => {
    a.style.color = "white";
  });
  a.addEventListener("mouseout", () => {
    a.style.color= "rgb(239, 239, 239)";
  });

  li.appendChild(a);
  ul.appendChild(li);
}

menu('#', 'Search');
menu('#', 'About');
menu('#', 'Investigate');

  contain.appendChild(div)
  const button_menu = document.getElementById("button-menu")
  button_menu.addEventListener('click', function(){
    if(document.querySelector('.menu-queries')){
      document.querySelector('.menu-queries').classList.toggle('active_menu')
    }
  })
  window.addEventListener("click" , function(event){
  const menu = document.querySelector('.menu-queries');
  const button = document.getElementById('button-menu');

  if (menu) {
    if (!menu.contains(event.target) && !button.contains(event.target)) {
    
      menu.classList.remove('active_menu'); 
    }
  }
  })
}
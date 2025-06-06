if (document.getElementById("body_search")) {
 let perPage = 20;
let passenger = 0;

function view(urlBase, line) {
  const offset = passenger * perPage;
  const url = `${urlBase}&page[limit]=${perPage}&page[offset]=${offset}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const animes = data.data;

      // Crée le bouton "Charger plus" une seule fois
      let load = document.getElementById("loadMoreButton");
      if (!load) {
        load = document.createElement("button");
        load.id = "loadMoreButton";
        load.className = "btn btn-primary my-3 d-block mx-auto";
        load.textContent = "Charger plus";
        line.parentNode.appendChild(load);
        let count = 2
        let descr = 1
        let descr_2 = 1
        load.addEventListener("click", () => {
          passenger += 1;
          passenger += count
          passenger -=descr
          passenger -= descr_2
          load.innerHTML = passenger
          view(urlBase, line);
        });
      }

      // Ajouter les nouveaux animes sans effacer les précédents
      animes.forEach(anime => {
        const div = document.createElement("div");
        div.className = "col-5 col-lg-3 col-md-5 col-sm-4 align-items-stretch";

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
        div_title.style.fontSize = "0.9rem";
        div_title.textContent = anime.attributes.canonicalTitle;

        card.appendChild(img);
        card.appendChild(div_title);
        div.appendChild(card);
        line.appendChild(div);

        div.addEventListener("click", () => {
            const history = {
           Anime_title: anime.attributes.titles.en || Anime.attributes.canonicalTitle,
           Anime_image: img.src,
           Anime_id:anime.id
           };
          
    
          let historique_recept = JSON.parse(localStorage.getItem('historique')) || [];
          historique_recept.unshift(history);
          localStorage.setItem('historique', JSON.stringify(historique_recept));
          
          window.location.href = `manga_info.html?Anime_name=${encodeURIComponent(anime.attributes.canonicalTitle)}&id=${anime.id}&page=false`;
        });
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement :", error);
    });
}

fetch("https://kitsu.io/api/edge/anime?filter[status]=current&filter[subtype]=TV&page[limit]=4&sort=popularityRank")
  .then(res => res.json())
  .then(data => {
    const animes = data.data;
    const row = document.getElementById("Anime");
    row.innerHTML = "";

    const button_view = document.createElement('button');
    button_view.className = "btn btn-transparent text-end border-0 ms-auto me-2";
    button_view.style.width = "5rem";
    button_view.textContent = "view all";

    animes.forEach(anime => {
      const div = document.createElement('div');
      div.className = "col-3 col-lg-3 col-md-5 col-sm-2";

      const card = document.createElement('div');
      card.className = "card border-0";
      card.style.cursor = "pointer";

      const img = document.createElement('img');
      img.className = "img-fluid";
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

    row.appendChild(button_view);

  button_view.addEventListener("click", function () {
  row.innerHTML = "";
  passenger = 0; // on réinitialise pour partir de la première page
  view(`https://kitsu.io/api/edge/anime?filter[status]=current&filter[subtype]=TV&sort=popularityRank`, document.getElementById("Anime"));
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

}
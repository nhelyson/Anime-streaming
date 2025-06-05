if (document.getElementById("body_search")) {
  function view(url, line) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const animes = data.data;
      let row = line; 
      row.innerHTML = ""; 

      animes.forEach(anime => {
      const div = document.createElement('div');
      div.className = "col-5 col-lg-3 col-md-5 col-sm-4 align-items-stretch";

      const card = document.createElement('div');
      card.className = "card border-0";

      const div_body = document.createElement('div');
      div_body.className = "card-body";

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
    })
    .catch(err => {
      console.error("Erreur :", err);
    });
  } 
  fetch("https://kitsu.io/api/edge/anime?filter[status]=current&filter[subtype]=TV&page[limit]=4&sort=popularityRank")
  .then(res => res.json())
  .then(data => {
    const animes = data.data;
    const row = document.getElementById("Anime");
    row.innerHTML = "";
    const button_view = document.createElement('button')
    button_view.className = "btn btn-transparent text-end border-0 ms-auto me-2"
    button_view.style.width = "5rem"
    button_view.textContent = "view all"
    animes.forEach(anime => {
      const div = document.createElement('div');
      div.className = "col-3 col-lg-3 col-md-5 col-sm-2";

      const card = document.createElement('div');
      card.className = "card border-0";

      const div_body = document.createElement('div');
      div_body.className = "card-body";

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
      row.appendChild(button_view)
      div.addEventListener("click", () => {
      window.location.href = `manga_info.html?Anime_name=${encodeURIComponent(anime.attributes.canonicalTitle)}&id=${anime.id}&page=false`;
      });
       button_view.addEventListener("click" , function(){
        view("https://kitsu.io/api/edge/anime?filter[status]=current&filter[subtype]=TV&page[limit]=20&sort=popularityRank", document.getElementById("Anime"))
      })
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
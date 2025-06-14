if (document.getElementById("body_search")) {
 let perPage = 20;
 let passenger = 0;
 let letter = "anime"
  function view(urlBase, line, contains_bouton) {
  contains_bouton.innerHTML = "";
  const offset = passenger * perPage;
  const url = `${urlBase}&page[limit]=${perPage}&page[offset]=${offset}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const animes = data.data;
      let meta = data.meta.count;
      let count = Math.ceil(meta / perPage);

      animes.forEach(anime => {
        const div = document.createElement("div");
        div.className = "col";
        div.style.cursor = "pointer";

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
            Anime_id: anime.id
          };

          let historique_recept = JSON.parse(localStorage.getItem('historique')) || [];
          historique_recept.unshift(history);
          localStorage.setItem('historique', JSON.stringify(historique_recept));

          window.location.href = `manga_info.html?Anime_name=${encodeURIComponent(anime.attributes.canonicalTitle)}&id=${anime.id}&page=false`;
        });
      });
      const maxVisiblePages = 3;
      const startPage = Math.max(1, passenger - 1);
      const endPage = Math.min(count, passenger + 1);

      for (let i = 1; i <= count; i++) {
         if (count > 50) {
            count = Math.ceil(count / 25)*18;
          }

        if (i === 1 || i === count || (i >= startPage && i <= endPage)) {
          const pagination = document.createElement("button");
          pagination.className = "btn text-dark mx-1";
          pagination.innerHTML = `${i}`;
          pagination.dataset.number = `${i}`;

          if (passenger === i) {
            pagination.className = "btn text-white border-0";
            pagination.style.backgroundColor = "#2980b9ff";
          } else {
            pagination.style.backgroundColor = "#e3f0fcff";
          }

          pagination.addEventListener("click", function () {
            line.innerHTML = "";
            passenger = parseInt(this.textContent);
            view(urlBase, line, contains_bouton);
          });

          contains_bouton.appendChild(pagination);
        } else if ((i === startPage - 1 && i > 1) || (i === endPage + 1 && i < count)) {
          const dots = document.createElement("span");
          dots.textContent = "...";
          dots.className = "mx-1";
          contains_bouton.appendChild(dots);
        }
      }
    })
    .catch(error => {
      console.error("Erreur lors du chargement :", error);
    });
}
fetch(`https://kitsu.io/api/edge/${letter}?filter[status]=current&page[limit]=4&sort=popularityRank`)
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
  view(`https://kitsu.io/api/edge/${letter}?filter[status]=current&filter[subtype]=TV&sort=popularityRank`, 
       document.getElementById("Anime"),
       document.getElementById("pagination"));
  passenger = 1;
});

  })
  .catch(err => {
    console.error("Erreur :", err);
  });

  fetch(`https://kitsu.io/api/edge/${letter}?page[limit]=4&sort=popularityRank`)
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
  view(`https://kitsu.io/api/edge/${letter}?sort=popularityRank`, 
       document.getElementById("trending"),
       document.getElementById("pagination_trend"));
      passenger = 1;
    });

  })
  .catch(err => {
    console.error("Erreur :", err);
  });

}

if(document.querySelector('.nabvar-contain')){
 fetch('navbar.html')
  .then(res => res.text())
  .then(data =>{     
    let contain =  data
    if(contain){
     const div = document.querySelector('.nabvar-contain')
     div.innerHTML = contain

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

     const contain_menu = document.querySelector('.contains-queries') 
     const div_menu = document.createElement('div');
     div_menu.className = "menu-queries"

     const ul = document.createElement('ul');
     ul.className = 'p-2 w-50 me-auto ms-0'
     ul.style.display = "flex";
     ul.style.flexDirection = "column";
     ul.style.gap = "20px"; 
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

  menu('index.html', `<i class="fa-solid fa-magnifying-glass fa-lg"></i>`);
  menu('news.html', `<i class="fa-solid fa-message fa-lg"></i>`);
  menu('#', `<i class="fa-solid fa-user-secret fa-lg"></i>`);
  div_menu.appendChild(ul);
  contain_menu.appendChild(div_menu)
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

    })

    }

    if(document.getElementById("news")){
        const updates = [  
      {
        date: '2025-06-14',
        title: 'Amélioration des performances',
        description: 'Optimisation du temps de chargement et correction de plusieurs bugs mineurs.',
        link: '#'
      }
     ];
      const row = document.querySelector('.contain')
      updates.forEach(update =>{
        const div_update = document.createElement('div')
        div_update.className = "col mb-5"
        const title = document.createElement("h2")
        title.className = "px-3 rounded text-secondary"
        title.style.backgroundColor= "rgb(234, 235, 236)"
        title.innerHTML = `mise a jour ${update.date}`
        const card = document.createElement('div')
        card.className = "card border-0 mt-5"
        const card_title = document.createElement("h4")
        card_title.className = "card-title px-2"
        card_title.innerHTML = `<svg width="40" height="40" fill="#007bff" viewBox="0 0 24 24">
                                <path d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5 0 1.46-.63 2.77-1.64 3.69l1.42 1.42C18.05 16.56 19 14.42 19 12c0-3.87-3.13-7-7-7z"/>
                                <path d="M6.36 6.36C5.35 7.23 4.63 8.53 4.2 10h2.02c.33-1.27 1.14-2.36 2.23-3.06L6.36 6.36zM4 12c0 2.42.95 4.56 2.49 6.11l1.42-1.42C6.63 16.77 6 15.46 6 14h2c0 2.76 2.24 5 5 5v3l4-4-4-4v3c-1.66 0-3-1.34-3-3 0-.74.27-1.41.73-1.93L8.1 9.5A6.94 6.94 0 004 12z"/>
                                </svg>
                                ${update.title}`
        const div_body = document.createElement("div")
        div_body.className = "card-body me-auto px-3"
        div_body.innerHTML = `${update.description}`
        card.appendChild(card_title)
        card.appendChild(div_body)
        div_update.appendChild(title)
        div_update.appendChild(card)
        row.appendChild(div_update)
      })
    }
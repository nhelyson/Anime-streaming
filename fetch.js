 if(document.getElementById("body_search")){
  let div = document.querySelector('.results');
  /*div.className = "border rounded-3 mx-auto p-5 w-md-50 fs-5 shadow";
  div.style.position = "relative";
  div.style.top = "7rem";
  div.style.width = "50rem";
  div.innerHTML = "Recherche l'anime de votre choix"
 */
  function search(event) {
  const search_fetch = event.target.value;
  
   fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(search_fetch)}`)

    .then(res => res.json())
    .then(data => {
      const receive = data.data;
      console.log(receive);
      if (receive.length > 0) {
       div.innerHTML = '';
        div.style.display = "block"
        div.className = "border rounded-3 p-4 bg-white mx-auto mt-5 me-auto custom-padding";
        div.style.zIndex = "1000"
        div.style.position = "absolute";
        div.style.top = "2rem";
        div.style.left = "0.2rem"; 
        div.style.width = "90%";          
        div.style.maxWidth = "500px";     
        div.style.maxHeight = "70vh";
        div.style.overflowY = "auto";
        receive.forEach(Anime => {
                        const card = document.createElement('div');
        card.className = "d-flex flex-row align-items-center justify-content-between mb-3";
        card.style.gap = "10px";
        card.style.cursor = "pointer";

        const img = document.createElement('img');
        img.src = Anime.attributes.posterImage?.tiny || Anime.attributes.posterImage?.small;
        img.alt = Anime.attributes.canonicalTitle;
        img.className = "rounded";
        img.style.width = "55px";
        img.style.height = "75px";
        img.style.objectFit = "cover";


         const content = document.createElement('div');
         content.className = "d-flex flex-grow-1 justify-content-between align-items-center";

         const title = document.createElement('p');
         title.className = "mb-0";
         title.textContent = Anime.attributes.titles.en || Anime.attributes.canonicalTitle;
         title.style.color = "black"; 
         title.style.fontWeight = "600";
         title.style.fontSize = "0.95rem";

         const badge = document.createElement('div')
         let badge_recept = Anime.attributes.subtype || "Inconnu"

          fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(badge_recept)}`)
         .then(res => res.json())
         .then(data => {

          const segments = data[0];

          const traductionComplete = segments.map(segment => segment[0]).join(' ');
          badge.className = "badge bg-secondary";
          badge.style.fontSize = "0.7rem";
          badge.style.padding = "5px 10px";
          badge.innerHTML = traductionComplete;

         })
        .catch(error => {
         console.error("Erreur :", error);
         document.getElementById("resultat").innerHTML = "Une erreur s'est produite.";
           });
          content.appendChild(title);
          content.appendChild(badge);
       
          card.appendChild(img);
          card.appendChild(content);
          div.appendChild(card);

          card.addEventListener('mouseenter', function(){
          descript= null
          const mouse = document.querySelector('.mouse')
          if(!mouse){
          const div_mouse = document.createElement('div');
          div_mouse.className = "card position-absolute mouse bg-light d-lg-block d-md-block d-sm-none d-none";
          div_mouse.style.zIndex = "1000000";
          div_mouse.style.top = `${card.getBoundingClientRect().top + window.scrollY}px`;
          div_mouse.style.left = `${card.getBoundingClientRect().right + 10}px`; 
          div_mouse.style.width = "550px";
          const body = document.createElement('div');
          body.className = "card-body";
          const title = document.createElement('h3')
          title.innerHTML = `${Anime.attributes.titles?.en || Anime.attributes.canonicalTitle} ${Anime.attributes.createdAt.substring(0,4)}`
          const des_mouse = document.createElement('p')
          des_mouse.style.fontSize = "0.8rem"
            descript=Anime.attributes.synopsis
                                 ? Anime.attributes.synopsis
                                : 'Synopsis indisponible'; 
          fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(descript)}`)
         .then(res => res.json())
         .then(data => {

           const segments = data[0];

           const traductionComplete = segments.map(segment => segment[0]).join(' ');
            des_mouse.style.fontFamily = "Arial, sans-serif";
            des_mouse.style.fontSize = "0.9rem";
            des_mouse.style.lineHeight = "1.5";
            des_mouse.innerHTML = traductionComplete;
          })
          body.appendChild(title)
          body.appendChild(des_mouse)
          div_mouse.appendChild(body);
          document.body.appendChild(div_mouse);
           }
           })

           card.addEventListener('mouseleave', function(){
            const mouse = document.querySelector('.mouse')
            if(mouse){
              mouse.remove()
            }
           })
          card.addEventListener("click", function () {
           const history = {
           Anime_title: Anime.attributes.titles.en || Anime.attributes.canonicalTitle,
           Anime_image: img.src,
           Anime_id:Anime.id
           };
          
          let historique_recept = JSON.parse(localStorage.getItem('historique')) || [];
          historique_recept.unshift(history);
          localStorage.setItem('historique', JSON.stringify(historique_recept));

          window.location.href = `manga_info.html?Anime_name=${Anime.attributes.titles.en || Anime.attributes.canonicalTitle}
          &id=${Anime.id}&page=true`;
         });

        });
        }
      
        if(search_fetch.length <= 1){
        div.style.display = 'none'
        }
      
    })

}

}

// javascript manga_info.html
if(document.getElementById("title_Anime")){
  
const params = new URLSearchParams(window.location.search);
const Anime_name = params.get("Anime_name");
const page = params.get("page")
console.log(page)
document.title = `[${Anime_name}]kotsu`
const id = params.get("id");

fetch(`https://kitsu.io/api/edge/anime/${encodeURIComponent(id)}`)
 .then(res => res.json())
 .then(data => {
   const Anime_search = data.data
   console.log(Anime_search)
   const title = document.getElementById("title_Anime");
   const img = document.getElementById("img_Anime");
   const  img_bache = document.getElementById("img_Anime_fluid");
   const status  = document.getElementById("status");
   let cover ="";
   let status_text = Anime_search.attributes.status || "Statut indisponible"
   status.innerHTML = `${status_text} `;
   
   if(Anime_search.attributes.coverImage === null){
    cover = Anime_search.attributes.posterImage.original;
   }else{
    cover =  Anime_search.attributes.coverImage.original

   }
   img_bache.src = `${cover}`;
   img_bache.style.objectFit = "cover"
   img_bache.style.width = "100%";
   img_bache.style.height = "100%";
   img_bache.style.filter = "brightness(0.8)"; 
   img.src = Anime_search.attributes.posterImage.medium;
   img.alt = Anime_search.attributes.canonicalTitle;
   img.style.objectFit = "cover"
   img.style.filter = "drop-shadow(0px 20px 12px rgba(179, 199, 219,0.5))";
   img.style.width = "100%";
   img.style.height = "100%";
   title.innerHTML = `[${Anime_search.attributes.titles.en || Anime_search.attributes.canonicalTitle}]`;
   title.className = "position-relative"
   title.style.fontFamily = "Arial, sans-serif";
   title.style.fontWeight = "bold";
   title.style.fontSize = "1.3rem";
   title.addEventListener("mouseenter", function() {
    const alternative_name = document.createElement("div")
    alternative_name.className = "alternative_name  position-absolute bg-light p-5 rounded-2 mt-5";
    alternative_name.setAttribute('style', "left:8rem; top:-2rem;z-index:1000000;")
    alternative_name.style.transition = "all 2s ease-in"
    const ul = document.createElement('ul')
    ul.className = "d-flex flex-column justify-content-center align-items-center text-muted"
    ul.style.listStyle = "none"
    ul.innerHTML = `<h6 class="me-auto text-muted fw-bold">Alter name:</h6>`
    let anime = Anime_search.attributes.abbreviatedTitles
     if(anime.length > 0){
     Anime_search.attributes.abbreviatedTitles.forEach(name => {
  
                                                       li.className = "p-1"
                     const li = document.createElement('li')
                                      li.setAttribute('style', "font-size:0.8rem;text-align:justify;")
                                      li.style.width = "100%"
                                      li.innerHTML =`<br> ${name}`
                                      ul.appendChild(li)
                                    })
                                  }else{
                                        alternative_name.innerHTML = ''
                                        ul.innerHTML = ''
                                        const message = document.createElement('span')
                                        message.className = "text-center mx-auto"
                                        message.innerHTML = 'Aucune titre alternatif'
                                        message.style.fontSize = "0.8rem"
                                        alternative_name.appendChild(message)
                                  }
    alternative_name.appendChild(ul)
    title.appendChild(alternative_name);

   })
    title.addEventListener("mouseleave", function() {
    const alternative_name = document.querySelector(".alternative_name");
    title.removeChild(alternative_name);
    })
    const descript = Anime_search.attributes.synopsis || "Description indisponible";
    const description = document.getElementById("description_Anime");
   
  fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(descript)}`)
  .then(res => res.json())
  .then(data => {

    const segments = data[0];

    const traductionComplete = segments.map(segment => segment[0]).join(' ');
    description.style.fontFamily = "Arial, sans-serif";
    description.style.fontSize = "0.9rem";
    description.style.lineHeight = "1.5";
    description.innerHTML = traductionComplete;
  })
  .catch(error => {
    console.error("Erreur :", error);
    document.getElementById("resultat").inne = "Une erreur s'est produite.";
  });
 })

 const query = `
   query($search: String) {
    Media(search: $search, type: ANIME) {
     
   id
title {
  romaji
  english
  native
}
coverImage {
  large
}
description
status
episodes
trailer {
  id
  site
  thumbnail
}
genres

staff {
  edges {
    role
    node {
      name {
        full
      }
      image {
        large
      }
    }
  }
}

rankings {
  rank
  type
  format
  allTime
  context
}

staffSecond: staff {
  edges {
    role
    node {
      name {
        full
      }
      image {
        large
      }
    }
  }
}

studios {
  edges {
    isMain
    node {
      name
    }
  }
}

format
season
seasonYear
duration
averageScore
meanScore
popularity
favourites
countryOfOrigin
startDate {
  year
  month
  day
}
endDate {
  year
  month
  day
}
siteUrl

characters {
  edges {
    node {
      name {
        full
      }
      image {
        large
      }
    }
    voiceActors {
      name {
        full
      }
      image {
        large
      }
      languageV2
    }
  }
}

  }
}
`;

const variables = {
  search: Anime_name
 }

fetch("https://graphql.anilist.co", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    query,
    variables

   })
})
  .then(res => res.json())
  .then(data => {
    console.log("Anime :", data.data.Media);
    const video_trailer = document.querySelector('.trailer');
    const svg = document.getElementById("svg_Anime");
    let rank = data.data.Media.rankings 
    let chuge = false
    if(rank.length > 0){
       svg.innerHTML = `Ranked: ${data.data.Media.rankings[0].rank}`
    }else{
       svg.innerHTML = `No classified`
    }
    video_trailer.className = "position-relative text-center custom-over"
    video_trailer.setAttribute("style", "overflow: hidden;width:16rem; height: 5rem;border-radius: 0.5rem!important;")
    video_trailer.innerHTML = `<img src="${data.data.Media.coverImage.large}" style="object-fit: cover; width: 100%; 
    height: 100%;filter:brightness(0.5)!important" class="img-fluid">
    <p class="text-muted  fs-1 position-absolute" style="top:50%; left:50%; transform:translate(-50%,-50%);
    color:white!important;z-index:1000!important">trailer</p>`;
    video_trailer.style.cursor = "pointer";
    video_trailer.addEventListener("click", function() {
      chuge = true
      const div =  document.createElement('div');          
      div.id= "iframe_contains"
      const iframe = document.createElement('div');
      let ifr = ""
      if(data.data.Media.trailer!== null){
        ifr = data.data.Media.trailer.id
      }else if(!data.data.Media.trailer!== null){
        fetch(`https://kitsu.io/api/edge/anime?filter[text]=${Anime_name}`)
       .then(response => response.json())
       .then(data => {
       const anime = data.data[0];
       div.innerHTML = "" 
       const iframe = document.createElement('div');
       iframe.className = "trailer-dispear"
       iframe.setAttribute("style", "top:0!important; left:0!important;")

      iframe.innerHTML = iframe.innerHTML = iframe.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${anime.attributes.youtubeVideoId}?autoplay=1&loop=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="
        width: 70vw !important;
        height: calc(80vw * 9 / 16) !important;
        max-width: 1280px !important;
        max-height: 720px !important;
        border: none !important;
        display: block !important;
      "
      ></iframe>`;

      iframe.style.transition = "all 1s ease-in-out";
      div.style.position = "fixed";
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      div.style.zIndex = "11000";
      div.style.top = "0";
      div.style.left = "0";
      div.style.width = "100%";
      div.style.height = "100%";
      div.style.transition = "all 0.3s ease-in-out";
      div.appendChild(iframe);
      document.body.appendChild(div);
    
       div.addEventListener("click", function(event) {
       if(div && div.contains(event.target)){
        div.style.display = "none"
       }
       });

      });

      }
      iframe.setAttribute("style", "top:0!important; left:0!important;")

      iframe.innerHTML = iframe.innerHTML = iframe.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${ifr}?autoplay=1&loop=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="
        width: 70vw !important;
        height: calc(80vw * 9 / 16) !important;
        max-width: 1280px !important;
        max-height: 720px !important;
        border: none !important;
        display: block !important;
      "
      ></iframe>`;

      iframe.style.transition = "all 1s ease-in-out";
      div.style.position = "fixed";
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      div.style.zIndex = "11000";
      div.style.top = "0";
      div.style.left = "0";
      div.style.width = "100%";
      div.style.height = "100%";
      div.style.transition = "all 0.3s ease-in-out";
      div.appendChild(iframe);
      document.body.appendChild(div);
      
      div.addEventListener("click", function(event) {
       if(div && div.contains(event.target)){
        div.style.display = "none"
       }
       });

    })
    

    const news_anime = document.querySelector('.news-anime')
    news_anime.innerHTML = '<span class="ms-2 fw-bold">Details animes</span>'
    news_anime.setAttribute('style', "width:16rem;")
    news_anime.className = "mt-2 bg-white p-4 custom-well d-flex flex-lg-column flex-md-row flex-row custom-over"
    news_anime.style
    let name_studios = ""

  if(data.data.Media.studios.edges.length !== 0){
    name_studios  = data.data.Media.studios.edges[0].node.name
  }else{
    name_studios =  "nothing"

  }

    function info_anime(contains ,title) {
   if (!news_anime) {
    console.error("L'élément 'news_anime' n'est pas défini !");
    return;
   }
   
    const news = document.createElement('ul')
    news.className = "contains d-flex flex-column pe-auto"
    news.setAttribute('style' , "padding:10px;")
    news_anime.appendChild(news)
    const h = document.createElement('h6')
    h.style.textTransform = 'capitalize'
    h.innerHTML = `${title}`
    h.style.color = "black"
    h.style.fontWeight = 'bold'
          news.appendChild(h)

   if (Array.isArray(contains)) {
    contains.forEach(anime => {
      const li = document.createElement('li');
      li.className = "positon-relative"
      li.setAttribute('style', "left:-5rem!important;")
      li.style.color = "black"
      news.appendChild(li)
      li.innerHTML = `${anime}`; 
      news.appendChild(li);
    });
   } else {

  if (
  typeof contains === 'object' &&
  contains !== null &&
  'english' in contains &&
  'romaji' in contains
  &&
  'native' in contains
  ) {
  contains = `${contains.english} <br> ${contains.romaji} <br> ${contains.native}`;
     }
    const li = document.createElement('li');
    li.innerHTML = contains;
    li.style.fontFamily = "arial"
    li.style.color = "black"
    news.appendChild(li)
   }
   }
  info_anime(data.data.Media.title,'title')
  info_anime(data.data.Media.genres, 'genres')
  info_anime(name_studios, 'studios')
  info_anime(data.data.Media.format, 'format')
  info_anime(data.data.Media.episodes, 'episodes')
  info_anime(data.data.Media.duration, 'episodes duration')
  info_anime(data.data.Media.countryOfOrigin, 'contry')
  info_anime(data.data.Media.status, 'status')
  info_anime(data.data.Media.status, 'status')
  info_anime(data.data.Media.popularity, 'popularity')
  info_anime(data.data.Media.startDate.year, 'startYeart')
  info_anime(data.data.Media.endDate.year, 'endYear')
  info_anime(data.data.Media.season, 'seasonstart')

   const author = document.querySelector('.author_name')
   const img_author = document.querySelector('.img-author')
   const role_author  = document.querySelector('.role_author')
   let OriginalAuthor = ""
   img_author.style.objectFit = "cover"
   img_author.style.width = "100%"
   img_author.style.height = "100%"
   
  data.data.Media.staff.edges.forEach(author_name =>{
   if (author_name.role ) {
  if(author_name.role === "Original Creator" || author_name.role === "Original Story" ){
  author.innerHTML = `${author_name.node.name.full}`;
  role_author.innerHTML = `${author_name.role}`
  img_author.src = `${author_name.node.image.large}`;
  OriginalAuthor = true;
  }
  }
  const format_accept =[
    "TV"
  ]
  if(!OriginalAuthor && format_accept.some(format => data.data.Media.format.includes(format))){
  author.innerHTML = `Original Anime`;
  role_author.innerHTML = `${data.data.Media.studios.edges[0].node.name}`
  img_author.src = `https://s4.anilist.co/file/anilistcdn/staff/large/default.jpg`
  }
  
   const format_movie =[
    "MOVIE"
  ]

if(!OriginalAuthor && format_movie.some(format => data.data.Media.format.includes(format))){
  author.innerHTML = `Original Movie`;
  role_author.innerHTML = `${data.data.Media.studios.edges[0].node.name}`
  img_author.src = `https://s4.anilist.co/file/anilistcdn/staff/large/default.jpg`
  }

  })

   data.data.Media.characters.edges.forEach(voice =>{
  const contains= document.querySelector('.contains-voice')
  const div = document.createElement('div')
  const card = document.createElement('div')
  card.setAttribute('style', "height:8rem!important;")
  const card_body = document.createElement('div')
  const image = document.createElement('div')
  const image_actor = document.createElement('div')
  const first_info = document.createElement('div')
  const seconde_info = document.createElement('div')
  first_info.style.fontSize = "0.7rem"
  first_info.style.textAlign = "left"
  seconde_info.style.fontSize = "0.7rem"
  seconde_info.className =  "ms-auto"
  image_actor.className = "image_character p-2"
  image.className = "image_character p-2"
  card_body.className = "card-body d-flex flex-row"
  card.className = "card  d-flex flex-row border-0 mt-5"
  div.className = "col-lg-6 col-md-12 col-12"
  card_body.appendChild(first_info)
  card_body.appendChild(seconde_info)
  card.appendChild(image)
  card.appendChild(card_body)
  card.appendChild(image_actor)
  div.appendChild(card)
  voice.voiceActors.forEach(voice_man =>{
     const roles = [
     "Japanese"
    ];
    if(roles.some(languageV2 => voice_man.languageV2.includes(languageV2))){
    image.innerHTML = `<img src="${voice_man.image.large}" class="img-fluid">`
   
    first_info.innerHTML = `<div class="mt-auto"><div class="custom-hover fw-bold">${voice_man.name.full}</div><br><div class="mt-3 custom-hover fw-bold">${voice_man.languageV2}</div></div>`
    }
  })
   image_actor.innerHTML = `<img src="${voice.node.image.large}" class="img-fluid">`
   seconde_info.innerHTML = `<div style="font-size:0.8rem!important"><div class="ms-5 custom-hover fw-bold">${voice.node.name.full}</div></div>`
   contains.appendChild(div)
  })

  data.data.Media.staff.edges.forEach(contains_chacracters =>{
  const contains= document.querySelector('.contains_characters')
  const div = document.createElement('div')
  const card = document.createElement('div')
  card.setAttribute('style', "height:8rem!important;")
  const card_body = document.createElement('div')
  const card_title = document.createElement('div')
  const image = document.createElement('div')
  image.className = "image_character p-2"
  card_body.className = "card-body"
  card.className = "card  d-flex flex-row border-0 mt-5"
  div.className = "col-lg-6 col-md-12 col-12"
  card.appendChild(card_title)
  card.appendChild(card_body)
  card.appendChild(image)
  div.appendChild(card)
  const roles = [
  "Director",
  "Screenwriter",
  "Character Designer",
  "Key Animator",
  "Animator",
  "Art Director",
  "Animation Director",
  "Producer",
  "Editor"
    ];

    if(roles.some(role => contains_chacracters.role.includes(role))){
       card_body.innerHTML = `<h4 class="custom-hover">${contains_chacracters.node.name.full}</h4>
                              <p class="text-muted">${contains_chacracters.role}</p>`
       image.innerHTML = `<img src="${contains_chacracters.node.image.large}" class="img-fluid img-author">`
       contains.appendChild(div)
    }
  })
  data.data.Media.staff.edges.forEach(contains_chacracters =>{
  const contains= document.querySelector('.characters-sound')
  const div = document.createElement('div')
  const card = document.createElement('div')
  card.setAttribute('style', "height:8rem!important;")
  const card_body = document.createElement('div')
  const card_title = document.createElement('div')
  const image = document.createElement('div')
  image.className = "image_character p-2"
  card_body.className = "card-body"
  card.className = "card  d-flex flex-row border-0 mt-5"
  div.className = "col-lg-6 col-md-12 col-12"
  card.appendChild(card_title)
  card.appendChild(card_body)
  card.appendChild(image)
  div.appendChild(card)
  const roles = [
 "Sound Director",
  "Music",
  "Music Composer",
  "Insert Song Performance",
  "Theme Song Performance",
  "Ending Theme Performance",
  "Opening Theme Performance",
  "Vocal Performance",
  "Sound Effects",
  "Audio Director",
  "Sound Mixing",
  "Sound Production",
  "Sound Design"
    ];

    if(roles.some(role => contains_chacracters.role.includes(role))){
       card_body.innerHTML = `<h4 class="custom-hover">${contains_chacracters.node.name.full}</h4>
                              <p class="text-muted">${contains_chacracters.role}</p>`
       image.innerHTML = `<img src="${contains_chacracters.node.image.large}" class="img-fluid img-author">`
       contains.appendChild(div)
    }
  })
    /*
    video_trailer.innerHTML =` <iframe 
      width="460" 
      height="115" 
      src="https://www.youtube.com/embed/${data.data.Media.trailer.id}?paused=1&loop=1" 
      title="YouTube video player"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>`
    */
  })

}


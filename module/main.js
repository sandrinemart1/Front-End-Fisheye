async function init(){
    const {photographers} = await dataInArray();
    const {medias} = await dataInArray2();
  }
  init();



 function createDOM(mediaId){
//conteneur de chq image/video
    let sectionMedia = document.querySelector('.page_photographer-medias');
    let mediaAndAttributes=document.createElement('div');
    mediaAndAttributes.className=".page_photographer-media-attributes";
    sectionMedia.appendChild(mediaAndAttributes);
    let articleMedia =document.createElement('article');
    articleMedia.className='page_photographer-media';
    articleMedia .setAttribute('id',mediaId.id);
    mediaAndAttributes.appendChild(articleMedia);
    let linkMedia = document.createElement('a');
    articleMedia.appendChild(linkMedia);
    let imageMedia = document.querySelector('img');
    imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
    imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
    linkMedia.appendChild(imageMedia);
    console.log(imageMedia);
// attributs de chaque photo/video
    let imageAttributes = document.createElement('div');
    imageAttributes.className = "img_attributes";
    imageAttributes.classList.add ('img_attributes')
    articleMedia.appendChild(imageAttributes);
    let imageTitle =document.createElement('h3');
    imageTitle.textContent = mediaId.title;
    imageAttributes.appendChild(imageTitle);
    // let imageLike = document.createElement('p');
    // imageLike.textContent =mediaId.likes;
    // imageAttributes.appendChild(imageLike);
    // let span = document.createElement('span')
    // imageAttributes.appendChild(span);
    // let imageHeart = document.createElement('i');
    // imageHeart.className= "fa-solid fa-heart";
    // span.appendChild(imageHeart);
    likes(mediaId) 
 }



function affichePhotographers(photographersJson){
    for(let i =0; i<photographersJson.length;i++){
      createCardDOM(photographersJson[i])
      displayPhotographers(photographersJson[i])
  
    }
  }
 // displayPhotographers()
 function getPhotographer(photographersJson) {
    for (let i = 0; i < photographersJson.length; i++ ) {
      if(photographersJson[i].id == login){
        photographerJson = new Photographer(
          photographersJson[i].name, 
          photographersJson[i].id, 
          photographersJson[i].city, 
          photographersJson[i].country,
          photographersJson[i].tags,
          photographersJson[i].tagline,
          photographersJson[i].price,
          photographersJson[i].portrait,
          photographersJson[i].media,
        )
        console.log(photographerJson);
        displayPhotographers(photographersJson[i])
        
       
      }
    }
}

function affichePhotographers(photographersJson){
      for(let i =0; i<photographersJson.length;i++){
        createCardDOM(photographerJson[i])
        displayPhotographers(photographerJson[i])
    
      }
    } 
  
async function simpleFetch(){
    const response = await fetch("../data/photographers.json")
    const data = await response.json()
    return data
}
async function getData(){
    const data = await simpleFetch()
    console.log( data)
}

/*               fetch */
// //fonction pour recuperer les donnees
fetch("../../data/photographers.json")
.then((response)=>response.json())
.then((data)=>console.log(data))
// ecrire la function en asynchrone vsgrafikart et 
// separer les données photographes et les données medias
const getPhotographersAndMedia = async function(){
    let response = await fetch("../data/photographers.json");
    if (response.ok){
    let data = await response.json();
        console.table( data);
        const photographers =data.photographers;
        const medias =data.media;
        console.table(photographers);
        console.log(photographers[1].tagline);
        return data;

    }else{
        console.error('Retour du serveur :', response.status);
    }
}
// definir variables pour chaque element

let photographerName = photographer.name;
let photographerId = photographer.id;
let photographerCity = photographer.city;
let photographerCountry = photographer.country;
let photographerTagline = photographer.tagline;
let photographerPrice = photographer.price;
let photographerPortrait = photographer.portrait;
            console.log(photographerName);
            console.log(photographerId);
            console.log(photographerCity);
            console.log(photographerCountry);
            console.log(photographerTagline);
            console.log(photographerPrice);
            console.log(photographerPortrait);
            
            console.log(photographer);
            
            
/*            Photographers*/
// // lien vers image
// displayDatas();

//     function getUserCardDOM() {
        // creation article (=> il faudra mettre une lien clicable clavier)
        
        const article = document.createElement( 'article' );
        article.className ='photographer_section--user';
        cardDOMBanner.appendChild(article);
        article.classList.add('photographer_section--user');
        //creation banner de l 'image et du h2 
        const imgBanner = document.createElement('div');
        imgBanner.className ='photographer_section--banner';
        article.appendChild(imgBanner);
        imgBanner.classList.add("photographer_section--banner");
        //creation balise image
        const img = document.createElement( 'img' );
        img.className ='img';
        // img.setAttribute("src ="../../assets/images/Photographers ID Photos/$name.jpeg" ,"picture");
        imgBanner.appendChild(img);
        img.classList.add("img");
        //creation h2
        const h2 = document.createElement( 'h2' );
        imgBanner.appendChild(h2);
        h2.className='h2';
        h2.innerHTML = photographers[0].name;
        h2.classList.add("h2");
        
    // // //     return (article);
    // // // }
    
    // // // function getUserCardDOM2(){
    //     //creation paragraphe renseignements photographe page accueil
        const paragraph = document.createElement('div');
        paragraph.className ='photographer_section--text';
        article.appendChild(paragraph);
        //creation ss chapitre location
        const cityCountry= document.createElement('p');
        cityCountry.innerHTML= photographer.city+ "," + photographer.country;
        paragraph.appendChild(location);
        cityCountry.classList.add("location");
        //creation ss chapitre tagline
        const tagline = document.createElement('p');
        tagline.className = "tagline";
        tagline.innerHTML= "innerTagline" ;
        paragraph.appendChild(tagline);
        tagline.classList.add("tagline");
        // creation ss chapitre price
        const price = document.createElement('p');
        price.className= 'price';
        price.innerHTML= photographer.price;
        paragraph.appendChild(price);
        price.classList.add("price");
//     }
//     return { name, picture, getUserCardDOM, getUserCardDOM2}
// }
//contenu des images des cartes page d'accueil



let url= window.location.search;
const id = newURLSearchParams(url)
console.log(id.get('id)'));
photographers= data.photographers;
// function displayDatas(photographer){
//     for (photographer of photographers){
//     img.setAttribute ('src',`../../assets/images/Photographers ID Photos/${portrait} `);
//     anchor.setAttribute('href','photographer_section--link')
//     h2.innerHTML = photographer.name;
//     citycountry.innerHTML= photographer.city+ "," + photographer.country;
//     tagline.innerHTML= photographer.tagline
//     price.innerHTML=photographer.price;
//     }
// }


/*                      index */
let queryString =window.location.href;
let url = new URL(queryString);

console.log(url) ;  




   // getPhotographer();
/*     //avec recuperation erreur try catch pour capturer erreur
getPhotographersAndMedia();
const getPhotographersAndMedia = async function(){
   try{
       let response = await fetch("../../data/photographers.json");
       if( response.ok){
           let data = await response.json();
           console.log( data);
       }else{
           console.error('Retour du serveur :', response.status);
       }
   }catch(e){
       console.log(e);
   }
}*/
let photographer="";
let portrait =  photographer.portrait  ; 
   const picture = `assets/photographers/${portrait}`;
   console.log(portrait);
getPhotographersAndMedia();

//creer une card photographe pour page accueil

   // let cardDOM =document.createElement('article');
   // article.className ="photographer_section--user"
   // article.innerHTML = "<div> create example </div>";
   // document.body.appendChild(cardDOM);


async function displayData(photographers) {
   const photographersSection = document.querySelector(".photographer_section");

   photographers.forEach((photographer) => {
       const photographerModel = photographerFactory(photographer);
       const userCardDOM = photographerModel.getUserCardDOM();
       photographersSection.appendChild(userCardDOM);
   });
};

// async function init() {
//     // Récupère les datas des photographes
   
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// };

// init();
// .dropdown {
//     display: inline-block;
//     position: relative;
//     margin-top: 50px;
//     margin-bottom: 50px;
//     label{
//         font-weight: 700;
//         font-size: 18px;
//     }
// }
////css dropdown
// #dropdown{
//     position:absolute;
//     width:170px;
//     top:-20px;
//     left:185px;
//     border-style: none;
//     button{
//         background: $bg-1st-color;
//         padding:20px;
//         font-size: 18px;
//         color: $white;
//         width:100%;
//         text-align: left;
//     }
// }
//  #dropDownPopularityButton{
//     display:flex;
//     justify-content: space-between;
//     border-top-left-radius:5px ;
//     border-top-right-radius: 5px;
//     &:hover, &:focus{
//         background-color: $bg-medium;
//         color:#000000;
//         font-weight: 700;
//     }
// span{
//     color: $white;
//     display:block;
//     margin-left: 20px;
//     }
// }
// #dropdown-button{
//     display:none;
//     overflow: auto;
//     position:absolute;
//     border-style: none;
//     width: 170px;
//     #titre{
//     border-bottom-left-radius:5px ;
//     border-bottom-right-radius: 5px;
//     box-shadow: inset 0 2px 0 white;
//     }
//     #date{
//         box-shadow: inset 0 2px 0 white;
//     }
//     &:hover, &:focus{
//         background-color: $bg-medium;
//         color:#000000;
//         font-weight: 700;
//     }
// }
// .drop-down-open{
//     transform: rotate(0deg);
//         transform: rotate(180deg);
//         transition: 0.4s ease-in-out ;
// }

// .drop-down-close{
//     transform: rotate(180deg);
//     transform: rotate(0deg);
//     transition: 0.4s ease-in-out ;
// }

/////js dropdown
//   dropDownDiv.style.display ='block';
//   if(chevron.className !=='drop-down-open'){
//  dropDownDiv.style.display=" block";
//  chevron.className='drop-down-open';
//   }else{
//     dropDownDiv.style.display=" none";
//     chevron.className='drop-down-close';
//   }
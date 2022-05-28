// création de carte pour chq photographe utilisées sur page accueil  et sur page photographe
// function photographerFactory(data) {
//     const { name, portrait } = data;

import { Element} from "./elementConstructor.js";

//*************constructor pour page html************** */
function createCardDOM(photographerJson) {
  let anchor = new Element ( 'anchor', 'a','photographer_section--link').el;
  let article =new Element( 'article','article','photographer_section--user').el;
  let imgBanner =new Element ('imgBanner','div','photographer_section--banner').el;
  let img = new Element('img','img', 'img').el;
  let  h2 = new Element ('h2','h2','h2').el;
  let paragraph =new Element ('paragraph','div','photographer_section--text').el;
  let location = new Element('location','p','location').el;
  let tagline = new Element ('tagline','p','tagline').el;
  let price = new Element('price','p','price').el;
  
  let cardDOMBanner= document.querySelector(".photographer_section");
  
  cardDOMBanner.appendChild(article);
  article.appendChild(anchor);
  article.appendChild(imgBanner);
  article.appendChild(paragraph);
  anchor.appendChild(img);
  anchor.appendChild(h2);
  paragraph.appendChild(cityCountry);
  paragraph.appendChild(tagline);
  paragraph.appendChild(price);
  
  //contenu de chaque carte
  img.setAttribute('src', `../../assets/images/Photographers ID Photos/${photographerJson.portrait}`);
  img.setAttribute('alt',`portrait du photographe ${photographerJson.name}`)
  img.setAttribute('width', '200');
  img.setAttribute('height', '200');
  h2.innerHTML =`${photographerJson.name}`;
  location.innerHTML = `${photographerJson.city},${photographerJson.country}`;
  tagline.innerHTML = `${photographerJson.tagline}`;
  price.innerHTML =`${photographerJson.price}€/jour`;
  
  }

function displayPhotographers(){
  photographersJson.forEach((photographerJson)=>{  
    // createCardDOM(photographerJson)
    h2.innerHTML =photographerJson.name;
    anchor.setAttribute('href', '../photographer-page.html?id=' + `${photographerJson.id}`)
    img.setAttribute('src', `../../assets/images/Photographers ID Photos/ ${photographerJson.portrait}`);
    img.setAttribute('width', '200');
    img.setAttribute('height', '200');
    citycountry.innerHTML= photographerJson.city+ "," + photographerJson.country;
    tagline.innerHTML= photographerJson.tagline;
    price.innerHTML=`${
      photographerJson.price}€/j`;
    })
  }      
  export{ createCardDOM}





// let article = document.createElement('article');
// article.className ='photographer_section--user';
//         cardDOMBanner.appendChild(article);
//         article.classList.add('photographer_section--user');

// console.dir(article);

//     const picture = `assets/photographers/${portrait}`;


// let photographer;
// /contenu des images des cartes page d'accueil
/****************fonction à garder ******************/
    // function createCardDOM(photographerJson) {

    //    photographersJson.forEach(photographerJson=> {
    // const article = document.createElement( 'article' );
    // article.className ='photographer_section--user';
    // const anchor = document.createElement('a') ;
    // anchor.setAttribute('href','../pages/_photographer.js')
    // anchor.className ='photographer_section--link';
    // const imgBanner = document.createElement('div');
    // imgBanner.className ='photographer_section--banner';

    // const img = document.createElement( 'img' );
    // img.setAttribute('src', `../../assets/images/Photographers ID Photos/${photographerJson.portrait}`);
    // img.setAttribute('alt',`portrait du photographe ${photographerJson.name}`)

    // const h2 = document.createElement( 'h2' );
    // h2.className ='h2';
    // h2.classList.add('h2');
    // h2.innerHTML =`${photographerJson.name}`;

    // const paragraph = document.createElement('div');
    // paragraph.className ='photographer_section--text';
    // const location =document.createElement('p');
    // location.className = 'location';
    // location.innerHTML= photographerJson.city+ "," + photographerJson.country;
    // const tagline =document.createElement('p');
    // tagline.className= "tagline";
    // tagline.innerHTML= photographerJson.tagline
    // const price=document.createElement('p');
    // price.className = 'price';
    // price.innerHTML=`${photographerJson.price}€/jour`;

    // let cardDOMBanner= document.querySelector(".photographer_section");
    // console.log(cardDOMBanner);
    // cardDOMBanner.appendChild(article);
    // article.appendChild(imgBanner);
    // article.appendChild(paragraph);
    // article.appendChild(anchor);

    // anchor.appendChild(img);
    // anchor.appendChild(h2)

    // paragraph.appendChild(location);
    // paragraph.appendChild(tagline);
    // paragraph.appendChild(price);

       
    // }
// });
// }
    
   
    


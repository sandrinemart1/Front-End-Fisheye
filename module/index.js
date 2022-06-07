// import {createCardDOM} from './factories/home-page-elements.js'
import { myFetch  } from './fetch.js'
// import {getPhotographer}from'./factories/home-page-elements.js'

function affichage(photographersJson){
  console.log(photographersJson,"aaaa")
  console.log(photographersJson[0],'zzzzz')
  let banner = document.querySelector("ul");
  let photographer;
  //exercice Ahmed
  for(photographer of photographersJson){
    console.log(photographer.name);
    banner.innerHTML+=`<li>${photographer.name}</li>`;
  }
//INJECTION DES DATA PHOTOGRAPHER DANS PAGE ACCUEIL
  photographersJson.forEach(photographerJson=> {
    const article = document.createElement( 'article' );
    article.className ='photographer_section--user';
    const anchor = document.createElement('a') ;
    // anchor.setAttribute('href', '../photographer-page/${photographerJson.id})
    anchor.setAttribute('href', '../photographer.html?id=' + `${photographerJson.id}`)
    anchor.className ='photographer_section--link';
    const imgBanner = document.createElement('div');
    imgBanner.className ='photographer_section--banner';

    const img = document.createElement( 'img' );
    img.setAttribute('src', `../../assets/images/Photographers ID Photos/${photographerJson.portrait}`);
    img.setAttribute('alt',`portrait du photographe ${photographerJson.name}`)
    img.setAttribute('width', '200');
    img.setAttribute('height', '200');

    const h2 = document.createElement( 'h2' );
    h2.className ='h2';
    h2.classList.add('h2');
    h2.innerHTML =`${photographerJson.name}`;

    const paragraph = document.createElement('div');
    paragraph.className ='photographer_section--text';
    const location =document.createElement('p');
    location.className = 'location';
    location.innerHTML= photographerJson.city+ ", " + photographerJson.country;
    const tagline =document.createElement('p');
    tagline.className= "tagline";
    tagline.innerHTML= photographerJson.tagline
    const price=document.createElement('p');
    price.className = 'price';
    price.innerHTML=`${photographerJson.price}€/jour`;

    let cardDOMBanner= document.querySelector(".photographer_section");
    console.log(cardDOMBanner);
    cardDOMBanner.appendChild(article);
    article.appendChild(anchor);
    article.appendChild(imgBanner);
    article.appendChild(paragraph);

    anchor.appendChild(img);
    anchor.appendChild(h2);

    paragraph.appendChild(location);
    paragraph.appendChild(tagline);
    paragraph.appendChild(price); 

    const photographersJson = { property : 'caractéristiques_par_défaut'};
    console.log(photographersJson);
		const des = Object.getOwnPropertyDescriptor(photographersJson,'property');
		console.dir(des); 
  }) 
  }
  
  myFetch(affichage)
  
  // let cardDOMBanner= document.querySelector(".photographer_section"); 
  // const article = document.createElement( 'article' );
  // article.className ='photographer_section--user'; 
  // cardDOMBanner.appendChild(article);
  
  // const paragraph = document.createElement('div');
  // paragraph.className ='photographer_section--text';
  // article.appendChild(paragraph);
  // const location =document.createElement('p');
  // location.className = 'location';
  // paragraph.appendChild(location);
  // location.innerHTML= photographer.city+ "," + photographer.country;
  // const tagline =document.createElement('p');
  // paragraph.appendChild(tagline);
  // tagline.className= "tagline";
  // tagline.innerHTML+= photographer.tagline;
  
  // const price=document.createElement('p');
  // paragraph.appendChild(price);
  // price.className = 'price';
  // price.innerHTML=`${photographer.price}€/jour`;


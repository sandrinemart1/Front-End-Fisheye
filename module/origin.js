
//fonction pour recuperer les donnees
function createCardImage(){
    let sectionMedia = document.querySelector('.page_photographer-medias');
    let linkMedia = document.createElement('a');
    sectionMedia.appendChild(linkMedia);
    let articleMedia =document.createElement('article');
    articleMedia.className='page_photographer-media';
    linkMedia.appendChild(articleMedia);
    let imageMedia = document.createElement('img');
    articleMedia.appendChild(imageMedia);
    // console.log(imageMedia)
    imageMedia.setAttribute('src',`../../assets/images/${firstName}/mediaId.image` );
    let imageAttributes = document.createElement('div');
    imageAttributes.className = "img_attributes";
    articleMedia.appendChild(imageAttributes);
    let imageTitle =document.createElement('h3');
    imageTitle.textContent = mediaJson.title;
    imageAttributes.appendChild(imageTitle);
    let imageLike = document.createElement('p');
    imageLike.textContent =mediaJson.likes;
    imageAttributes.appendChild(imageLike);
    let span = document.createElement('span')
    imageAttributes.appendChild(span);
    let imageHeart = document.createElement('i');
    imageHeart.className= "fa-solid fa-heart";
    span.appendChild(imageHeart);
    
   
  }
  
class Photographer{
    constructor( name, id, city, country, tagline,price,portrait,media){
        this.name =name,
        this.id = id,
        this.city = city,
        this.country = country,
        this.tagline = tagline,
        this.price = price,
        this.portrait= portrait
    }
}
class Media{
    constructor( date,id,image,likes,photographerId,price,title){
        this.date = date,
        this.id = id,
        this.image= image,
        this.likes= likes,
        this.photographerId= photographerId,
        this.price= price,
        this.title= title
    }
}
const photographersJson = [];
const mediasJson =[];
let photographerJson;
async function myFetch(affichage){
    const response = await fetch("../../data/photographers.json")
    .then( async(response) => {
        if (response.ok){
            const data=await  response.json()
            console.log(data);
            const photographers = data.photographers;
            const media = data.media;
            console.log(media);
//recuperer les photographes dans un array photographersJson
            // const photographersJson = [];
            for(let photographer of data.photographers){
                const photographerJson = new Photographer(
                    photographer.name, 
                    photographer.id, 
                    photographer.city, 
                    photographer.country, 
                    photographer.tagline,
                    photographer.price,
                    photographer.portrait);  

            photographersJson.push(photographerJson);
            // console.log(photographerJson);
            // console.log(photographerJson.portrait);
                }
affichage(photographersJson)


 //recuperer les medias dans un array mediasJson
            //  const mediasJson =[];
            //  for(let media of data.media){
                media.forEach((media)=>{
                 const mediaJson = new Media(
                    media.date, 
                    media.id, 
                    media.image, 
                    media.likes, 
                    media.photographerId,
                    media.price,
                    media.title);

            mediasJson.push(mediaJson);
            console.log(mediaJson);
            
                 })

                }else{
                    console.error('Retour du serveur :', response.status);
                }
                
                })
                }
                
                async function getData(){
                const data = await myFetch()
                console.log(data);
                }
                // getData();

//recuperer uniquement les photographes
//injecter les données dans un tableau
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographersJson = []

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers, ...photographers, ...photographers]})
}

export { myFetch}
export{photographersJson , mediasJson}



// index.js    ************************************
import {createCardDOM} from './factories/home-page-elements.js'
import { myFetch  } from './fetch.js'
// import {getPhotographer}from'./factories/home-page-elements.js'


function affichage(photographersJson){
  console.log(photographersJson,"aaaa")
  console.log(photographersJson[0],'zzzzz')
  let banner = document.querySelector("ul");
  let photographer;
  for(photographer of photographersJson){
    console.log(photographer.name);
    banner.innerHTML+=`<li>${photographer.name}</li>`;
  }
   }

myFetch(affichage)

//home-page-elements.js  ******************************
// création de carte pour chq photographe utilisées sur page accueil  et sur page photographe
// function photographerFactory(data) {
//     const { name, portrait } = data;

import { photographersJson } from "../fetch.js";

// let photographer;
// /contenu des images des cartes page d'accueil

    function createCardDOM(photographerJson) {
        const article = document.createElement( 'article' );
        article.className ='photographer_section--user';
        const anchor = document.createElement('a') ;
        anchor.setAttribute('href','../pages/_photographer.js')
        anchor.className ='photographer_section--link';
        const imgBanner = document.createElement('div');
        imgBanner.className ='photographer_section--banner';

        const img = document.createElement( 'img' );
        img.setAttribute('src', `../../assets/images/Photographers ID Photos/${photographerJson.portrait}`);
        img.setAttribute('alt',`portrait du photographe ${photographerJson.name}`)

        const h2 = document.createElement( 'h2' );
        h2.className ='h2';
        h2.classList.add('h2');
        h2.innerHTML =`${photographerJson.name}`;

        const paragraph = document.createElement('div');
        paragraph.className ='photographer_section--text';
        const cityCountry =document.createElement('p');
        cityCountry.className = 'location';
        citycountry.innerHTML= photographerJson.city+ "," + photographerJson.country;
        const tagline =document.createElement('p');
        tagline.className= "tagline";
        tagline.innerHTML= photographerJson.tagline
        const price=document.createElement('p');
        price.className = 'price';
        price.innerHTML=`${photographerJson.price}€/jour`;

        let cardDOMBanner= document.querySelector(".photographer_section");
        console.log(cardDOMBanner);
        cardDOMBanner.appendChild(article);
        article.appendChild(imgBanner);
        article.appendChild(paragraph);
        article.appendChild(anchor);

        anchor.appendChild(img);
        anchor.appendChild(h2)

        paragraph.appendChild(cityCountry);
        paragraph.appendChild(tagline);
        paragraph.appendChild(price);

        return article
    }
    
    
   
      
    function displayPhotographers(){
      photographersJson.forEach((photographerJson)=>{  
        // createCardDOM(photographerJson)
        h2.innerHTML =photographerJson.name;
        anchor.setAttribute('href','../pages/_photographer.js');
        img.setAttribute('src', `../../assets/images/Photographers ID Photos/ ${photographerJson.portrait}`);
        img.setAttribute('width', '200');
        img.setAttribute('height', '200');
        citycountry.innerHTML= photographerJson.city+ "," + photographerJson.country;
        tagline.innerHTML= photographerJson.tagline;
        price.innerHTML=`${
          photographerJson.price}€/j`;
        })
      }      
    // return { name, picture, getUserCardDOM }
      
      //recupération de l 'id du photographe dans l 'url
    //  let queryString =window.location.href;
    //  let url = new URL(queryString);
    //  let login = url.searchParams;
    //  console.log(login);




// let article = document.createElement('article');
// article.className ='photographer_section--user';
//         cardDOMBanner.appendChild(article);
//         article.classList.add('photographer_section--user');

// console.dir(article);

//     const picture = `assets/photographers/${portrait}`;
/*creation carte photographe simplifiée (refuse le 1er appendChild)********************************/
// class Element {
//     constructor(name, type, classname){
//         this.name = name
//         this.type = type
//         this.classname = classname
//     }
//     get el() {
//         return this.createEl()
//     }
//   createEl() {
//         this.name = document.createElement(this.type)
//         this.name.className = this.classname
//         this.name.classList.add(this.classname)
//     }
// }

// function createCardDOM(photographer) {
// let anchor = new Element ( 'anchor', 'a','photographer_section--link').el;
// let article =new Element( 'article','article','photographer_section--user').el;
// let imgBanner =new Element ('imgBanner','div','photographer_section--banner').el;
// let img = new Element('img','img', 'img').el;
// let  h2 = new Element ('h2','h2','h2').el;
// let paragraph =new Element ('paragraph','div','photographer_section--text').el;
// let cityCountry = new Element('cityCountry','p','location').el;
// let tagline = new Element ('tagline','p','tagline').el;
// let price = new Element('price','p','price').el;

// let cardDOMBanner= document.querySelector(".photographer_section");
// console.log(cardDOMBanner);

// cardDOMBanner.appendChild(article);
// article.appendChild(imgBanner);
// article.appendChild(paragraph);
// article.appendChild(anchor);
// anchor.appendChild(img);
// anchor.appendChild(h2);
// paragraph.appendChild(cityCountry);
// paragraph.appendChild(tagline);
// paragraph.appendChild(price);

// //contenu de chaque carte
// img.setAttributr('src', '../../assets/images/Photographers ID Photos/${photographer.portrait}');
// h2.innerHTML = photographerJson.name;
// cityCountry.innerHTML = `${photographerJson.city},${photographerJson.country}`;
// tagline.innerHTML = `${photographerJson.tagline}`;
// price.innerHTML =`${photographerJson.price}€/jour`;

// }
// createEl()

function affichageMedias(photographersJson){
    photographersJson.forEach(photographerJson =>{
// const photographerPageBody = document.createElement('body');
//     photographerPageBody.className ='Photographer-Page-Body';
// const header = document.createElement('header');
//     header.className ='page_photographer-header';
// const linkLogo = document.createElement('a');
//     linkLogo.setAttribute('href','/index.html');
// const imgLogo = document.createElement('img');
//     imgLogo.setAttribute('src','assets/images/logo.png');
//     imgLogo.classList.add('logo');

const pagePhotograph = document.createElement('div');
    pagePhotograph.className ='page_photographer';
    pagePhotograph.id =' photographer.id ';
    pagePhotograph.setAttribute('href', `${string}?id=` + `${photographerJson.id}`)
const sectionPhotograph =document.createElement('section');
    sectionPhotograph.className='page_photographer-informations';
const pagePhotographText = document.createElement('div');
    pagePhotographText.className='page_photographer_text';
const h1 = document.createElement( 'h1' );
    h1.className ='photographer_text--name';
    h1.classList.add('h1');
    h1.innerHTML =`${photographerJson.name}`;
const location =document.createElement('p');
    location.className = 'photographer_text--location';
    location.innerHTML= photographerJson.city+ ", " + photographerJson.country;
const tagline =document.createElement('p');
    tagline.className= "photographer_text--tagline";
    tagline.innerHTML= photographerJson.tagline;
const contactButton =document.createElement('button');
    contactButton.id='contact_button';
    contactButton.innerHTML="Contactez moi"
const picture = document.createElement('picture');
    picture.className ='photographer_section--banner';

const img = document.createElement( 'img' );
    img.setAttribute('src', `../../assets/images/Photographers ID Photos/${photographerJson.portrait}`);
    img.setAttribute('alt',`portrait du photographe ${photographerJson.name}`)
    img.setAttribute('width', '350');
    img.setAttribute('height', '300');
const sectionMediasPhotograph = document.createElement('section');
    sectionMediasPhotograph.className ='page_photographer-medias';
const bannerMediasPhotograph = document.createElement('article');
    bannerMediasPhotograph.className ='page_photographer-media';
const imgPhotograph = document.createElement('img');

let photographHTML= document.querySelector('.Photographer-Page-Body');
photographHTML.appendChild(pagePhotograph);
// let urlPhotograph =`${string}+?id=`+`${photographerJson.id}`;
// const doc = document.implementation.createHTMLDocument('urlPhotograph');
// doc.appendChild(photographerPageBody);
// photographerPageBody.appendChild(header);
header.appendChild(linkLogo);
linkLogo.appendChild(imgLogo);
photographerPageBody.appendChild(pagePhotograph);
pagePhotograph.appendChild(sectionPhotograph);
// pagePhotograph.appendChild(sectionMediasPhotograph);
sectionPhotograph.appendChild(pagePhotographText);

pagePhotographText.appendChild(h1);
pagePhotographText.appendChild(location);
pagePhotographText.appendChild(tagline);

sectionPhotograph.appendChild(contactButton);
sectionPhotograph.appendChild(picture);
picture.appendChild(img);
// bannerMediasPhotograph.appendChild(imgPhotograph);
    })
}
export{ createCardDOM}
// export {getPhotographer}
// import { photographersJson } from "../fetch.js";
// import {displayModal} from "../pages/_contactForm"
// import {closeModal} from "../pages/_contactForm"
// import { Element } from "./elementConstructor";
// let pagePhotograph =new Element('pagePhotograph','div',`photographer-page.html?id=` + `${photographerJson.id}`).el;
// let sectionPhotograph     = new Element('sectionPhotograph','section','page_photographer-informations').el;

// let  pagePhotographText    = new Element('pagePhotographText' ,'div','page_photographer_text').el;
// let  h1    = new Element('h1','h1','photographer_text--name').el;
// let  location   = new Element(,'p','photographer_text--location').el;
// let  tagline    = new Element('tagline','p','photographer_text--tagline').el;
// let  contactButton  = new Element('contactButton ','button','').el;
// let  picture = new Element('picture','picture','photographer_section--banner').el;
// let  img = new Element('img','img','').el;
// let  sectionMediasPhotograp    = new Element('sectionMediasPhotograp','section','page_photographer-medias').el;
// let anchorlightbox= new Element ('anchorlightbox','a','')
// let  bannerMediasPhotograph  =new Element(' bannerMediasPhotograph','article','page_photographer-media').el;
// let imgPhotograph =new Element('imgPhotograph','img',).el
//     const modal = document.getElementById("contact_modal");
//     const modalButton =document.getElementById("contact_button");
//     modalButton.addEventListener("click" => modal.style.display = "block";)
// }
// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }
// import { myFetch  } from '../fetch.js'



// pagePhotograph.setAttribute('href', '../photographer-page.html?id=' + `${photographerJson.id}`)
// img.setAttribute('src', `../../assets/images/Photographers ID Photos/${photographerJson.portrait}`);
// img.setAttribute('width', '200');
// img.setAttribute('height', '200');
// anchorlightbox.setAttribute('href','lightbox-background')
// imgPhotograph.setAttribute('src','mediaJson.image');
// imgPhotograph.setAttribute('width', '350');
// imgPhotograph.setAttribute('height', '300');
// modal.style.display = "block"
//fonction pour recuperer les donnees
class Photographer{
    constructor( name, id, city, country, tagline,price,portrait,media){
        this.name =name,
        this.id = id,
        this.city = city,
        this.country = country,
        this.tagline = tagline,
        this.price = price,
        this.portrait= portrait,
        this.media = media
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
// let photographerJson;




async function myFetch(affichageMedias){
    const response = await fetch("../../data/photographers.json")
    .then( async(response)=>{
        if (response.ok){
            const data=await  response.json()
            console.log(data);
            const photographers = data.photographers;
            const media = data.media;
            // console.log(media);
            // console.log(photographers)
//recuperer les photographes dans un array photographersJson
            // const photographerJson = [];
            for(let photographer of data.photographers){
                let photographerJson = new Photographer(
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
                
 affichageMedias(photographersJson)               
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

// function filterID(mediasJson){
//     if (photographerJson.id == mediaJson.photographerId)
// }
let string = window.location.href;
let url = new URL(string);
let login = url.searchParams.get('id');
console.log(login);

// function affichageMedias(data){
//     console.log('merci');
// }

function affichageMedias(photographersJson){
    photographersJson.forEach(photographerJson =>{
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
myFetch(affichageMedias);

// async function displayDataPage(photographers, ){
//     const pagePhotgrapher = document.querySelector(".pagePhotograph");
//     photographers.forEach((photographer)=>{
        
//     })
// }
// myFetch(affichageMedias)
// sectionMediasPhotograph.appendChild(pageMediasPhotograph);

  

//////dropdown//////////
let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
let dropDownDiv = document.querySelector("#dropdown-button");
let chevron = document.getElementById("chevron")
let date = document.getElementById("date");
let titre = document.getElementById("titre");
console.log(titre);

dropDownPopularityButton.addEventListener("click" ,dropDownOpen)
//si chevron position initiale
function dropDownOpen(){
 dropDownDiv.style.display=" block";
 chevron.classList.add('drop-down-open');

 //si chevron rotate, au click => dropDownDiv.style.display="none";   
}



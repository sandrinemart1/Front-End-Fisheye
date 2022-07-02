import{ dropDownOpen }from'./dropdown.js'
import{displayModal}from './contactForm.js'
import{closeModal}from './contactForm.js'


// fonction pour recuperer les donnees
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


//recuperer l 'url de chq photographe
const photographersJson = [];
const mediasJson =[];
//donner url à chq page photographe et filtrer le images en fct id du photographe
let string = window.location.href;
let url = new URL(string);
let login = url.searchParams.get('id');
// console.log(login);

function myFetch2() {
    fetch("../../data/photographers.json")
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        getData(data);
      } else {
        console.log('erreur')
      }
    })
  }
  myFetch2()
  function getData(data) {
    const photographers = data.photographers
    const media = data.media
    //recuperer les medias dans le photographe correspondant  
    for (let photographer of photographers) {
      let mediaList = []  
      
      Object.defineProperty(photographer, 'media', {
        value: mediaList,
        writable: true 
      })
      for (let mediaId of media) {
        if (photographer.id == mediaId.photographerId) {
          mediaList.push(mediaId);
          // console.log(mediaId.id);
        }
      }
    }
    getPhotographer(data.photographers)
  }
            //recuperer les photographes dans un array photographers
  let photographer
  function getPhotographer(photographers) {
    for (let i = 0; i < photographers.length; i++ ) {
      if (photographers[i].id == login) {
        photographer = new Photographer(
          photographers[i].name, 
          photographers[i].id, 
          photographers[i].city, 
          photographers[i].country,
          photographers[i].tagline,
          photographers[i].price,
          photographers[i].portrait,
          photographers[i].media,
        )
  
        firstName(photographers[i])
        displayPhotographer(photographers[i])
        SeparateCardImage(photographers[i].media)
        displayFooter(photographer[i])
        // likeAdd(photographers[i].media)
        return photographer
      }
    }
  }
 //constante pour recuperer le  prenom du photographe affiché
  function firstName(photographer) {
    let fullName= photographer.name
    let splitName =fullName.split(' ');
    let firstName1= splitName[0];
    firstName  =  firstName1.replace('-',' ');
    // console.log(firstName);
    return firstName
    
  }

// creer entête de la page de chq photographe
function displayPhotographer() {
//bandeau entête page photographe
  document.querySelector('.photographer_text--name').textContent = photographer.name;
  document.querySelector('.photographer_text--location').textContent = photographer.city+ ", " + photographer.country;
  document.querySelector(".photographer_text--tagline").innerHTML= photographer.tagline;
  document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
  //enregistrer le nom du photographesur la modale
  document.querySelector('.modal-header p').innerHTML = photographer.name;
  displayFooter()
  
  }
  //creer la zone info en footer
  function displayFooter(){
    for(let i =0 ; i<photographer.media.length; i ++){
      let eachLikes = photographer.media[i].likes;
      // console.log(eachLikes)
      let likesSum = 0;
      for(let i =0 ; i<photographer.media.length; i ++){ 
        likesSum +=photographer.media[i].likes
  // console.log(likesSum)
        document.querySelector('.infos_likes--count').textContent=likesSum;
     }
   };
  
  document.querySelector('.infos_price').textContent = `${
  photographer.price}€/j`;
   
  } 

//creer un constructor conditionnel
class FactoryMedia{
  constructor() {
    this.createMedia = (type) => {
      let eachMedia
      if (type === 'image') {
        eachMedia = new Image()
      } else if (type === 'video') {
        eachMedia= new Video()
      }
      return eachMedia
    }
  }
}
let ul = document.querySelector('.lightbox_Container--img');
// console.log(ul)

const factory= new FactoryMedia()
// creer une carte pour chq media image
class Image{
  createImage(mediaId){

    let sectionMedia = document.querySelector('.page_photographer-medias');
    let mediaAndAttributes=document.querySelector('.page_photographer-media-attributes');
    sectionMedia.appendChild(mediaAndAttributes);
    let articleMedia =document.createElement('article');
    articleMedia.className='page_photographer-media';
    articleMedia .setAttribute('id',mediaId.id);
    mediaAndAttributes.appendChild(articleMedia);

    let linkMedia = document.createElement('a');
    linkMedia.className ="media_link";
    linkMedia.setAttribute=('id',`${mediaId.title}-${mediaId}`)
    // console.log(linkMedia)
    articleMedia.appendChild(linkMedia);
    let imageMedia = document.createElement('img');
    imageMedia.className ='image-media'
    if(photographer.id == 82|| photographer.id == 925){
      imageMedia.classList.add('improved-image')
    }
    linkMedia.appendChild(imageMedia);
    imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
    imageMedia.setAttribute('alt',"");
    let imageAttributes = document.createElement('div');
    imageAttributes.className = "img_attributes";
    imageAttributes.classList.add ('img_attributes')
    articleMedia.appendChild(imageAttributes);
    let imageTitle =document.createElement('h3');
    imageTitle.textContent = mediaId.title;
    imageAttributes.appendChild(imageTitle);
    let imageLike = document.createElement('p');
    imageLike.textContent =mediaId.likes;
    imageLike.setAttribute('id',mediaId.likes)
    imageAttributes.appendChild(imageLike);
    let span = document.createElement('span');
    span.setAttribute('id','spanHeart${mediaId.id');
    imageAttributes.appendChild(span);
    let imageHeart = document.createElement('i');
    imageHeart.className= "fa-solid fa-heart";
    span.appendChild(imageHeart);
    span.addEventListener('click',()=>console.log(span))
    
 linkMedia.addEventListener('click',(e) => lightboxOpen(e))
// linkMedia.addEventListener('click',(e) => Lightbox.init)
  }


}
//creer une image pour video
class Video{
  createVideo(mediaId) {

    let sectionMedia = document.querySelector('.page_photographer-medias');
    let mediaAndAttributes=document.querySelector('.page_photographer-media-attributes');
    sectionMedia.appendChild(mediaAndAttributes);
  //creation de 1 article par media
    let articleMedia =document.createElement('article');
    articleMedia.className='page_photographer-media';
    articleMedia .setAttribute('id',mediaId.id);
    mediaAndAttributes.appendChild(articleMedia);
    // avec un lien contenant une image
    let linkMedia = document.createElement('a');
    articleMedia.appendChild(linkMedia);
    let imageMedia = document.createElement('video');
    linkMedia.appendChild(imageMedia);
    imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
    // imageMedia.setAttribute('controls',true)
    imageMedia.className ='image-media'
    //avec un bandeau contenant des infos
    let imageAttributes = document.createElement('div');
    imageAttributes.className = "img_attributes";
    imageAttributes.classList.add ('img_attributes')
    articleMedia.appendChild(imageAttributes);
    let imageTitle =document.createElement('h3');
    imageTitle.textContent = mediaId.title;
    imageAttributes.appendChild(imageTitle);
    let imageLike = document.createElement('p');
    imageLike.setAttribute('id',mediaId.likes)
    imageLike.textContent =mediaId.likes;
    imageAttributes.appendChild(imageLike);
    let span = document.createElement('span')
    span.setAttribute('id','spanHeart${mediaId.id')
    imageAttributes.appendChild(span);
    let imageHeart = document.createElement('i');
    imageHeart.className= "fa-solid fa-heart";
    span.appendChild(imageHeart)

   linkMedia.addEventListener('click',(e) => lightboxOpen(e))
  // linkMedia.addEventListener('click',(e) => Lightbox.init)
  }

}

//separer les videos des photos

function SeparateCardImage(media){
  // sectionMedia.innerHTML =''
  media.forEach(mediaId =>{
    //  createDOM(mediaId)
    if(mediaId.image !== undefined){
        let card = factory.createMedia('image');
       card.createImage(mediaId);
      
      }else{
        let card = factory.createMedia('video');
        card.createVideo(mediaId);
        
    }
  })
let allObjects = document.querySelectorAll('.lightbox_object')
console.log(allObjects);
let objects= Array.from(allObjects)
console.log(objects)
objects.forEach((object) =>{
  object.classList.add(`${objects.indexOf(object)}`)
  object.setAttribute('number',`${objects.indexOf(object)}` )
  object.setAttribute('data-id',`${objects.indexOf(object)}` )
  console.log(object.parentNode)
})
let allMedias = document.querySelectorAll('.page_photographer-media')
// console.log(allMedias);
let medias = Array.from(allMedias)
console.log(medias)
medias.forEach((media) => {
  media.classList.add(`${medias.indexOf(media)}`)
  media.setAttribute('number',`${medias.indexOf(media)}` )
  console.log(media.getAttribute('number'))
 
})
}

document.addEventListener('click',(e)=> {
const likesSum = document.querySelector('.infos_likes--count')    
let heart =e.target
// console.log(e.target.tagName)
let heartParent = heart.parentNode;
// console.log(heartParent.parentNode)

let likeP = heartParent.parentNode.querySelector('p')
// console.log(heartParent.parentNode)
       if (e.target.tagName == 'I' && heartParent.className !=='clicked' ){        
        likeP.textContent ++
        likesSum.textContent++
// pour ne cliquer qu 'une seule fois par image'
        heartParent.className='clicked';
      }
    })


//////lightbox//////
let lightBoxBg=document.querySelector('#lightbox-background');
const mainPage = document.querySelector('.Photographer-Page-Main');
let lightboxContainer =document.querySelector(".lightbox-modal")
let buttonClose =document.querySelector(".lightbox_close");
const footerInfos = document.querySelector('.infos')
console.log(buttonClose);
let next = document.querySelector('.lightbox_chevron-next')
let previous = document.querySelector('.lightbox_chevron-previous')

// console.log(picture)
// ouvrir la lightbox
function lightboxOpen(e){
  let nodeListArticle = document.querySelectorAll('.page_photographer-media')
  let articles = Array.from(nodeListArticle)
  articles.forEach(article =>{
    e.preventDefault()
    lightBoxBg.style.display = 'flex'
    lightBoxBg.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('tabindex', '-1')
    footerInfos.style.display ='none';
    footerInfos.setAttribute('aria-hidden','true')
    lightboxContainer.setAttribute('tabindex', '0')
    let picture = window.event.target;
    // console.log(picture);
    let id = findId(picture)
    // let firstObject= document.getElementById(`image${mediaId.id}`)
    let firstObject = document.getElementsByTagName('li[number]')
    console.log(firstObject)
  })
  
  
  
  function findId(picture) {
    if(picture.tagName =='IMG'){
      document.querySelector("#src").src = picture.src;
      let divMedia = picture.parentNode
      let divMedia2 = divMedia.parentNode
      let idDivMedia2 = divMedia2.getAttribute('id')
      // let id = idDivMedia2.replace('divMedia2.id', 'number')
      console.log(idDivMedia2)
    }
    if(picture.tagName =='VIDEO'){
      document.querySelector("#video").src = picture.src;
      console.log(picture.src)
    }
  }
  findPosition()
  function findPosition(picture){
  //   console.log(picture)
  //   let pictureParent = picture.parentNode
  //   let number = pictureParent.getAttribute('number')
  //   console.log(number)
  //   return number  
  } 
  }

// //navigation droite et gauche
next.addEventListener('click', goToNext(2))
function goToNext(media){
 let total = media.length;
 console.log(media)
 const  currentImag = document.querySelector("[data-id='0']")
 console.log(currentImag);
  if(number < total){
    
  }
  
}
  
  


function goToPrevious(){

}
//fermer la lightbox
buttonClose.addEventListener("click", closeLightbox)
function closeLightbox(e){
  lightBoxBg.setAttribute('aria-hidden', 'true')
  mainPage.setAttribute('aria-hidden', 'false')
  mainPage.setAttribute('tabindex', '0')
  footerInfos.style.display='flex';
  footerInfos.setAttribute('aria-hidden','false')
  lightboxContainer.setAttribute('tabindex', '-1')
}
// // lightbox grafikart
// //propriet{htmlElement}element
// class Lightbox{
//   static init(){
//      const articles = document.querySelectorAll('a')
//      console.log(articles)
//      .forEach(article => article.addEventListener('click', e =>{
//      e.preventDefault()
//      new Lightbox(e.currentTarget.getAttribute('href'))
//      console.log(currentTarget)
//   }))
//   }
//   //parametres{string}url de l 'image
//   constructor(url){
//     this.element= this.buildDOM(url)
//     let div= document.querySelector('.lightbox-modal');
//     div.appendChild(this.element)
//   }
//   //parameter{string}url de l' image
//   //return{HtmlElement}
//   buildDOM(url){
//     const dom = document.createElement('div')
//     dom.className = 'lightbox'
//     dom.innerHTML=`<button class="lightbox_chevron-previous"
//     id="lightbox_chevron-previous"
//     aria-labelledby="previous"
//     tabindex="0">
// </button>
//     <p class="previous"
//     id="previous"
//     aria-hidden="true">image précédente</p>
//     <div class="lightbox_Container">
//         <ul class="lightbox_Container--img">
//             <li class="lightbox_object"

//                 aria-hidden="true">
//                 <figure class=" lightbox_figure"
//                 aria-labelledby=\`image${mediaId.id}\`
//                 tabindex="0">
//                     <img class="image_lightbox"
//                     id="src"
//                     src="${url}"
//                     width="1050">
//                     <video class="video-lightbox"
//                     id="video" src="controls"></video>
//                     <figcaption class="title_image"
//                     aria-hidden="true"></figcaption>
//                 </figure>
//             </li>
//         </ul>
//         <button class="lightbox_close">
//             <p class="close_lightbox"
//             id="close_lightbox"
//             aria-hidden="true">fermer la lightbox</p>
//         </button>
//     </div>
//     <button class="lightbox_chevron-next"
//     id="lightbox_chevron-next"
//     aria-labelledby="next"
//     tabindex="0">
//     </button>
//      <p class="next"
//     id="next"
//     aria-hidden="true">image suivante</p> `
//     return dom
//   }
// }
// Lightbox.init()
//trouver la position du 1er  media agrandi

//   findPosition(firstObject)
//   firstObject.style.display = 'flex'
//   firstObject.setAttribute('aria-hidden', 'false')
//   lightboxContainer.focus()
// }








//////dropdown//////////
let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
let dropDownDiv = document.querySelector("#dropdown-button");
let chevron = document.getElementById("chevron")
let date = document.getElementById("date");
let titre = document.getElementById("titre");
let arrowDown = document.querySelector("#chevron i");
console.log(arrowDown);

dropDownPopularityButton.addEventListener("click" ,dropDownOpen)

// function dropDownOpen(){
//   if(chevron.className !=='drop-down-open'){
//  dropDownDiv.style.display=" block";
//  chevron.className='drop-down-open';
//   }else{
//     dropDownDiv.style.display=" none";
//     chevron.className='drop-down-close';
//   }
// }

export{getPhotographer}
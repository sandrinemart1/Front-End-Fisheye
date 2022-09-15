// import{ dropDownOpen }from'./dropdown.js'
import{displayModal,closeModal}from './contactForm.js'
import{modalButton,modalCross,submitButton,modalDiv} from './contactForm.js '

import{Photographer,Media} from '../fetch.js'
import{like} from './likes.js'
import { likeAdd } from './likes.js'

// import{Image,Video} from './factoryMediaPage.js'
// import { SeparateCardImage } from './factoryMediaPage.js'




//recuperer l 'id  de chq photographe avec l 'url
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
          // console.log(mediaId);
        }
      }
    }
    getPhotographer(data.photographers)
    console.log(photographer)
    localStorage.setItem('photographerStock', JSON.stringify(photographer));
  }
 export{getData}
///////   recuperer les photographes grâce à l'id dans un array photographer  ////
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
      SeparateCardImage(photographers[i].media)
      displayPhotographer(photographers[i])
      like(photographers[i].media)
      likeAdd(photographers[i].media)
      return photographer
    }
  }
}

/////   function pour recuperer le  prenom du photographe affiché   ////
function firstName(photographer) {
  let fullName= photographer.name
  let splitName =fullName.split(' ');
  let firstName1= splitName[0];
  firstName  =  firstName1.replace('-',' ');
  // console.log(firstName);
  return firstName
  
}
export{photographer,firstName}



// // creer entête de la page de chq photographe
function displayPhotographer() {
  //bandeau entête page photographe
  document.querySelector('.photographer_text--name').textContent = photographer.name;
  document.querySelector('.photographer_text--location').textContent = photographer.city+ ", " + photographer.country;
  document.querySelector(".photographer_text--tagline").innerHTML= photographer.tagline;
  document.getElementById('contact_button').textContent ='Contactez moi';
  // console.log(document.getElementById('contact_button'))
  document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
  //enregistrer le nom du photographe sur la modale
  document.querySelector('.modal-header p').innerHTML = photographer.name;
  
}





///////////        ouverture et fermeture modale //////////
const mainPage = document.querySelector('.Photographer-Page-Main');
const pageHeader =document.querySelector('.page_photographer-header');
const footerInfos = document.querySelector('.infos');


document.addEventListener('click', (e)=>{
  if (e.target === modalButton) {
      displayModal()
  }
})

modalDiv.addEventListener('click', (e)=>{
  e.preventDefault()
  if(e.target.classList.contains('fa-solid')){
    console.log(e.target)
    console.log(modalCross())
    closeModal()
  }
})
 
  //////////                 incrémentation des likes ////////////

  document.addEventListener('click', (e)=>{
     if (e.target.tagName ==='I' && e.target.className ==='fa-solid fa-heart'){
  like() 
  }})






;
  

 
   
  
 
  /////////////////////////////////////////////////////////////// 

  function ElementFactory(name,type, className,id,attributes){
    var element = {}
  
    element.name = name
    element.type = document.createElement(type),
    element.className = className
    element.id = id, 
    element.setAttribute = attributes
   return element
  
  }
  ////////essai factory fct avec copier coller  ligne 200 et 207// 
  ElementFactory()
  let element2 = ElementFactory('articleMedia2','article','page_photographer-media','mediaId.id');
  let mediaAndAttributes3 = ElementFactory('mediaAndAttributes','div','page_photographer-media-attributes')
  let articleMedia3 = ElementFactory('articleMedia','article','page_photographer-media',`mediaId.id`,)
  let linkMedia3 = ElementFactory('linKMedia','a','media_link','',`mediaId.title`-`mediaId`)

////////////// essai separation 2 fonctions ////////
  function createDomElements(mediaId){
    // let articleMedia2 =document.createElement('article');
    // articleMedia2.className='page_photographer-media';
    // articleMedia2 .setAttribute('id',mediaId.id);
    //  //DOM conteneur <figure>
    // let figure2 = document.createElement('figure')
    // articleMedia2.appendChild(figure2)
    // // DOM lien cliquable <a>
    // let linkMedia2 = document.createElement('a');
    // linkMedia2.className ="media_link";
    // linkMedia2.setAttribute=('id',`${mediaId.title}-${mediaId}`)
    // figure2.appendChild(linkMedia2);
   
    // let imageAttributes2 = document.createElement('div');
    // imageAttributes2.className = "img_attributes";
    // imageAttributes2.classList.add ('img_attributes')
    // articleMedia2.appendChild(imageAttributes2);
  
    //     let imageTitle2 =document.createElement('h3');
    //     imageTitle2.textContent = mediaId.title;
    //     imageAttributes2.appendChild(imageTitle2);
  
    //     let imageLike2 = document.createElement('p');
    //     imageLike2.textContent =mediaId.likes;
    //     imageLike2.setAttribute('id',mediaId.likes)
    //     imageAttributes2.appendChild(imageLike2);
  
    //     let span2 = document.createElement('span');
    //     span2.setAttribute('id','spanHeart${mediaId.id}');
    //     imageAttributes2.appendChild(span2);
    //     let imageHeart2 = document.createElement('i');
    //     imageHeart2.className= "fa-solid fa-heart";
    //     span2.appendChild(imageHeart2);
    //     span2.addEventListener('click',(e)=>console.log(e.target))
    }  



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

///////////// essai  separartion 2 fonctions ///////////////
      // createImage2(mediaId) {
      //   let linkMedia2 = document.getElementById(`${mediaId.title}-${mediaId}`)
      //   let image2 = document.createElement('img')
      //   linkMedia2.appendChild(image2)
      //   linkMedia2.setAttribute('href', 'javascript:void(0);')
      //   imageMedia2.setAttribute('src', `./images/sample_photos/${nickName}/light/${medium.image}`)
      //   imageMedia2.setAttribute('alt', `${mediaId.alt}`)
      //   imageMedia2.setAttribute('id', `id${mediaId.id}`)
      //   if(photographer.id == 82|| photographer.id == 925){
      //     imageMedia2.classList.add('improved-image')
      //   }
      //   imageMedia2.setAttribute('width', '350')
      //   imageMedia2.setAttribute('height', '300')
    
      //   linkMedia2.addEventListener('click', (e) => lightboxOpen(e))
      // }
      createImage(mediaId){
              // document.querySelector('.page_photographer-media-attributes').innerHTML = 
              // `<article class="page_photographer-media" id= ``>
              // <a href="lightbox-background" id= ``>
              //     <img class='image-media'src=`` alt="">
              // </a>
              // <div class="img_attributes">
              //     <h3 id ="">mediaId.title</h3>
              //     <p id="">mediaId.likes</p>
              //     <span><i class="fa-solid fa-heart"></i></span>
              // </article>`
        let sectionMedia = document.querySelector('.page_photographer-medias');
        let mediaAndAttributes=document.querySelector('.page_photographer-media-attributes');
        sectionMedia.appendChild(mediaAndAttributes);
        // let articleMedia = ElementFactory('articleMedia','article','page_photographer-media',`mediaId.id`)
      //  console.log(articleMedia)
        let articleMedia =document.createElement('article');
        articleMedia.className='page_photographer-media';
        articleMedia .setAttribute('id',mediaId.id);
        // console.log(articleMedia)
        mediaAndAttributes.appendChild(articleMedia);
        // let linkMedia = ElementFactory('linKMedia','a','media_link','',`${mediaId.title}-${mediaId}`)
        // console.log(linkMedia)
        let linkMedia = document.createElement('a');
        linkMedia.className ="media_link";
        linkMedia.setAttribute('id',`${mediaId.title}-${mediaId.id}`)
        // linkMedia.setAttribute =('href',`lightbox-background`)
        articleMedia.appendChild(linkMedia);
        let imageMedia = document.createElement('img');
        imageMedia.className ='image-media'
        //corriger les images mal centrées
        if(photographer.id == 82|| photographer.id == 925){
          imageMedia.classList.add('improved-image')
        }
        linkMedia.appendChild(imageMedia);
        imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
        imageMedia.setAttribute('alt',"");
        imageMedia.setAttribute('id',`${mediaId.id}`)
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
        // span.addEventListener('click',()=>console.error)
        linkMedia.addEventListener('click',(e) => lightboxOpen(e))  
      }
//creer une image pour la lightbox
      createImageLightbox(mediaId){
        let li = document.createElement('li')
        li.style.display ='none';
        li.className ='lightbox_object'
        li.setAttribute('id', `object${mediaId.id}`)
        ul.appendChild(li)
        let figure = document.createElement('figure')
        figure.className ='lightbox_figure'
        li.appendChild(figure)
        let image = document.createElement('img')
        image.className ='image_lightbox'
        image.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
        image.setAttribute('id',`image${mediaId.id}`)
        figure.appendChild(image)
        let figcaption = document.createElement('figcaption')
        figcaption.className = "title_image"
        figcaption.innerText = mediaId.title
        figure.appendChild(figcaption)

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
      //   // avec un lien contenant une image
        let linkMedia = document.createElement('a');
        articleMedia.appendChild(linkMedia);
        let imageMedia = document.createElement('video');
        linkMedia.appendChild(imageMedia);
        imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
        // linkMedia.setAttribute =('href',`lightbox-background`)
        imageMedia.setAttribute('controls',true)
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
    return Video
       linkMedia.addEventListener('click',(e) => lightboxOpen(e))
      // linkMedia.addEventListener('click',(e) => Lightbox.init)
      }
    
    }

  // //separer les videos des photos
  
  function SeparateCardImage(media){
    console.log(media)
    // sectionMedia.innerHTML =''
    media.forEach(mediaId =>{
      createDomElements(mediaId)
      if(mediaId.image !== undefined){
          let card = factory.createMedia('image');
          card.createImage(mediaId);
          card.createImageLightbox(mediaId)
        }else{
          let card = factory.createMedia('video');
          card.createVideo(mediaId);
          
      }
      return mediaId
    })

let allObjects = document.querySelectorAll('.lightbox_object')
// console.log(allObjects)
let objects = Array.from(allObjects);
console.log(objects)
objects.forEach((object)=>{
  object.classList.add(`object_${objects.indexOf(object)}`)
})
let allMedias = document.querySelectorAll('.media_link')
// console.log(allMedias)
let medias = Array.from(allMedias);
console.log(medias)
medias.forEach((media)=> {
media.classList.add(`media_${medias.indexOf(media)}`)
})

  }
////
////////////////////     lightbox //////////


let lightBoxBg=document.querySelector('#lightbox-background');
let lightboxContainer =document.querySelector(".lightbox-modal")
let buttonClose =document.querySelector(".lightbox_close");
let next = document.querySelector('.lightbox_chevron-next')
let previous = document.querySelector('.lightbox_chevron-previous')
let imagesLightBox = document.getElementsByClassName('image-media')
let position
// console.log(imagesLightBox)
document.addEventListener('click', (e)=>{
  if(e.target.tagName === 'IMG' && e.target.className ==='image-media'){
    lightboxOpen(e)
  }
  });

//   // ouvrir la lightbox
function lightboxOpen(e){
  // let nodeListArticle = document.querySelectorAll('.page_photographer-media')
  // let articles = Array.from(nodeListArticle)
  // articles.forEach(article =>{
    e.preventDefault()
    lightBoxBg.style.display = 'flex'
    lightBoxBg.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('tabindex', '-1')
    modalButton.style.display ='none';
    footerInfos.style.display ='none';
    footerInfos.setAttribute('aria-hidden','true')
    lightboxContainer.setAttribute('tabindex', '0')
    let picture = window.event.target;
   console.log(picture.parentNode)
    let id = findId(picture)
    let firstObject= document.getElementById(`object${id}`)
    // let firstObject = document.getElementsByTagName('li[number]')
    // firstObject.style.display='flex';
    console.log(firstObject)

    position = giveThePosition(firstObject)
    return firstObject
  }
 ////// trouver l 'id de l 'image cliquée ///////////
function findId(picture) {
  if(picture.tagName !=='A'){
    document.querySelector("#src").src = picture.src;
    // console.log(picture.src)
    let divMedia = picture.parentNode
    // console.log(divMedia)
    let divMedia2 = divMedia.parentNode
    // console.log(divMedia2)
    let idDivMedia2 = divMedia2.getAttribute('id')
    // console.log(idDivMedia2)
    let id = idDivMedia2.replace('divMedia2.id', 'number')
    console.log(id)
    return id
  }

}   

//////////// position de l'image dans la lightbox  ////////
function giveThePosition(firstObject){
  let className = firstObject.className
  console.log(className)
  let i = className.lastIndexOf ('_')
  let positionSt = className.substr(i+1)
  console.log(positionSt)
  let position = parseInt(positionSt)
  console.log(position)
  return position
}


//Navigation droite gauche dans la lightbox
next.addEventListener('click',() =>goToNext());
function goToNext(){
  let allObjects = document.querySelectorAll('.lightbox_object')
  console.log(allObjects.length)
  let total = allObjects.length-1
  console.log(position)
  if (position< total){
    const lastObject = document.querySelector(`.allObject-${position}`)
    console.log(lastObject)
    position++
    console.log(JSON.parse(localStorage.getItem('photographerStock')).media[position])
    console.log(document.getElementById('src').src)
  document.getElementById('src').src = 'http://127.0.0.1:5502/assets/images/Tracy/'+JSON.parse(localStorage.getItem('photographerStock')).media[position].image
  const currentObject = document.querySelector(`.allObject-${position}`)
  // console.log(currentObject)
  setNodeAttributes(lastObject,currentObject)
}else if (position === total){
  const lastObject = document.querySelector(`.allObject-${position}`)
  position = 0
  const currentObject = document.querySelector(`.allObject-${position}`)
  setNodeAttributes(lastObject,currentObject) 
}
}

const setNodeAttributes = (lastObject, currentObject) =>{
  lastObject.childNodes.style.display ='none'
  currentObject.childNodes.style= 'flex'
  lastObject.setAttribute('aria-hidden', 'true')
  currentObject.setAttribute('aria-hidden', 'false')
}
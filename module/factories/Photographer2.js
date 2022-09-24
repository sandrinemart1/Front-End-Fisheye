
import{displayModal,closeModal}from './contactForm.js'
import{modal,modalButton,modalCross,submitButton,modalDiv} from './contactForm.js '

import{Photographer,Media} from '../fetch.js'
import{like} from './likes.js'
import { likeAdd } from './likes.js'

// import{Image,Video} from './factoryMediaPage.js'
// import { SeparateCardImage } from './factoryMediaPage.js'
// import { dropDownOpen } from '../dropdown.js'



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





const mainPage = document.querySelector('.Photographer-Page-Main');
const pageHeader =document.querySelector('.page_photographer-header');
const footerInfos = document.querySelector('.infos');

///////////   ouverture et fermeture modale //////////

document.addEventListener('click', (e)=>{
  if (e.target === modalButton) {
      displayModal()
  }
})

modalCross.addEventListener('click', (e)=>{
  e.preventDefault()
    closeModal()
  })


  //////////    incrémentation des likes ////////////

  document.addEventListener('click', (e)=>{
     if (e.target.tagName ==='I' && e.target.className ==='fa-solid fa-heart'){
  like() 
  }})
 

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
        // console.log(articleMedia)
        mediaAndAttributes.appendChild(articleMedia);

        let linkMedia = document.createElement('a');
        linkMedia.className ="media_link";
        linkMedia.setAttribute('id',`${mediaId.title}-${mediaId.id}`)
 
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
        linkMedia.className ="media_link";
        linkMedia.setAttribute('id',`${mediaId.title}-${mediaId.id}`)
        articleMedia.appendChild(linkMedia);
        let imageMedia = document.createElement('video');
        linkMedia.appendChild(imageMedia);
        imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
        imageMedia.setAttribute('id',`${mediaId.id}`)
        imageMedia.setAttribute('controls',true)
        imageMedia.className ='image-media';
        
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
     
      }
    createVideoLightbox(mediaId){
      let li = document.createElement('li')
        li.style.display ='none';
        li.className ='lightbox_object'
        li.setAttribute('id', `object${mediaId.id}`)
        // li.setAttribute('aria-hidden', 'true')
        ul.appendChild(li)
        let figure = document.createElement('figure')
        figure.className ='lightbox_figure'
        figure.setAttribute('tabindex', '0')
        li.appendChild(figure)
        let image = document.createElement('video')
        image.className ='image_lightbox'
        image.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
        image.setAttribute('controls',true)
        image.setAttribute('id',`image${mediaId.id}`)
        figure.appendChild(image)
        let figcaption = document.createElement('figcaption')
        figcaption.className = "title_image"
        figcaption.innerText = mediaId.title
        figure.appendChild(figcaption)
    }
    }
    //Masquer les controles video le tem
  //   let video = document.getElementsByTagName('video')
    
  //   video.hover(function toggleControls() {
  //     if (this.hasAttribute("controls")) {
  //         this.removeAttribute("controls")
  //     } else {
  //         this.setAttribute("controls", "controls")
  //     }
  // })





  function createDomElements(mediaId){
    // let article2 = ElementFactory('articleMedia2','article','page_photographer-media','mediaId.id');
    // console.log(article2)
    // mediaAndAttributes.appendChild(article2)
    // let figure2 = document.createElement('figure')
    // article2.appendChild(figure2)
    // let link2 = ElementFactory('link2','a','media_link',`${mediaId.title}-${mediaId.id}`)
    //       // //avec un bandeau contenant des infos
    // let imageAttributes2 = ElementFactory('imageAttributes2','div','img_attributes','')

    //     article2.appendChild(imageAttributes);
    //     let imageTitle =document.createElement('h3');
    //     imageTitle.textContent = mediaId.title;
    //     imageAttributes2.appendChild(imageTitle);
    //     let imageLike = document.createElement('p');
    //     imageLike.setAttribute('id',mediaId.likes)
    //     imageLike.textContent =mediaId.likes;
    //     imageAttributes2.appendChild(imageLike);
    //     let span = document.createElement('span')
    //     span.setAttribute('id','spanHeart${mediaId.id')
    //     imageAttributes2.appendChild(span);
    //     let imageHeart = document.createElement('i');
    //     imageHeart.className= "fa-solid fa-heart";
    //     span.appendChild(imageHeart)
    
  }  
  function SeparateCardImage(media){
    // console.log(media)
    
    let mediaAndAttributes=document.querySelector('.page_photographer-media-attributes');
    mediaAndAttributes.innerHTML =''

    media.forEach(mediaId =>{
      createDomElements(mediaId)
      if(mediaId.image !== undefined){
          let card = factory.createMedia('image');
          card.createImage(mediaId);
          card.createImageLightbox(mediaId)
        }else{
          let card = factory.createMedia('video');
          card.createVideo(mediaId);
          card.createVideoLightbox(mediaId)
          
      }
      return mediaId
    })

let allObjects = document.querySelectorAll('.lightbox_object')
// console.log(allObjects)
let objects = Array.from(allObjects);
// console.log(objects)
objects.forEach((object)=>{
  object.classList.add(`object_${objects.indexOf(object)}`)
})
let allMedias = document.querySelectorAll('.media_link')
// console.log(allMedias)
let medias = Array.from(allMedias);
// console.log(medias)
medias.forEach((media)=> {
media.classList.add(`media_${medias.indexOf(media)}`)
})

}


console.log(JSON.parse(localStorage.getItem('photographerStock')))
let stock = JSON.parse(localStorage.getItem('photographerStock'))
console.log(stock)



//// appel  dropdown///////////////


let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
let dropDownDiv = document.querySelector("#dropdown-button");
let chevron = document.getElementById("chevron")
let date = document.getElementById("date");
let titre = document.getElementById("titre");
let arrow = document.querySelector("#chevron i");

dropDownPopularityButton.addEventListener('click', () => popularitySort(stock.media))
arrow.addEventListener("click",()=>dropDownOpen())

// dropDownPopularityButton.addEventListener("click" ,dropDownOpen)

function dropDownOpen(){
  dropDownDiv.style.display ='block';
  if(chevron.className !=='drop-down-open'){
 dropDownDiv.style.display=" block";
 chevron.className='drop-down-open';
  }else{
    dropDownDiv.style.display=" none";
    chevron.className='drop-down-close';
  }
}
///////  fonctions de tri  //////////////
////// bouton 'populaire' //////////////
dropDownPopularityButton.addEventListener('click', () => popularitySort(stock.media))
function popularitySort(media) {
  function tri(a,b) {
    return ((a.likes < b.likes) ? 1 : (a.likes == b.likes) ? 0 : -1)
  }
  media.sort(tri)
  SeparateCardImage(media)
  }
//////  bouton 'titre' //////////////
titre.addEventListener('click', () => titleSort(stock.media))
function titleSort(media){

  function tri(a,b){
    let titreA = a.title.split(' ').join('')
    a= titreA.toLowerCase()
    let titreB = b.title.split(' ').join('')
    b = titreB.toLowerCase()
    return (a < b) ? -1 : 1
  }
  media.sort(tri)
SeparateCardImage(stock.media)
}







////////////////////     lightbox //////////


let lightBoxBg=document.querySelector('#lightbox-background');
let lightboxContainer =document.querySelector(".lightbox-modal")
let buttonClose =document.querySelector(".lightbox_close");
let next = document.querySelector('.lightbox_chevron-next')
let previous = document.querySelector('.lightbox_chevron-previous')
let imagesLightBox = document.getElementsByClassName('image-media')
let position
// console.log(imagesLightBox)
document.addEventListener('click', (e)=>{console.log(e.target)})


document.addEventListener('click', (e)=>{
  if((e.target.tagName === 'IMG'||'VIDEO') && e.target.className ==='image-media')
    lightboxOpen(e)
  }
  );

//   // ouvrir la lightbox
function lightboxOpen(e){
  
    e.preventDefault()
    lightBoxBg.style.display = 'flex'
    lightBoxBg.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('tabindex', '-1')
    modalButton.style.display ='none';
    // footerInfos.style.display ='none';
    // footerInfos.setAttribute('aria-hidden','true')
    lightboxContainer.setAttribute('tabindex', '0')
    let picture = window.event.target;
  //  console.log(picture.parentNode)
    let id = findId(picture)
    let firstObject= document.getElementById(`object${id}`)
    firstObject.style.display ='flex' 
  //  console.log(firstObject)

    position = giveThePosition(firstObject)
    return firstObject
  }
  console.log(document.getElementById('src'))

 ////// trouver l 'id de l 'image cliquée ///////////
function findId(picture) {
  if(picture.tagName !=='A'){
    console.log(document.querySelector("#src"))
    document.querySelector("#src").src = picture.src;
    console.log(picture.src)
    let divMedia = picture.parentNode
    let divMedia2 = divMedia.parentNode
    let idDivMedia2 = divMedia2.getAttribute('id')
    let id = idDivMedia2.replace('divMedia2.id', 'number')
    console.log(id)
    return id
  }

}   

//////////// position de l'image dans la lightbox  ////////
function giveThePosition(firstObject){
  let className = firstObject.className
  // console.log(className)
  let i = className.lastIndexOf ('_')
  let positionSt = className.substr(i+1)
  // console.log(positionSt)
  let position = parseInt(positionSt)
  // console.log(position)
  return position
}


//Navigation droite gauche dans la lightbox
next.addEventListener('click',() =>goToNext());
function goToNext(){
  let allObjects = document.querySelectorAll('.lightbox_object')
  // console.log(allObjects)
  let total = allObjects.length-1
  // console.log(position)
  if (position< total){
    const lastObject = document.querySelector(`.object_${position}`)
    console.log(lastObject)
    position++
    console.log(JSON.parse(localStorage.getItem('photographerStock')).media[position])
    console.log(document.getElementById('src').src)
  document.getElementById('src').src = `http://127.0.0.1:5502/assets/images/${firstName}/`+JSON.parse(localStorage.getItem('photographerStock')).media[position].image
  const currentObject = document.querySelector(`.object_${position}`)
  console.log(currentObject)
  setNodeAttributes(lastObject,currentObject)
}else if (position === total){
  const lastObject = document.querySelector(`.object_${position}`)
  position = 0
  const currentObject = document.querySelector(`.object_${position}`)
  setNodeAttributes(lastObject,currentObject) 
}
}


previous.addEventListener('click',() =>goToPrevious());

function goToPrevious(){
  let allObjects = document.querySelectorAll('.lightbox_object')
  let total = allObjects.length-1;
  console.log(position)
  if (position - 1 >= 0) {
    position -= 1
    document.getElementById('src').src =`http://127.0.0.1:5502/assets/images/${firstName}/`+JSON.parse(localStorage.getItem('photographerStock')).media[position].image
    const currentObject = document.querySelector(`.object_${position}`)
    const lastObject = document.querySelector(`.object_${position + 1}`)
    console.log(currentObject)
    // setNodeAttributes(lastObject, currentObject)
  } else {
    const lastObject = document.querySelector(`.object_${position}`)
    position = total
    const currentObject = document.querySelector(`.item-${position}`)
    console.log(JSON.parse(localStorage.getItem('photographerStock')).media[position])
    console.log(document.getElementById('src').src)
    // setNodeAttributes(lastObject, currentObject)
  
}
}
const setNodeAttributes = (lastObject, currentObject) => {
  // lastObject.style.display = 'none'
  // currentObject.style.display = 'flex'
  // lastObject.setAttribute('aria-hidden', 'true')
  // currentObject.setAttribute('aria-hidden', 'false')
}

//fermeture lightbox
buttonClose.addEventListener('click',()=>lightboxClose())
lightBoxBg.addEventListener('keydown',(e) => onKey(e))
function onKey(e){
  let keyname = e.key
  if(keyname =='Escape'){
    lightboxClose()
  }
}

function lightboxClose(){
  
  lightBoxBg.style.display = 'none'
  lightBoxBg.setAttribute('aria-hidden', 'true')
  mainPage.setAttribute('aria-hidden', 'false')
  mainPage.setAttribute('tabindex', '0')
  modalButton.style.display ='flex';
  footerInfos.style.display ='flex';
  footerInfos.setAttribute('aria-hidden','false')
}
// lightboxContainer.removeEventListener('keydown', onKeyUp)
//   next.removeEventListener('click', () => goToNextSlide())
//   prev.removeEventListener('click', () => goToPreviousSlide())
export {SeparateCardImage}



import{displayModal}from './contactForm.js'
import{modal,modalButton,modalCross,submitButton,modalDiv} from './contactForm.js '
// import{myFetch2} from'../fetch-page-photographer.js' 
import{Photographer,Media} from '../fetch.js'
import{like} from './likes.js'
import { likeAdd } from './likes.js'

// import{Image,Video} from './factoryMediaPage.js'
import { SeparateCardImage } from './factoryMediaPage.js'
import { dropDownOpen,dropDownClose, popularitySort, dateSort, titleSort} from '../dropdown.js'



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
        }
      }
    }
    getPhotographer(data.photographers)
    // console.log(photographer)
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
  document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
  document.querySelector('.photographer_section--banner >img').setAttribute('alt',`portrait du photographe ${photographer.name}`)
  //enregistrer le nom du photographe sur la modale
  document.querySelector('#form__name').innerHTML = photographer.name;
  
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
    console.log(e.target)
     if (e.target.tagName ==='I' && e.target.className ==='fa-solid fa-heart'){
  like() 
  }})
 

let stock = JSON.parse(localStorage.getItem('photographerStock'));

console.log(stock)




//// DROPDOWN  APPEL ///////////////

let chevronDown = document.getElementById("button-dropdown")
let popularity = document.getElementById("option1");
let date = document.getElementById("option2");
let titre = document.getElementById("option3");
let chevronUp = document.getElementById("button-dropup")

console.log(chevronUp)

chevronDown.addEventListener("click",()=>dropDownOpen())
chevronUp.addEventListener('click', () =>dropDownClose())
///////  fonctions de tri avec boutons :'populaire' 'date' 'titre' //////////////
popularity.addEventListener('click', () => popularitySort(stock.media))
popularity.addEventListener('keydown',(e)=>{
  if(e.key ==='Enter'){
    popularitySort(stock.media)
  }
})
date.addEventListener('click',()=> dateSort(stock.media))
date.addEventListener('keydown',(e)=>{
  if(e.key ==='Enter'){
    dateSort(stock.media)
  }
})
titre.addEventListener('click', () => titleSort(stock.media))
titre.addEventListener('keydown',(e)=>{
  if(e.key ==='Enter'){
    titleSort(stock.media)
  }
})

////////////////////     LIGHTBOX //////////


// let lightBoxBg=document.querySelector('#lightbox-background');
// let lightboxContainer =document.querySelector(".lightbox-modal")
// let buttonClose =document.querySelector(".lightbox_close");
// let next = document.querySelector('.lightbox_chevron--next')
// let previous = document.querySelector('.lightbox_chevron--previous')
// let imagesLightBox = document.getElementsByClassName('image-media')
// let position
// // console.log(imagesLightBox)
// document.addEventListener('click', (e)=>{console.log(e.key)})


// document.addEventListener('click', (e)=>{
//   if((e.target.tagName === 'IMG'||'VIDEO') && e.target.className ==='image-media')
//     lightboxOpen(e)
//   }
//   );

// //   // ouvrir la lightbox
// function lightboxOpen(e){
//   let lightBoxBg=document.querySelector('#lightbox-background');
//   let lightboxContainer =document.querySelector(".lightbox-modal")
//   let position
// // console.log(imagesLightBox)
// document.addEventListener('click', (e)=>{console.log(e.target)})
//     e.preventDefault()
//     lightBoxBg.style.display = 'flex'
//     lightBoxBg.setAttribute('aria-hidden', 'false')
//     mainPage.setAttribute('aria-hidden', 'true')
//     mainPage.setAttribute('tabindex', '-1')
//     modalButton.style.display ='none';
//     footerInfos.style.display ='none';
//     footerInfos.setAttribute('aria-hidden','true')
//     lightboxContainer.setAttribute('tabindex', '0')
//     let picture = window.event.target;
//     let id = findId(picture)
//     let firstObject= document.getElementById(`object${id}`)
//     firstObject.style.display ='flex' 
//    console.log(firstObject)

//     position = giveThePosition(firstObject)
//     return firstObject
//   }
//   // console.log(document.getElementById('src'))

//  ////// trouver l 'id de l 'image cliquée ///////////
// function findId(picture) {
//   if(picture.tagName !=='A'){
//     console.log(document.querySelector("#src"))
//     document.querySelector("#src").src = picture.src;
//     console.log(picture.src)
//     let divMedia = picture.parentNode
//     let divMedia2 = divMedia.parentNode
//     let idDivMedia2 = divMedia2.getAttribute('id')
//     let id = idDivMedia2.replace('divMedia2.id', 'number')
//     return id
//   }

// }   

// //////////// position de l'image dans la lightbox  ////////
// function giveThePosition(firstObject){
//   let className = firstObject.className
//   let i = className.lastIndexOf ('_')
//   let positionSt = className.substr(i+1)
//   let position = parseInt(positionSt)
//   return position
// }


// //Navigation droite gauche dans la lightbox
// next.addEventListener('click',() =>goToNext());
// function goToNext(){
//   let allObjects = document.querySelectorAll('.lightbox_object')
//   // console.log(allObjects)
//   let total = allObjects.length-1
//   // console.log(position)
//   if (position< total){
//     const lastObject = document.querySelector(`.object_${position}`)
//     console.log(lastObject)
//     position++
//     console.log(JSON.parse(localStorage.getItem('photographerStock')).media[position])
//     console.log(document.getElementById('src').src)
//   document.getElementById('src').src = `http://127.0.0.1:5502/assets/images/${firstName}/`+JSON.parse(localStorage.getItem('photographerStock')).media[position].image
//   const currentObject = document.querySelector(`.object_${position}`)
//   console.log(currentObject)
//   // setNodeAttributes(lastObject,currentObject)
// }else if (position === total){
//   const lastObject = document.querySelector(`.object_${position}`)
//   position = 0
//   const currentObject = document.querySelector(`.object_${position}`)
//   setNodeAttributes(lastObject,currentObject) 
// }
// }


// previous.addEventListener('click',() =>goToPrevious());

// function goToPrevious(){
//   let allObjects = document.querySelectorAll('.lightbox_object')
//   let total = allObjects.length-1;
//   console.log(position)
//   if (position - 1 >= 0) {
//     position -= 1
//     document.getElementById('src').src =`http://127.0.0.1:5502/assets/images/${firstName}/`+JSON.parse(localStorage.getItem('photographerStock')).media[position].image
//     const currentObject = document.querySelector(`.object_${position}`)
//     const lastObject = document.querySelector(`.object_${position + 1}`)
//     console.log(currentObject)
//     setNodeAttributes(lastObject, currentObject)
//   } else {
//     const lastObject = document.querySelector(`.object_${position}`)
//     position = total
//     const currentObject = document.querySelector(`.item-${position}`)
//     console.log(JSON.parse(localStorage.getItem('photographerStock')).media[position])
//     console.log(document.getElementById('src').src)
//     setNodeAttributes(lastObject, currentObject)
  
// }
// }
// const setNodeAttributes = (lastObject, currentObject) => {
//   lastObject.style.display = 'none'
//   currentObject.style.display = 'flex'
//   lastObject.setAttribute('aria-hidden', 'true')
//   currentObject.setAttribute('aria-hidden', 'false')
// }

// //fermeture lightbox
// buttonClose.addEventListener('click',()=>lightboxClose())
// document.body.addEventListener('keydown',(e) => onKey(e))
// function onKey(e){
//   console.log(e.target)
//   let keyname = e.key
//   if(keyname =='Escape'){
//     lightboxClose()
//   }
// }

// function lightboxClose(){
  
//   lightBoxBg.style.display = 'none'
//   lightBoxBg.setAttribute('aria-hidden', 'true')
//   mainPage.setAttribute('aria-hidden', 'false')
//   mainPage.setAttribute('tabindex', '0')
//   modalButton.style.display ='flex';
//   footerInfos.style.display ='flex';
//   footerInfos.setAttribute('aria-hidden','false')
// }
// lightboxContainer.removeEventListener('keydown', onKeyUp)
//   next.removeEventListener('click', () => goToNextSlide())
//   prev.removeEventListener('click', () => goToPreviousSlide())
export {SeparateCardImage}


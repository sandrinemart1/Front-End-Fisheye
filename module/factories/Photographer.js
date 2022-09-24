import{displayModal,closeModal}from './contactForm.js'
import{modalButton,modalCross,submitButton,modalDiv} from './contactForm.js '

import{Photographer,Media} from '../fetch.js'
import{like} from './likes.js'
import { likeAdd } from './likes.js'

// import{Image,Video} from './factoryMediaPage.js'
// import { SeparateCardImage } from './factoryMediaPage.js'
// import{ dropDownOpen }from'./dropdown.js'

const photographersJson = [];
const mediasJson =[];


//recuperer l 'id  de chq photographe avec l 'url
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
let stock = JSON.parse(localStorage.getItem('photographerStock'))
console.log(stock.media)

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
  export{ElementFactory}

  ////////////// essai separation 2 fonctions ////////
  let sectionMedia = ElementFactory('sectionMedia','div','page_photographer-medias');
  let mediaAndAttributes = ElementFactory('mediaAndAttributes','div','page_photographer-media-attributes');
  sectionMedia.appendChild(mediaAndAttributes);
 console.log(sectionMedia)
  function createDomElements(mediaId){
    
    let article2 = ElementFactory('articleMedia2','article','page_photographer-media','mediaId.id');
    console.log(article2)
    mediaAndAttributes.appendChild(article2)
    let figure2 = document.createElement('figure')
    article2.appendChild(figure2)
    let link2 = ElementFactory('link2','a','media_link',`${mediaId.title}-${mediaId.id}`)
          // //avec un bandeau contenant des infos
    let imageAttributes2 = ElementFactory('imageAttributes2','div','img_attributes','')

        article2.appendChild(imageAttributes);
        let imageTitle =document.createElement('h3');
        imageTitle.textContent = mediaId.title;
        imageAttributes2.appendChild(imageTitle);
        let imageLike = document.createElement('p');
        imageLike.setAttribute('id',mediaId.likes)
        imageLike.textContent =mediaId.likes;
        imageAttributes2.appendChild(imageLike);
        let span = document.createElement('span')
        span.setAttribute('id','spanHeart${mediaId.id')
        imageAttributes2.appendChild(span);
        let imageHeart = document.createElement('i');
        imageHeart.className= "fa-solid fa-heart";
        span.appendChild(imageHeart)
    
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
      createImage2(mediaId) {
        let link2 = document.getElementById(`${mediaId.title}-${mediaId}`)
        let image2 = document.createElement('img')
        link2.appendChild(image2)
        link2.setAttribute('href', 'javascript:void(0);')

        image2.setAttribute('src', 'src',`../../assets/images/${firstName}/${mediaId.image}` )
        image2.setAttribute('alt', `${mediaId.alt}`)
        image2.setAttribute('id', `id${mediaId.id}`)
        if(photographer.id == 82|| photographer.id == 925){
          image2.classList.add('improved-image')
        }
        image2.setAttribute('width', '350')
        image2.setAttribute('height', '300')
    
        link2.addEventListener('click', (e) => lightboxOpen(e))
      }
      createImage2Lightbox(mediaId){
        let li = ElementFactory('li','li','lightbox_object',`object${mediaId.id}`)
        li.style.display ='none';
        ul.appendChild(li)

        let figure = document.createElement('figure')
        figure.className ='lightbox_figure'
        li.appendChild(figure)

        let image2 = ElementFactory('image2','img','image_lightbox',`image${mediaId.id}`)
        image2.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
        figure.appendChild(image2)
      
        let figcaption = document.createElement('figcaption')
        figcaption.className = "title_image"
        figcaption.innerText = mediaId.title
        figure.appendChild(figcaption)
      }
    }   

    
    //creer une image pour video
    class Video{
      createVideo2(mediaId) {
      //// un lien contenant une image
      let link2 = document.getElementById(`${mediaId.title}-${mediaId}`)
  
      let image2 = document.createElement('video');
      link2.appendChild(image2);
      image2.setAttribute('src', 'src',`../../assets/images/${firstName}/${mediaId.video}` )

      image2.setAttribute('controls',true)
      image2.className ='image-media'
      link2.addEventListener('click',(e) => lightboxOpen(e))
      }
    createVideo2Lightbox(mediaId){
      let li = ElementFactory('li','li','lightbox_object',`object${mediaId.id}`)
      li.style.display ='none';
      ul.appendChild(li)

      let figure = document.createElement('figure')
      figure.className ='lightbox_figure'
      li.appendChild(figure)

      let image2 = ElementFactory('image2','img','image_lightbox',`image${mediaId.id}`)
      image2.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
      image2.setAttribute('controls',true)
      image2.className ='image-media'
      figure.appendChild(image2)
    
      let figcaption = document.createElement('figcaption')
      figcaption.className = "title_image"
      figcaption.innerText = mediaId.title
      figure.appendChild(figcaption)
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
console.log(JSON.parse(localStorage.getItem('photographerStock')))








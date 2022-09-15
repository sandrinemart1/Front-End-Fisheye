import{displayModal,closeModal}from './contactForm.js'
import{modalButton,modalCross,submitButton,modalDiv} from './contactForm.js '

import{Photographer,Media} from '../fetch.js'
import{like} from './likes.js'
import { likeAdd } from './likes.js'

console.log(mediasJson)

//recuperer l 'id  de chq photographe avec l 'url
const photographersJson = [];
const mediasJson =[];
//donner url à chq page photographe et filtrer le images en fct id du photographe
let string = window.location.href;
let url = new URL(string);
let login = url.searchParams.get('id');


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
  
  ///faire correspondre les medias avec les photographes adéquats
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
          console.log(mediaId);
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
      SeparateCardImage2(photographers[i].media)
      displayPhotographer2(photographers[i])
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
function displayPhotographer2() {
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

/////////////////testfactory//////////
let sectionMedia = document.querySelector('.page_photographer-medias');

// creer un constructor conditionnel
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

  class Image2{

    createImage2(medium){
      console.log(medium)
      let linkMedia2 = document.getElementById(`${medium.title}-${medium}`);
      let imageMedia2 = document.createElement('img');linkMedia2.appendChild(imageMedia2);
      linkMedia2.setAttribute('href','javascript:void(0);')
      imageMedia2.setAttribute('src',`../../assets/images/${firstName}/${medium.image}` );
      imageMedia2.setAttribute('alt',"");
      linkMedia2.addEventListener('click',(e) => lightboxOpen(e))
  
    }
  // image lightbox
  createImageLightbox2(medium){
  let li2 = document.createElement('li')
  li2.style.display ='none';
  li.className ='lightbox_object'
  li2.setAttribute('id', `object${medium.id}`)
  ul2.appendChild(li)
  let figure2 = document.createElement('figure')
  figure2.className ='lightbox_figure'
  li2.appendChild(figure2)
  let image2 = document.createElement('img')
  image2.className ='image_lightbox'
  image2.setAttribute('src',`../../assets/images/${firstName}/${medium.image}` );
  image2.setAttribute('id',`image${medium.id}`)
  figure2.appendChild(image2)
  let figcaption2 = document.createElement('figcaption')
  figcaption2.className = "title_image"
  figcaption2.innerText = medium.title
  figure2.appendChild(figcaption2)
  }
  }
  //creer une image pour video
  class Video2{
    createVideo2(medium) {
  
     // avec un lien contenant une image
      let linkMedia2 = document.getElementById(`${medium.title}-${medium}`);
      // articleMedia.appendChild(linkMedia);
      let imageMedia2 = document.createElement('video');
      linkMedia2.appendChild(imageMedia2);
      imageMedia2.setAttribute('src',`../../assets/images/${firstName}/${medium.video}` );
      imageMedia2.setAttribute('controls',true)
      imageMedia2.className ='image-media'
      //avec un bandeau contenant des infos
    //   let imageAttributes = document.createElement('div');
    //   imageAttributes.className = "img_attributes";
    //   imageAttributes.classList.add ('img_attributes')
    //   articleMedia.appendChild(imageAttributes);
    //   let imageTitle =document.createElement('h3');
    //   imageTitle.textContent = mediaId.title;
    //   imageAttributes.appendChild(imageTitle);
    //   let imageLike = document.createElement('p');
    //   imageLike.setAttribute('id',mediaId.likes)
    //   imageLike.textContent =mediaId.likes;
    //   imageAttributes.appendChild(imageLike);
    //   let span = document.createElement('span')
    //   span.setAttribute('id','spanHeart${mediaId.id')
    //   imageAttributes.appendChild(span);
    //   let imageHeart = document.createElement('i');
    //   imageHeart.className= "fa-solid fa-heart";
    //   span.appendChild(imageHeart)
    // return Video
    linkMedia2.addEventListener('click',(e) => lightboxOpen(e))
    // linkMedia.addEventListener('click',(e) => Lightbox.init)
  
    }
}
const factory2 = new FactoryMedia()

function SeparateCardImage2(media){
    console.log(media)
    // sectionMedia.innerHTML =''
    media.forEach(medium =>{
      createDomElements(medium)
      if(mediaId.image !== undefined){
          let card = factory.createMedia('image');
          card.createImage(medium);
          card.createImageLightbox(medium)
        }else{
          let card = factory.createMedia('video');
          card.createVideo(medium);
          
      }
      return medium
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

   function createDomElements2(medium){
    console.log(medium)
    let articleMedia2 =document.createElement('article');
    articleMedia2.className='page_photographer-media';
    sectionMedia.appendChild(articleMedia2)
    console.log(articleMedia2)
    articleMedia2 .setAttribute('id', medium.id );
       //DOM conteneur <figure>
      let figure2 = document.createElement('figure')
      articleMedia2.appendChild(figure2)
      // DOM lien cliquable <a>
      let linkMedia2 = document.createElement('a');
      linkMedia2.className ="media_link";
      linkMedia2.setAttribute('id',`${medium.title}-${medium.id}`)
      figure2.appendChild(linkMedia2);
    // Element DOM  bandeau explication image 
      let imageAttributes2 = document.createElement('div');
      imageAttributes2.className = "img_attributes";
      imageAttributes2.classList.add ('img_attributes')
      articleMedia2.appendChild(imageAttributes2);
    // Element DOM pour le titre de l 'image
          let imageTitle2 =document.createElement('h3');
          imageTitle2.textContent = medium.title;
          imageAttributes2.appendChild(imageTitle2);
    //Element DOM pour les likes
          let imageLike2 = document.createElement('p');
          imageLike2.textContent =medium.likes;
          imageLike2.setAttribute('id',medium.likes)
          imageAttributes2.appendChild(imageLike2);
    
          let span2 = document.createElement('span');
          span2.setAttribute('id','spanHeart${mediaId.id}');
          imageAttributes2.appendChild(span2);
          let imageHeart2 = document.createElement('i');
          imageHeart2.className= "fa-solid fa-heart";
          span2.appendChild(imageHeart2);
    //Appel des likes
          span2.addEventListener('click',(e)=>console.log(e.target))
      }
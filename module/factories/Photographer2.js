// import{ dropDownOpen }from'./dropdown.js'
import{displayModal,closeModal}from './contactForm.js'
import{modalButton,modalCross,submitButton,modalDiv} from './contactForm.js '

import{Photographer,Media} from '../fetch.js'
import{like} from './likes.js'
// import { likeAdd } from './likes.js'

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
  // //separer les videos des photos
  
  function SeparateCardImage(media){
    // sectionMedia.innerHTML =''
    media.forEach(mediaId =>{
      if(mediaId.image !== undefined){
          let card = factory.createMedia('image');
          card.createImage(mediaId);
        
        }else{
          let card = factory.createMedia('video');
          card.createVideo(mediaId);
          
      }
    })
  }

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
/////            injecter likes totaux  et prix dans le footer //////////
  function likeAdd(photographers){
    for(let i =0 ; i<photographer.media.length; i ++){
        let eachLikes = photographer.media[i].likes;
        // console.log(eachLikes)
        let likesSum = 0;
        for(let i =0 ; i<photographer.media.length; i ++){ 
        likesSum +=photographer.media[i].likes
       // console.log(likesSum)
        document.querySelector('.infos_likes--count').textContent=likesSum;
        document.querySelector('.infos_price').textContent = `${
        photographer.price}€/j`;
        }
    }};



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
  if(e.target === modalCross ){
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
  let mediaAndAttributes = ElementFactory('mediaAndAttributes','div','page_photographer-media-attributes')
  let articleMedia = ElementFactory('articleMedia','article','page_photographer-media',`mediaId.id`,)
  let linkMedia = ElementFactory('linKMedia','a','media_link','',`mediaId.title`-`mediaId`)
  



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
        linkMedia.setAttribute=('id',`${mediaId.title}-${mediaId}`)
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
     return Image   
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
      //   // avec un lien contenant une image
        let linkMedia = document.createElement('a');
        articleMedia.appendChild(linkMedia);
        let imageMedia = document.createElement('video');
        linkMedia.appendChild(imageMedia);
        imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
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
    

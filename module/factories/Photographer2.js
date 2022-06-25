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
console.log(ul)

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
    imageMedia.className ='image-Media'
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
  }
  //creer une image pour chq media pour la lightbox
  createImageLightbox(mediaId){
    // let lightboxContainer =document.createElement('div');
    // lightboxContainer.className ='lightbox-modal';
    // lightboxContainer.setAttribute('aria-modal',"true");
    // lightboxContainer.setAttribute('id',"lightbox-library");
    // lightboxContainer.setAttribute('aria-label',"lightbox media en gros plan");
    // lightboxContainer.setAttribute('tabindex',"-1");
    // let lightbox = document.createElement('div');
    // lightbox.className = "lightbox";
    // lightbox.setAttribute('id',"lightbox");
    // lightboxContainer.appendChild(lightbox);
    // let chevronPrevious = document.createElement('button');
    // chevronPrevious.className ="lightbox_chevron-previous";
    // chevronPrevious.setAttribute('id',"lightbox_chevron-previous");
    // chevronPrevious.setAttribute('aria-labelledby','previous');
    // chevronPrevious.setAttribute('tabindex',"0");
    // lightbox.appendChild(chevronPrevious);
    // let previousAria = document.createElement('p')
    // previousAria.className ="previous";
    // previousAria.setAttribute('id',"previous");
    // previousAria.setAttribute('aria-hidden',"true")
    // lightbox.appendChild(previousAria);
    // let lightboxContainerImg = document.createElement('div');
    // lightboxContainerImg.className ='lightbox_Container';
    // lightboxContainerImg.setAttribute('id',"lightbox_Container");
    // lightboxContainerImg.setAttribute('aria-hidden', "true");
    // lightbox.appendChild(lightboxContainerImg)
    // let ul = document.createElement('ul');
    // ul.className ="lightbox_Container--img"
    let li = document.createElement('li');
    li.style.display='none';
    li.className ='lightbox_object';
    li.setAttribute('id',`object${mediaId.id}`);
    li.setAttribute('aria-hidden',"true")
    ul.appendChild(li);
    let figure = document.createElement('figure')
    figure.className="lightbox_figure";
    figure.setAttribute('aria-labelledby',`image${mediaId.id}`)
    figure.setAttribute('tabindex',"0");
    li.appendChild(figure);

    let image = document.createElement('img');
    image.className ="image_lightbox"
    image.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}`)
    image.setAttribute('alt',"")
    image.setAttribute('id',`image${mediaId.id}`)
    image.setAttribute('width',"auto");
    image.setAttribute('height',"900");
    figure.appendChild(image);
    let figcaption = document.createElement('figcaption')
    figcaption.className='title_image';
    figcaption.setAttribute('aria-hidden',"true");
    figcaption.innerText = mediaId.title;
    figure.appendChild(figcaption);
    // let chevronNext = document.createElement('button');
    // chevronNext.className="lightbox_chevron-next";
    // chevronNext.setAttribute('id',"lightbox_chevron-next")
    // chevronNext.setAttribute('aria-labelledby',"next")
    // chevronNext.setAttribute('tabindex',"0");
    // lightbox.appendChild(chevronNext);
    // let nextAria = document.createElement('p');
    // nextAria.className="next";
    // nextAria.setAttribute('id',"next");
    // nextAria.setAttribute('aria-hidden',"true");
    // lightbox.appendChild(nextAria)
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
    imageMedia.setAttribute('controls',true)
    imageMedia.className ='image-Media'
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
  // creer une image pour chq video
  createVideoLightbox(mediaId){
    let li = document.createElement('li');
    li.style.display='none';
    li.className ='lightbox_object';
    li.setAttribute('id',`object${mediaId.id}`);
    li.setAttribute('aria-hidden',"true")
    ul.appendChild(li);
    let figure = document.createElement('figure')
    figure.className="lightbox_figure";
    figure.setAttribute('aria-labelledby',`video${mediaId.id}`)
    figure.setAttribute('tabindex',"0");
    li.appendChild(figure);

    let image = document.createElement('img');
    image.className ="image_lightbox"
    image.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}`)
    image.setAttribute('alt',"")
    image.setAttribute('id',`image${mediaId.id}`)
    image.setAttribute('width',"auto");
    image.setAttribute('height',"900");
    image.setAttribute('controls',true)
    figure.appendChild(image);
    let figcaption = document.createElement('figcaption')
    figcaption.className='title_video';
    figcaption.setAttribute('aria-hidden',"true");
    figcaption.innerText = mediaId.title;
    figure.appendChild(figcaption);
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
       card.createImageLightbox(mediaId);
      }else{
        let card = factory.createMedia('video');
        card.createVideo(mediaId);
        
    }
  })
let allObjects = document.querySelectorAll('.lightbox_object')
console.log(allObjects);
let objects= Array.from(allObjects)
// console.log(objects)
objects.forEach((object) =>{
  object.classList.add(`${objects.indexOf(object)}`)
  console.log(object)
})
let allMedias = document.querySelectorAll('.media_link')
console.log(allMedias);
let medias = Array.from(allMedias)
// console.log(medias)
medias.forEach((media) => {
  media.classList.add(`${medias.indexOf(media)}`)
  console.log(media)
})
}

// function likeAdd(mediaId){
// for(media of photographer.media){
// document.addEventListener('click',(e) => {console.log(e.target)})
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

//////modale////
// const mainPage = document.querySelector('.Photographer-Page-Main')
// console.log(mainPage)
// const modal = document.querySelector("#contact_modal");
// const modalButton =document.querySelector("#contact_button");
// const modalCross = document.querySelector('.modal-header_text span i')
// const footerInfos = document.querySelector('#infos')
// console.log(footerInfos)

// modalButton.addEventListener('click',displayModal)
// function displayModal() {
// modal.style.display = "block";
// mainPage.style.display ='none';
// footerInfos.style.display ='none';
// }

// modalCross.addEventListener('click', closeModal)
// function closeModal() {
//   modal.style.display = "none";
//   mainPage.style.display ='block';
//   footerInfos.style.display='block';
// }

//////lightbox//////
let lightBoxBg=document.querySelector('#lightbox-background');
const mainPage = document.querySelector('.Photographer-Page-Main');
let lightboxContainer =document.querySelector(".lightbox-modal")
let buttonClose =document.querySelector(".lightbox_close");

console.log(buttonClose);

// ouvrir la lightbox
function lightboxOpen(e){
  e.preventDefault()
  lightBoxBg.style.display = 'flex'
  lightBoxBg.setAttribute('aria-hidden', 'false')
  mainPage.setAttribute('aria-hidden', 'true')
  mainPage.setAttribute('tabindex', '-1')
  lightboxContainer.setAttribute('tabindex', '0')
  let picture = window.event.target;
  let id = findId(picture)

  function findId(picture) {
    if(picture.tagName =='IMG'){
      let parent = picture.parentNode;
      let id =parent.parentNode.id ;
      console.log(id);
      return id;
    }
  }
  let firstObject = document.getElementById(`object${id}`)
  // console.log(firstObject)
  //trouver la position du 1er  media agrandi
  findPosition(firstObject)
  firstObject.style.display = 'flex'
  firstObject.setAttribute('aria-hidden', 'false')
  lightboxContainer.focus()
}

function findPosition(firstObject){
  let firstClassName =firstObject.className;
  let i = firstClassName.lastIndexOf('-')
  let position =firstClassName.substring(i+1)
  console.log(firstClassName)
  console.log(firstObject)
  console.log(position)
  
}
//navigation droite et gauche
function goToNext(){
  let allObjects = document.querySelectorAll('.lightbox_object')
  
}
function goToPrevious(){

}
//fermer la lightbox
buttonClose.addEventListener("click", closeLightbox)
function closeLightbox(){
  lightBoxBg.setAttribute('aria-hidden', 'true')
  mainPage.setAttribute('aria-hidden', 'false')
  mainPage.setAttribute('tabindex', '0')
  lightboxContainer.setAttribute('tabindex', '-1')
}




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
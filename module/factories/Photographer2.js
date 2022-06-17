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


//recuperer l 'url de chq photographe
const photographersJson = [];
const mediasJson =[];
//donner url à chq page photographe et filtrer le images en fct id du photographe
let string = window.location.href;
let url = new URL(string);
let login = url.searchParams.get('id');
console.log(login);

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
          // console.log(mediaList);
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
        likeAdd(photographers[i].media)
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

  document.querySelector('.photographer_text--name').textContent = photographer.name;
  document.querySelector('.photographer_text--location').textContent = photographer.city+ ", " + photographer.country;
  document.querySelector(".photographer_text--tagline").innerHTML= photographer.tagline;
  document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
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
    linkMedia.setAttribute=('id',`${mediaId.title}-${mediaId}`)
    // console.log(linkMedia)
    articleMedia.appendChild(linkMedia);
    let imageMedia = document.createElement('img');
    imageMedia.className ='image-Media'
    linkMedia.appendChild(imageMedia);
    imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
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
    let span = document.createElement('span')
    imageAttributes.appendChild(span);
    let imageHeart = document.createElement('i');
    imageHeart.className= "fa-solid fa-heart";
    span.appendChild(imageHeart);

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
    imageAttributes.appendChild(span);
    let imageHeart = document.createElement('i');
    imageHeart.className= "fa-solid fa-heart";
    span.appendChild(imageHeart);
    

  }
}

//separer les videos des photos

function SeparateCardImage(media){
  // sectionMedia.innerHTML =''
  media.forEach(mediaId =>{
  //  createDOM(mediaId)
  const heart = document.querySelector('.img_attributes')
    if(mediaId.image !== undefined){
        let card = factory.createMedia('image');
       card.createImage(mediaId);
      }else{
        let card = factory.createMedia('video');
        card.createVideo(mediaId);
    }
  })
}

{/* <table id="outside">
  <tr><td id="t1">un</td></tr>
  <tr><td id="t2">deux</td></tr>
</table> */
 // Fonction pour changer le contenu de t2
// function modifyText() {
//   const t2 = document.querySelector("#t2");
//   if (t2.firstChild.nodeValue == "trois") {
//     t2.firstChild.nodeValue = "deux";
//   } else {
//     t2.firstChild.nodeValue = "trois";
//   }
// }

// // Ajouter un écouteur d'évènements à la table
// const el = document.querySelector("#outside");
// el.addEventListener("click", modifyText, false);
// Dans ce code, modifyText() est un écouteur pour les évènements click enregistré en utilisant addEventListener(). Un clic n'importe où sur la table se propagera jusqu'au gestionnaire et exécutera modifyText()}

// const likesSum =document.querySelector('.infos_likes--count')
// const EventTarget = function (){
//   this.listeners
// console.log('salut')

};

function likeAdd(e){
{
document.addEventListener('click',(e) => {console.log(e.target)}) 
document.addEventListener('click',(e)=> {
const likesSum = document.querySelector('.infos_likes--count')    
const heart = document.querySelector('.img_attributes span i')
const likeP = document.querySelector('.img_attributes p')
console.log(heart)
console.log(likeP)
// console.log(likesSum)
// heart.addEventListener("click",incrementLike,false)

       if (e.target == heart){
        likeP.innerHTML ++
        likesSum.innerHTML ++
       }
      })
 
  }
}



likeAdd();
//////dropdown//////////
let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
let dropDownDiv = document.querySelector("#dropdown-button");
let chevron = document.getElementById("chevron")
let date = document.getElementById("date");
let titre = document.getElementById("titre");
let arrowDown = document.querySelector("#chevron i");
console.log(arrowDown);

dropDownPopularityButton.addEventListener("click" ,dropDownOpen)
//si chevron position initiale
function dropDownOpen(){
 dropDownDiv.style.display=" block";
 chevron.classList.add('drop-down-open');

 //si chevron rotate, au click => dropDownDiv.style.display="none";   tooglesur 2 element
}

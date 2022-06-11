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
          mediaList.push(mediaId)
          console.log(mediaId.image);
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
  document.querySelector('.photographer_text--name').textContent=photographer.name;
  document.querySelector('.photographer_text--location').textContent = photographer.city+ ", " + photographer.country;
  document.querySelector(".photographer_text--tagline").innerHTML= photographer.tagline;
  document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
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
// console.log(photographersJson,"aaaa")
// console.log(photographersJson[0],'zzzzz')
// let banner = document.querySelector("ul");
// let photographer;
// exercice Ahmed
// for(photographer of photographersJson){
//   console.log(photographer.name);
//   banner.innerHTML+=`<li>${photographer.name}</li>`;
// }

const factory= new FactoryMedia()
// creer une carte pour chq media image
class Image{
  createImage(mediaId){
    // console.log(photographer,"aaaa")
    let articleMedia = document.querySelector(".page_photographer-media");
    articleMedia .setAttribute('id',mediaId.id);
    let imageMedia = document.createElement('img');
    articleMedia.appendChild(imageMedia);
    imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
    imageMedia.setAttribute('width', '350')
    imageMedia.setAttribute('height', '300')
    let imageAttributes = document.createElement('div');
    imageAttributes.className = "img_attributes";
    articleMedia.appendChild(imageAttributes);
    let imageTitle =document.createElement('h3');
    imageTitle.textContent = mediaId.title;
    imageAttributes.appendChild(imageTitle);
    let imageLike = document.createElement('p');
    imageLike.textContent =mediaId.likes;
    imageAttributes.appendChild(imageLike);
    let span = document.createElement('span')
    imageAttributes.appendChild(span);
    let imageHeart = document.createElement('i');
    imageHeart.className= "fa-solid fa-heart";
    span.appendChild(imageHeart); 
    console.log(imageMedia)
  }
}
//creer une image pour video
class Video{
  createVideo(mediaId) {
    let articleMedia = document.getElementById('mediaId.id');
  }
}

//separer les videos des photos

function SeparateCardImage(media){

  media.forEach(mediaId =>{
    let sectionMedia = document.querySelector('.page_photographer-medias');
    // sectionMedia.innerHTML =``
    createCardImage(mediaId)
    if(mediaId.image !== undefined){
        let card = factory.createMedia('image');
        card.createImage(mediaId)
    }else{
       let card = factory.createVideo('video');
       card.createVideo(mediaId)
    }
  })
}

function createCardImage(media){
  
//   // let banner = document.querySelector("ul");
//   // let photographer;
//   // exercice Ahmed
//   // for(photographer of photographersJson){
//   //   console.log(photographer.name);
//   //   banner.innerHTML+=`<li>${photographer.name}</li>`;
//   console.log(media)
//   for(mediaId of media) {
//    let sectionMedia = document.querySelector('.page_photographer-medias');
//    let linkMedia = document.createElement('a');
//    sectionMedia.appendChild(linkMedia);
//    document.querySelector('.page_photographer-media>img').src=`../../assets/images/${firstName}/mediaId.image` ;
//   let articleMedia =document.createElement('article');
//   articleMedia.id = mediaId.id
//   articleMedia.className='page_photographer-media';
//   linkMedia.appendChild(articleMedia);
//   let imageMedia = document.createElement('img');
//   articleMedia.appendChild(imageMedia);
//   // console.log(imageMedia)
//   imageMedia.setAttribute('src',`../../assets/images/${firstName}/mediaId.image` );
//   let imageAttributes = document.createElement('div');



  }

 


import{Photographer,Media} from '../fetch.js'
import{SeparateCardImage} from './factoryMediaPage.js'
let photographer
let firstName

const h1 = document.querySelector('h1')
console.log(h1)
const pageLocation = document.querySelector('.photographer_text--location')
const tagline =document.querySelector('.photographer_text--tagline')

//donner url à chq page photographe et filtrer le images en fct id du photographe
let string = window.location.href;
let url = new URL(string);
let login = url.searchParams.get('id');
// console.log(login);


  //recuperer les photographes grâce à l'id dans un array photographer

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
    like(photographers[i].media)
    likeAdd(photographers[i].media)
    
    return photographer
  }
}
}
 //function pour recuperer le  prenom du photographe affiché
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
      // document.getElementById('contact_button').innerHTML = 'Contactez moi';
      document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
      //enregistrer le nom du photographe sur la modale
      document.querySelector('.modal-header p').innerHTML = photographer.name;
      like()
      
      }
function like(){
for(let i =0 ; i<photographer.media.length; i ++){
    let eachLikes = photographer.media[i].likes;
    console.log(eachLikes)
    let likesSum = 0;
    for(let i =0 ; i<photographer.media.length; i ++){ 
    likesSum +=photographer.media[i].likes
    document.querySelector('.infos_likes--count').textContent=likesSum;
    }
}};


function SeparateCardImage(media){
    // sectionMedia.innerHTML =''
    media.forEach(mediaId =>{
        createDOMElement(mediaId)
        if(mediaId.image !== undefined){
            let card = factory.createMedia('image');
            card.createImage(mediaId);
        
        }else{
            let card = factory.createMedia('video');
            card.createVideo(mediaId);
            
        }
    })
    }

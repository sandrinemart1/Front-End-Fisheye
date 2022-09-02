
import {photographer,firstName} from './Photographer2.js'
import {Element} from '../elementDOM.js'
///////   essai factoryfunction pour creer elementDom ////////////
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
      // articleMedia.appendChild(linkMedia);
      let imageMedia = document.createElement('img');
      imageMedia.className ='image-media'
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
      span.setAttribute('id','spanHeart${mediaId.id}');
      imageAttributes.appendChild(span);
      let imageHeart = document.createElement('i');
      imageHeart.className= "fa-solid fa-heart";
      span.appendChild(imageHeart);
      span.addEventListener('click',(e)=>console.log(e.target))
console.log(Image)
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
      // articleMedia.appendChild(linkMedia);
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
  //separer les videos des photos
  
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
  





// export{like}
// export{Image,Video}
// export{SeparateCardImage}

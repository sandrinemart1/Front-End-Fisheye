
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
let mediaAndAttributes3 = ElementFactory('mediaAndAttributes','div','page_photographer-media-attributes')
let articleMedia3 = ElementFactory('articleMedia','article','page_photographer-media',`mediaId.id`,)
let linkMedia3 = ElementFactory('linKMedia','a','media_link','',`mediaId.title`-`mediaId`)
let imageAttributes3 = ElementFactory('imageAttributes3','div','img_attributes','','')


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
  let sectionMedia = document.querySelector('.page_photographer-medias');


  const factory= new FactoryMedia()
  // creer une carte pour chq media image
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
  //separer les videos des photos
  const factory2 = new FactoryMedia()
  function SeparateCardImage2(mediaId){
    
   document.querySelector('.page_photographer-medias').innerHTML =''
   console.log(mediaId)
    mediaId.forEach(medium =>{
      console.log(medium)
      createDomElements2(medium)
      console.log(medium)
      if(medium.image !== undefined){
          let card = factory.createMedia('image');
          card.createImage(medium)
          card.createImageLightbox(medium)
        
        }else{
          let card = factory.createMedia('video');
          card.createVideo(medium);
          
      }
      // return media
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
  /////////////////////////
  class Image{
    createImage2(mediaId){
  
      // let sectionMedia = document.querySelector('.page_photographer-medias');
      // let mediaAndAttributes=document.querySelector('.page_photographer-media-attributes');
      // sectionMedia.appendChild(mediaAndAttributes);
      // let articleMedia =document.createElement('article');
      // articleMedia.className='page_photographer-media';
      // articleMedia .setAttribute('id',mediaId.id);
      // mediaAndAttributes.appendChild(articleMedia);
    
      let linkMedia2 = document.getElementById(`${mediaId.title}-${mediaId}`);
      // linkMedia.className ="media_link";
      // linkMedia.setAttribute=('id',`${mediaId.title}-${mediaId}`)
      // articleMedia.appendChild(linkMedia);
      let imageMedia2 = document.createElement('img');
      imageMedia2.className ='image-media'
      if(photographer.id == 82|| photographer.id == 925){
        imageMedia2.classList.add('improved-image')
      }
      linkMedia2.appendChild(imageMedia);
      imageMedia2.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
      imageMedia2.setAttribute('alt',"");
//       let imageAttributes = document.createElement('div');
//       imageAttributes.className = "img_attributes";
//       imageAttributes.classList.add ('img_attributes')
//       articleMedia.appendChild(imageAttributes);
//       let imageTitle =document.createElement('h3');
//       imageTitle.textContent = mediaId.title;
//       imageAttributes.appendChild(imageTitle);
//       let imageLike = document.createElement('p');
//       imageLike.textContent =mediaId.likes;
//       imageLike.setAttribute('id',mediaId.likes)
//       imageAttributes.appendChild(imageLike);
//       let span = document.createElement('span');
//       span.setAttribute('id','spanHeart${mediaId.id}');
//       imageAttributes.appendChild(span);
//       let imageHeart = document.createElement('i');
//       imageHeart.className= "fa-solid fa-heart";
//       span.appendChild(imageHeart);
//       span.addEventListener('click',(e)=>console.log(e.target))
// console.log(Image)
//   return Image  
  linkMedia2.addEventListener('click',(e) => lightboxOpen(e))
  // linkMedia.addEventListener('click',(e) => Lightbox.init)
    }
// image lightbox
createImageLightbox2(mediaId){
  let li2 = document.createElement('li')
  li2.style.display ='none';
  li.className ='lightbox_object'
  li2.setAttribute('id', `object${mediaId.id}`)
  ul2.appendChild(li)
  let figure2 = document.createElement('figure')
  figure2.className ='lightbox_figure'
  li2.appendChild(figure2)
  let image2 = document.createElement('img')
  image2.className ='image_lightbox'
  image2.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
  image2.setAttribute('id',`image${mediaId.id}`)
  figure2.appendChild(image2)
  let figcaption2 = document.createElement('figcaption')
  figcaption2.className = "title_image"
  figcaption2.innerText = mediaId.title
  figure2.appendChild(figcaption2)
}
  }
  //creer une image pour video
  class Video{
    createVideo2(mediaId) {
  
    //   let sectionMedia = document.querySelector('.page_photographer-medias');
    //   let mediaAndAttributes=document.querySelector('.page_photographer-media-attributes');
    //   sectionMedia.appendChild(mediaAndAttributes);
    // //creation de 1 article par media
    //   let articleMedia =document.createElement('article');
    //   articleMedia.className='page_photographer-media';
    //   articleMedia .setAttribute('id',mediaId.id);
    //   mediaAndAttributes.appendChild(articleMedia);
    //   // avec un lien contenant une image
      let linkMedia2 = document.getElementById(`${mediaId.title}-${mediaId}`);
      // articleMedia.appendChild(linkMedia);
      let imageMedia2 = document.createElement('video');
      linkMedia2.appendChild(imageMedia2);
      imageMedia2.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
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
  //separer les videos des photos
  
  function SeparateCardImage2(media){
    
   document.querySelector('.page_photographer-medias').innerHTML =''
    media.forEach(mediaId =>{
      createDomElements2(mediaId)
      console.log(createDomElements2())
      if(mediaId.image !== undefined){
          let card = factory.createMedia('image');
          card.createImage(mediaId)
          card.createImageLightbox(mediaId)
        
        }else{
          let card = factory.createMedia('video');
          card.createVideo(mediaId);
          
      }
      return mediaId
    })
  }  
  
  function createDomElements2(mediaId){
  
    let articleMedia2 =document.createElement('article');
    articleMedia2.className='page_photographer-media';
    articleMedia2 .setAttribute('id',mediaId.id);
     //DOM conteneur <figure>
    let figure2 = document.createElement('figure')
    articleMedia2.appendChild(figure2)
    // DOM lien cliquable <a>
    let linkMedia2 = document.createElement('a');
    linkMedia2.className ="media_link";
    linkMedia2.setAttribute=('id',`${mediaId.title}-${mediaId}`)
    figure2.appendChild(linkMedia2);
  // Element DOM  bandeau explication image 
    let imageAttributes2 = document.createElement('div');
    imageAttributes2.className = "img_attributes";
    imageAttributes2.classList.add ('img_attributes')
    articleMedia2.appendChild(imageAttributes2);
  // Element DOM pour le titre de l 'image
        let imageTitle2 =document.createElement('h3');
        imageTitle2.textContent = mediaId.title;
        imageAttributes2.appendChild(imageTitle2);
  //Element DOM pour les likes
        let imageLike2 = document.createElement('p');
        imageLike2.textContent =mediaId.likes;
        imageLike2.setAttribute('id',mediaId.likes)
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
    // class Image{
    //   createImage2(articleMedia2){
    
    //     let sectionMedia2 = document.querySelector('.page_photographer-medias');
    //     let mediaAndAttributes2=document.querySelector('.page_photographer-media-attributes');
    //     sectionMedia2.appendChild(mediaAndAttributes2);

    //     mediaAndAttributes2.appendChild(articleMedia2);
      
    //     let imageMedia2= document.createElement('img');
    //     imageMedia2.className ='image-media'
    //     if(photographer.id == 82|| photographer.id == 925){
    //       imageMedia2.classList.add('improved-image')
    //     }
    //     linkMedia2.appendChild(imageMedia2);
    //     imageMedia2.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
    //     imageMedia2.setAttribute('alt',"");
        
    // return Image  
    // linkMedia2.addEventListener('click',(e) => lightboxOpen(e))
    // // linkMedia.addEventListener('click',(e) => Lightbox.init)
      // }
    // }



// export{like}
// export{Image,Video}
// export{SeparateCardImage2}

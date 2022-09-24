
import {photographer,firstName} from './Photographer2.js'


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
    // console.log(articleMedia)
    mediaAndAttributes.appendChild(articleMedia);

    let linkMedia = document.createElement('a');
    linkMedia.className ="media_link";
    linkMedia.setAttribute('id',`${mediaId.title}-${mediaId.id}`)

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
    imageMedia.setAttribute('id',`${mediaId.id}`)
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
    linkMedia.addEventListener('click',(e) => lightboxOpen(e))  
  }
//creer une image pour la lightbox
  createImageLightbox(mediaId){
    let li = document.createElement('li')
    li.style.display ='none';
    li.className ='lightbox_object'
    li.setAttribute('id', `object${mediaId.id}`)
    ul.appendChild(li)
    let figure = document.createElement('figure')
    figure.className ='lightbox_figure'
    li.appendChild(figure)
    let image = document.createElement('img')
    image.className ='image_lightbox'
    image.setAttribute('src',`../../assets/images/${firstName}/${mediaId.image}` );
    image.setAttribute('id',`image${mediaId.id}`)
    figure.appendChild(image)
    let figcaption = document.createElement('figcaption')
    figcaption.className = "title_image"
    figcaption.innerText = mediaId.title
    figure.appendChild(figcaption)

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
    linkMedia.className ="media_link";
    linkMedia.setAttribute('id',`${mediaId.title}-${mediaId.id}`)
    articleMedia.appendChild(linkMedia);
    let imageMedia = document.createElement('video');
    linkMedia.appendChild(imageMedia);
    imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
    imageMedia.setAttribute('id',`${mediaId.id}`)
    imageMedia.setAttribute('controls',true)
    imageMedia.className ='image-media';
    
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
createVideoLightbox(mediaId){
  let li = document.createElement('li')
    li.style.display ='none';
    li.className ='lightbox_object'
    li.setAttribute('id', `object${mediaId.id}`)
    li.setAttribute('aria-hidden', 'true')
    ul.appendChild(li)
    let figure = document.createElement('figure')
    figure.className ='lightbox_figure'
    figure.setAttribute('tabindex', '0')
    li.appendChild(figure)
    let image = document.createElement('video')
    image.className ='image_lightbox'
    image.setAttribute('src',`../../assets/images/${firstName}/${mediaId.video}` );
    image.setAttribute('controls',true)
    image.setAttribute('id',`image${mediaId.id}`)
    figure.appendChild(image)
    let figcaption = document.createElement('figcaption')
    figcaption.className = "title_image"
    figcaption.innerText = mediaId.title
    figure.appendChild(figcaption)
}
}
function createDomElements(mediaId){
// let article2 = ElementFactory('articleMedia2','article','page_photographer-media','mediaId.id');
// console.log(article2)
// mediaAndAttributes.appendChild(article2)
// let figure2 = document.createElement('figure')
// article2.appendChild(figure2)
// let link2 = ElementFactory('link2','a','media_link',`${mediaId.title}-${mediaId.id}`)
//       // //avec un bandeau contenant des infos
// let imageAttributes2 = ElementFactory('imageAttributes2','div','img_attributes','')

//     article2.appendChild(imageAttributes);
//     let imageTitle =document.createElement('h3');
//     imageTitle.textContent = mediaId.title;
//     imageAttributes2.appendChild(imageTitle);
//     let imageLike = document.createElement('p');
//     imageLike.setAttribute('id',mediaId.likes)
//     imageLike.textContent =mediaId.likes;
//     imageAttributes2.appendChild(imageLike);
//     let span = document.createElement('span')
//     span.setAttribute('id','spanHeart${mediaId.id')
//     imageAttributes2.appendChild(span);
//     let imageHeart = document.createElement('i');
//     imageHeart.className= "fa-solid fa-heart";
//     span.appendChild(imageHeart)

}
export{FactoryMedia,Image,Video} 
export{factory}
function findId(picture) {
    if(picture.tagName =='IMG'){
      document.querySelector("#src").src = picture.src;
      let divMedia = picture.parentNode
      let divMedia2 = divMedia.parentNode
      let idDivMedia2 = divMedia2.getAttribute('id')
      // let id = idDivMedia2.replace('divMedia2.id', 'number')
      console.log(idDivMedia2)
    }
    if(picture.tagName =='VIDEO'){
      document.querySelector("#video").src = picture.src;
      console.log(picture.src)
    }
  }
//////lightbox//////
let lightBoxBg=document.querySelector('#lightbox-background');
const mainPage = document.querySelector('.Photographer-Page-Main');
let lightboxContainer =document.querySelector(".lightbox-modal")
let buttonClose =document.querySelector(".lightbox_close");
const footerInfos = document.querySelector('.infos')
console.log(buttonClose);
let next = document.querySelector('.lightbox_chevron-next')
let previous = document.querySelector('.lightbox_chevron-previous')

// console.log(picture)
  // ouvrir la lightbox
function lightboxOpen(e){
  let nodeListArticle = document.querySelectorAll('.page_photographer-media')
  let articles = Array.from(nodeListArticle)
  articles.forEach(article =>{
    e.preventDefault()
    lightBoxBg.style.display = 'flex'
    lightBoxBg.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('tabindex', '-1')
    footerInfos.style.display ='none';
    footerInfos.setAttribute('aria-hidden','true')
    lightboxContainer.setAttribute('tabindex', '0')
    let picture = window.event.target;
    // console.log(picture);
    let id = findId(picture)
    // let firstObject= document.getElementById(`image${mediaId.id}`)
    let firstObject = document.getElementsByTagName('li[number]')
    console.log(firstObject)
  })
}
  findPosition()
  function findPosition(picture){
  //   console.log(picture)
  //   let pictureParent = picture.parentNode
  //   let number = pictureParent.getAttribute('number')
  //   console.log(number)
  //   return number  
  } 
  
// //navigation droite et gauche
// next.addEventListener('click', goToNext(2))
// function goToNext(media){
//  let total = media.length;
//  console.log(media)
//  const  currentImag = document.querySelector("[data-id='0']")
//  console.log(currentImag);
//   if(number < total){
    
//   }
  
// }
  
  


function goToPrevious(){

}
//fermer la lightbox
buttonClose.addEventListener("click", closeLightbox)
function closeLightbox(e){
  lightBoxBg.setAttribute('aria-hidden', 'true')
  mainPage.setAttribute('aria-hidden', 'false')
  mainPage.setAttribute('tabindex', '0')
  footerInfos.style.display='flex';
  footerInfos.setAttribute('aria-hidden','false')
  lightboxContainer.setAttribute('tabindex', '-1')
}
// // lightbox grafikart
// //propriet{htmlElement}element
// class Lightbox{
//   static init(){
//      const articles = document.querySelectorAll('a')
//      console.log(articles)
//      .forEach(article => article.addEventListener('click', e =>{
//      e.preventDefault()
//      new Lightbox(e.currentTarget.getAttribute('href'))
//      console.log(currentTarget)
//   }))
//   }
//   //parametres{string}url de l 'image
//   constructor(url){
//     this.element= this.buildDOM(url)
//     let div= document.querySelector('.lightbox-modal');
//     div.appendChild(this.element)
//   }
//   //parameter{string}url de l' image
//   //return{HtmlElement}
//   buildDOM(url){
//     const dom = document.createElement('div')
//     dom.className = 'lightbox'
//     dom.innerHTML=`<button class="lightbox_chevron-previous"
//     id="lightbox_chevron-previous"
//     aria-labelledby="previous"
//     tabindex="0">
// </button>
//     <p class="previous"
//     id="previous"
//     aria-hidden="true">image précédente</p>
//     <div class="lightbox_Container">
//         <ul class="lightbox_Container--img">
//             <li class="lightbox_object"

//                 aria-hidden="true">
//                 <figure class=" lightbox_figure"
//                 aria-labelledby=\`image${mediaId.id}\`
//                 tabindex="0">
//                     <img class="image_lightbox"
//                     id="src"
//                     src="${url}"
//                     width="1050">
//                     <video class="video-lightbox"
//                     id="video" src="controls"></video>
//                     <figcaption class="title_image"
//                     aria-hidden="true"></figcaption>
//                 </figure>
//             </li>
//         </ul>
//         <button class="lightbox_close">
//             <p class="close_lightbox"
//             id="close_lightbox"
//             aria-hidden="true">fermer la lightbox</p>
//         </button>
//     </div>
//     <button class="lightbox_chevron-next"
//     id="lightbox_chevron-next"
//     aria-labelledby="next"
//     tabindex="0">
//     </button>
//      <p class="next"
//     id="next"
//     aria-hidden="true">image suivante</p> `
//     return dom
//   }
// }
// Lightbox.init()
//trouver la position du 1er  media agrandi

//   findPosition(firstObject)
//   firstObject.style.display = 'flex'
//   firstObject.setAttribute('aria-hidden', 'false')
//   lightboxContainer.focus()
// }







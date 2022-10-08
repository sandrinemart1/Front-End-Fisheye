const mainPage = document.querySelector('.Photographer-Page-Main');
const modalButton =document.querySelector("#contact_button");
const footerInfos = document.querySelector('.infos');
const filterDiv = document.querySelector('.select_filter')
let lightBoxBg=document.querySelector('#lightbox-background');
let lightboxContainer =document.querySelector(".lightbox-modal")
let buttonClose =document.querySelector(".lightbox_close");
let next = document.querySelector('.lightbox_chevron--next')
let previous = document.querySelector('.lightbox_chevron--previous')
let imagesLightBox = document.getElementsByClassName('image-media')
let position
// console.log(imagesLightBox)
document.addEventListener('click', (e)=>{console.log(e.key)})


document.addEventListener('click', (e)=>{
  if((e.target.tagName === 'IMG'||'VIDEO') && e.target.className ==='image-media')
    lightboxOpen(e)
  }
  );

//   // ouvrir la lightbox
function lightboxOpen(e){
  let lightBoxBg=document.querySelector('#lightbox-background');
  let lightboxContainer =document.querySelector(".lightbox-modal")
  let position
// console.log(imagesLightBox)
document.addEventListener('click', (e)=>{console.log(e.target)})
    e.preventDefault()
    lightBoxBg.style.display = 'flex'
    lightBoxBg.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('tabindex', '-1')
    modalButton.style.display ='none';
    filterDiv.style.display ='none';
    filterDiv.setAttribute('aria-hidden','true')
    footerInfos.style.display ='none';
    footerInfos.setAttribute('aria-hidden','true')
    lightboxContainer.setAttribute('tabindex', '0')
    lightboxContainer.focus()

    let picture = window.event.target;
    let id = findId(picture)
    let firstObject= document.getElementById(`object${id}`)
    firstObject.style.display ='flex' 
  //  console.log(firstObject)

    position = giveThePosition(firstObject)
    return firstObject
  }
  // console.log(document.getElementById('src'))

 ////// trouver l 'id de l 'image cliquée ///////////
function findId(picture) {
  if(picture.tagName !=='A'){
    console.log(document.querySelector("#src"))
    document.querySelector("#src").src = picture.src;
    // console.log(picture.src)
    let divMedia = picture.parentNode
    let divMedia2 = divMedia.parentNode
    let idDivMedia2 = divMedia2.getAttribute('id')
    let id = idDivMedia2.replace('divMedia2.id', 'number')
    return id
  }

}   

//////////// position de l'image dans la lightbox  ////////
function giveThePosition(firstObject){
  let className = firstObject.className
  let i = className.lastIndexOf ('_')
  let positionSt = className.substr(i+1)
  let position = parseInt(positionSt)
  return position
}


//Navigation droite gauche dans la lightbox
next.addEventListener('click',() =>goToNext());
function goToNext(){
  let allObjects = document.querySelectorAll('.lightbox_object')
  // console.log(allObjects)
  let total = allObjects.length-1
  // console.log(position)
  if (position< total){
    const lastObject = document.querySelector(`.object_${position}`)
    console.log(lastObject)
    position++
    console.log(JSON.parse(localStorage.getItem('photographerStock')).media[position])
    console.log(document.getElementById('src').src)
  // document.getElementById('src').src = `http://127.0.0.1:5502/assets/images/${firstName}/`+JSON.parse(localStorage.getItem('photographerStock')).media[position].image
  const currentObject = document.querySelector(`.object_${position}`)
  console.log(currentObject)
  // setNodeAttributes(lastObject,currentObject)
}else if (position === total){
  const lastObject = document.querySelector(`.object_${position}`)
  position = 0
  const currentObject = document.querySelector(`.object_${position}`)
  setNodeAttributes(lastObject,currentObject) 
}
}


previous.addEventListener('click',() =>goToPrevious());

function goToPrevious(){
  let allObjects = document.querySelectorAll('.lightbox_object')
  let total = allObjects.length-1;
  console.log(position)
  if (position - 1 >= 0) {
    position -= 1
    // document.getElementById('src').src =`http://127.0.0.1:5502/assets/images/${firstName}/`+JSON.parse(localStorage.getItem('photographerStock')).media[position].image
    const currentObject = document.querySelector(`.object_${position}`)
    const lastObject = document.querySelector(`.object_${position + 1}`)
    console.log(currentObject)
    setNodeAttributes(lastObject, currentObject)
  } else {
    const lastObject = document.querySelector(`.object_${position}`)
    position = total
    const currentObject = document.querySelector(`.item-${position}`)
    console.log(JSON.parse(localStorage.getItem('photographerStock')).media[position])
    console.log(document.getElementById('src').src)
    setNodeAttributes(lastObject, currentObject)
  
}
}
const setNodeAttributes = (lastObject, currentObject) => {
  lastObject.style.display = 'none'
  currentObject.style.display = 'flex'
  lastObject.setAttribute('aria-hidden', 'true')
  currentObject.setAttribute('aria-hidden', 'false')
}

//fermeture lightbox
buttonClose.addEventListener('click',()=>lightboxClose())
document.body.addEventListener('keydown',(e) => onKey(e))
function onKey(e){
  // console.log(e.target)
  let keyname = e.key
  console.log (keyname)
  if(keyname =='Escape'){
    lightboxClose()
  }
  else if(keyname =='ArrowRight'){
    goToNext()
  }
  else if(keyname =='ArrowLeft'){
    goToPrevious()
  }

}

function lightboxClose(){
  
  lightBoxBg.style.display = 'none'
  lightBoxBg.setAttribute('aria-hidden', 'true')
  mainPage.setAttribute('aria-hidden', 'false')
  mainPage.setAttribute('tabindex', '0')
  modalButton.style.display ='flex';
  filterDiv.style.display ='flex';
  filterDiv.setAttribute('aria-hidden','false')
  footerInfos.style.display ='flex';
  footerInfos.setAttribute('aria-hidden','false')
}
export{lightboxOpen}








// import{SeparateCardImage} from './Photographer2.js'
let stock = JSON.parse(localStorage.getItem('photographerStock'))

console.log(stock)
//////dropdown//////////
let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
let dropDownDiv = document.querySelector("#dropdown-button");
let chevron = document.getElementById("chevron")
let date = document.getElementById("date");
let titre = document.getElementById("titre");
let arrow = document.querySelector("#chevron i");


function dropDownOpen(){
  dropDownDiv.style.display ='block';
  if(chevron.className !=='drop-down-open'){
 dropDownDiv.style.display=" block";
 chevron.className='drop-down-open';
  }else{
    dropDownDiv.style.display=" none";
    chevron.className='drop-down-close';
  }
}

///////  fonctions de tri  //////////////
////// tri par  'populaire' //////////////

function popularitySort(media) {
  function tri(a,b) {
    return ((a.likes < b.likes) ? 1 : (a.likes == b.likes) ? 0 : -1)
  }
  media.sort(tri)
  SeparateCardImage(media)
  }
///////  tri par 'date'  //////////////
function dateSort(media){
  function tri(a,b){
    let dateA = new Date(a.date)
    console.log(dateA)
    let dateB = new Date(b.date)
    return ((dateA < dateB) ? 1 : (dateA == dateB) ? 0 : -1)
  }
  media.sort(tri)
SeparateCardImage(stock.media)
}
//////  tri par  'titre' //////////////
function titleSort(media){

  function tri(a,b){
    let titreA = a.title.split(' ').join('')
    a= titreA.toLowerCase()
    let titreB = b.title.split(' ').join('')
    b = titreB.toLowerCase()
    return (a < b) ? -1 : 1
  }
  media.sort(tri)
SeparateCardImage(stock.media)
}
// export{dropDownOpen}
export{dropDownOpen, popularitySort, dateSort, titleSort}
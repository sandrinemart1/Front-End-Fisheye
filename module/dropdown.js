// let stock = JSON.parse(localStorage.getItem('photographerStock'))


//////dropdown//////////
let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
let dropDownDiv = document.querySelector("#dropdown-button");
let chevron = document.getElementById("chevron")
let date = document.getElementById("date");
let titre = document.getElementById("titre");
let arrow = document.querySelector("#chevron i");


dropDownPopularityButton.addEventListener("click" ,dropDownOpen)

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
////// bouton 'populaire' //////////////
dropDownPopularityButton.addEventListener('click', () => popularitySort(stock.media))
function popularitySort(media) {
  function tri(a,b) {
    return ((a.likes < b.likes) ? 1 : (a.likes == b.likes) ? 0 : -1)
  }
  media.sort(tri)
  SeparateCardImage(media)
  }
//////  bouton 'titre' //////////////
titre.addEventListener('click', () => titleSort(stock.media))
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
////////  bouton' date'  /////////////
// export{dropDownOpen}
// export{popularitySort}
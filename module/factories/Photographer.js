






function affichageMedias(photographersJson){
    photographersJson.forEach(photographer =>{
        if (photographer.id ==login){
            document.querySelector('.photographer_text--name').textContent=photographer.name;
            document.querySelector('.photographer_text--location').textContent = photographer.city+ ", " + photographer.country;
            document.querySelector(".photographer_text--tagline").textContent= photographer.tagline;
            document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
            // document.querySelector('.page_photographer-media >img').src =`../../assets/images/${firstName}/`;
        }
    })
}


myFetch();


  

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

 //si chevron rotate, au click => dropDownDiv.style.display="none";   
}



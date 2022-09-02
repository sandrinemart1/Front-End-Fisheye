//////dropdown//////////


// dropDownPopularityButton.addEventListener("click" ,dropDownOpen)
//si chevron position initiale
function dropDownOpen(){
  let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
  let dropDownDiv = document.querySelector("#dropdown-button");
  let chevron = document.getElementById("chevron")
  let date = document.getElementById("date");
  let titre = document.getElementById("titre");
  let arrowDown = document.querySelector("#chevron i");

  if(chevron.className !=='drop-down-open'){
 dropDownDiv.style.display=" block";
 chevron.className='drop-down-open';
  }else{
    dropDownDiv.style.display=" none";
    chevron.className='drop-down-close';
  }
}

//////dropdown//////////
let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
let dropDownDiv = document.querySelector("#dropdown-button");
let chevron = document.getElementById("chevron")
let date = document.getElementById("date");
let titre = document.getElementById("titre");
let arrowDown = document.querySelector("#chevron i");
console.log(arrowDown);

dropDownPopularityButton.addEventListener("click" ,dropDownOpen)

// function dropDownOpen(){
//   if(chevron.className !=='drop-down-open'){
//  dropDownDiv.style.display=" block";
//  chevron.className='drop-down-open';
//   }else{
//     dropDownDiv.style.display=" none";
//     chevron.className='drop-down-close';
//   }
// }
export{dropDownOpen}
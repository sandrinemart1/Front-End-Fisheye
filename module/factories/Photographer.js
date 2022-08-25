import{photographersJson , mediasJson} from '../fetch.js'
import{ dataInArray, dataInArray2} from '../fetch.js'



async function myFetch(affichage){
    const response = await fetch("../../data/photographers.json")
    .then( async(response)=>{
        if (response.ok){
            const data=await  response.json()
            // console.log(data);
            const photographers = data.photographers;
            const media = data.media;
            // console.log(media);

dataInArray(photographers)
dataInArray2(media)
transformName('photographersJson')
coupleMedias(photographers)
affichageMedias(photographersJson)


                }else{
                    console.error('Retour du serveur :', response.status);
                }
                
                })
                }

//recuperer les medias dans le photographe correspondant
function coupleMedias(photographers){
    for (let photographer of photographers) {
        let mediaList = []  
        
        Object.defineProperty(photographer, 'media', {
            value: mediaList,
            writable: true 
        })
        for (let mediaId of media) {
            if (photographer.id == mediaId.photographerId) {
                mediaList.push(mediaId);
                console.log(mediaId)
                
            }
        }
        
    }
}    


//recuperer l 'url de chq photographe
const photographersJson = [];
const mediasJson =[];
//donner url à chq page photographe et filtrer le images en fct id du photographe
let string = window.location.href;
let url = new URL(string);
let login = url.searchParams.get('id');
// console.log(login);
                
let firstName
                function transformName(photographersJson){
    //constante pour recuperer le  prenom du photographe affiché
    for (let photographerJson of photographersJson){
    let id = photographerJson.id;
    if(id== login){
        console.log(id)
        let fullName= photographerJson.name
        let splitName =fullName.split(' ');
        let firstName1= splitName[0];
        affichageMedias(photographersJson)               
    //oter le trait d'union
    firstName  =  firstName1.replace('-',' ');
    console.log(firstName)
    }
    }
}


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



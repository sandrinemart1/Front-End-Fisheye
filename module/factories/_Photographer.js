
// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }

//fonction pour recuperer les donnees
class Photographer{
    constructor( name, id, city, country, tagline,price,portrait,media){
        this.name =name,
        this.id = id,
        this.city = city,
        this.country = country,
        this.tagline = tagline,
        this.price = price,
        this.portrait= portrait,
        this.media = media
    }
}
class Media{

    constructor( date,id,image,likes,photographerId,price,title){
        this.date = date,
        this.id = id,
        this.image= image,
        this.likes= likes,
        this.photographerId= photographerId,
        this.price= price,
        this.title= title
    }
}

const photographersJson = [];
const mediasJson =[];
//donner url à chq page photographe et filtrer le images en fct id du photographe
let string = window.location.href;
let url = new URL(string);
let login = url.searchParams.get('id');
console.log(login);





let firstName

async function myFetch(affichageMedias){
    const response = await fetch("../../data/photographers.json")
    .then( async(response)=>{
        if (response.ok){
            const data=await  response.json()
            console.log(data);
            const photographers = data.photographers;
            const media = data.media;
            // console.log(media);
            // console.log(photographers)
            //recuperer les photographes dans un array photographersJson
            // const photographerJson = [];
            for(let photographer of data.photographers){
                let photographerJson = new Photographer(
                    photographer.name, 
                    photographer.id, 
                    photographer.city, 
                    photographer.country, 
                    photographer.tagline,
                    photographer.price,
                    photographer.portrait);  
                    
                    photographersJson.push(photographerJson);
                    console.log(photographerJson);
                    
                    //constante pour recuperer le  prenom du photographe
                    let fullName= photographerJson.name
                    let splitName =fullName.split(' ');
                    let firstName1= splitName[0];
                    //oter le trait d'union
                    firstName  =  firstName1.replace('-',' ');
                    console.log(firstName)
                  
                }
                
                affichageMedias(photographersJson)               
                //recuperer les medias dans un array mediasJson
                //  const mediasJson =[];
                //  for(let media of data.media){
                    media.forEach((media)=>{ 
                        const mediaJson = new Media(
                            media.date, 
                            media.id, 
                            media.image, 
                            media.likes, 
                            media.photographerId,
                            media.price,
                            media.title);
                            
                            mediasJson.push(mediaJson);
                            console.log(mediaJson.photographerId);
                            
                            let mediaPhotographer= mediasJson.filter((mediaJson)=> mediaJson.photographerId == login);
                            mediaPhotographer.forEach((mediaPhotographer) => {
                                let articleMedia = document.querySelector('.page_photographer-media');
                                let imageMedia = document.createElement('img');
                                articleMedia.appendChild(imageMedia);
                                imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaJson.image}` );
                                let imageAttributes = document.createElement('div');
                                imageAttributes.className = "img_attributes";
                                articleMedia.appendChild(imageAttributes);
                                let imageTitle = document.querySelector('h3');
                                imageTitle.innerHTML = mediaJson.title;
                                imageAttributes.appendChild(imageTitle);
                                let imageLike = document.createElement('p');
                                imageLike.textContent =mediaJson.likes;
                                imageAttributes.appendChild(imageLike);
                                let span = document.createElement('span')
                                imageAttributes.appendChild(span);
                                let imageHeart = document.createElement('i');
                                imageHeart.className= "fa-solid fa-heart";
                                span.appendChild(imageHeart); 
                            })
                         console.log(mediaPhotographer) ;

                        })
                        
                    }else{
                        console.error('Retour du serveur :', response.status);
                    }
                    
                })
            }
            
            // function filterID(mediasJson){
                //     if (photographerJson.id == mediaJson.photographerId)
                // }
                
                
                // function affichageMedias(data){
                    //     console.log('merci');
                    // }
function mediaName(){
        console.log(photographerJson);
    }



function affichageMedias(photographersJson){
    photographersJson.forEach(photographer =>{
        if (photographer.id ==login){
            document.querySelector('.photographer_text--name').textContent=photographer.name;
            document.querySelector('.photographer_text--location').textContent = photographer.city+ ", " + photographer.country;
            document.querySelector(".photographer_text--tagline").textContent= photographer.tagline;
            document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
        }
    })
}
// function createCardImage(){
//     let articleMedia = document.querySelector('.page_photographer-media');
//     let imageMedia = document.createElement('img');
//     articleMedia.appendChild(imageMedia);
//     imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaJson.image}` );
//     let imageAttributes = document.createElement('div');
//     imageAttributes.className = "img_attributes"
//     articleMedia.appendChild(imageAttributes);
//     let imageTitle = document.querySelector('h3')
//     // imageTitle.innerText = mediaJson.title;
//     imageAttributes.appendChild(imageTitle);
//     let imageLike = document.createElement('p');
//     imageLike.textContent = mediaJson.likes
//     imageAttributes.appendChild(imageLike);
//     let span = document.createElement('span')
//     imageAttributes.appendChild(span);
//     let imageHeart = document.createElement('i');
//     imageHeart.className= "fa-solid fa-heart";
//     span.appendChild(imageHeart);
    
   
// }
// affichageMedias(mediasJson) 
//     mediasJson.forEach(mediaJson => {
//         if(mediaJson.photographerId == login){
//             document.querySelector('page_photographer-media > img').src =`../../assets/images/${firstName}/${mediaJson.image}` ;
//             document.querySelector('h3').textContent =mediaJson.title;
//             document.querySelector('page_photographer-media >p').textContent = mediaJson.likes;
        
//         }
//         })

            // let articleMedia = document.querySelector('.page_photographer-media');
            // let imageMedia = document.createElement('img');
            // articleMedia.appendChild(imageMedia);
            // imageMedia.setAttribute('src',`../../assets/images/${firstName}/${mediaJson.image}` )
            // let imageAttributes = document.createElement('div');
            // imageAttributes.className = "img_attributes";
            // articleMedia.appendChild(imageAttributes);
            // let imageTitle = document.querySelector('h3');
            // imageTitle.innerHTML = mediaJson.title;
            // imageAttributes.appendChild(imageTitle);
            // let imageLike = document.createElement('p');
            // imageLike.textContent =mediaJson.likes;
            // imageAttributes.appendChild(imageLike);
            // let span = document.createElement('span')
            // imageAttributes.appendChild(span);
            // let imageHeart = document.createElement('i');
            // imageHeart.className= "fa-solid fa-heart";
            // span.appendChild(imageHeart); 
myFetch(affichageMedias);


  

//////dropdown//////////
let dropDownPopularityButton =document.querySelector("#dropDownPopularityButton");
let dropDownDiv = document.querySelector("#dropdown-button");
let chevron = document.getElementById("chevron")
let date = document.getElementById("date");
let titre = document.getElementById("titre");
console.log(titre);

dropDownPopularityButton.addEventListener("click" ,dropDownOpen)
//si chevron position initiale
function dropDownOpen(){
 dropDownDiv.style.display=" block";
 chevron.classList.add('drop-down-open');

 //si chevron rotate, au click => dropDownDiv.style.display="none";   
}



//se renseigner sur url.searchparams
//création objet photographer pour rentrer les données json avec new Object


//  displayPhotographers(data) ;
//  function displayPhotographers(photographers){
//      for(photographer of photographers){
//         photographerFactory();
//         getUserCardDOM;

//      }
//  }
    

//     userData.then((photographersMedia) => {
//       console.log(photographersMedia[0]);
//       const name = photographersMedia[1].name ;
//       const id = photographersMedia[1].id ;
//       const city = photographersMedia[1].city ;
//       const country = photographersMedia[1].country ;
//       const tagline = photographersMedia[1].tagline ;
//       const price = photographersMedia[1].price ;
//       const portrait = photographersMedia[1].portrait ;
        
        
        
//       console.log();
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//ecrire la fonction asynchrone


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// async function init() {
//     // Récupère les datas des photographes
    
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// };

// init();

 //recuperation et mise en place de 2 const une pour photographes, une pour media

const array = window.location.search;
// console.log("photographers""media",array);
// const photographers = urlParams.get('photographers');
// const media = urlParams.get('media'); 

//creer une class avec les donnees de chq photographe
// function getPhotographer(photographers) {
//     for(let i = 0; i < photographers.length; i++){
 
//           photographer = new Photographer(
//           photographers[i].name,
//           photographers[i].id,
//           photographers[i].city,
//           photographers[i].country,
//           photographers[i].tags,
//           photographers[i].tagline,
//           photographers[i].price,
//           photographers[i].portrait,
//         )}
//           };
// getPhotographer();
// plus creer  une cardDOM accueil

// export { getPhotographer, class Photographer,getPhotographers}
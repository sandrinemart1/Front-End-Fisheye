// import{ Element, createCardDOM}from './factories/home-page-elements.js'
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
let photographerJson;
async function myFetch(affichage){
    const response = await fetch("../../data/photographers.json")
    .then( async(response)=>{
        if (response.ok){
            const data=await  response.json()
            console.log(data);
            const photographers = data.photographers;
            const media = data.media;
            console.log(media);
//recuperer les photographes dans un array photographersJson
            // const photographersJson = [];
            for(let photographer of data.photographers){
                const photographerJson = new Photographer(
                    photographer.name, 
                    photographer.id, 
                    photographer.city, 
                    photographer.country, 
                    photographer.tagline,
                    photographer.price,
                    photographer.portrait);  

            photographersJson.push(photographerJson);
            // console.log(photographerJson);
            // console.log(photographerJson.portrait);
                }
affichage(photographersJson)


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
            console.log(mediaJson);
                 })

                }else{
                    console.error('Retour du serveur :', response.status);
                }
                
                })
                }
                
                async function getData(){
                const data = await myFetch()
                console.log(data);
                }
                // getData();

//recuperer uniquement les photographes
//injecter les données dans un tableau
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographersJson = []

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers, ...photographers, ...photographers]})
}

export { myFetch}
export{photographersJson , mediasJson}

import  {photographersJson , mediasJson} from './fetch.js'
import { myFetch  } from './fetch.js'
// import {Element} from './elementDOM.js'
class Element {
  constructor(name, type, classname){
      this.name = name
      this.type = type
      this.classname = classname
  }
  get el() {
      return this.createEl()
  }
createEl() {
      this.name = document.createElement(this.type)
      this.name.className = this.classname
      this.name.classList.add(this.classname)
      return this.name
  }
}

function createCardDOM(photographersJson) {
  console.log(photographersJson.length)
  for(let i =0 ; i< photographersJson.length;i++){
  let article =new Element( 'article','article','photographer_section--user').el;
  let anchor = new Element ( 'anchor', 'a','photographer_section--link').el;
  let imgBanner =new Element ('imgBanner','div','photographer_section--banner').el;
  let img = new Element('img','img', 'img').el;
  let  h2 = new Element ('h2','h2','h2').el;
  let paragraph =new Element ('paragraph','div','photographer_section--text').el;
  let location = new Element('location','p','location').el;
  let tagline = new Element ('tagline','p','tagline').el;
  let price = new Element('price','p','price').el;
// conteneur des cartes photographes
  let cardDOMBanner= document.querySelector(".photographer_section");
  
  cardDOMBanner.appendChild(article);
  article.appendChild(anchor);
  article.appendChild(imgBanner);
  article.appendChild(paragraph);

  anchor.appendChild(img);
  anchor.appendChild(h2);
  
  paragraph.appendChild(location);
  paragraph.appendChild(tagline);
  paragraph.appendChild(price);
  anchor.setAttribute('href', `../photographer.html?id=` + `${photographersJson[i].id}`)
   //contenu de chaque carte 
  img.setAttribute('src', `../../assets/images/Photographers ID Photos/${photographersJson[i].portrait}`);
  img.setAttribute('alt',`portrait du photographe ${photographersJson[i].name}`)
  img.setAttribute('width', '200');
  img.setAttribute('height', '200');
  h2.innerHTML =`${photographersJson[i].name}`;
  location.innerHTML = `${photographersJson[i].city},${photographersJson[i].country}`;
  tagline.innerHTML = `${photographersJson[i].tagline}`;
  price.innerHTML =`${photographersJson[i].price}€/jour`;
  }
  

}
export {createCardDOM}
myFetch()

// function affichage(photographersJson){
//   // console.log(photographersJson[0],'zzzzz')
//   // let banner = document.querySelector("ul");
//   // let photographer;
//   // exercice Ahmed
//   // for(photographer of photographersJson){
//     // console.log(photographer.name);
//   //   banner.innerHTML+=`<li>${photographer.name}</li>`;
//   // }





















  


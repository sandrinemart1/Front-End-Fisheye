/*creation carte photographe simplifiée (refuse le 1er appendChild)********************************/
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

function createCardDOM(photographer) {
    console.log(photographer)
    let article =new Element( 'article','article','photographer_section--user').el;
    let anchor = new Element ( 'anchor', 'a','photographer_section--link').el;
    let imgBanner =new Element ('imgBanner','div','photographer_section--banner').el;
    let img = new Element('img','img', 'img').el;
    let  h2 = new Element ('h2','h2','h2').el;
    let paragraph =new Element ('paragraph','div','photographer_section--text').el;
    let location = new Element('location','p','location').el;
    let tagline = new Element ('tagline','p','tagline').el;
    let price = new Element('price','p','price').el;

    let cardDOMBanner= document.querySelector(".photographer_section");
    // console.log(cardDOMBanner)
    cardDOMBanner.appendChild(article);
    article.appendChild(anchor);
    article.appendChild(imgBanner);
    article.appendChild(paragraph);

    anchor.appendChild(img);
    anchor.appendChild(h2);
    
    paragraph.appendChild(location);
    paragraph.appendChild(tagline);
    paragraph.appendChild(price);

       //contenu de chaque carte
    
       anchor.setAttribute('href', `../photographer.html?id=` + `${photographer.id}`)
       img.setAttribute('src', `../../assets/images/Photographers ID Photos/${photographer.portrait}`);
       img.setAttribute('alt',`portrait du photographe ${photographer.name}`)
       img.setAttribute('width', '200');
       img.setAttribute('height', '200');
       h2.innerHTML =`${photographer.name}`;
       location.innerHTML = `${photographer.city},${photographerJson.country}`;
       tagline.innerHTML = `${photographer.tagline}`;
       price.innerHTML =`${photographer.price}€/jour`;
       }


createCardDOM()
function createElement(element,) {
      return  document.createElement(element)   
    }

let article = createElement('article')
append(main,article)
console.log(article)
function append(parent, el) {
  return parent.appendChild(el);
}




export {Element}

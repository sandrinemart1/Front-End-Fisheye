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

// class MediaConstructor{
                                    // DIFFERENCIER PHOTO ET VIDEO
//     constructor(){
//         this.createMedia =
//     }
// }




export {Element}

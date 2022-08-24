//class pour créer elements du DOM
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
  
// export{Element}
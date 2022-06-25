import{getPhotographer} from './Photographer2.js'

const mainPage = document.querySelector('.Photographer-Page-Main')
const pageHeader =document.querySelector('.page_photographer-header')

const modal = document.querySelector("#contact_modal");
const modalDiv = document.querySelector('.modal');
// console.log(modalDiv);
const modalButton =document.querySelector("#contact_button");
const modalCross = document.querySelector('.modal-header_text span i')
const footerInfos = document.querySelector('.infos')
const msgAll = document.querySelectorAll('.error-msg');
// console.log(msgAll[3])

// creation message prénom
const msgFirstName = document.getElementById('message-firstName')
//creation message nom
const msgLastName = document.getElementById('message-lastName')
//creation message email
const msgEmail = document.getElementById('message-email')
//creation message de fin de validation
const msgValid = document.getElementById('message-validation')  
//div avec input
const divInput = document.querySelectorAll('modal_form--formData')
// console.log(divInput)
const inputFirstName = document.getElementById('firstname')
const inputLastName = document.getElementById('lastname')
const inputEmail = document.getElementById('email')
const submit = document.getElementById('submit-button')

//ouverture et fermeture de la modale


modalButton.addEventListener('click',displayModal)
function displayModal() {
modal.style.display = "block";
modal.setAttribute('aria-hidden', 'false')
pageHeader.style.display ='none';
pageHeader.setAttribute('aria-hidden', 'true')
mainPage.style.display ='none';
mainPage.setAttribute('aria-hidden', 'true')
footerInfos.style.display ='none';
footerInfos.setAttribute('aria-hidden','true')
firstName.focus()
modalDiv.setAttribute('tabindex','0')
}

modalCross.addEventListener('click', closeModal)
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true')
  pageHeader.style.display ='block';
  pageHeader.setAttribute('aria-hidden', 'false')
  mainPage.style.display ='block';
  mainPage.setAttribute('aria-hidden', 'false')
  footerInfos.style.display='flex';
  footerInfos.setAttribute('aria-hidden','false')
  modalButton.focus();
  modalDiv.setAttribute('tabindex','-1')
}
//fermeture clavier
modal.addEventListener('keydown', closeOnKey)
function closeOnKey(e) {
  let keyname = e.key
  console.log(e.key)
  if (keyname == 'Escape') {
    closeModal()
  }
}
//Regex pour definir2 caracteres min +zero chiffre + autorise prénoms composés//
const nameReGex =
  /^[a-zA-ZéèïîÉÈÎ][a-zA-Zéèêàçîï]+([-'\s][a-zA-ZéèïîÉÈÎ][a-zA-Zéèêàçîï]+)?$/;
// regex email definit ensemble caractères suivi d 1 @ suivi ensemble de caractères suivi d'un point suivi de 2 à 10 caracteres en minuscules
const eMailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

//variables pour les inputs  et variables mises en false pour submit final
  let form = document.querySelector('#form')
  // console.log(form)
  let firstName = document.querySelector('#firstname')
  let validFirst = false;
  let lastName = document.querySelector('#lastname');
  let validLast= false;
  let eMail = document.querySelector('#email');
  let validMail = false;
  let message = document.querySelector("#message")
  let validMsg = false;
  //variable pour les messages d'informations de l 'utilisateur
  let msgcss = document.querySelector('.error-msg')
  let msgParent =msgcss.parentNode;
  let msg = msgParent.querySelector('span');
  // console.log(msg);

//validation du premiers input, prénom 
  firstName.addEventListener('blur',validFirstName)
  
  function validFirstName(){
      if (firstName.value.trim() == "") {
        msgAll[0].textContent = "merci de renseigner votre prénom";
        firstName.classList.add('input-error')
        return false;
      } else if (nameReGex.test(firstName.value) == false) {
        msgAll[0].textContent  = "le prénom doit comporter 2 lettres minimum";
        firstName.classList.add('input-error')
        return false;
      } else {    
        msgAll[0].textContent  = "merci de nous avoir confié votre prénom";
        firstName.classList.remove('input-error')
        firstName.classList.add('input-ok')
        validFirst = true;
      }
    }

// validation du 2eme input, nom 
  lastName.addEventListener("blur",validLastName);

  function validLastName(){
    if (lastName.value.trim() == "") {
      msgAll[1].textContent = "merci de renseigner votre nom";
      lastName.classList.add('input-error')
      return false;
    } else if (nameReGex.test(lastName.value) == false) {
      msgAll[1].textContent  = "le nom doit comporter 2 lettres minimum";
      lastName.classList.add('input-error')
      return false;
    } else {    
      msgAll[1].textContent  = "merci de nous avoir confié votre nom";
      lastName.classList.remove('input-error')
      lastName.classList.add('input-ok')
      validLast= true;
    }
  }
  
//validation du 3eme  input, email
  eMail.addEventListener("blur",validEmail);

  function validEmail(){
    if (eMail.value.trim() == "") {
      msgAll[2].textContent = "merci de renseigner votre email";
      eMail.classList.add('input-error')
      return false;
    } else if ( eMailRegex .test(eMail.value) == false) {
      msgAll[2].textContent  = "l'email n'est pas au bon format";
      eMail.classList.add('input-error')
      return false;
    } else {    
      msgAll[2].textContent  = "merci de nous avoir confié votre email";
      eMail.classList.remove('input-error')
      eMail.classList.add('input-ok')
      validMail = true;
    }
  }

  //validation du 4eme input, message
  message.addEventListener("blur",validMessage);

  function validMessage(){
    let msgLenght =message.value.length

    if (message.value.trim() == "") {
      msgAll[3].textContent = "merci d'écrire votre message";
      message.classList.add('input-error')
      return false;
    } else if ( msgLenght< 6 || msgLenght>60) {
      msgAll[3].textContent  = "le message doit comporter entre 6 et  60 caractères";
      message.classList.add('input-error')
      return false;
      
    } else {    
      msgAll[3].textContent  = "merci de nous avoir confié votre message";
      message.classList.remove('input-error')
      message.classList.add('input-ok')
      validMsg= true;
    }
  }
  //validation du formulaire rempli correctement
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  form.addEventListener("submit", validate); 
  function validate() {
    if (
      validFirst== true &&
      validLast == true &&
      validMail == true &&
      validMsg == true ) 
      {
      msgAll[4].textContent ="Merci de nous avoir confié votre demande";
      submit.classList.add('input-ok')
      console.log('Prénom : ' + firstName.value)
      console.log('Nom : ' + lastName.value)
      console.log('email : ' + eMail.value)
      console.log('message : ' + message.value)
      closeModal()
 
    } else {
      if (!validFirst) {
        msgAll[4].textContent = "merci de renseigner votre prénom";
      }
      if (!validLast) {
        msgAll[4].textContent = "merci de renseigner votre nom";
      }
      if (!validEmail) {
        msgAll[4].textContent = "merci de renseigner votre email";
      }
      if (!validMessage) {
        msgAll[4].textContent = "merci d'écrire votre message";
      }
;
    }
  }

export {displayModal}
export {closeModal}
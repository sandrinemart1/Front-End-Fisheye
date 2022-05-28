function displayModal() {
    const modal = document.querySelector(".contact_modal");
    const modalButton =document.querySelector(".contact_button");
    console.log(modalButton);
    

	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
//fonctions de validation des champs input
// $(function() {

//     // validation du nom aussitôt qu'on quitte le contrôle de saisie(probleme .blur avec firefox)

//     $('#nom').blur(function() {

//         if (!$(this).val()) {

//             $('#validationnom').text("Vous devez entrer un nom");

//         }

//         else {

//             $('#validationnom').text("");

//         }

//     });
export {displayModal}
export {closeModal}
var modal = document.querySelector('#simpleModal');
var modalBtn = document.querySelector('#modalBtn');
var closeBtn = document.querySelector('#closeBtn');
modalBtn.addEventListener('click', openModal());
closeBtn.addEventListener('click', closeModal());
function openModal(){
modal.style.display = "block";

}

function closeModal(){
modal.style.display = "none";

}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
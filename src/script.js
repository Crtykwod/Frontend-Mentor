const navList = document.getElementById("navList");
const langList = document.getElementById("langList");
const langListPc = document.getElementById("langListPc")

function openNav() {
  if (!langList.classList.contains("hidden")) {
    langList.classList.add("hidden")
  }
  navList.classList.toggle("hidden");
}

function openLang() {
  langList.classList.toggle("hidden");
  langListPc.classList.toggle("hidden");

  if (!navList.classList.contains("hidden")) {
    navList.classList.add("hidden")
  }

  console.log("pinto")
}

function collapseChallenge(button) {
  // Encontra o elemento .challenge__item mais próximo do botão clicado e então encontra o .collapsible dentro do .challenge__item
  const parentItem = button.closest('.challenge__item');
  const targetItem = parentItem.querySelector('.collapsible');

  //Retorna erro caso não encontrado
  if (targetItem == false) {
    return console.error('Elemento colapsável não encontrado.')
  }

  // Verifica se o conteúdo está visível ou não e alterna
  if (targetItem.style.display !== "block") {
    targetItem.style.display = "block"; // Mostra o conteúdo
  } else {
    targetItem.style.display = "none"; // Esconde o conteúdo
  }
  // Classe para rotacionar o botão
  button.classList.toggle("active")
}
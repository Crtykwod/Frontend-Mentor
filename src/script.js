const navButton = document.getElementById("navButton");
const navList = document.getElementById("navList");
const langButton = document.getElementById("langButton");
const langList = document.getElementById("langList");
const langButtonPc = document.getElementById("langButtonPc");
const langListPc = document.getElementById("langListPc");

function openNav() {
  if (!langList.classList.contains("hidden")) {
    langList.classList.add("hidden");
  }

  if (navButton.ariaExpanded == "false") {
    navButton.ariaExpanded = "true";
  } else {
    navButton.ariaExpanded = "false";
  }

  navList.classList.toggle("hidden");
}

function openLang() {
  langList.classList.toggle("hidden");
  langListPc.classList.toggle("hidden");

  if (langButton.ariaExpanded == "false" || langButtonPc.ariaExpanded == "false" ) {
    langButton.ariaExpanded = "true";
    langButtonPc.ariaExpanded = "true";
  } else {
    langButton.ariaExpanded = "false";
    langButtonPc.ariaExpanded = "false";
  }

  if (!navList.classList.contains("hidden")) {
    navList.classList.add("hidden");
  }
}

function collapseChallenge(button) {
  // Encontra o elemento .challenge__item mais próximo do botão clicado e então encontra o .collapsible dentro do .challenge__item
  const parentItem = button.closest(".challenge__item");
  const targetItem = parentItem.querySelector(".collapsible");

  //Retorna erro caso não encontrado
  if (!targetItem) {
    return console.error("Elemento colapsável não encontrado.");
  }

  const isVisible = targetItem.style.display === "block";

  // Verifica se o conteúdo está visível ou não e alterna
  if (!isVisible) {
    targetItem.style.display = "block"; // Mostra o conteúdo
    button.ariaExpanded = "true";
  } else {
    targetItem.style.display = "none"; // Esconde o conteúdo
    button.ariaExpanded = "false";
  }
  // Classe para rotacionar o botão
  button.classList.toggle("active");
}

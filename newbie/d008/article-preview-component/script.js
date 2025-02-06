let shareButton = document.getElementById("share-button")
let shareIcon = document.getElementById("share-icon")
let articleFooter = document.getElementById("article-footer")
let author = document.getElementById("author")
let sharePopover = document.getElementById("share-popover")
let shareContainer = document.getElementById("share-container")

// Atualiza a largura da janela ao redimensionar
let windowWidth = window.innerWidth
function updateWindowWidth() {
  windowWidth = window.innerWidth
}
window.addEventListener("resize", updateWindowWidth)

function toggleShareIconColor() {
  shareIcon.classList.toggle("fill-white");
}
shareButton.addEventListener("mouseenter", toggleShareIconColor);
shareButton.addEventListener("mouseleave", toggleShareIconColor);

function toggleShareButtonColor() {
  // Alterna a cor de hover para fixa
  shareButton.classList.toggle("hover:bg-[--desaturated-dark-blue]");
  shareButton.classList.toggle("bg-[--desaturated-dark-blue]");
  // Alterna a cor de fixa para hover
  shareButton.classList.toggle("bg-[--light-grayish-blue]");
  shareButton.classList.toggle("hover:bg-[--dark-grayish-blue]");
}

function toggleArticleFooter() {
  if (windowWidth < 768) {
    articleFooter.classList.toggle("bg-[--dark-grayish-blue]");
    author.classList.toggle("hidden");
    shareContainer.classList.toggle("flex-1");
  } else if (windowWidth >= 768) {
    sharePopover.classList.toggle("popover-open");
  }
  sharePopover.classList.toggle("hidden");
}

shareButton.addEventListener("click", () => {
  toggleShareButtonColor();
  toggleShareIconColor();
  toggleArticleFooter();
});


const form = document.getElementById('form');
const successContainer = document.getElementById("successContainer")
const mainPage = document.getElementById("main")
const email = document.getElementById('email');
const errorMessage = document.getElementsByClassName("error-message")[0];
const submitButton = document.getElementById("submitButton")

function activateButton() {
  if (email.value != "") {
    submitButton.disabled = false
  } else {
    submitButton.disabled = true
  }
}

email.addEventListener("input", activateButton)

function handleSubmit(e) {
  e.preventDefault();

  console.log(email.value);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
    
  if (!validateEmail(email.value)) {
    console.log("Tu é burrão né?")
    
    function showError() {
      errorMessage.classList.remove("hidden");
      email.classList.add("email-error");
    }
    email.focus();
    return showError();
  }

  return submitSuccess()
}

function submitSuccess() {
  if (!errorMessage.classList.contains("hidden")) {
    errorMessage.classList.toggle("hidden");
    email.classList.toggle("email-error");
  };

  let successMessage = document.getElementById("successMessage");
  successMessage.innerHTML = `A confirmation email has been sent to <strong>${email.value}</strong>. Please open it and click the button inside to confirm your subscription.`;

  successContainer.classList.toggle("hidden")
  mainPage.classList.toggle("hidden")

  email.value = "";
}

form.addEventListener(KeyboardEvent, activateButton);
form.addEventListener("submit", handleSubmit);
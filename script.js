const dialogBox = document.querySelector("dialog");
const submitButton = document.querySelector("button");
const form = document.querySelector("form");

// Show success message on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  dialogBox.showModal();
});

// Close success message when clicked
dialogBox.addEventListener("click", (e) => {
  if (e.target === dialogBox) {
    dialogBox.close();
  }
});

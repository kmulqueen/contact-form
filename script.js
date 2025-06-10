const dialogBox = document.querySelector("dialog");
const submitButton = document.querySelector("button");
const form = document.querySelector("form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email-address");
const generalQueryInput = document.getElementById("general");
const supportQueryInput = document.getElementById("support");
const messageInput = document.getElementById("message");
const consentInput = document.getElementById("consent");
const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");
const emailError = document.getElementById("email-error");
const queryError = document.getElementById("query-error");
const messageError = document.getElementById("message-error");
const consentError = document.getElementById("consent-error");

// Maps the input element to the right error element
const elementMap = new Map([
  [firstNameInput, firstNameError],
  [lastNameInput, lastNameError],
  [emailInput, emailError],
  [generalQueryInput, queryError],
  [supportQueryInput, queryError],
  [messageInput, messageError],
  [consentInput, consentError],
]);

/**
 * Validates submitted form data and shows success message.
 *
 * @param {*} e Event
 */
function handleSubmit(e) {
  e.preventDefault();

  // Clear existing errors
  for (const value of elementMap.values()) {
    clearErrors(value);
  }

  // Retrieve the data from the form.
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Loop over the data object and determine if the actual value is acceptable.
  if (form.checkValidity()) {
    dialogBox.showModal();
    form.reset();
  } else {
    const expectedFields = {
      consent: {
        message: "To submit this form, please consent to being contacted",
        elem: [consentInput],
        errorElem: consentError,
      },
      "email-address": {
        message: "Please enter a valid email address",
        errorElem: emailError,
      },
      "first-name": {
        message: "Field is required",
        errorElem: firstNameError,
      },
      "last-name": {
        message: "Field is required",
        errorElem: lastNameError,
      },
      message: {
        message: "Field is required",
        errorElem: messageError,
      },
      query: {
        message: "Please select a query type",
        errorElem: queryError,
      },
    };

    for (const key in expectedFields) {
      if (Object.prototype.hasOwnProperty.call(expectedFields, key)) {
        const element = expectedFields[key];
        if (!data[key]) {
          element.errorElem.textContent = element.message;
          element.errorElem.classList.remove("input-error-hidden");
        } else if (key === "email-address") {
          if (emailInput.validity.typeMismatch === true) {
            element.errorElem.textContent = element.message;
            element.errorElem.classList.remove("input-error-hidden");
          }
        }
      }
    }
  }
}

/**
 * Adds the 'input-error-hidden' class to the element to clear the errors
 *
 * @param {*} element Error message element
 */
function clearErrors(element) {
  const errorClassHidden = "input-error-hidden";
  !element.classList.contains(errorClassHidden) &&
    element.classList.add(errorClassHidden);
}

/**
 * Adds event listener to element to clear error message when element input has changed
 *
 * @param {*} element Input element
 * @param {*} errorElement Error message element
 */
function handleClearErrorOnInput(element, errorElement) {
  element.addEventListener("change", (e) => {
    clearErrors(errorElement);
  });
}

for (const [key, value] of elementMap) {
  handleClearErrorOnInput(key, value);
}

// Handle submit
form.addEventListener("submit", handleSubmit);

// Close success message when clicked
dialogBox.addEventListener("click", (e) => {
  if (e.target === dialogBox) {
    dialogBox.close();
  }
});

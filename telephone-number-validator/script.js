const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const displayResult = document.getElementById('results-div');

const firstNumber = /^\(\d{3}\) \d{3}-\d{4}$/;

const telephoneNumbers = [];

const isTrueNumber = (number) => telephoneNumbers.some((regex) => regex.test(number));

checkBtn.addEventListener("click", () => {
  if (userInput.value === "") {
    alert("Please provide a phone number");
    return;
  }
  displayResult.textContent = isTrueNumber(userInput.value) ? `Valid US number: ${userNumber.value}` : `Invalid US number: ${userNumber.value}`;
  userInput.value = "";
});

//clear Button functionality
  clearBtn.addEventListener("click", () => {
    userInput.value = "";
    displayResult.innerHTML = "";
  });


const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const displayResult = document.getElementById('results-div');

//const firstNumber = /1 555-555-5555/;
const firstNumber = /^1 \d{3}-\d{3}-\d{4}$/;
const secondNumber = /^1 \(\d{3}\) \d{3}-\d{4}$/;
const thirdNumber = /^\d{10}$/;
const fourthNumber = /^\(\d{3}\)-\d{3}-\d{3}$/; // New regex for the fourth number format
const fifthNumber = /^\(\d{3}\)\d{3}-\d{4}$/;
const sixthNumber = /1 \d{3} \d{3} \d{4}$/;
const seventhNumber = /^\d{3}-\d{3}-\d{4}$/;
const eigthNumber = /^1\(\d{3}\)\d{3}-\d{4}$/;

const telephoneNumbers = [firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber, sixthNumber, seventhNumber, eigthNumber];

const isTrueNumber = (number) => {
  // Iterate through each regex and return true if any matches
  for (const regex of telephoneNumbers) {
    if (regex.test(number)) {
      return true;
    }
  }
  return false; // If no regex matches, return false
};

//const isTrueNumber = (number) => telephoneNumbers.some((regex) => regex.test
//(number));

checkBtn.addEventListener("click", () => {
  if (userInput.value === "") {
    alert("Please provide a phone number");
    return;
  }
  displayResult.textContent = isTrueNumber(userInput.value) ? 
    `Valid US number: ${userInput.value}` : 
    `Invalid US number: ${userInput.value}`;
  userInput.value = "";
});

//clear Button functionality
  clearBtn.addEventListener("click", () => {
    userInput.value = "";
    displayResult.innerHTML = "";
  });


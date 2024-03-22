const telephoneNumber = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const displayResult = document.getElementById('results-div');

const validateTelephoneNumber = input => {
  if (input === ""){
    alert("Please provide a phone number");
    return;
  }
} 

checkBtn.addEventListener("click", () => {
  validateTelephoneNumber(telephoneNumber.value);
  telephoneNumber.value = "";
});

//clear Button functionality
  clearBtn.addEventListener("click", () => {
    telephoneNumber.value = "";
    displayResult.innerHTML = "";
  });

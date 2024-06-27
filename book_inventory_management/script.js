const submitBtn = document.getElementById("submit-btn");
const resultsDiv = document.getElementById("results-div");

const books = [
  {
    name: "The maze",
    author: "Eugene Ambagwa",
    ISBN: 1100,
    price: "$1547",
    year: 2024,
    "stock number": 1,
  },
  {
    name: "Life's out",
    author: "Lee Dixon",
    ISBN: 1101,
    price: "$547",
    year: 1976,
    "stock number": 2,
  },
  {
    name: "Kigogo",
    author: "Pauline Kea",
    ISBN: 1102,
    price: "$147",
    year: 2018,
    "stock number": 3,
  },
];

submitBtn.addEventListener("click", () => {
  const bookToSearch = document.getElementById("input").value.trim();

  if (!bookToSearch) {
    alert("Please enter a title or an author's name");
  }

  const bookDetails = ifBookIsAvailable(bookToSearch);

  if (bookDetails) {
    resultsDiv.innerHTML += `
        <p>Name: ${bookDetails.name}</p>
        <p>Author: ${bookDetails.author}</p>
        <p>ISBN: ${bookDetails.ISBN}</p>
        <p>Price: ${bookDetails.price}</p>
        <p>Year: ${bookDetails.year}</p>
        <p>Stock Number: ${bookDetails["stock number"]}</p>
    `;
  }
});

const ifBookIsAvailable = (input) => {
  return books.find(
    (book) =>
      book.name.toLowerCase() === input.toLowerCase() ||
      book.author.toLowerCase() === input.toLowerCase()
  );
};

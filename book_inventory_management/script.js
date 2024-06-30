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
    return;
  }

  //load book details into html
  const bookDetails = ifBookIsAvailable(bookToSearch);

  if (bookDetails) {
    resultsDiv.innerHTML = `
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Price</th>
                <th>Year</th>
                <th>Stock Number</th>
                <th>Button</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${bookDetails.name}</td>
                    <td>${bookDetails.author}</td>
                    <td>${bookDetails.ISBN}</td>
                    <td>${bookDetails.price}</td>
                    <td>${bookDetails.year}</td>
                    <td>${bookDetails["stock number"]}</td>
                    <td>
                        <button class="add-to-storage" id="add-to-storage">
                            Add to Storage
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;

    //Add to storage button functionality
    const addToStorageBtn = document.getElementById("add-to-storage");
    addToStorageBtn.addEventListener("click", () => {
      //check if book already exists
      const bookExists = checkIfBookExistsInLocalStorage(bookToSearch);

      if (bookExists) {
        alert("The book already exists in Storage");
      } else {
        const storageKey = createBookKey(bookDetails.name, bookDetails.author);
        const existingBook = localStorage.getItem(storageKey);
        if (!existingBook) {
          localStorage.setItem(storageKey, JSON.stringify(bookDetails));
          alert("Book added to storage!");
        } else {
          alert("This book already exists in storage!");
        }
      }
    });
  } else {
    resultsDiv.innerHTML = "";
    alert("Book not found");
    collectBookDetails();
  }
});

const ifBookIsAvailable = (input) => {
  return books.find(
    (book) =>
      book.name.toLowerCase() === input.toLowerCase() ||
      book.author.toLowerCase() === input.toLowerCase()
  );
};

const checkIfBookExistsInLocalStorage = (bookTitle) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const book = JSON.parse(localStorage.getItem(key));
    if (
      book.name.toLowerCase() === bookTitle.toLowerCase() ||
      book.author.toLowerCase() === bookTitle.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
};

//Function to create a unique key for storing book details on both title and author
const createBookKey = (bookTitle, bookAuthor) => {
  return `${bookTitle}-${bookAuthor}`;
};

const collectBookDetails = () => {
  resultsDiv.innerHTML = `
    <form style="width: 600px; margin: auto;">
        <fieldset style="padding: 10px;">
            <legend>Please provide your book details</legend>
            <div style="margin-bottom: 5px;">
                <label for="bookname" style="width: 100px; display: inline-block;">Book name:</label>
                <input type="text" id="bookName" name="bookname" style="width: 400px;">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="author" style="width: 100px; display: inline-block;">Author:</label>
                <input type="text" id="author" name="author" style="width: 400px;">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="isbn" style="width: 100px; display: inline-block;">ISBN:</label>
                <input type="number" id="isbn" name="isbn" style="width: 400px;">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="price" style="width: 100px; display: inline-block;">Price:</label>
                <input type="text" id="price" name="price" style="width: 400px;">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="year" style="width: 100px; display: inline-block;">Year:</label>
                <input type="text" id="year" name="year" style="width: 400px;">
            </div>
            <button id="add-btn" type="button" style="margin-top: 10px;">Add to Inventory</button>
        </fieldset>
    </form>
    `;

    const textInputs  = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
      input.style.padding = "5px";
    });
};


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

//Add books to localStorage
const addLibraryBooksToLocalStorage = () => {
  for ( const book of books) {
    const storageKey = createBookKey(book.name, book.author);
    localStorage.setItem(storageKey, JSON.stringify(book));
  }
};

window.onload = () => {
  addLibraryBooksToLocalStorage();
}

localStorage.removeItem("libraryBooks");

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
      <div class="html-construct">
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
        <button id="display-storage-btn" class="display-storage-btn" type="button" style="margin-top: 15px;">Display Inventory </button>
      </div>
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

  //displayInventoryButton functionality
  const displayInventoryBtn = document.getElementById("display-storage-btn");
  displayInventoryBtn.addEventListener("click", () => {
    resultsDiv.innerHTML = "";
    const allStoredData = getLocalStorage();
    displayLocalStorage(allStoredData);
  });
});

const ifBookIsAvailable = (input) => {
  //check if book exists both in library or localStorage
  const ifBookFromList = books.find(
    (book) =>
      book.name.toLowerCase() === input.toLowerCase() ||
      book.author.toLowerCase() === input.toLowerCase()
  );
  if (ifBookFromList) {
    return ifBookFromList;
  }

  //check in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const book = JSON.parse(localStorage.getItem(key));
    if (
      book.name.toLowerCase() === input.toLowerCase() ||
      book.author.toLowerCase() === input.toLowerCase()
    ) {
      return book;
    }
  }

  return null;
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
    <form style="width: 600px; margin: auto;" id="book-form">
        <fieldset style="padding: 10px;">
            <legend>Please provide your book details</legend>
            <div style="margin-bottom: 5px;">
                <label for="bookName" style="width: 100px; display: inline-block;">Book name:</label>
                <input type="text" id="bookName" name="name" required minlength="3" style="width: 400px;" placeholder="The Maze">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="author" style="width: 100px; display: inline-block;">Author:</label>
                <input type="text" id="author" name="author" required minlength="3" style="width: 400px;" placeholder="Eugene Ambagwa">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="isbn" style="width: 100px; display: inline-block;">ISBN:</label>
                <input type="number" id="isbn" name="ISBN" pattern="[0-9]{13}" style="width: 400px;" placeholder="0001">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="price" style="width: 100px; display: inline-block;">Price:</label>
                <input type="text" id="price" name="price" required pattern="^\$\d+(\.\d{2})?$" style="width: 400px;" placeholder="$10">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="year" style="width: 100px; display: inline-block;">Year:</label>
                <input type="text" id="year" name="year" min="1000" max="2020" style="width: 400px;" placeholder="> 1000 - < 2024">
            </div>
            <button id="add-btn" type="button" style="margin-top: 10px;">Add to Library</button>
            <button id="display-storage-btn" class="display-storage-btn" type="button" style="margin-top: 15px;">Display Inventory </button>
        </fieldset>
    </form>
    `;

  const textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach((input) => {
    input.style.padding = "5px";
  });

  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach((input) => {
    input.style.padding = "5px";
  });

  //flag to track alert
  let bookAddedToLibraryAlertShown = false;

  const bookForm = document.getElementById("book-form");
  const addToBooksObjectBtn = document.getElementById("add-btn");
  addToBooksObjectBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("Please correct the book's details");
      return;
    }

    //Collect form data
    const formData = new FormData(bookForm);

    //Get the last stock number
    let lastStockNumber = parseInt(books[books.length - 1]["stock number"], 10);

    //Create a new book object
    const newBook = {
      name: formData.get("name"),
      author: formData.get("author"),
      ISBN: formData.get("ISBN"),
      price: formData.get("price"),
      year: formData.get("year"),
      "stock number": lastStockNumber + 1,
    };

    books.push(newBook);

    if (!bookAddedToLibraryAlertShown) {
      alert("Book added to library");
      bookAddedToLibraryAlertShown = true;
    }

    addToBooksObjectBtn.innerText = "Add to Inventory";

    addToBooksObjectBtn.addEventListener("click", () => {
      const storageKey = createBookKey(newBook.name, newBook.author);
      localStorage.setItem(storageKey, JSON.stringify(newBook));
      alert("Book added to Inventory!");

      //Clear form inputs
      const inputs = bookForm.querySelectorAll('input[type="text"]');
      inputs.forEach((input) => (input.value = ""));
      bookForm.getElementById("ISBN").value = "";
    });
  });
};

//Validate form inputs
const validateForm = () => {
  let isValid = true;

  const bookNameInput = document.getElementById("bookName");
  const authorInput = document.getElementById("author");
  const isbnInput = document.getElementById("isbn");
  const priceInput = document.getElementById("price");
  const yearInput = document.getElementById("year");

  if (
    bookNameInput.value.trim().length < 3 ||
    bookNameInput.value.trim() === ""
  ) {
    bookNameInput.style.border = "2px solid red";
    isValid = false;
  } else {
    bookNameInput.style.border = "";
  }

  if (authorInput.value.trim().length < 3 || authorInput.value.trim() === "") {
    authorInput.style.border = "2px solid red";
    isValid = false;
  } else {
    authorInput.style.border = "";
  }

  if (!isbnInput.value.match(/^\d{1,13}$/) || isbnInput.value === "") {
    isbnInput.style.border = "2px solid red";
    isValid = false;
  } else {
    isbnInput.style.border = "";
  }

  if (!priceInput.value.match(/^\$\d+(\.\d{2})?$/) || priceInput.value === "") {
    priceInput.style.border = "2px solid red";
    isValid = false;
  } else {
    priceInput.style.border = "";
  }

  const year = parseInt(yearInput.value, 10);
  if (isNaN(year) || year < 1000 || year > 2024 || year === "") {
    yearInput.style.border = "2px solid red";
    isValid = false;
  } else {
    yearInput.style.border = "";
  }

  return isValid;
};

const getLocalStorage = () => {
  const allData = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    //parse the JSON value back to the object if necessary
    try {
      allData[key] = JSON.parse(value);
    } catch (error) {
      //stote the value as a string in case the value is not in JSON format
      allData[key] = value;
    }
  }
  return allData;
};

const displayLocalStorage = (dataObject) => {
  //Sort the books in a descending value
  const sortedBooks = Object.values(dataObject).sort((a, b) => b.year - a.year);

  let tableHTML = `
    <div class="html-construct">
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
        <thead>
        <tbody>
  `;

  for (const book of sortedBooks) {
    tableHTML += `
      <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.ISBN}</td>
        <td>${book.price}</td>
        <td>${book.year}</td>
        <td>${book["stock number"] || "N/A"}</td>
        <td>
          <button class="delete-book" id="delete-book-${book.ISBN}">
             Delete book
          </button>
        </td>
      </tr>
    `;
  }

  tableHTML += `
          </tbody>
        </table>
        <button class="hide-inventory" id="hide-inventory">Hide Inventory</button>
        <button class="delete-inventory" id="delete-inventory">Delete entire inventory</button>
      </div>
  `;

  resultsDiv.innerHTML = tableHTML;

  document.querySelectorAll(".delete-book").forEach((button) => {
    button.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this book?")) {
        const bookISBN = button.id.replace("delete-book-", "");
        deleteBookFromLocalStorage(bookISBN);
        alert("Book has been deleted from localStorage");
        button.parentElement.parentElement.remove();
      }
    });
  });

  const hideInventoryBtn = document.getElementById("hide-inventory");
  hideInventoryBtn.addEventListener("click", () => {
    resultsDiv.innerHTML = "";
    hideInventoryBtn.textContent = "";
  });

  const deleteInventoryBtn = document.getElementById("delete-inventory");
  deleteInventoryBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all data from inventory")) {
      localStorage.clear();
      resultsDiv.innerHTML = "";
      alert("All data cleared from localStorage!?");
    }
  });
};

const deleteBookFromLocalStorage = (ISBN) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const book = JSON.parse(localStorage.getItem(key));
    if (book.ISBN.toString() === ISBN) {
      localStorage.removeItem(key);
      break;
    }
  }
};

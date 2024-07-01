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
    alert("LOVE");
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
                <label for="name" style="width: 100px; display: inline-block;">Book name:</label>
                <input type="text" id="bookName" name="name" style="width: 400px;">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="author" style="width: 100px; display: inline-block;">Author:</label>
                <input type="text" id="author" name="author" style="width: 400px;">
            </div>
            <div style="margin-bottom: 5px;">
                <label for="ISBN" style="width: 100px; display: inline-block;">ISBN:</label>
                <input type="number" id="isbn" name="ISBN" style="width: 400px;">
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

  const textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach((input) => {
    input.style.padding = "5px";
  });

  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach((input) => {
    input.style.padding = "5px";
  });

  const bookForm = document.getElementById("book-form");
  const addToBooksObjectBtn = document.getElementById("add-btn");
  addToBooksObjectBtn.addEventListener("click", (event) => {
    event.preventDefault();

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

    alert("Book added to library");

    addToBooksObjectBtn.innerText = "Add to Storage";

    addToBooksObjectBtn.addEventListener("click", () => {
      const storageKey = createBookKey(newBook.name, newBook.author);
      localStorage.setItem(storageKey, JSON.stringify(newBook));
      alert("Book added to storage!");

      //Clear form inputs
      const inputs = bookForm.querySelectorAll('input[type="text"]');
      inputs.forEach((input) => (input.value = ""));
      document.getElementById("ISBN");
    });
  });
};

//const

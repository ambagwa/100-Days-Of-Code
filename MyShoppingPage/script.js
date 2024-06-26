const cartContainer = document.getElementById("cart-container");
const cartButton = document.getElementById("cart-btn");
const showHideCart = document.getElementById("show-hide-cart");
const shoesCards = document.getElementById("shoes-card-container");
const productsContainer = document.getElementById("products-container");
const clearCartButton = document.getElementById("clear-cart-btn");
const totalItems = document.getElementById("total-items");
const subTotal = document.getElementById("subtotal");
const vat = document.getElementById("vat");
const total = document.getElementById("total");
let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "AF 1",
    price: 15.99,
    category: "Nike",
    image: "images/image1.jpg",
  },
  {
    id: 2,
    name: "SB dunks",
    price: 25.99,
    category: "Nike",
    image: "images/image2.jpg",
  },
  {
    id: 3,
    name: "Yeezy",
    price: 35.99,
    category: "Adidas",
    image: "images/image3.jpg",
  },
  {
    id: 4,
    name: "Converse",
    price: 7.99,
    category: "Vans",
    image: "images/image4.jpg",
  },
  {
    id: 5,
    name: "Low riders",
    price: 37.99,
    category: "Puma",
    image: "images/image5.jpg",
  },
  {
    id: 6,
    name: "Ngoma",
    price: 9.29,
    category: "Bata",
    image: "images/image6.jpg",
  },
  {
    id: 7,
    name: "Tops",
    price: 19.91,
    category: "New Balance",
    image: "images/image7.jpg",
  },
  {
    id: 8,
    name: "J1s",
    price: 44.98,
    category: "Nike",
    image: "images/image8.jpg",
  },
  {
    id: 9,
    name: "Flip flops",
    price: 2.79,
    category: "Umoja",
    image: "images/image9.jpg",
  },
  {
    id: 10,
    name: "Okala",
    price: 4.99,
    category: "Rubbers",
    image: "images/image10.jpg",
  },
];

//Function to preload images
const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );
};

//Hold the image urls in an array
const imageUrls = products.map((product) => product.image);

//Preload images before adding them to the HTML page
preloadImages(imageUrls)
  .then(() => {
    //All images preloaded, add them to the HTML
    products.forEach(
      //Destructure the properties of an object to be the parameter of the
      //callback function
      ({ name, id, price, category, image }) => {
        //Display each product onto the html page
        shoesCards.innerHTML += `
                <div class="shoe-card">
                    <img src="${image}" alt={name} class="shoe-image">
                    <h2>${name}</h2>
                    <p class="shoe-price">$${price}</p>
                    <p class="shoe-category">Category: ${category}</p>
                    <button id="${id}" class="btn add-to-cart-btn">
                        Add to cart
                    </button>
                </div>
            `;
      }
    );

    //Add event listeners to the newly added buttons
    const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
    [...addToCartBtns].forEach((btn) => {
      btn.addEventListener("click", (event) => {
        cart1.addItem(Number(event.target.id), products);
        totalItems.textContent = cart1.getCounts();
        cart1.calculateTotal();
      });
    });
  })
  .catch((error) => {
    console.error("Error preloading messages: ", error);
  });

//create an object that will be used to store prperties and methods of the shopping cart
class ShoppingCart {
  //creat a constructor to instantiate properties of the object
  constructor() {
    this.items = []; //Store the products objects
    this.total = 0;
    this.vatRate = 16;
  }

  //Method for adding items to the cart
  addItem(id, products) {
    //Find the product the user is adding to the cart
    const product = products.find((item) => item.id === id);
    //get the name and price keys from the returned product thru destructuring
    const { name, price } = product;
    //push the product to the items array with name and price properties
    this.items.push(product);

    //Keeps track of how many times a product appears in the cart
    const totalCountPerProduct = {};
    //Iterate over each item in the array and update the totalCountPerProduct
    //to keep track of the no of times an object has been added to the cart
    //Each item represents a product that has been added to the cart
    this.items.forEach((shoe) => {
      totalCountPerProduct[shoe.id] = (totalCountPerProduct[shoe.id] || 0) + 1;
    });
    //update the display with the newly addded product
    const currentProductCount = totalCountPerProduct[product.id];
    //Query this new product into HTML
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${id}`
    );
    //This method needs to change regardless of whether the product is in the
    //cart or not
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : //Add new html to the products container
        (productsContainer.innerHTML += `
                <div class="product" id="shoe${id}">
                    <p>
                        <span class="product-count" id="product-count-for-id${id}">
                        </span>${name}
                    </p>
                    <p>${price}</p>
                </div>
            `);
  }

  //Method to access the total number of products in the cart
  getCounts() {
    return this.items.length;
  }

  //clear the cart
  clearCart() {
    if (!this.items.length) {
      alert("Your cart is already empty");
      return;
    }

    const isCartCleared = confirm("Are you sure you want to clear the cart?");

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalItems.textContent = 0;
      subTotal.textContent = 0;
      vat.textContent = 0;
      total.textContent = 0;
    }
  }

  //calculate vat
  calculateVat(amount) {
    return parseFloat(((this.vatRate / 100) * amount).toFixed(2));
  }

  //calculate the total amount
  calculateTotal() {
    const subTotalAmount = this.items.reduce(
      (total, item) => total + item.price,
      0
    );
    const tax = this.calculateVat(subTotalAmount);
    this.total = subTotalAmount + tax;
    subTotal.textContent = `${subTotalAmount.toFixed(2)}`;
    vat.textContent = `${tax.toFixed(2)}`;
    total.textContent = `${this.total.toFixed(2)}`;
    return this.total;
  }
}

//create a new ShoppingCart object
const cart1 = new ShoppingCart();

/*
//Get all the add-to-cart-btn buttons that I added when I was creating each product
//on the page
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
//Iterate through each button after converting the buttons into an array
[...addToCartBtns].forEach(
    btn => {
        btn.addEventListener("click", event => {
            cart1.addItem(Number(event.target.id), products);
            totalItems.textContent = cart1.getCounts();
            cart1.calculateTotal();
        });
    }
);
*/

//Make the cart visible
cartButton.addEventListener("click", () => {
  //make the isCartShowing button true
  isCartShowing = !isCartShowing;
  showHideCart.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartButton.addEventListener("click", cart1.clearCart.bind(cart1));

const pay = () => {
  var url = "https://tinypesa.com/api/v1/express/initialize";

  fetch(url, {
    body: "amount=1&msisdn=0713518279&account_no=200",
    headers: {
      Apikey: "Me3s8tLM8vW",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
};

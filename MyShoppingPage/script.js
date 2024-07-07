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
    console.error("Error preloading images: ", error);
  });

//create an class that will be used to store prperties and methods of the shopping cart
class ShoppingCart {
  //create a constructor to instantiate properties of the object
  constructor() {
    this.items = {}; //Store the products objects
    this.total = 0;
    this.vatRate = 16;
    //this.removeItemEventListener = this.removeItemEventListener.bind(this);
  }

  //Method for adding items to the cart
  addItem(id, products) {
    //Find the product the user is adding to the cart
    const product = products.find((item) => item.id === id);

    if (!this.items[id]) {
      this.items[id] = { ...product, quantity: 1 };
    } else {
      this.items[id].quantity += 1;
    }

    this.updateCartDisplay();
  }

  //Method to update the cart's display
  updateCartDisplay() {
    productsContainer.innerHTML = "";

    for (const id in this.items) {
      const item = this.items[id];
      productsContainer.innerHTML += `
        <div class="product" id="shoe-${id}">
          <p>
            <span class="product-count" id="product-count-for-id${id}">
              ${item.quantity}x
            </span>
            ${item.name}
          </p>
          <p>${item.price}</p>
          <button class="increase-quantity" data-id="${id}">+</button>
          <span class="quantity" id="quantity-${id}">${item.quantity}</span>
          <button class="decrease-quantity" data-id="${id}">-</button><br>
          <button class="clear-item-from-cart" id="clear-item-from-cart-${id}">
            Remove
          </button>
        </div>
      `;

      totalItems.textContent = this.getCounts();
      this.calculateTotal();
      this.updateEventListeners();
    }
  }

  //Method for updating event listeners fo rquantity and remove buttons
  updateEventListeners() {
    const increaseButtons = document.querySelectorAll(".increase-quantity");
    const decreaseButtons = document.querySelectorAll(".decrease-quantity");
    const removeButtons = document.querySelectorAll(".clear-item-from-cart");

    increaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = parseInt(event.target.dataset.id);
        this.increaseQuantity(id);
      });
    });

    decreaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = parseInt(event.target.dataset.id);
        this.decreaseQuantity(id);
      });
    });

    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = parseInt(event.target.id.split("-").pop());
        this.removeItem(id);
      });
    });
  }

  //Method to increase the quantity of an item inside the cart
  increaseQuantity(id) {
    if (this.items[id]) {
      this.items[id].quantity += 1;
      this.updateCartDisplay();
    }
  }

  //Decrease quantity functionality through this method
  decreaseQuantity(id) {
    if (this.items[id] && this.items[id].quantity > 1) {
      this.items[id].quantity -= 1;
      this.updateCartDisplay();
    } else if (this.items[id] && this.items[id].quantity === 1) {
      delete this.items[id];
      this.updateCartDisplay();
    }

    // Update the display when the cart becomes empty
    if (Object.keys(this.items).length === 0) {
      productsContainer.innerHTML = "";
      totalItems.textContent = 0;
      subTotal.textContent = 0;
      vat.textContent = 0;
      total.textContent = 0;
    }
  }

  //Method to access the total number of products in the cart
  getCounts() {
    return Object.keys(this.items).length;
  }

  //clear the cart
  clearCart() {
    if (Object.keys(this.items).length === 0) {
      alert("Your cart is already empty");
      return;
    }

    const isCartCleared = confirm("Are you sure you want to clear the cart?");

    if (isCartCleared) {
      this.items = {};
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
    const subtotal = Object.values(this.items).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const tax = this.calculateVat(subtotal);
    this.total = subtotal + tax;
    subTotal.textContent = `${subtotal.toFixed(2)}`;
    vat.textContent = `${tax.toFixed(2)}`;
    total.textContent = `${this.total.toFixed(2)}`;
  }

  //Allow customers to remove items from the cart individually
  removeItem(id) {
    if (this.items[id]) {
      delete this.items[id];
      this.updateCartDisplay();
    }

    // Update totals when the last item is removed
    if (Object.keys(this.items).length === 0) {
      productsContainer.innerHTML = "";
      totalItems.textContent = 0;
      subTotal.textContent = "$0";
      vat.textContent = "$0";
      total.textContent = "$0";
    }
  }
}

//create a new ShoppingCart object
const cart1 = new ShoppingCart();

//Make the cart visible
cartButton.addEventListener("click", () => {
  //make the isCartShowing button true
  isCartShowing = !isCartShowing;
  showHideCart.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartButton.addEventListener("click", () => {
  cart1.clearCart();
});

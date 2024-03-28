const cartContainer = document.getElementById("cart-container");
const cartButton = document.getElementById("cart-btn");
const showHideCart = document.getElementById("show-hide-cart");
const shoesCards = document.getElementById("shoes-card-container");
const shoesContainer = document.getElementById("products-container")
const clearCartButtn = document.getElementById("clear-cart-btn");
const totalItems = document.getElementById("totsl-items");
const subTotal = document.getElementById("subtotal");
const vat = document.getElementById("vat");
const total = document.getElementById("total");
let isCartShowing = false;

const products = [
    {
        id: 1,
        name: "AF 1",
        price: 15.99,
        category: "Nike"
    },
    {
        id: 2,
        name: "SB dunks",
        price: 25.99,
        category: "Nike"
    },
    {
        id: 3,
        name: "Yeezy",
        price: 35.99,
        category: "Adidas"
    },
    {
        id: 4,
        name: "Converse",
        price: 7.99,
        category: "Vans"
    },
    {
        id: 5,
        name: "Low riders",
        price: 37.99,
        category: "Puma"
    },
    {
        id: 6,
        name: "Ngoma",
        price: 9.29,
        category: "Bata"
    },
    {
        id: 7,
        name: "Tops",
        price: 19.91,
        category: "New Balance"
    },
    {
        id: 8,
        name: "J1s",
        price: 44.98,
        category: "Nike"
    },
    {
        id: 9,
        name: "Flip flops",
        price: 2.79,
        category: "Umoja"
    },
    {
        id: 6,
        name: "Okala",
        price: 4.99,
        category: "Rubbers"
    }
];

//Add the products to the html page
products.forEach(
    /*Destructure the properties of an object to be the parameter of the 
    callback function
     */
    ({ name, id, price, category}) => {
        //Display each product onto the html page
        shoesCards.innerHTML += `
            <div class="shoe-card">
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
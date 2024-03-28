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
        category: "Nike",
        image: "images/image1.jpg"
    },
    {
        id: 2,
        name: "SB dunks",
        price: 25.99,
        category: "Nike",
        image: "images/image2.jpg"
    },
    {
        id: 3,
        name: "Yeezy",
        price: 35.99,
        category: "Adidas",
        image: "images/image3.jpg"
    },
    {
        id: 4,
        name: "Converse",
        price: 7.99,
        category: "Vans",
        image: "images/image4.jpg"
    },
    {
        id: 5,
        name: "Low riders",
        price: 37.99,
        category: "Puma",
        image: "images/image5.jpg"
    },
    {
        id: 6,
        name: "Ngoma",
        price: 9.29,
        category: "Bata",
        image: "images/image6.jpg"
    },
    {
        id: 7,
        name: "Tops",
        price: 19.91,
        category: "New Balance",
        image: "images/image7.jpg"
    },
    {
        id: 8,
        name: "J1s",
        price: 44.98,
        category: "Nike",
        image: "images/image8.jpg"
    },
    {
        id: 9,
        name: "Flip flops",
        price: 2.79,
        category: "Umoja",
        image: "images/image9.jpg"
    },
    {
        id: 10,
        name: "Okala",
        price: 4.99,
        category: "Rubbers",
        image: "images/image10.jpg"
    }
];

/*
For the images to load at the same time, I put them in objects so that they 
can preload before adding them to DOM. This way the browser starts loading 
them in the background before being added to the HTML page.
*/
//function to preload the images 
const preloadImages = images => {
    return new Promise ((resolve, reject) => {
        let count = 0;
        images.forEach(image => {
            const img = new Image();
            img.onload = () => {
                count++;
                if (count === images.length){
                    resolve();
                }
            };
            img.onerror = error => reject(error);
            img.src = image;
        });
    });
};

//Hold the image urls in an array
const imageUrls = products.map(product => product.image);

//preload images before adding them to the HTML page
preloadImages(imageUrls).then(() => {
    //All images are preloaded, add them to html
    products.forEach(({name, id, price, category, image}) => {
        //display each product on the html page
        shoesCards.innerHTML += `
            <div class="shoe-card">
                <img src="${image}" alt=${name} class="shoe-image">
                <h2>${name}</h2>
                <p class="shoe-price">$${price}</p>
                <p class="shoe-category">Category: ${category}</p>
                <button id="${id}" class="btn add-to-cart-btn">
                    Add to cart
                </button>
            </div>
        `;
    });
}).catch(error => {
    console.error("Error preloading images: ", error);
});


/*
products.forEach(
    //Destructure the properties of an object to be the parameter of the 
    //callback function
    ({ name, id, price, category, image}) => {
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
*/
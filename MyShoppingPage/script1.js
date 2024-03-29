const cartContainer = document.getElementById("cart-container");
const cartButton = document.getElementById("cart-btn");
const showHideCart = document.getElementById("show-hide-cart");
const shoesCards = document.getElementById("shoes-card-container");
const productsContainer = document.getElementById("products-container");
const clearCartButtn = document.getElementById("clear-cart-btn");
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

const imageUrls = products.map(product => product.image);

preloadImages(imageUrls).then(() => {
    products.forEach(({name, id, price, category, image}) => {
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

class ShoppingCart {
    constructor(){
        this.items = [];
        this.total = 0;
        this.vatRate = 16;
    }

    addItem(id, products){
        const product = products.find(item => item.id === id);
        const {name, price} = product;
        this.items.push(product);

        const totalCountPerProduct = {};
        this.items.forEach(shoe => {
            totalCountPerProduct[shoe.id] = 
                (totalCountPerProduct[shoe.id] || 0) + 1;
        });
        
        const currentProductCount = totalCountPerProduct[product.id];
        const currentProductCountSpan = 
            document.getElementById(`product-count-for-id${id}`);
        
        currentProductCount > 1 ? 
            currentProductCountSpan.textContent = `${currentProductCount}x` : 
            productsContainer.innerHTML += `
                <div class="product" id="shoe${id}">
                    <p>
                        <span class="product-count" id="product-count-for-id${id}">
                        </span>${name}
                    </p>
                    <p>${price}</p>
                </div>
            `;
    }

    getCounts(){
        return this.items.length;
    }
}

const cart1 = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(btn => {
    btn.addEventListener("click", event => {
        cart1.addItem(Number(event.target.id), products);
        totalItems.textContent = cart1.getCounts();
    })
});

cartButton.addEventListener("click", () => {
    isCartShowing = !isCartShowing;
    showHideCart.textContent = isCartShowing ? "Hide" : "Show";
    cartContainer.style.display = isCartShowing ? "block" : "none";
});

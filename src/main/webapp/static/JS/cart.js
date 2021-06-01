init()
let cart = new Map();

function init() {
    let addToCartButtons = document.getElementsByClassName("add-to-cart-button");
    for (const addToCartButton of addToCartButtons) {
        addToCartButton.addEventListener("click",e => {addToCart(e)})
    }
}

function addToCart(e) {
    let productID = e.target.dataset.indexNumber;
    if (cart.has(productID)) {
        cart.set(productID, cart.get(productID) + 1)
    } else {
        cart.set(productID, 1)
    }
    console.log(cart);
}
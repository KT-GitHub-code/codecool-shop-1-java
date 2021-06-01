init()

function init() {
    let addToCartButtons = document.getElementsByClassName("add-to-cart-button");
    for (const addToCartButton of addToCartButtons) {
        addToCartButton.addEventListener("click",e => {addToCart(e)})
    }
}

function addToCart(e) {
    let productID = e.target.dataset.indexNumber;
    let data = {'productID': productID}

fetch("http://localhost:8080/cart", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {if(response.status===200){refreshCart()}});
}

function refreshCart(){
    console.log("Refreshing cart");
}
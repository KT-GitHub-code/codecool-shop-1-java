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

fetch("/cart", {   // /cart is enough, hardcoding localhost can lead to CORS problems
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
    fetch("/cart", {
                method: 'GET',
                credentials: 'same-origin'
            })
                .then(response => response.json())
                .then(json_response => console.log(json_response));
    console.log("Refreshing cart");
}
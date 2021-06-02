init()

let cartOpen = false;

function init() {
    let addToCartButtons = document.getElementsByClassName("add-to-cart-button");
    for (const addToCartButton of addToCartButtons) {
        addToCartButton.addEventListener("click", e => {
            addToCart(e)
        })
    }
    let cartToggleButton = document.getElementById("toggle-cart-button");
    cartToggleButton.addEventListener("click", toggleCart)
    refreshCart();

}

function toggleCart() {

    cartOpen = !cartOpen;
    let cart = document.getElementById("cart");
    cart.classList.toggle("cart-open");
    if (cart.classList.contains("cart-open")) {
        cart.style.display = "block";
    } else
        cart.style.display = "none";
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
        .then(response => {
            if (response.status === 200) {
                console.log(response)
                refreshCart()
            }
        });
}

function refreshCart() {
    fetch("http://localhost:8080/cart", {
        method: 'GET',
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(json_response => {
            console.log(json_response)
            let cart = document.getElementById("cart");

            cart.innerHTML = "<tr>\n" +
                "                        <th>Name</th>\n" +
                "                        <th>Quantity</th>\n" +
                "                        <th>Unit price</th>\n" +
                "                        <th>Subtotal</th>\n" +
                "                    </tr>"

            for (let i = 0; i < json_response.items.length; i++) {
                let domElement = document.createElement("tr");
                console.log(json_response.items[i]);
                let jsonObj = json_response.items[i];

                let nameElement = document.createElement("td");
                let quantityElement = document.createElement("td");
                let priceElement = document.createElement("td");
                let subtotalElement = document.createElement("td");

                nameElement.classList.add("cart-item");
                quantityElement.classList.add("cart-item");
                priceElement.classList.add("cart-item");
                subtotalElement.classList.add("cart-item");


                nameElement.innerText = jsonObj.name;
                quantityElement.innerText = jsonObj.quantity;
                priceElement.innerText = jsonObj.price + jsonObj.currency;
                subtotalElement.innerText = jsonObj.subtotal + jsonObj.currency;

                domElement.appendChild(nameElement);
                domElement.appendChild(quantityElement);
                domElement.appendChild(priceElement);
                domElement.appendChild(subtotalElement);
                cart.appendChild(domElement);
            }


        });
}
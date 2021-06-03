init()


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


    fetch("/cart", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 200) {
                refreshCart()
            }
        });
}

function deleteCartItem(id) {

    let data = {'productID': id}
    fetch("/cart", {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 200) {
                refreshCart()
            }
        });
}

function refreshCart() {
    fetch("/cart", {
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
                "                        <th></th>\n" +
                "                    </tr>"
            let domElement;
            for (let i = 0; i < json_response.items.length; i++) {
                domElement = document.createElement("tr");
                domElement.classList.add('cart-table');
                console.log(json_response.items[i]);
                let jsonObj = json_response.items[i];


                let deleteButton = document.createElement("button");
                let nameElement = document.createElement("td");
                let quantityElement = document.createElement("td");
                let priceElement = document.createElement("td");
                let subtotalElement = document.createElement("td");

                const dButtonClasses = ["cart-item-deletebtn", "btn", "btn-danger"]
                deleteButton.classList.add(...dButtonClasses);
                deleteButton.innerText = "X";
                deleteButton.addEventListener("click",e => {deleteCartItem(jsonObj.id)})


                nameElement.classList.add("cart-item");
                quantityElement.classList.add("cart-item");
                priceElement.classList.add("cart-item");
                subtotalElement.classList.add("cart-item");


                nameElement.innerText = jsonObj.name;
                quantityElement.innerText = jsonObj.quantity;
                priceElement.innerText = jsonObj.price + " " + jsonObj.currency;
                subtotalElement.innerText = jsonObj.subtotal + " " + jsonObj.currency;


                domElement.appendChild(nameElement);
                domElement.appendChild(quantityElement);
                domElement.appendChild(priceElement);
                domElement.appendChild(subtotalElement);
                domElement.appendChild(deleteButton);
                cart.appendChild(domElement);

            }

            let totalRow = document.createElement("tr");
            totalRow.classList.add("total-row");
            let totalTitle = document.createElement("td");
            let total = document.createElement("td");

            totalTitle.innerText = "Total: ";
            totalTitle.classList.add("total-title");
            total.classList.add("total-price");
            total.innerText = json_response.totalPrice + " USD";


            totalRow.appendChild(totalTitle);
            totalRow.appendChild(total);
            cart.appendChild(totalRow);
        });
}
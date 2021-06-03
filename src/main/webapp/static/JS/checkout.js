main()

function main() {
    let checkoutButton = document.getElementById("checkout");
    checkoutButton.addEventListener("click", () => checkout());

}

function checkout() {
    let main = document.getElementById("main");
    let prevMain = main.innerHTML;
    //main.innerHTML = null;
    main.insertAdjacentHTML("beforeend", "" +
        "<div class='checkout'>" +
            "<a href='/' id='back-button'><button class='btn btn-info'>Back</button></a>" +
            "<div class='content'>" +
                "<p>First name</p>" +
                "<input id='first-name'>" +
                "<p>Last name</p>" +
                "<input id='last-name'>" +
                "<p>Email</p>" +
                "<input type='email' id='email'>" +
                "<p>Phone number</p>" +
                "<input type='tel' id='phone-number'>" +
                "<p id='shipping-address'>Shipping Address</p>" +
                "<p>Country</p>" +
                "<input id='country'>" +
                "<p>City</p>" +
                "<input id='city'>" +
                "<p>ZIP Code</p>" +
                "<input id='zip-code'>" +
                "<p>Street</p>" +
                "<input id='street'>" +
                "<div id='checkbox'><input type='checkbox' id='checkbox-input'><p>Same billing address as shipping address</p></div>" +
                "<div id='billing'>" +
                    "<p id='billing-address'>Billing Address</p>" +
                    "<p>Country</p>" +
                    "<input id='billing-country'>" +
                    "<p>City</p>" +
                    "<input id='billing-city'>" +
                    "<p>ZIP Code</p>" +
                    "<input type='text' id='billing-zip-code'>" +
                    "<p>Street</p>" +
                    "<input id='billing-street'>" +
                "</div>" +
            "</div>" +
            "<div class='payment '><button id='pay' class='btn btn-info'>Pay</button></div>" +
        "</div>")

    let checkoutButton = document.getElementById("pay");
    checkoutButton.addEventListener("click", () => getData());

    let checkBox = document.getElementById("checkbox-input");
    checkBox.addEventListener("click", () => toggleAddressDiv());

}

function getData() {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let name = firstName +" "+ lastName;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phone-number").value;
    let country = document.getElementById("country").value;
    let city = document.getElementById("city").value;
    let zipCode = document.getElementById("zip-code").value;
    let street = document.getElementById("street").value;

    let textInputsList = [firstName, lastName, email, country, city, street];

    if (checkZipCode(zipCode) &&
        checkPhoneNumber(phoneNumber) &&
        checkTextInputs(textInputsList)) {
        fetch("http://localhost:8080/checkout", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createJson())
        })
    } else {
        alert("Invalid input!")
    }
    function createJson() {
        let data = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    shippingAddress: {
                        country: country,
                        city: city,
                        zipCode: zipCode,
                        street: street
                    },
                    billingAddress: getBillingAddress(country, city, zipCode, street)
        }
        return data;
    }

}

function checkPhoneNumber(phoneNumber) {
    return !!(phoneNumber.match(/^[0-9]+$/));
}

function checkZipCode(zipCode) {
    return !!(zipCode.match(/^[0-9]+$/) && zipCode.length === 4);
}

function checkTextInputs(textInputsList) {
    for (const textInput of textInputsList) {
        if (textInput.length === 0) return false;
    }
    return true;
}

function getBillingAddress(country, city, zipCode, street) {
    let checkbox = document.getElementById("checkbox-input");
    let billingAddress;

    if (checkbox.checked) {
        // On
        billingAddress = {
            country: country,
            city: city,
            zipCode: zipCode,
            street: street
        }
        return billingAddress;
    } else {
        // Off
        let billingCountry = document.getElementById("billing-country").value;
        let billingCity = document.getElementById("billing-city").value;
        let billingZipCode = document.getElementById("billing-zip-code").value;
        let billingStreet = document.getElementById("billing-street").value;

        billingAddress = {
            country: billingCountry,
            city: billingCity,
            zipCode: billingZipCode,
            street: billingStreet
        }

        let textInputsList = [billingCountry, billingCity, billingStreet];
        if (checkTextInputs(textInputsList) &&
        checkZipCode(billingZipCode)) {
            return billingAddress;
        } else {
            alert("Invalid input!");
        }
    }
}

function toggleAddressDiv() {
    let checkbox = document.getElementById("checkbox-input");
    let billingAddressDiv = document.getElementById("billing");
    if (checkbox.checked) {
        billingAddressDiv.style.display = "none";
    } else {
        billingAddressDiv.style.display = "block";
    }
}

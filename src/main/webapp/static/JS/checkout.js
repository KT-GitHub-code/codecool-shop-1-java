main()

function main() {
    let checkoutButton = document.getElementById("checkout");
    checkoutButton.addEventListener("click", () => checkout());

}

function checkout() {
    let main = document.getElementById("main");
    main.innerHTML = null;
    main.insertAdjacentHTML("beforeend", "" +
        "<div class='checkout'>" +
            "<p>First name</p>" +
            "<input id='first-name'>" +
            "<p>Last name</p>" +
            "<input id='last-name'>" +
            "<p>Email</p>" +
            "<input type='email' id='email'>" +
            "<p>Phone number</p>" +
            "<input type='tel' id='phone-number'>" +
            "<p>Shipping Address</p>" +
            "<p>Country</p>" +
            "<input id='country'>" +
            "<p>City</p>" +
            "<input id='city'>" +
            "<p>ZIP Code</p>" +
            "<input type='text' id='zip-code'>" +
            "<p>Street</p>" +
            "<input id='street'>" +
            "<div id='checkbox'><input type='checkbox' id='checkbox-input'><p>Save this as my shipping address</p></div>" +
            "<button id='checkout-button'>Checkout</button>" +
        "</div>")

    let checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", () => getData());
}

function getData() {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let name = firstName +" "+ lastName;
    let email = document.getElementById("email");
    let phoneNumber = document.getElementById("phone-number");
    let country = document.getElementById("country");
    let city = document.getElementById("city");
    let zipCode = document.getElementById("zip-code");
    let street = document.getElementById("street");

    let checkbox = document.getElementById("checkbox-input");

    if (checkbox.checked) {
        // On
        let billingAddress = {
            country: country,
            city: city,
            zipCode: zipCode,
            street: street
        }
    } else {
        // Off
        let billingCountry = document.getElementById("billing-country");
        let billingCity = document.getElementById("billing-city");
        let billingZipCode = document.getElementById("billing-zip-code");
        let billingStreet = document.getElementById("billing-street");
        let billingAddress = {
            country: billingCountry,
            city: billingCity,
            zipCode: billingZipCode,
            street: billingStreet

        }
    }

    validateData(checkZipCode, checkPhoneNumber, checkTextInputs);

    function createJson() {
        let data = {name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    shippingAddress: {
                        country: country,
                        city: city,
                        zipCode: zipCode,
                        street: street
                    },

        }
    }

    function checkZipCode() {
        return !!(zipCode.value.match(/^[0-9]+$/) && zipCode.value.length === 4);
    }

    function checkPhoneNumber() {
        return !!(phoneNumber.value.match(/^[0-9]+$/));
    }

    function checkTextInputs() {
        return firstName.length !== 0 && lastName.length !== 0
            && email.value.length !== 0 && country.value.length !== 0
            && city.value.length !== 0 && street.value.length !== 0;

    }
}

function validateData(checkZipCode, checkPhoneNumber, checkTextInputs) {
    if (checkZipCode() &&
        checkPhoneNumber() &&
        checkTextInputs()) {
        // validated
        console.log(true);
    } else {
        // invalid
        console.log(false);
    }
}


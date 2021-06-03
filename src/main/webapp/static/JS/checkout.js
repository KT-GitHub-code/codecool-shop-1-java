main()

function main() {
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
        return {
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
        };
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

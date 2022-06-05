
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.log(productLocalStorage);

// Séléction de la classe où je vais injecter le code HTML
let cartItems = document.getElementById("cart__items");
console.log(cartItems);

fetch("http://localhost:3000/api/products")
    .then(function (res) {
        return res.json();
    })
    .then(displayCart)
    .catch(function (err) {
        console.error(err);
    })

function displayCart(products_from_api) {

    // Si le panier est vide: afficher "Le panier est vide"
    if (!productLocalStorage || productLocalStorage == 0) {

        createErrorBasket("Le panier est vide!");
        console.log("Le panier est vide!");
        return

    }
    // si le panier n'est pas vide afficher les produits presents dans le local storage
    console.log("je ne suis pas vide!")

    for (let product of productLocalStorage) {
        let api_product = products_from_api.find(x => x._id == product._id);
        console.log(product)

        cartItems.innerHTML += `

            <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                <div class="cart__item__img">
                    <img src="${api_product.imageUrl}" alt="${api_product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${api_product.name}</h2>
                        <p>${product.color}</p>
                        <p>${api_product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;

        totals(products_from_api);

        deleteProduct(products_from_api);
        modifyQuantity(products_from_api);



    }
}

// Récupération du total des quantités et récupération du prix total

function totals(products_from_api) {

    let total_quantity = 0,
        total_price = 0;

    let cart = JSON.parse(localStorage.getItem("cart"));

    for (let product of cart) {
        let api_product = products_from_api.find(x => x._id == product._id);
        total_quantity += Number(product.quantity);
        total_price += Number(api_product.price) * Number(product.quantity);
    }

    document.querySelector('#totalQuantity').innerHTML = total_quantity;
    console.log(total_quantity)
    document.querySelector('#totalPrice').innerHTML = total_price;

};

// Formulaire
//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function () {
        validAddress(this);
    });

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', function () {
        validCity(this);
    });

    // Ecoute de la modification de l'email
    form.email.addEventListener('change', function () {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner le prenom.';
        }
    };

    //validation du nom
    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner le nom.';
        }
    };
    //validation de l'adresse
    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner l\'adresse.';
        }
    };

    //validation de la ville
    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner la ville.';
        }
    };

    //validation de l'email
    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}
getForm();

function sendOrder() {

    let btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (e) => {
        e.preventDefault();

        if (firstName.value == 0 || lastName.value.length == 0 || address.value == 0 || city.value == 0 || email.value == 0) {

            createErrorForm("Veuillez bien remplir le formulaire!")
            console.log("Veuillez bien remplir le formulaire!")
            return;
        }
       
        let idProducts = productLocalStorage.map(product => product._id);
        console.log(idProducts);
        let order = {
            contact: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value,
            },
            products: idProducts,
        };

        let options = fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        });
        options.then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                location.href = `confirmation.html?orderId=${data.orderId}`;
            })
            .catch((err) => {
                alert("Problème avec fetch : " + err.message);
            });
    })

}

sendOrder()

// Functions
function createErrorForm(msg) {
    let messageInfo = document.createElement("span");
    messageInfo.classList.add("messageInfo");
    document.querySelector(".cart").append(messageInfo);
    messageInfo.innerHTML = msg;
    messageInfo.style.color = "white";
    messageInfo.style.fontSize = "22px"
    messageInfo.style.fontWeight = "bold";
    messageInfo.style.display = "flex";
    messageInfo.style.justifyContent = "center";
}
function createErrorBasket(msg) {
    let messagePanier = document.createElement("span");
    messagePanier.classList.add("messagePanier");
    document.querySelector(".cart").prepend(messagePanier);
    messagePanier.innerHTML = msg
    messagePanier.style.color = "white";
    messagePanier.style.fontSize = "24px"
    messagePanier.style.fontWeight = "bold";
    messagePanier.style.display = "flex";
    messagePanier.style.justifyContent = "center";
}

function deleteProduct(products_from_api) {
    let deleteButton = document.getElementsByClassName("deleteItem");
    for (let button of deleteButton) {
        button.addEventListener("click", function (e) {
            let path = e.path || e.composedPath();
            let article = path.find(x => x.tagName.toLowerCase() == "article");
            let id = article.getAttribute("data-id");
            let color = article.getAttribute("data-color");
            // Remove l'article qui correspond à color & id
            let cart = JSON.parse(localStorage.getItem("cart"));
            for (let i = 0; i < cart.length; i++) {
                if (cart[i]._id == id && cart[i].color == color) {
                    cart.splice(i, 1);
                    i--;
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            article.remove();
            totals(products_from_api)
        });
    }
}

function modifyQuantity(products_from_api) {
    let quantityInput = document.getElementsByClassName("itemQuantity");
    for (let input of quantityInput) {
        input.addEventListener("change", function (e) {
            let path = e.path || e.composedPath();
            let article = path.find(x => x.tagName.toLowerCase() == "article");
            let id = article.getAttribute("data-id");
            let color = article.getAttribute("data-color");
            // Modifier la quantité de l'article qui a pour id id et color color avec e.target.value
            let cart = JSON.parse(localStorage.getItem("cart"));
            for (let i = 0; i < cart.length; i++) {
                if (cart[i]._id == id && cart[i].color == color) {
                    cart[i].quantity = e.target.value;
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            totals(products_from_api)
        });
    }
}




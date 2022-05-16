// 
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.log(productLocalStorage);

// Séléction de la classe où je vais injecter le code HTML
let cartItems = document.getElementById("cart__items");
console.log(cartItems);

function displayCart() {

    // Si le panier est vide: afficher "Le panier est vide"
    if (!productLocalStorage || productLocalStorage == 0) {

        let messagePanier = document.createElement("span");
        messagePanier.classList.add("messagePanier");
        document.querySelector(".cart").prepend(messagePanier);
        messagePanier.innerHTML = "Le panier est vide!";
        messagePanier.style.color = "white";
        messagePanier.style.fontSize = "24px"
        messagePanier.style.fontWeight = "bold";
        messagePanier.style.display = "flex";
        messagePanier.style.justifyContent = "center";
        console.log("Le panier est vide!");

    } else {
        // si le panier n'est pas vide afficher les produits presents dans le local storage
        console.log("je ne suis pas vide!")

        for (let product of productLocalStorage) {

            console.log(product)

            cartItems.innerHTML += `

            <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p>${product.price} €</p>
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
        }

        let deleteButton = document.getElementsByClassName("deleteItem");
        for(let button of deleteButton){
            button.addEventListener("click", function(e){
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
                totals()
            });
        }

        let quantityInput = document.getElementsByClassName("itemQuantity");
        for(let input of quantityInput){
            input.addEventListener("change", function(e){
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
                totals()
            });
        }

    }
}

displayCart();

// Gérer la modification et la suppression de Produits dans la page Panier
// Récupération du total des quantités et récupération du prix total

function totals() {

    let total_quantity = 0,
        total_price = 0;

    let cart = JSON.parse(localStorage.getItem("cart"));

    for (let product of cart) {
        total_quantity += Number(product.quantity);
        total_price += Number(product.price) * Number(product.quantity);
    }

    document.querySelector('#totalQuantity').innerHTML = total_quantity;
    console.log(total_quantity)
    document.querySelector('#totalPrice').innerHTML = total_price;
    console.log(total_price)

}
totals();

// Suppression d'un produit
/*function deleteProduct() {

    let buttonDelete = document.querySelectorAll('.deleteItem');

    for (let button of buttonDelete) {
        button.addEventListener("click", function (e) {
            let article = e.path.find(el => el.tagName.toLowerCase() == "article");
            let product_id = article.getAttribute("data-id");
            let product_color = article.getAttribute("data-color");

            let cart = JSON.parse(localStorage.getItem("cart"));
            for (let i = 0; i < cart.length; i++) {
                if (cart[i]._id == product_id && cart[i].color == product_color) {
                    cart.splice(i, 1);
                    i--;
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart))

        })
    }
};
deleteProduct();*/


// Modification d'une quantité de produit
/*function modifyQuantity() {

    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < qttModif.length; j++) {
        qttModif[j].addEventListener("change", (event) => {
            event.preventDefault();

            //Selection de l'element à modifier 
            let quantityModif = productLocalStorage[j].quantity;
            let qttModifValue = qttModif[j].valueAsNumber;

            if (qttModifValue > 0 && qttModifValue < 100) {
                const resultFind = productLocalStorage.find((el) => el.qttModifValue !== quantityModif);

                resultFind.quantity = qttModifValue;
                productLocalStorage[j].quantity = resultFind.quantity;

                localStorage.setItem("cart", JSON.stringify(productLocalStorage));

                totals()
            } else {

                let messageQuantity = document.createElement("span");
                messageQuantity.classList.add("messageQuantity");
                document.querySelector(".cart__item__content__settings__quantity").append(messageQuantity);
                messageQuantity.innerHTML = "Selectionnéz une quantité comprise entre 1 et 100!";
                messageQuantity.style.color = "white";
                messageQuantity.style.fontSize = "13px"
                console.log("Veuillez selectionner une quantité comprise entre 1 et 100!");
            }
        })
    }
}
modifyQuantity()*/

// Formulaire

//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let NomPrenomVilleRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function () {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function () {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function () {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (NomPrenomVilleRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prenom.';
        }
    };

    //validation du nom
    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (NomPrenomVilleRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
        }
    };

    //validation de l'adresse
    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
        }
    };

    //validation de la ville
    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (NomPrenomVilleRegExp.test(inputCity.value)) {
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

        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        // Récupération des valeurs du formulaire client
        let inputNameValue = inputName.value;
        let inputLastNameValue = inputLastName.value;
        let inputAdressValue = inputAdress.value;
        let inputCityValue = inputCity.value;
        let inputMailValue = inputMail.value;

        if (inputNameValue == 0 || inputLastNameValue == 0 || inputAdressValue == 0 || inputCityValue == 0 || inputMailValue == 0) {
            let messageInfo = document.createElement("span");
            messageInfo.classList.add("messageInfo");
            document.querySelector(".cart").append(messageInfo);
            messageInfo.innerHTML = "Veuillez bien remplir le formulaire!";
            messageInfo.style.color = "white";
            messageInfo.style.fontSize = "22px"
            messageInfo.style.fontWeight = "bold";
            messageInfo.style.display = "flex";
            messageInfo.style.justifyContent = "center";
            console.log("Veuillez bien remplir le formulaire!");

        } else {

            // Construction d'un array depuis le local storage
            let idProducts = [];
            for (let k = 0; k < productLocalStorage.length; k++) {
                idProducts.push(productLocalStorage[k]._id);
            }
            console.log(idProducts);
            let order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: idProducts,
            };

            let options = fetch("http://localhost:3000/api/products/order",{
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
                    localStorage.setItem("orderId", data.orderId);
                    location.href = "confirmation.html";
                })
                .catch((err) => {
                    alert("Problème avec fetch : " + err.message);
                });
        }
    })
}

sendOrder();
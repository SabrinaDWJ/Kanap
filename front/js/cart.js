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

    }
}

displayCart();

// Gérer la modification et la suppression de Produits dans la page Panier
// Récupération du total des quantités et récupération du prix total

function totals() {

    let total_quantity = 0,
        total_price = 0;

    for (let product of productLocalStorage) {
        total_quantity += product.quantity;
        total_price += product.price * product.quantity;
        console.log(total_price)
    }

    document.querySelector('#totalQuantity').innerHTML = total_quantity;
    console.log(total_quantity)
    document.querySelector('#totalPrice').innerHTML = total_price;
    console.log(total_price)

}

totals();

// Suppression d'un produit
function deleteProduct() {

    let buttonDelete = document.querySelectorAll('.deleteItem');
    console.log(buttonDelete)

    for (let i = 0; i < buttonDelete.length; i++) {
        buttonDelete[i].addEventListener("click", () => {
            console.log("ciao");
            let idDelete = productLocalStorage[i]._id;
            console.log(idDelete)
            let colorDelete = productLocalStorage[i].color;
            console.log(colorDelete)

            productLocalStorage = productLocalStorage.filter(el => el._id !== idDelete || el.color !== colorDelete);
            localStorage.setItem("cart", JSON.stringify(productLocalStorage))

            location.reload();
        })
    }
};
deleteProduct();





// Modification d'une quantité de produit
function modifyQuantity() {
    let quantityModify = document.querySelector(".itemQuantity");
    for (let i = 0; i < quantityModify.length; i++) {
        quantityModify.addEventListener("change", () => {
            console.log(quantityModify);
        })

    }

}
modifyQuantity();




/** 
 * FONCTIONNALITE: BOUTON SUPPRIMER
 * 
 * 1) Après avoir ajouter dans le DOM tout les produits du panier, créer un evènement "myButton.addEventListener("click", maFonction)" sur chaque bouton
 * 2) "maFonction" créé dans l'étape 1 devra supprimer du DOM le produit concerné ET le supprimer du local storage
 * 3) Mettre a jour la quantité total & le prix
 * 
*/

/**
 * FONCTIONNALITE: MODIFIER LA QUANTITE
 * 
 * 1) Sur l'input number lié à la quantité, ajouter un evènement "myInput.addEventListener("change", maFonction)" sur chaque input
 * 2) "maFonction" créé dans l'étapé 1 devra mettre à jour la quantité dans le produit concerné ET modifier le local storage
 *      !!! Vérifier que l'utilisateur ne mette pas de valeur en dessous de 0 et au dessus de 100
 * 3) Mettre à jour la quantité total & le prix
 */





//Récupération de l'id dans l'url
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");
console.log(productId);

// Récupération des articles de l'API grace a l'ID. 
fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
        return res.json();
    })
    .then(viewProduct)
    .catch(function (err) {
    })

// Inserer les données de l'API dans le HTML (DOM) grace à la fonction viewProduct.
function viewProduct(product) {

    // Insertion de l'image
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

    // Modification du titre 
    document.querySelector('#title').innerHTML = product.name;

    // Modification du prix
    document.querySelector('#price').innerHTML = product.price;

    // Modification de la description
    document.querySelector('#description').innerHTML = product.description;

    // Options de couleur
    // La variable productColors insere les options de couleurs dans le HTML (DOM)
    for (let colors of product.colors) {
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
}

// Sélection du bouton Ajouter l'article au panier
let button = document.querySelector('#addToCart'),
    colors = document.getElementById("colors"),
    quantity = document.getElementById("quantity");

// Ecouter le bouton et envoyer le panier
button.addEventListener('click', () => {

    //  
    if (!isValid())
        return showErrorMessages();

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart)
        cart = [];

    let productSimilaire = getSimilareProductInCart(productId, colors.value);
    if (productSimilaire == null) {

        cart.push({
            _id: productId,
            color: colors.value,
            quantity: Number(quantity.value)
        })
    } else {
        productSimilaire.quantity += Number(quantity.value);

        for (let product of cart) {
            if (product._id == productSimilaire.id && product.color == productSimilaire.color) {
                   product.quantity = productSimilaire.quantity
            }
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showSuccessMessage();
})

// Functions

function isValid() {
    if (colors.value == "")
        return false;
    if (quantity.value > 100 || quantity.value < 1)
        return false;

    let similare_product = getSimilareProductInCart(productId, colors.value);

    if (similare_product && Number(similare_product.quantity) + Number(quantity.value) > 100) {
        return false
    }
    return true;
}

function getSimilareProductInCart(id, color) {

    let basket = JSON.parse(localStorage.getItem("cart"));
    if (!basket) {
        return null;
    }
    let productFound = null;

    console.log(basket)
    for (let product of basket) {
        if (product._id == id && product.color == color) {
            productFound = product;
        }
    }
    return productFound
}

function showErrorMessages() {

    if (colors.value == "") {
        // Afficher en dessous du select en rouge "Choisissez une couleur svp"
        let errorMessage = document.createElement("span");
        errorMessage.classList.add("cartMessage");
        document.querySelector(".item__content__settings__color").appendChild(errorMessage);
        errorMessage.innerHTML = "Choisissez une couleur svp!";
        errorMessage.style.color = "red";
        console.log("Choisissez une couleur svp");
    }

    if (quantity.value > 100 || quantity.value < 1) {
        // Afficher en dessous de l'input en rouge "Choisissez une quantité entre 1 et 100"
        let errorMessage2 = document.createElement("span");
        errorMessage2.classList.add("cartMessage2");
        document.querySelector(".item__content__settings__quantity").appendChild(errorMessage2);
        errorMessage2.innerHTML = "Choisissez une quantité entre 1 et 100!";
        errorMessage2.style.color = "red";
        console.log("Choisissez une quantité entre 1 et 100");
    }

    let similare_product = getSimilareProductInCart(productId, colors.value);
    if (similare_product && Number(similare_product.quantity) + Number(quantity.value) > 100) {
        alert("Vous avez déjà un article similaire dans votre panier dont le total dépasse 100")
        console.log("Vous avez déjà un article similaire dans votre panier dont le total dépasse 100")
    }
}

function showSuccessMessage() {
    // Afficher en vert "Produit ajouté avec succès !"
    let successMessage = document.createElement("div");
    successMessage.classList.add("successMessage");
    document.querySelector(".item__content__addButton").appendChild(successMessage);
    successMessage.innerHTML = "Produit ajouté avec succès!";
    successMessage.style.color = "green";
    console.log("Produit ajouté avec succès !");
}

























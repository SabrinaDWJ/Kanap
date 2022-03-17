//Récupération de l'id dans l'url
let queryString = window.location.href;
let url = new URL(queryString);
let productId = url.searchParams.get("id");
console.log(productId);

// Récupération des articles de l'API grace a l'ID. 
fetch("http://localhost:3000/api/products/" + productId)
.then(function (res) {
    return res.json();
})
.then(function(value) {
    viewProduct(value);
})
.catch(function(err) {
})

// Inserer les données de l'API dans le HTML (DOM) grace à la fonction viewProduct.
function viewProduct (product) {

    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    // Modification du titre 
    let productName = document.querySelector('#title');
    productName.innerHTML = product.name;

    // Modification du prix
    let productPrice = document.querySelector('#price');
    productPrice.innerHTML = product.price;

    // Modification de la description
    let productDescription = document.querySelector('#description');
    productDescription.innerHTML = product.description;

    // Options de couleur
    // La variable productColors insere les options de couleurs dans le HTML (DOM)

        for (let colors of product.colors){
        let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
    productColors.innerHTML = colors;
    }
};

let str = window.location.href;
let url = new URL(str);
let productId = url.searchParams.get("id");

fetch("http://localhost:3000/api/products/" + productId)
.then(function (response) {
    return response.json();
})
.catch((error) => {
    console.log("Erreur");
})

// Inserer les données de l'API dans le HTML (DOM) grace à la fonction viewProduct.
.then(function (viewProduct) {
    const product = viewProduct;
    console.log(product);

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

    // Options de couleur. la boucle for parcours tous les éléments du key = 'colors'
    // La variable productColors insere les options de couleurs dans le HTML (DOM)

        for (let colors of product.colors){
        console.log(colors);
        let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
    productColors.innerHTML = colors;
    }
});

const  items = document.getElementById("items");

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    displayProducts(value);
  })
  .catch(function(err) {
  })

  function displayProducts(arr){

    items.innerHTML = "";

    for(let i = 0; i < arr.length; i++) {

      items.innerHTML += `
      <a href="./product.html?id=${arr[i]._id}">
            <article>
              <img src="${arr[i].imageUrl}" alt="${arr[i].altTxt}">
              <h3 class="productName">${arr[i].name}</h3>
              <p class="productDescription">${arr[i].description}</p>
            </article>
          </a>
          `;
    }
  };

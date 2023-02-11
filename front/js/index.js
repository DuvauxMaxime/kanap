// Affichage des canapés sur la page index
const displayCanap = async () => {
  const canapes = await getData("http://localhost:3000/api/products/");
  if (canapes === -1) {
    document.location.href = "index.html";
    alert("La page demandée n'existe pas");
  }
  let listCanapes = "";
  canapes.forEach((canape) => {
    listCanapes += `<a href="./product.html?id=${canape._id}">
        <article>
          <img src="${canape.imageUrl}" alt="${canape.altTxt}">
          <h3 class="productName">${canape.name}</h3>
          <p class="productDescription">${canape.description}</p>
        </article>
      </a>`;
  });
  // document.querySelector('#items').innerHTML = listCanapes;
  document.querySelector('#items').insertAdjacentHTML('afterbegin', listCanapes);
}

displayCanap();

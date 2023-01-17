// Fonction pour récupérer la commande du client depuis le localStorage sur la page panier
const getUserOrder = () => {
  const cart = getCart();
  let userOrder = "";
  for (let canape of cart) {
    userOrder += `<article class="cart__item" data-id="${canape.id}" data-color="${canape.colors}">
    <div class="cart__item__img">
      <img src="${canape.imageUrl}" alt="${canape.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${canape.name}</h2 >
        <p>${canape.colors}</p>
        <p>42,00 €</p>
      </div >
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : ${canape.quantities}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.quantities}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div >
  </article > `};
  document.getElementById('cart__items').insertAdjacentHTML('afterbegin', userOrder);
}

getUserOrder();



// Fonction pour voir les modifications de l'input 
const editQuantityFromCart = () => {
  allArticlesFromCart = document.querySelectorAll('.cart__item')

  // Parcours l'ensemble des articles de la page panier
  for (let article of allArticlesFromCart) {
    // Fonction déclenchée lors de la modification de l'input quantité
    article.querySelector('input.itemQuantity').addEventListener("change", () => {
      // Nouvelle quantité de l'article saisie dans l'input
      const articleNewQuantity = Number(article.querySelector('input.itemQuantity').value)
      // Création de l'objet modifié sur le panier
      productEditOnCart = { id: article.dataset.id, colors: article.dataset.color, quantities: Number(articleNewQuantity) };
      // Récupère le panier
      const cart = getCart();
      // Recherche parmis le panier si item présente un id et une couleur identiques 
      const foundItemInCart = cart.find(itemCart => itemCart.id == article.dataset.id && itemCart.colors == article.dataset.color);
      // Vérifie les conditions : pas plus de 100 produits identiques dans le panier
      console.log(foundItemInCart);
      if (foundItemInCart != undefined && quantityChoice(articleNewQuantity) != -1) {
        foundItemInCart.quantities = Number(productEditOnCart.quantities)
      }
      // Sauvegarde le panier dans le local Storage
      saveCart(cart);
      location.reload()
    })
  }
}

editQuantityFromCart();


// Fonction pour supprimer un item depuis le panier 
const deleteArticleFromCart = () => {
  allArticlesFromCart = document.querySelectorAll('.cart__item')
  // Parcours l'ensemble des articles de la page panier
  for (let article of allArticlesFromCart) {
    // Fonction déclenchée lors de la modification de l'input quantité
    article.querySelector('.deleteItem').addEventListener("click", () => {
      // Création de l'objet à supprimer sur le panier
      productDeleteOnCart = { id: article.dataset.id, colors: article.dataset.color };
      console.log(productDeleteOnCart);
      // Récupère le panier
      const cart = getCart();
      // Recherche parmis le panier si item présente un id et une couleur identiques 
      const foundItemInCart = cart.find(itemCart => itemCart.id == article.dataset.id && itemCart.colors == article.dataset.color);
      const indexOfItem = cart.indexOf(foundItemInCart)
      cart.splice(indexOfItem, 1)
      //Sauvegarde le panier dans le local Storage
      saveCart(cart);
      location.reload()
    })
  }

}

deleteArticleFromCart()


// Fonction pour récupérer la quantité total de canapé
const getAllQuantities = () => {
  const cart = getCart();
  let allQuantities = 0;
  for (let canape of cart) {
    allQuantities += canape.quantities
  }
  document.getElementById('totalQuantity').insertAdjacentHTML('afterbegin', allQuantities);
}

getAllQuantities();
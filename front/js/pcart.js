// Fonction pour récupérer la commande du client sur la page panier
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
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div >
  </article > `}
  console.log(userOrder);
  document.getElementById('cart__items').insertAdjacentHTML('afterbegin', userOrder);


}



getUserOrder();

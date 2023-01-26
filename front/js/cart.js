// Récupère la commande du client depuis le localStorage sur la page panier et insère dans le DOM
const displayCart = async () => {
  const cart = getCart();
  if (cart.length === 0 || cart === []) {
    alert("Votre panier est vide !")
    document.location.href = "index.html";
  }
  let userOrder = "";
  for (let canape of cart) {
    const dataProductFromApi = await getData("http://localhost:3000/api/products/" + canape.id);
    userOrder += `<article class="cart__item" data-id="${canape.id}" data-color="${canape.colors}">
    <div class="cart__item__img">
      <img src="${canape.imageUrl}" alt="${canape.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${canape.name}</h2 >
        <p>${canape.colors}</p>
        <p>${dataProductFromApi.price} €</p>
      </div >
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.quantities}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div >
  </article > `
  };
  document.getElementById('cart__items').insertAdjacentHTML('afterbegin', userOrder);
}


// Modifier la quantité depuis le panier 
const editQuantityFromCart = () => {
  const allArticlesFromCart = document.querySelectorAll('.cart__item');
  // Parcours l'ensemble des articles de la page panier
  allArticlesFromCart.forEach((article) => {
    // Déclenché lors de la modification de l'input quantité
    article.querySelector('input.itemQuantity').addEventListener("change", (event) => {
      // Nouvelle quantité de l'article saisie dans l'input
      const articleNewQuantity = Number(event.target.value);
      // Création de l'objet modifié sur le panier
      const productEditOnCart = { id: article.dataset.id, colors: article.dataset.color, quantities: Number(articleNewQuantity) };
      // Récupère le panier
      const cart = getCart();
      // Recherche parmis le panier si item présente un id et une couleur identiques 
      const foundItemInCart = cart.find(itemCart => itemCart.id == article.dataset.id && itemCart.colors == article.dataset.color);
      // Valide la condition quantité = nombre entier entre 1 et 100
      if (foundItemInCart != undefined && quantityChoice(articleNewQuantity) != -1) {
        const item = event.target.closest(`.cart__item__content__settings__quantity`).querySelector('p')
        foundItemInCart.quantities = Number(productEditOnCart.quantities);
      }
      event.target.value = foundItemInCart.quantities
      // Sauvegarde le panier dans le local Storage
      saveCart(cart);
      getTotalQuantitiesAndPrice();

    })
  })
}


// Supprimer un item depuis le panier 
const deleteArticleFromCart = () => {
  const allArticlesFromCart = document.querySelectorAll('.cart__item');
  // Parcours l'ensemble des articles de la page panier
  allArticlesFromCart.forEach((article) => {
    // Déclenché lors du clic sur supprimer
    article.querySelector('.deleteItem').addEventListener("click", (event) => {
      // Récupère le panier
      const cart = getCart();
      // Recherche parmis le panier l'item qui présente un id et une couleur identiques 
      const foundItemInCart = cart.find(itemCart => itemCart.id == article.dataset.id && itemCart.colors == article.dataset.color);
      const indexOfItem = cart.indexOf(foundItemInCart);
      if (indexOfItem != -1) {
        cart.splice(indexOfItem, 1);
        const item = event.target.closest('.cart__item');
        item.remove()
      }
      // Sauvegarde le panier dans le local Storage
      saveCart(cart);
      getTotalQuantitiesAndPrice();
      if (cart.length === 0) {
        alert("Votre panier est vide !")
        document.location.href = "index.html";
      }
    })
  })
}


// Récupère la quantité total des articles et le prix total
const getTotalQuantitiesAndPrice = async () => {
  let totalPrice = 0;
  let totalQuantities = 0;
  const cart = getCart();
  await cart.forEach(async (canape) => {
    const dataProductFromApi = await getData("http://localhost:3000/api/products/" + canape.id);
    const totalPerArticle = canape.quantities * dataProductFromApi.price
    totalPrice += totalPerArticle;
    totalQuantities += canape.quantities;
    document.getElementById('totalQuantity').innerText = totalQuantities;
    document.getElementById('totalPrice').innerText = totalPrice;
  })
}


// Ajout des articles sur la page panier et les fonctions edition/suppression
const loadCart = async () => {
  await displayCart();
  editQuantityFromCart();
  deleteArticleFromCart();
  await getTotalQuantitiesAndPrice();
}


loadCart();


// Vérification des champs du formulaire lors la perte du focus
const checkFormBlur = () => {
  const fieldsForm = document.querySelectorAll('.cart__order__form__question');
  // Contrôle les informations contenues dans les champs du formulaire
  fieldsForm.forEach((input) => {
    const field = input.querySelector('input');
    // Cible l'affichage du msg d'erreur
    const displayMsg = document.getElementById(field.id + 'ErrorMsg');
    document.querySelector('#' + field.id).addEventListener("blur", (event) => {
      if (field.id === 'firstName' || field.id === 'lastName' || field.id === 'city') {
        checkField(event.target.value, displayMsg, regexTypeName);
      }
      if (field.id === 'address') {
        checkField(event.target.value, displayMsg, regexTypeAddress);
      }
      if (field.id === 'email') {
        checkField(event.target.value, displayMsg, regexTypeMail);
      }
    })
  })
}


// Vérification des champs du formulaire 
const checkForm = () => {
  const fieldsForm = document.querySelectorAll('.cart__order__form__question');
  let testReg
  // Récupère les informations contenues dans les champs du formulaire
  fieldsForm.forEach((input) => {
    let field = input.querySelector('input');
    // Cible l'affichage du msg d'erreur
    const displayMsg = document.getElementById(field.id + 'ErrorMsg');
    if (field.id === 'firstName' || field.id === 'lastName' || field.id === 'city') {
      testReg = checkField(field.value, displayMsg, regexTypeName);
    }
    if (field.id === 'address') {
      testReg = checkField(field.value, displayMsg, regexTypeAddress);
    }
    if (field.id === 'email') {
      testReg = checkField(field.value, displayMsg, regexTypeMail);
    }
  })
  return testReg
}


// Récupère les informations du formulaire, vérifie la conformitié, créer un objet contact et un tableau de la commande et envoi la requête
const getFieldsForm = async () => {

  // Check du formulaire lors de la saisie "blur"
  checkFormBlur();
  const form = document.querySelector('.cart__order__form');
  // Check du formulaire lors du submit
  await form.addEventListener('submit', async (event) => {
    event.preventDefault();
    checkForm();
    // Si formulaire invalide (aucune action)
    if (checkForm() === -1) {
      return -1
    }
    //Récupère les informations saisies pour créer un objet contact
    const fieldFirstName = document.querySelector('#firstName');
    const fieldLastName = document.querySelector('#lastName');
    const fieldAddress = document.querySelector('#address');
    const fieldCity = document.querySelector('#city');
    const fieldEmail = document.querySelector('#email');
    const contact = {
      firstName: fieldFirstName.value,
      lastName: fieldLastName.value,
      address: fieldAddress.value,
      city: fieldCity.value,
      email: fieldEmail.value
    };
    // Récupère les ID de la commande pour créer un array d'ID 
    const cart = getCart();
    const products = cart.map(canape => canape.id
    );
    // Objet à transmettre dans la requête
    const order = { contact, products };
    // Requête API 
    const data = await postForm("http://localhost:3000/api/products/order", order)
    if (data === -1) {

      alert("Une erreur est survenue, la page demandée n'existe pas.");
      return document.location.href = "cart.html";
    }
    // Supprime le localStorage
    localStorage.clear();
    // Redirection sur la page confirmation avec orderId 
    document.location.href = `confirmation.html?orderId=${data.orderId}`
  })
}

getFieldsForm();





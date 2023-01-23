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
            <p>Qté : ${canape.quantities}</p>
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
        item.innerText = `Qté : ${articleNewQuantity}`
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


// const getTotalQuantitiesAndPrice = async () => {
//   let totalPrice = 0;
//   let totalQuantities = 0;
//   const cart = getCart();
//   for (let canape of cart) {
//     const dataProductFromApi = await getData("http://localhost:3000/api/products/" + canape.id);
//     const totalPerArticle = canape.quantities * dataProductFromApi.price
//     totalPrice += totalPerArticle;
//     totalQuantities += canape.quantities;

//   }
//   document.getElementById('totalQuantity').innerText = totalQuantities;
//   document.getElementById('totalPrice').innerText = totalPrice;
// }


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
    let field = input.querySelector('input')
    const displayMsg = document.getElementById(field.id + 'ErrorMsg')
    document.querySelector('#' + field.id).addEventListener("blur", (event) => {
      if (field.id === 'firstName' || field.id === 'lastName') {
        regexTypeName(event.target.value)
        if (regexTypeName(event.target.value) === -1) {
          errorMsg = `${event.target.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
          displayMsg.innerText = errorMsg;
        } else if (regexTypeName(event.target.value) === -2) {
          errorMsg = `Le champ ne peut être vide`;
          displayMsg.innerText = errorMsg;
        }
      }
      if (field.id === 'address') {
        regexTypeAddress(event.target.value)
        if (regexTypeAddress(event.target.value) === -1) {
          errorMsg = `${event.target.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
          displayMsg.innerText = errorMsg;
        } else if (regexTypeName(event.target.value) === -2) {
          errorMsg = `Le champ ne peut être vide`;
          displayMsg.innerText = errorMsg;
        }
      }
      if (field.id === 'city') {
        regexTypeCity(event.target.value)
        if (regexTypeCity(event.target.value) === -1) {
          errorMsg = `${event.target.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
          displayMsg.innerText = errorMsg;
        } else if (regexTypeName(event.target.value) === -2) {
          errorMsg = `Le champ ne peut être vide`;
          displayMsg.innerText = errorMsg;
        }
      }
      if (field.id === 'email') {
        if (regexTypeMail(event.target.value) === -1) {
          errorMsg = `${event.target.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
          displayMsg.innerText = errorMsg;
        } else if (regexTypeName(event.target.value) === -2) {
          errorMsg = `Le champ ne peut être vide`;
          displayMsg.innerText = errorMsg;
        }
      }
    })
  })
}

// Vérification des champs du formulaire
const checkFormSubmit = () => {
  const fieldsForm = document.querySelectorAll('.cart__order__form__question');
  // Récupère les informations contenues dans les champs du formulaire
  fieldsForm.forEach((input) => {
    let field = input.querySelector('input')
    if (field.id === 'firstName' || field.id === 'lastName') {
      // Cible l'affichage du msg d'erreur
      const displayMsg = document.getElementById(field.id + 'ErrorMsg')
      if (regexTypeName(field.value) === -1) {
        errorMsg = `${field.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
        displayMsg.innerText = errorMsg;
        event.preventDefault();
      } else if (regexTypeName(field.value) === -2) {
        errorMsg = `Le champ ne peut être vide`;
        displayMsg.innerText = errorMsg;
        event.preventDefault();
      }
    }
    if (field.id === 'address') {
      // Cible l'affichage du msg d'erreur
      const displayMsg = document.getElementById(field.id + 'ErrorMsg')
      regexTypeAddress(field.value)
      if (regexTypeAddress(field.value) === -1) {
        errorMsg = `${field.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
        displayMsg.innerText = errorMsg;
        event.preventDefault();
      } else if (regexTypeAddress(field.value) === -2) {
        errorMsg = `Le champ ne peut être vide`;
        displayMsg.innerText = errorMsg;
        event.preventDefault();
      }
    }
    if (field.id === 'city') {
      // Cible l'affichage du msg d'erreur
      const displayMsg = document.getElementById(field.id + 'ErrorMsg')
      regexTypeCity(field.value)
      if (regexTypeCity(field.value) === -1) {
        errorMsg = `${field.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
        displayMsg.innerText = errorMsg;
        event.preventDefault();
      } else if (regexTypeCity(field.value) === -2) {
        errorMsg = `Le champ ne peut être vide`;
        displayMsg.innerText = errorMsg;
        event.preventDefault();
      }
    }
    if (field.id === 'email') {
      // Cible l'affichage du msg d'erreur
      const displayMsg = document.getElementById(field.id + 'ErrorMsg')
      if (regexTypeMail(field.value) === -1) {
        errorMsg = `${field.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
        displayMsg.innerText = errorMsg;
        event.preventDefault();
      } else if (regexTypeMail(field.value) === -2) {
        errorMsg = `Le champ ne peut être vide`;
        displayMsg.innerText = errorMsg;
        event.preventDefault();
      }
    }
  })
}


// Formulaire valide 
const validForm = () => {
  // Check du formulaire Blur 
  checkFormBlur();
  const form = document.querySelector('.cart__order__form');
  // Check du formulaire Submit
  form.addEventListener('submit', (event) => {
    checkFormSubmit();
  })



}

validForm()




// // Contrôle du formulaire
// let checkForm = () => {
//   let checkValid = 0;
//   // Vérification des données du champ prenom
//   document.querySelector('#firstName').addEventListener("change", () => {
//     checkField(document.getElementById('firstName'), document.getElementById('firstNameErrorMsg'), regexTypeName);
//   })
//   // Vérification des données du champ nom
//   document.querySelector('#lastName').addEventListener("change", () => {
//     checkField(document.getElementById('lastName'), document.getElementById('lastNameErrorMsg'), regexTypeName);
//   })
//   // Vérification des données du champ adresse
//   document.querySelector('#address').addEventListener("change", () => {
//     checkField(document.getElementById('address'), document.getElementById('addressErrorMsg'), regexTypeAddress);
//   })
//   // Vérification des données du champ ville
//   document.querySelector('#city').addEventListener("change", () => {
//     checkField(document.getElementById('city'), document.getElementById('cityErrorMsg'), regexTypeCity);
//   })
//   // Vérification des données du champ email
//   document.querySelector('#email').addEventListener("change", () => {
//     checkField(document.getElementById('email'), document.getElementById('emailErrorMsg'), regexTypeMail);
//   })
// }

// checkForm();


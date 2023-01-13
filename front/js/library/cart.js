// Fonction charger panier
const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}


// Fonction sauvegarder panier
const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Fonction ajouter au panier
const addCart = (canape) => {
    const cart = getCart();
    const foundCanapeInCart = cart.find(canapeCart => canapeCart.id == canape.id && canapeCart.colors == canape.colors);
    if (foundCanapeInCart != undefined && foundCanapeInCart.quantities === 100) {
        alert(`Vous ne pouvez pas ajouter plus de 100 produits identiques dans le panier.`);
    } else if (foundCanapeInCart != undefined && foundCanapeInCart.quantities + Number(canape.quantities) > 100) {
        const quantitiesAvailableToAdd = 100 - foundCanapeInCart.quantities
        alert(`Vous ne pouvez pas ajouter plus de 100 produits identiques dans le panier. Vous pouvez encore ajouter ${quantitiesAvailableToAdd} canapés comme celui-ci.`);
    } else if (foundCanapeInCart != undefined && foundCanapeInCart.quantities < 100) {
        foundCanapeInCart.quantities += Number(canape.quantities)
    } else {
        cart.push(canape);
    }
    saveCart(cart);
}

// // Fonction ajouter au panier
// const addCart = (canape) => {
//     const cart = getCart();
//     const foundCanapeInCart = cart.find(canapeCart => canapeCart.id == canape.id && canapeCart.colors == canape.colors);
//     if (foundCanapeInCart != undefined && foundCanapeInCart.quantities + Number(canape.quantities) > 100) {
//         const quantitiesAvailableToAdd = 100 - foundCanapeInCart.quantities
//         alert(`Vous ne pouvez pas ajouter plus de 100 produits identiques dans le panier. Vous pouvez encore ajouter ${quantitiesAvailableToAdd} canapés comme celui-ci.`);
//     } else if (foundCanapeInCart != undefined && foundCanapeInCart.quantities < 100) {
//         foundCanapeInCart.quantities += Number(canape.quantities)
//     } else {
//         cart.push(canape);
//     }
//     saveCart(cart);
// }


// // Fonction ajouter au panier
// const addCart = (canape) => {
//     const cart = getCart();
//     const foundCanapeInCart = cart.find(canapeCart => canapeCart.id == canape.id && canapeCart.colors == canape.colors);
//     if (foundCanapeInCart != undefined) {
//         foundCanapeInCart.quantities += Number(canape.quantities)
//     }
//     else {
//         cart.push(canape);
//     }
//     saveCart(cart);
// }


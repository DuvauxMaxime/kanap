// Fonction charger panier
const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}


// Fonction sauvegarder panier
const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// // Fonction ajouter au panier 
// const addCart = (canape) => {
//     const cart = getCart();
//     const foundIdCanapeInCart = cart.find(canapeCart => canapeCart.id == canape.id);
//     if (foundIdCanapeInCart != undefined) {
//         const foundColorCanapeInCart = cart.find(canapeCart => canapeCart.colors == canape.colors);
//         if (foundColorCanapeInCart != undefined) {
//             console.log(foundColorCanapeInCart.colors);
//         }
//         cart.push(canape);
//     } else {
//         cart.push(canape);
//     }
//     saveCart(cart);
// }

// // Fonction ajouter au panier 
// const addCart = (canape) => {
//     const cart = getCart();
//     const foundIdCanapeInCart = cart.find(canapeCart => canapeCart.id == canape.id);
//     const foundColorCanapeInCart = cart.find(canapeCart => canapeCart.colors == canape.colors);
//     if (foundIdCanapeInCart != undefined && foundColorCanapeInCart != undefined) {
//         quantityOfCanape = Number(canape.quantities)
//         foundIdCanapeInCart.quantities = foundIdCanapeInCart.quantities + quantityOfCanape;
//         console.log(typeof quantityOfCanape);
//     }
//     else {
//         cart.push(canape);
//     }
//     saveCart(cart);
// }

// Fonction ajouter au panier 
const addCart = (canape) => {
    const cart = getCart();
    const foundCanapeInCart = cart.find(canapeCart => canapeCart.id == canape.id && canapeCart.colors == canape.colors);
    if (foundCanapeInCart != undefined) {
        foundCanapeInCart.quantities += Number(canape.quantities)
    }
    else {
        cart.push(canape);
    }
    saveCart(cart);
}
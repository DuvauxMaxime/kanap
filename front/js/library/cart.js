// Fonction charger panier
const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}


// Fonction sauvegarder panier
const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}


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
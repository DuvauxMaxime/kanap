// Fonction sauvegarder le panier dans le local storage

const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Fonction récupérer le panier depuis le local storage

const getCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

// Fonction ajouter au panier

const addCart = (canape) => {
    const cart = getCart();
    const foundCanapeInCart = cart.find(c => c.id == canape.id);
    if (foundCanapeInCart != undefined) {
    } else {
        cart.push(canape);
    }
    cart.push(canape);
    saveCart(cart);
}
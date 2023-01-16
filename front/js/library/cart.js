// Fonction charger panier
const getCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}


// Fonction sauvegarder panier
const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Fonction chercher si un canapé identique existe, vérifier la quantité existante + celle demandée puis ajouter au panier
const addCart = (newItem) => {
    // Récupère le panier
    const cart = getCart();
    // Recherche parmis le panier si item présente un id et une couleur identiques 
    const foundItemInCart = cart.find(itemCart => itemCart.id == newItem.id && itemCart.colors == newItem.colors);
    // Vérifie les conditions : pas plus de 100 produits identiques dans le panier
    if (foundItemInCart != undefined && foundItemInCart.quantities === 100) {
        alert(`Vous ne pouvez pas ajouter plus de 100 produits identiques dans le panier.`);
    } else if (foundItemInCart != undefined && foundItemInCart.quantities + Number(newItem.quantities) > 100) {
        const quantitiesAvailableToAdd = 100 - foundItemInCart.quantities
        alert(`Vous ne pouvez pas ajouter plus de 100 produits identiques dans le panier. Vous pouvez encore ajouter ${quantitiesAvailableToAdd} canapés comme celui-ci.`);
    } else if (foundItemInCart != undefined && foundItemInCart.quantities < 100) {
        foundItemInCart.quantities += Number(newItem.quantities)
    } else {
        // Si aucune condition n'est remplie, le canapé n'existe pas, création d'une nouvelle ligne dans le panier 
        cart.push(newItem);
    }
    // Sauvegarde le panier dans le local Storage
    saveCart(cart);
}


// Fonction pour supprimer un item du panier
const deleteItem = (itemToDelete) => {
    // Récupère le panier
    const cart = getCart();
    // Recherche dans le panier l'item qui présente un id et une couleur identiques 
    const foundItemInCart = cart.find(itemCart => itemCart.id == itemToDelete.id && itemCart.colors == itemToDelete.colors);
    if (foundItemInCart != undefined) {
        localStorage.removeItem('foundItemInCart');
    }
}



// Fonction validation quantité pour ajouter au panier (de 0 à 100 et nombre entier)
const quantityChoice = (number) => {
    if (number > 0 && number <= 100 && Number.isInteger(number) == true) {
        return number;
    }
    alert("La quantité doit être un nombre entier compris entre 1 et 100 pour ajouter le produit au panier");
    return -1
}
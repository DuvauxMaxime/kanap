// Fonction validation couleur pour ajouter au panier
const colorChoice = () => {
    if (document.getElementById("colors").value != '') {
        return document.getElementById("colors").value;
    }
    alert("Vous devez sélectionner une couleur pour ajouter le produit au panier");
    return -1
}


// Fonction validation quantité pour ajouter au panier
const quantityChoice = () => {
    if (document.getElementById("quantity").value > 0 && document.getElementById("quantity").value <= 100) {
        return document.getElementById("quantity").value;
    }
    alert("Vous devez sélectionner une quantité comprise entre 1 et 100 pour ajouter le produit au panier");
    return -1
}


// Fonction pour ajouter un canapé dans le local storage
const addCanape = (canape) => {
    const color = colorChoice();
    const quantity = quantityChoice();
    if (color != -1 && quantity != -1) {
        const productAddToLocalStorage = { id: canape._id, colors: color, quantities: quantity, name: canape.name, altTxt: canape.altTxt, imageUrl: canape.imageUrl };
        return productAddToLocalStorage;
    }
}



// const addCanape = (canape) => {
//     const productQuantity = document.querySelector("#quantity").value;
//     const productColors = document.querySelector("#colors").value;
//     // Gestion des erreurs possibles lors du clic sur bouton ajouter au panier 
//     if (productColors === '') { // a mettre dans une fonction réutilisable
//         alert("Veuillez sélectionner une couleur avant d'ajouter dans le panier.");
//     }
//     if (productQuantity < 1 || productQuantity > 100) { // a mettre dans une fonction réutilisable
//         alert("La quantité doit être comprise entre 1 et 100 pour être ajouter au panier.");
//     }
//     // Si pas d'erreur = création d'un objet
//     const productAddToLocalStorage = { id: pageId, quantity: productQuantity, colors: productColors };

//     if (localStorage.getItem(pageId) && JSON.parse(localStorage.getItem(pageId)).colors) {

//     } else {
//         // Créer une nouvelle ligne dans le local storage si l'Id n'existe pas
//         localStorage.setItem("Item", JSON.stringify(productAddToLocalStorage));
//     }


// }


// Ajout des détails d'un canapé par ID sur la page produit 
const addDataProduct = async () => {
    // Récupère l'Id contenu dans l'URL
    const pageId = await new URL(window.location.href).searchParams.get("id");
    // Gestion d'erreur si l'Id  est absent dans l'URL 
    if (pageId === null) {
        document.location.href = "index.html";
        alert("La page demandée n'existe pas");
    }
    // Récupère les données de l'API liées à l'Id du produit visité
    const dataProduct = await getData("http://localhost:3000/api/products/" + pageId);
    // Gestion d'erreur si l'ID est incorrect dans l'URL
    if (dataProduct === -1) {
        document.location.href = "index.html";
        alert("Le produit demandé n'existe pas");
    }
    document.title = dataProduct.name; // Modifie le titre de la page avec le nom du produit actuel
    document.querySelector('.item__img').innerHTML = `<img src="${dataProduct.imageUrl}" alt="${dataProduct.altTxt}">`;
    document.querySelector('#title').innerHTML = dataProduct.name;
    document.querySelector('#price').innerHTML = dataProduct.price;
    document.querySelector('#description').innerHTML = dataProduct.description;
    const listColors = dataProduct.colors.map(color => '<option value="' + color + '">' + color + '</option>');
    document.querySelector('#colors').insertAdjacentHTML('beforeend', listColors);

    // Fonction déclenchée lors du clic sur le bouton ajouter au panier
    document.getElementById("addToCart").addEventListener("click", () => {
        const newCanape = addCanape(dataProduct);

    });
};

addDataProduct();






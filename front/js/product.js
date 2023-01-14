// Fonction validation couleur pour ajouter au panier
const colorChoice = () => {
    if (document.getElementById("colors").value != '') {
        return document.getElementById("colors").value;
    }
    alert("Vous devez sélectionner une couleur pour ajouter le produit au panier");
    return -1
}


// Fonction validation quantité pour ajouter au panier
const quantityChoice = (number) => {
    if (number > 0 && number <= 100 && Number.isInteger(number) == true) {
        return number;
    }
    alert("La quantité doit être un nombre entier compris entre 1 et 100 pour ajouter le produit au panier");
    return -1
}


// Fonction pour ajouter un canapé dans le local storage
const addCanape = (canape) => {
    const color = colorChoice();
    const quantity = quantityChoice(Number(document.getElementById("quantity").value));
    if (color != -1 && quantity != -1) {
        const productAddToLocalStorage = { id: canape._id, colors: color, quantities: Number(quantity), name: canape.name, altTxt: canape.altTxt, imageUrl: canape.imageUrl };
        return productAddToLocalStorage;
    }
}


// Ajout des données du canapé par ID sur la page produit 
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
    // Insertion des données dans le DOM
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
        if (newCanape != undefined) {
            addCart(newCanape);
        }
    });
};

addDataProduct();






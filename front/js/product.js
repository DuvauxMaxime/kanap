// Créer l'objet contenant les détails d'un canapé à ajouter dans le local storage
const dataCanapeToLocalStorage = (canape) => {
    const color = colorChoice(document.getElementById("colors").value);
    const quantity = quantityChoice(Number(document.getElementById("quantity").value));
    // Si color et quantity sont valides : création de l'objet
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
    const dataProductFromApi = await getData("http://localhost:3000/api/products/" + pageId);
    // Gestion d'erreur si l'ID est incorrect dans l'URL
    if (dataProductFromApi === -1) {
        document.location.href = "index.html";
        alert("Le produit demandé n'existe pas");
    }
    // Insertion des données dans le DOM
    document.title = dataProductFromApi.name; // Modifie le titre de la page avec le nom du produit actuel
    document.querySelector('.item__img').insertAdjacentHTML('beforeend', `<img src="${dataProductFromApi.imageUrl}" alt="${dataProductFromApi.altTxt}">`)
    document.querySelector('#title').insertAdjacentHTML('beforeend', dataProductFromApi.name);
    document.querySelector('#price').insertAdjacentHTML('beforeend', dataProductFromApi.price);
    document.querySelector('#description').insertAdjacentHTML('beforeend', dataProductFromApi.description);
    const listColors = dataProductFromApi.colors.map(color => '<option value="' + color + '">' + color + '</option>');
    document.querySelector('#colors').insertAdjacentHTML('beforeend', listColors);
    // Déclenché lors du clic sur le bouton ajouter au panier
    document.getElementById("addToCart").addEventListener("click", () => {
        if (dataCanapeToLocalStorage(dataProductFromApi) != undefined) {
            addCart(dataCanapeToLocalStorage(dataProductFromApi));
            document.location.href = "cart.html";
        }
    });
};

addDataProduct();






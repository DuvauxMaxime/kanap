const addCanape = (canape) => {
    const productQuantity = document.querySelector("#quantity").value;
    const productColors = document.querySelector("#colors").value;
    // Gestion des erreurs possibles lors du clic sur bouton ajouter au panier
    if (productColors === '') {
        alert("Veuillez sélectionner une couleur avant d'ajouter dans le panier.");
    }
    if (productQuantity < 1 || productQuantity > 100) {
        alert("La quantité doit être comprise entre 1 et 100 pour être ajouter au panier.");
    }
    // Si pas d'erreur = création d'un objet
    const productAddToLocalStorage = { id: pageId, quantity: productQuantity, colors: productColors };

    if (localStorage.getItem(pageId) && JSON.parse(localStorage.getItem(pageId)).colors) {

    } else {
        // Créer une nouvelle ligne dans le local storage si l'Id n'existe pas
        localStorage.setItem("Item", JSON.stringify(productAddToLocalStorage));
    }




    //                 // // Compare si un objet a un Id + Color identiques dans le local storage
    //                 // if (localStorage.getItem(pageId) && JSON.parse(localStorage.getItem(pageId)).colors) {
    //                 //     // Récupère en JS la quantité du local storage
    //                 //     const quantityLocalStorage = JSON.parse(localStorage.getItem(pageId)).quantity;
    //                 //     // Récupère en JS la couleur du local storage
    //                 //     const colorLocalStorage = JSON.parse(localStorage.getItem(pageId)).colors;

    //                 // } else {
    //                 //     // Créer une nouvelle ligne dans le local storage si l'Id n'existe pas
    //                 //     localStorage.setItem(pageId, JSON.stringify(productAddToLocalStorage));
    //                 // }

    //             }


}

// Ajout des détails d'un canapé par ID sur la page produit 

const addDataProduct = async () => {
    const pageId = await new URL(window.location.href).searchParams.get("id");
    if (pageId == null) {
        document.location.href = "index.html";
        alert("La page demandée n'existe pas");
    }
    const dataProduct = await getData("http://localhost:3000/api/products/" + pageId);
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

    document.getElementById("addToCart").addEventListener("click", () => {
        addCanape(dataProduct);
    });
};

addDataProduct();

// Récupère les informations modifiées par l'utilisateur lors du clic sur le bouton ajouter au panier pour
// les stocker dans local storage




// Fonction pour récupérer les données de l'API en .json
const getData = async (url) => {
    const response = await fetch(url); // Récup. données = méthode fetch + URL API
    if (response.ok === false) {
        console.log("Erreur fonction getData (response API)");
    } else
        return await response.json();
}


// // Fonction pour récuperer les données de l'API en fonction de l'ID du produit 
// const getApiId = async () => {
//     const pageId = await new URL(window.location.href).searchParams.get("id"); // Récupère l'ID dans l'url de la page produit
//     const response = await fetch("http://localhost:3000/api/products/" + pageId); // Récupération des données avec la méthode fetch
//     if (response.ok === false) { // Gestion des erreurs 
//         console.log("Erreur fonction getProductId (response API)");
//     } else
//         return await response.json(); // Si ok = Retourne les données de l'API en .JSON
// }


// // Fonction pour récuperer les données de l'API en fonction de l'ID du produit
// const getProductId = async () => {
//     const pageUrl = await new URL(window.location.href); // Récupère l'URL de la fenêtre
//     const pageId = await pageUrl.searchParams.get("id"); // Recherche la variable ID dans l'URL
//     const urlWithId = await "http://localhost:3000/api/products/" + pageId; // Concaténation de l'URL de l'API + l'ID du produit
//     const response = await fetch(urlWithId); // Récupération des données avec la méthode fetch
//     if (response.ok === false) { // Gestion des erreurs
//         console.log("Erreur fonction getProductId (response API)");
//     } else
//         return await response.json(); // Si ok = Retourne les données de l'API en .JSON
// }



// Fonction pour récuperer les données de l'API en fonction de l'ID du produit 
const getProductId = async () => {
    const productId = await new URL(window.location.href); // Récupère l'ID dans l'url de la page produit
    const response = productId.searchParams.get("id");
    return await response

}

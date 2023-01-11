// Fonction pour récupérer les données de l'API en .json

const getData = async (url) => {
    const response = await fetch(url); // Récup. données = méthode fetch + URL API
    if (response.ok === true) {
        return await response.json();
    }
    return -1;
}

// const getData = async (url) => {
//     const response = await fetch(url); // Récup. données = méthode fetch + URL API
//     if (response.ok === false) {
//         console.log("Erreur fonction getData (response API)");
//     } else
//         return await response.json();
// }

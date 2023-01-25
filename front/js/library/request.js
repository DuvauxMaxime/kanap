// Fonction pour récupérer les données de l'API en .json

const getData = async (url) => {
    const response = await fetch(url); // Récup. données = méthode fetch + URL API
    if (response.ok === true) {
        return await response.json();
    }
    return -1;
}


const postForm = async (url, body) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    if (response === true) {
        return await response.json();
    }
    return -1
}

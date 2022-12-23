fetch("http://localhost:3000/api/products") // Récup. données = méthode fetch + URL API
    .then(function (res) { //Appel de la requête .json = promise
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) { //Récupération de la valeur 
        console.log(value);
    })
    .catch(function (err) { //Retour en cas d'erreur
    });


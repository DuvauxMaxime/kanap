fetch("http://localhost:3000/api/products") // Récup. données = méthode fetch + URL API
    .then(function (res) { //Appel de la requête .json = promise
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) { //Récupération de la valeur 
        let listeCanapes = "";
        value.forEach((canape) => {
            listeCanapes += `<a href="./product.html?id=${canape._id}">
            <article>
              <img src="${canape.imageUrl}" alt="${canape.altTxt}">
              <h3 class="productName">${canape.name}</h3>
              <p class="productDescription">${canape.description}</p>
            </article>
          </a>`;
        });
        // for (canape of value) { //Boucle pour créer chaque item canapé
        //     listeCanapes += `<a href="./product.html?id=${canape._id}">
        //     <article>
        //       <img src="${canape.imageUrl}" alt="${canape.altTxt}">
        //       <h3 class="productName">${canape.name}</h3>
        //       <p class="productDescription">${canape.description}</p>
        //     </article>
        //   </a>`;
        // }
        document.querySelector('#items').innerHTML = listeCanapes; //Insertion des items dans notre document
    })
    .catch(function (err) { //Retour en cas d'erreur
    });


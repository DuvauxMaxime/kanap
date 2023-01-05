// Requêter l'API pour récupérer les données de l'ID concerné
const addDataProduct = async () => {
    const pageId = await new URL(window.location.href).searchParams.get("id");
    const dataProduct = await getData("http://localhost:3000/api/products/" + pageId);
    document.title = dataProduct.name;
    document.querySelector('.item__img').innerHTML = `<img src="${dataProduct.imageUrl}" alt="${dataProduct.altTxt}">`;
    document.querySelector('#title').innerHTML = dataProduct.name;
    document.querySelector('#price').innerHTML = dataProduct.price;
    document.querySelector('#description').innerHTML = dataProduct.description;
    const listColors = dataProduct.colors.map(color => '<option value="' + color + '">' + color + '</option>')
    console.log(listColors);
    // let listColors = '';
    // dataProduct.colors.map((color) => {
    //     listColors += ` <option value="${color}">${color}</option> `;
    //     console.log(listColors);
    // })
    // for (const color of dataProduct.colors) {
    //     listColors += ` <option value="${color}">${color}</option> `;
    // }
    document.querySelector('#colors').insertAdjacentHTML('beforeend', listColors); //Insertion des items dans notre document

};

addDataProduct();






// const addProductDatas = async () => {
//     const productDatas = await getProductId();
//     console.log(productDatas);
// }


// const addDetailsProduct = async () => {

//     const detailsProduct = await getData("http://localhost:3000/api/products");
//     console.log(detailsProduct);

// }

// addDetailsProduct()



//     const pageUrl = new URL(window.location.href); // Récupère l'url de la page courante

//     const pageId = pageUrl.searchParams.get("id"); // Récupère l'id contenu dans l'url

//     fetch("http://localhost:3000/api/products") // Récup. données = méthode fetch + URL API
//         .then((res) => { //Appel de la requête .json = promise
//             if (res.ok) {
//                 return res.json()
//             }
//         })
//         .then((value) => { //Récupération des valeurs
//             for (canape of value) { // Boucle pour parcourir les valeurs
//                 console.log(canape)
//                 if (pageId == canape._id) { // Condition à remplir pour importer les données
//                     document.querySelector('.item__img').innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}">`;
//                     document.querySelector('#title').innerHTML = canape.name;
//                     document.querySelector('#price').innerHTML = canape.price;
//                     document.querySelector('#description').innerHTML = canape.description;
//                 }
//             }
//         })

//         .catch((err) => {
//             console.log("Erreur") //Retour en cas d'erreur
//         });






// _______________________________________________

// const newUrl = "http://localhost:3000/api/products/" + pageId
// console.log(newUrl);


// fetch(newUrl) // Récup. données = méthode fetch + URL API
//     .then((res) => { //Appel de la requête .json = promise
//         if (res.ok) {
//             return res.json()
//         }
//     })
//     .then((value) => { //Récupération des valeurs
//         for (canape of value) {

//             document.querySelector('.item__img').innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}">`;
//             document.querySelector('#title').innerHTML = canape.name;
//             document.querySelector('#price').innerHTML = canape.price;
//             document.querySelector('#description').innerHTML = canape.description;

//         }
//     })
//     // for (canape of value) { //Boucle pour créer chaque item canapé
//     //     listeCanapes += `<a href="./product.html?id=${canape._id}">
//     //     <article>
//     //       <img src="${canape.imageUrl}" alt="${canape.altTxt}">
//     //       <h3 class="productName">${canape.name}</h3>
//     //       <p class="productDescription">${canape.description}</p>
//     //     </article>
//     //   </a>`;
//     // }
//     .catch((err) => {
//         console.log("Erreur") //Retour en cas d'erreur
//     });



// Récuérer les données de la page produit pour envoyer au panier 

const productId = getProductId();


const productColor = document.querySelector("#colors");

const productQuantity = document.querySelector("#quantity");

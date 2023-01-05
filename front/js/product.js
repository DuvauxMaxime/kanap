// Ajout des détails d'un canapé par ID sur la page produit 

const addDataProduct = async () => {
    const pageId = await new URL(window.location.href).searchParams.get("id");
    const dataProduct = await getData("http://localhost:3000/api/products/" + pageId);
    document.title = dataProduct.name;
    document.querySelector('.item__img').innerHTML = `<img src="${dataProduct.imageUrl}" alt="${dataProduct.altTxt}">`;
    document.querySelector('#title').innerHTML = dataProduct.name;
    document.querySelector('#price').innerHTML = dataProduct.price;
    document.querySelector('#description').innerHTML = dataProduct.description;
    const listColors = dataProduct.colors.map(color => '<option value="' + color + '">' + color + '</option>')
    document.querySelector('#colors').insertAdjacentHTML('beforeend', listColors);

};

addDataProduct();


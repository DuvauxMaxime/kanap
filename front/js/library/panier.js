const loadCart = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}


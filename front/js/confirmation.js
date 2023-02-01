// Récupère l'id contenu dans l'URL
const getOrderId = () => {
    return new URL(window.location.href).searchParams.get("orderId");
}


// Affichage de la page confirmation avec l'orderId 
const displayConfirmation = () => {
    const orderId = getOrderId();
    // Gestion d'erreur si l'Id  est absent dans l'URL 
    if (orderId === null) {
        document.location.href = "index.html";
        alert("La page demandée n'existe pas.");
    }
    // Intègre le numéro de commande dans le DOM 
    document.getElementById('orderId').insertAdjacentText('beforebegin', orderId);
}


displayConfirmation()
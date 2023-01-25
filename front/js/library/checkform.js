// Regex pour vérifier des champs de type nom et prenom (limite 2 à 20 caractères alphabétiques, accentués, espace + tiret)
const regexTypeName = (champ) => {
    const reg = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{0,}[\s]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{0,}[\s]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s.\-\,]{0,}$/;
    if (reg.test(champ) === true) {
        return champ
    } else if (champ.trim() == '') {
        return -2;
    }
    return -1
}


// Regex pour vérifier des champs de type adresse (caractères alphanumériques, tiret, espace et virgule)
const regexTypeAddress = (champ) => {
    const reg = /^[a-zA-Z0-9.\-\,]+[\s]*[a-zA-Z0-9.\-\,]+[\s]*[a-zA-Z0-9.\-\,]+[a-zA-Z0-9\s.\-\,]*$/;
    if (reg.test(champ) === true) {
        return champ
    } else if (champ.trim() == '') {
        return -2;
    }
    return -1
}


// // Regex pour vérifier des champs de type ville (caractères alphabétiques, tiret, espace et virgule)
// const regexTypeCity = (champ) => {
//     const reg = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{0,}[\s]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{0,}[\s]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s.\-\,]{0,}$/;
//     if (reg.test(champ) === true) {
//         return champ
//     } else if (champ.trim() == '') {
//         return -2;
//     }
//     return -1
// }


// Regex pour vérifier des champs de type mail (caractères alphanumériques, tirets, points, underscore et @)
const regexTypeMail = (champ) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/;
    if (reg.test(champ) === true) {
        return champ
    } else if (champ.trim() == '') {
        return -2;
    }
    return -1
}

const checkField = (targetInput, targetMsg, regexType) => {
    let errorMsg = ``;
    targetMsg.innerText = errorMsg;
    if (regexType(targetInput) === -1) {
        errorMsg = `${targetInput} : le format ne respecte pas la saisie attendue dans ce champ.`;
        targetMsg.innerText = errorMsg;
        return -1

    } else if (regexType(targetInput) === -2) {
        errorMsg = `Le champ ne peut être vide`;
        targetMsg.innerText = errorMsg;
        return -1

    }

}
// // Vérification des données d'un champ
// const checkField = (targetfield, targetErrorMessage, nameRegex) => {
//     // Cible l'affichage du msg d'erreur
//     const displayMsg = targetErrorMessage;
//     let errorMsg = '';
//     displayMsg.innerText = errorMsg;
//     // Valeur saisie dans le champ
//     const inputUser = targetfield.value;
//     // Condition si la regex === true
//     if (nameRegex(inputUser) === true && inputUser.length > 0) {
//         return inputUser;
//     }
//     // Condition si la regex === false && si le champ est vide
//     if (nameRegex(inputUser) === false && inputUser.length === 0) {
//         errorMsg = `Le champ ne peut être vide`;
//         displayMsg.innerText = errorMsg;
//         // désactive le button order
//         document.getElementById('order').setAttribute("disabled", "");
//         return -1;
//     }
//     // Regex === false
//     errorMsg = `${targetfield.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
//     displayMsg.innerText = errorMsg;
//     // désactive le button order
//     document.getElementById('order').setAttribute("disabled", "");
//     return -1;
// }






// Regex pour vérifier des champs de type nom et prenom (limite 2 à 20 caractères alphabétiques, accentués, espace + tiret)
const regexTypeName = (champ) => {
    const reg = /^[A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{1,20}[\-\s]{0,1}[A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{0,20}$/g;
    if (reg.test(champ) === true && champ != '') {
        return champ
    }
    return -1
}


// Regex pour vérifier des champs de type adresse (caractères alphanumériques, tiret, espace et virgule)
const regexTypeAddress = (champ) => {
    const reg = /^[a-zA-Z0-9.\-\,]+[\s]*[a-zA-Z0-9.\-\,]+[\s]*[a-zA-Z0-9.\-\,]+[a-zA-Z0-9\s.\-\,]*$/g;
    if (reg.test(champ) === true & champ != '') {
        return champ
    }
    return -1
}


// Regex pour vérifier des champs de type ville (caractères alphabétiques, tiret, espace et virgule)
const regexTypeCity = (champ) => {
    const reg = /^[a-zA-Z.\-\,]+[\s]*[a-zA-Z.\-\,]+[\s]*[a-zA-Z.\-\,]+[a-zA-Z\s.\-\,]*$/g;
    if (reg.test(champ) === true & champ != '') {
        return champ
    }
    return -1
}


// Regex pour vérifier des champs de type mail (caractères alphanumériques, tirets, points, underscore et @)
const regexTypeMail = (champ) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/g;
    if (reg.test(champ) === true & champ != '') {
        return champ
    }
    return -1
}

// Vérification des données du champ prenom
const checkField = (targetfield, targetErrorMessage, nameRegex) => {
    // Déclenché lors du changement
    targetfield.addEventListener("input", (event) => {
        // Cible l'affichage du msg d'erreur
        const displayMsg = targetErrorMessage;
        let errorMsg = '';
        displayMsg.innerText = errorMsg;
        // Valeur saisie dans le champ 
        const inputUser = event.target.value;
        // Condition si la regex === true
        if (nameRegex(inputUser) != -1) {
            return inputUser
        }
        // Regex === false 
        errorMsg = `${targetfield.value} : le format ne respecte pas la saisie attendue dans ce champ.`;
        displayMsg.innerText = errorMsg;
    })
}
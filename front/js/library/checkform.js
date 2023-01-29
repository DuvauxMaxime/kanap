// Regex pour vérifier des champs de type nom et prenom (limite 2 à 20 caractères alphabétiques, accentués, espace + tiret)
const regexTypeName = (champ) => {
    const reg = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{1,}[\s]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{0,}[\s]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.\-\,]{0,}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s.\-\,]{0,}$/;
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

// Adapte le message en fonction du test du champ ciblé
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

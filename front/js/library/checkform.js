// Regex pour vérifier des champs de type nom et prenom (limite  2 à 20 caractères alphabétiques, accentués, espace + tiret)
const regexTypeName = (champ) => {
    const reg = /^([A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,20})([-\s]{0,1})([A-Za-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{0,20})$/;
    if (reg.test(champ) === true && champ != '') {
        return champ
    }
    return -1
}


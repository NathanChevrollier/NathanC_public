console.log("bonjour");


//fonctions de tests


function isGreaterthan (value) {
    return parseFloat(value) >= 10000;
}

function isLowerthan (value) {
    return parseFloat(value) > 100;
}

function nombre (value) {
    return Number.isInteger(value)
}

function isValidFloat(value) {
    return (value % 1 !== 0);
}


// fonction de test des erreurs
function test_erreur(emprunt, taux, duree_remboursement) {

    let error_list_emprunt = [];
    let error_list_taux = [];
    let error_list_duree = [];

    //champ 1
    if ( !emprunt || !isGreaterthan(emprunt) || !nombre(emprunt)) {
        if (!emprunt) error_list_emprunt.push("empty field");
        else{
            if (!isGreaterthan(emprunt)) error_list_emprunt.push("too much money");
            if (!nombre(emprunt)) error_list_emprunt.push("Not a Number");
        }

        document.querySelector('.error_c1').style.display = 'flex';
        document.querySelector('#emprunt').style.borderColor = 'orange';

    } else {
        document.querySelector('#emprunt').style.borderColor = '';
        document.querySelector('.error_c1').style.display = 'none';
    }

    //champ 2
    if ( !taux || !isValidFloat(taux) || isLowerthan(taux) ) {
        if (!taux) error_list_taux.push("empty field");
        else{
            if (!isValidFloat(taux)) error_list_taux.push("Not a Float");
            if (isLowerthan(taux)) error_list_taux.push("too high value");
        }

        document.querySelector('.error_c2').style.display = 'flex';
        document.querySelector('#taux').style.borderColor = 'orange';
    } else {
        document.querySelector('#taux').style.borderColor = '';
        document.querySelector('.error_c2').style.display = 'none';
    }

    //champ 3
    if ( !duree_remboursement || isLowerthan(duree_remboursement) || !nombre(duree_remboursement) ) {
        if (!duree_remboursement) error_list_duree.push("empty field");
        else{
            if (isLowerthan(duree_remboursement)) error_list_duree.push("too high value");
            if (!nombre(duree_remboursement)) error_list_duree.push("Not a Number");
        }

        document.querySelector('.error_c3').style.display = 'flex';
        document.querySelector('#remboursement').style.borderColor = 'orange';
    } else {
        document.querySelector('#remboursement').style.borderColor = '';
        document.querySelector('.error_c3').style.display = 'none';
    }
    //recup champ
    const list_emprunt = document.querySelector('.list_error_c1');
    const list_taux = document.querySelector('.list_error_c2');
    const list_duree = document.querySelector('.list_error_c3');

    //envoie liste
    list_emprunt.textContent = error_list_emprunt.join(' , ');
    list_taux.textContent = error_list_taux.join(' , ');
    list_duree.textContent = error_list_duree.join(' , ');

    if (error_list_emprunt != [] && error_list_taux != [] && error_list_duree != []){
        return true;
    }
    else{
        return false;
    }
}


//écoute et actions sur le formulaire
document.querySelector('.calculer').addEventListener('click' ,function(event){
    event.preventDefault();
    //récupération des saisies des champs du formulaire
    const emprunt = parseFloat(document.querySelector('#emprunt').value);
    const taux = parseFloat(document.querySelector('#taux').value);
    const duree_remboursement = parseInt(document.querySelector('#remboursement').value);

    //appel de la fonction de verif
    

    // vérifie si toutes les conditions sont bien réunies et crée les lignes
    if(test_erreur(emprunt,taux,duree_remboursement)){

        //calculs et variables de bases
        const interet = (taux / 12) /100 ;
        const duree_pret = duree_remboursement * 12 ;
        const montant_total= emprunt * taux ;
        

        let solde = emprunt;
        let interet_mois = solde * interet;
        let echeance_mois = (emprunt * interet) / (1 - Math.pow(1 + interet, -duree_pret));
        //montant_total * ((interet_mois *((1 + interet_mois)** duree_pret)) / (((1 + interet_mois)** duree_pret) - 1));
        //variable body du tableau
        const body = document.querySelector('.contenu_tab');
        body.innerHTML = '';
        
        for(let mois=1 ; mois <= duree_pret ; mois++){
            let interet_mois = solde * interet ;
            let amortissement = echeance_mois - interet_mois ;
            let reste_payer = solde - amortissement ;

            //nouvelle ligne
            const newRow = document.createElement('tr');

            // éléments de la ligne
            newRow.innerHTML = `
                <td>${mois}</td>
                <td>${solde.toFixed(2)}</td>
                <td>${echeance_mois.toFixed(2)}</td>
                <td>${interet_mois.toFixed(2)}</td>
                <td>${amortissement.toFixed(2)}</td>
                <td>${reste_payer.toFixed(2)}</td>
            `;
            body.appendChild(newRow);

            solde = reste_payer;
        }




    }
});

// Écouteur d'événement pour le bouton de téléchargement
document.querySelector('.download').addEventListener('click', function() {
    dl_pdf();
});

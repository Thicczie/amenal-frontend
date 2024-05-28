import { getBanques, getBesoins, getChargeStandards, getDeviss, getFactures, getFournisseurs, getPaiements, getReceptions, getRemises, getTransports } from "../api/achat/achat_api";
import { getClients, getProjects, getResponsables, getTaches } from "../api/api";
import { getLotsByProjectId, getMetresByAvenantId, getProduitsByAvenantId } from "../api/crudAPI";

 // field object used for crud forms , and excel upload , contains layout and field info and other details
export type Fields = {
    [key: string]: {
        label: string, // label of the field
        column: string, // column name in the database
        type: string, // type of the field
        required: boolean, // is the field required
        queryFct?: (...args:any|undefined) => Promise<any>; // function to get the data for the select field
        queryArg?: any; // argument to pass to the query function
        selectLabel?: string; // label to display in the select field
        foreignKey?: string; // foreign key to use in the select field
        
    }
}

const produitFields:Fields = {
    art: { label: "ART", column: "art", type: "text", required: false },
    designation: { label: "DESIGNATION", column: "designation", type: "text", required: true },
    upb: { label: "UNITE", column: "upb", type: "text", required: false },
    qpm: { label: "QUANTITE", column: "qpm", type: "number", required: false },
    ppm: { label: "PU", column: "ppm", type: "number", required: false },
    metre: { label: "METRE", column: "metre", type: "select",selectLabel:"titre",queryArg:"avenantId", queryFct: (avenantId:any) => getMetresByAvenantId(avenantId), required: true },
};

const lotFields:Fields = {

    ordre: { label: 'ORD', column: "article", type: "text", required: false },
    designation: { label: 'LOT', column: "designation", type: "text", required: false },
    project: { label: 'PROJET', column: "projet", type: "select",selectLabel:'project',queryArg:undefined, queryFct: getProjects, required: true },
    okex :{ label: 'OKEX', column: "okex", type: "boolean", required: false , queryFct:getBanques,  }
};

const tacheFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'PRODUIT', column: "produit", type: "select",selectLabel:"designation", queryArg:"avenantId", queryFct:(avenantId:any)=> getProduitsByAvenantId(avenantId), required: true , foreignKey:'produitId' },
    lot: { label: 'LOT', column: "lot", type: "select",selectLabel:"designation",  queryArg:"projectId", queryFct:(projectId) =>getLotsByProjectId(projectId), required: true , foreignKey:'lotId' },
    titreActivite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    ddb: { label: 'DATE DEBUT', column: "ddb", type: "date", required: true },
    dlb: { label: 'DELAI', column: "dlb", type: "number", required: false }
};




export const detailProduitFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'DESIGNATION', column: "produit", type: "select",  required: true },
    lot: { label: 'LOT', column: "lot", type: "select", required: true },
    activite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    reference: { label: 'DETAIL PRODUIT', column: "detail produit", type: "text", required: false },
    nbr: { label: 'NBR', column: "nbr", type: "number", required: false },
    dim1: { label: 'DM1', column: "dim1", type: "number", required: false },
    dim2: { label: 'DM2', column: "dim2", type: "number", required: false },
    dim3: { label: 'DM3', column: "dim3", type: "number", required: false },
    rls: { label: 'RSL', column: "rls", type: "number", required: false }

}

export const detailProduitFormFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'PRODUIT', column: "produit", type: "select",selectLabel:"designation", queryArg:"avenantId", queryFct:(avenantId:any)=> getProduitsByAvenantId(avenantId), required: true },
    lot: { label: 'LOT', column: "lot", type: "select",selectLabel:"designation",  queryArg:"projectId", queryFct:(projectId) =>getLotsByProjectId(projectId), required: true },
    activite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    reference: { label: 'DETAIL PRODUIT', column: "detail produit", type: "text", required: false },
    nbr: { label: 'NBR', column: "nbr", type: "number", required: false },
    dim1: { label: 'DM1', column: "dim1", type: "number", required: false },
    dim2: { label: 'DM2', column: "dim2", type: "number", required: false },
    dim3: { label: 'DM3', column: "dim3", type: "number", required: false },
    rls: { label: 'RSL', column: "rls", type: "number", required: false },
    metre: { label: "METRE", column: "metre", type: "select",selectLabel:"titre",queryArg:"avenantId", queryFct: (avenantId:any) => getMetresByAvenantId(avenantId), required: true },


}





export const detailChargeFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'ARTICLE', column: "produit", type: "text", required: true },
    lot: { label: 'LOT', column: "lot", type: "text", required: true },
    activite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    charge: { label: 'DETAIL CHARGE', column: "charge", type: "text", required: false },
    nature: { label: 'NATURE', column: "nature", type: "text", required: false },
    ucb: { label: 'UCB', column: "ucb", type: "text", required: false },
    qcb: { label: 'QCB', column: "qcb", type: "number", required: false },
    mcb: { label: 'MCB', column: "mcb", type: "number", required: false },
    //rcb: { label: 'PUCHG', column: "pu", type: "number", required: false },


}

export const detailChargeFormFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'PRODUIT', column: "produit", type: "select",selectLabel:"designation", queryArg:"avenantId", queryFct:(avenantId:any)=> getProduitsByAvenantId(avenantId), required: true },
    lot: { label: 'LOT', column: "lot", type: "select",selectLabel:"designation",  queryArg:"projectId", queryFct:(projectId) =>getLotsByProjectId(projectId), required: true },
    activite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    charge: { label: 'DETAIL CHARGE', column: "charge", type: "text", required: false },
    nature: { label: 'NATURE', column: "nature", type: "text", required: false },
    ucb: { label: 'UCB', column: "ucb", type: "text", required: false },
    qcb: { label: 'QCB', column: "qcb", type: "number", required: false },
    mcb: { label: 'MCB', column: "mcb", type: "number", required: false },
    //rcb: { label: 'PUCHG', column: "pu", type: "number", required: false },
    metre: { label: "METRE", column: "metre", type: "select",selectLabel:"titre",queryArg:"avenantId", queryFct: (avenantId:any) => getMetresByAvenantId(avenantId), required: true },



}


export const detailQualiteFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'ARTICLE', column: "produit", type: "text", required: true },
    lot: { label: 'LOT', column: "lot", type: "text", required: true },
    activite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    groupe: { label: 'GROUPE', column: "groupe", type: "text", required: false },
    pointDeControle: { label: 'POINT DE CONTROLE', column: "point de controle", type: "text", required: false }

}
export const detailQualiteFormFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'PRODUIT', column: "produit", type: "select",selectLabel:"designation", queryArg:"avenantId", queryFct:(avenantId:any)=> getProduitsByAvenantId(avenantId), required: true },
    lot: { label: 'LOT', column: "lot", type: "select",selectLabel:"designation",  queryArg:"projectId", queryFct:(projectId) =>getLotsByProjectId(projectId), required: true },
    activite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    groupe: { label: 'GROUPE', column: "groupe", type: "text", required: false },
    pointDeControle: { label: 'POINT DE CONTROLE', column: "point de controle", type: "text", required: false },
    metre: { label: "METRE", column: "metre", type: "select",selectLabel:"titre",queryArg:"avenantId", queryFct: (avenantId:any) => getMetresByAvenantId(avenantId), required: true },


}





export const detailDelaiFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'ARTICLE', column: "produit", type: "text", required: true },
    lot: { label: 'LOT', column: "lot", type: "text", required: true },
    activite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    ddb: { label: 'DATE DEBUT', column: "ddb", type: "date", required: true },
    dlb: { label: 'DELAI', column: "dlb", type: "number", required: false },
    dfb: { label: 'DATE FIN', column: "dfb", type: "date", required: false }

}
export const detailDelaiFormFields:Fields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'PRODUIT', column: "produit", type: "select",selectLabel:"designation", queryArg:"avenantId", queryFct:(avenantId:any)=> getProduitsByAvenantId(avenantId), required: true },
    lot: { label: 'LOT', column: "lot", type: "select",selectLabel:"designation",  queryArg:"projectId", queryFct:(projectId) =>getLotsByProjectId(projectId), required: true },
    activite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    upb: { label: 'UNT', column: "upb", type: "text", required: false },
    cle: { label: 'CLE', column: "c", type: "boolean", required: true },
    ddb: { label: 'DATE DEBUT', column: "ddb", type: "date", required: true },
    dlb: { label: 'DELAI', column: "dlb", type: "number", required: false },
    dfb: { label: 'DATE FIN', column: "dfb", type: "date", required: false },
    metre: { label: "METRE", column: "metre", type: "select",selectLabel:"titre",queryArg:"avenantId", queryFct: (avenantId:any) => getMetresByAvenantId(avenantId), required: true },


}


export const budgetFields:Fields = {
    dateOuverture:{label:"DATE CREATION",column:"dateOuverture",type:"date",required:true},
    project:{label:"OBJET",column:"refProject",type:"text",required:true},
    client:{label:"CLIENT",column:"client",type:"select",required:true , queryFct:getClients, queryArg:undefined, selectLabel:'nom' },
    responsable:{label:"RESPONSABLE",column:"responsable",type:"select",required:true , queryFct:getResponsables, queryArg:undefined, selectLabel:'nom' },

}   

export const avenantFields:Fields = {
    titre:{label:"TITRE",column:"titre",type:"text",required:true},
    dateDebut:{label:"DATE ",column:"dateAvenant",type:"date",required:true},
    delai:{label:"DELAI",column:"delai",type:"number",required:true},
    reference:{label:"REFERENCE",column:"reference",type:"text",required:true},
    project: { label: 'PROJET', column: "projet", type: "select",selectLabel:'project',queryArg:undefined, queryFct: getProjects, required: true }
}





	
export const bsnFields:Fields = {
datePrevu:{label:"DATE PREVUE ",column:"datePrevu",type:"date",required:true},
charge:{label:"ARTICLE",column:"charge",type:"select",required:true, selectLabel:'charge' , queryFct: getChargeStandards , queryArg:undefined},
qte:{label:"QUANTITE",column:"qte",type:"number",required:true},
tache:{label:"TACHE",column:"tache",type:"select",required:true, queryFct:getTaches, queryArg:undefined, selectLabel:'titreActivite'},

}



export const chgFields:Fields = {
    designation:{label:"DESIGNATION",column:"designation",type:"text",required:true},
    prixUnitaire:{label:"PRIX UNITAIRE",column:"prixUnitaire",type:"number",required:true},
    tva:{label:"TVA",column:"tva",type:"number",required:true},


}

export const cmfFields:Fields = {
    dateCmf:{label:"DATE CMF",column:"dateCmf",type:"date",required:true},
    besoin:{label:"BESOIN",column:"besoin",type:"select",required:true, queryFct:getBesoins, queryArg:undefined, selectLabel:'id'},
    devis:{label:"DEVIS",column:"devis",type:"select",required:true, queryFct:getDeviss, queryArg:undefined, selectLabel:'reference'},
}

export const ddfFields:Fields = {
    dateDdf:{label:"DATE DDF",column:"dateDdf",type:"date",required:true},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
}

export const dvfFields:Fields = {
    dateDvf:{label:"DATE DVF",column:"dateDvf",type:"date",required:true},
    reference:{label:"REFERENCE",column:"reference",type:"text",required:true},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
}

export const fcfFields:Fields = {
    dateFcf:{label:"DATE FCF",column:"dateFcf",type:"date",required:true},
    reference:{label:"REFERENCE",column:"reference",type:"text",required:true},
    delaiFacture:{label:"DELAI FACTURE",column:"delaiFacture",type:"number",required:true},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
    paiement:{label:"PAIEMENT",column:"paiement",type:"select",required:true,queryFct:getPaiements, queryArg:undefined, selectLabel:'refOperation'},
}


export const frsFields:Fields = {
    dateFournisseur:{label:"DATE FOURNISSEUR",column:"dateFournisseur",type:"date",required:true},
    nom:{label:"NOM",column:"nom",type:"text",required:true},
    denominationSocial:{label:"DENOMINATION SOCIAL",column:"denominationSocial",type:"text",required:true},
    adresse:{label:"ADRESSE",column:"adresse",type:"text",required:true},
    ville:{label:"VILLE",column:"ville",type:"text",required:true},
    ice:{label:"ICE",column:"ice",type:"text",required:true},
    idFiscale:{label:"ID FISCALE",column:"idFiscale",type:"text",required:true},
    villeRegistreCommerce:{label:"VILLE REGISTRE COMMERCE",column:"villeRegistreCommerce",type:"text",required:true},
    pattente:{label:"PATENTE",column:"pattente",type:"text",required:true},
    rib:{label:"RIB",column:"rib",type:"text",required:true},
    banque:{label:"BANQUE",column:"banque",type:"select",required:true , queryFct:getBanques, queryArg:undefined, selectLabel:'nom' },

}


export const pmfFields:Fields = {
    datePmf:{label:"DATE PMF",column:"datePmf",type:"date",required:true},
    refOperation:{label:"REF OPERATION",column:"refOperation",type:"text",required:true},
    montant:{label:"MONTANT",column:"montant",type:"number",required:true},
    lienPhotoPlf:{label:"LIEN PHOTO PLF",column:"lienPhotoPlf",type:"text",required:true},
    compteDebite:{label:"COMPTE DEBITE",column:"compteDebite",type:"select",required:true , queryFct:getBanques, queryArg:undefined, selectLabel:'nom'},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
    factures:{label:"FACTURES",column:"factures",type:"select",required:true , queryFct:getFactures, queryArg:undefined, selectLabel:'reference'},
    remises:{label:"REMISES",column:"remises",type:"select",required:true , queryFct:getRemises , queryArg:undefined, selectLabel:'remiseEn'},
}



export const rcfFields:Fields = {
    dateRcf:{label:"DATE RCF",column:"dateRcf",type:"date",required:true},
    reference:{label:"REFERENCE",column:"reference",type:"text",required:true},
    commande:{label:"COMMANDE",column:"commande",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'id'},
    facture:{label:"FACTURE",column:"facture",type:"select",required:true, queryFct:getFactures, queryArg:undefined, selectLabel:'reference'},
    transports:{label:"TRANSPORTS",column:"transports",type:"select",required:true, queryFct:getTransports, queryArg:undefined, selectLabel:'chauffeur'},
}



export const detailBesoinFields:Fields = {
    qte:{label:"QUANTITE",column:"qte",type:"number",required:true},
}
export const detailDemandeDevisFields:Fields = {
    qte:{label:"QUANTITE",column:"qte",type:"number",required:true},

}

export const detailDevisFields:Fields = {
    qte:{label:"QUANTITE",column:"qte",type:"number",required:true},
    prixUnitaire:{label:"PRIX UNITAIRE",column:"prixUnitaire",type:"number",required:true},
    devis:{label:"DEVIS",column:"devis",type:"select",required:true, queryFct:getDeviss, queryArg:undefined, selectLabel:'reference'},
    charge:{label:"CHARGE",column:"charge",type:"select",required:true, queryFct:getChargeStandards, queryArg:undefined, selectLabel:'designation'},

}



export const  transportFields:Fields = {
    dateDepart:{label:"DATE DEPART",column:"dateDepart",type:"date",required:true},
    dateArrive:{label:"DATE ARRIVE",column:"dateArrive",type:"date",required:true},
    prisEnChargePar:{label:"PRIS EN CHARGE PAR",column:"prisEnChargePar",type:"text",required:true},
    lienPhoto:{label:"LIEN PHOTO",column:"lienPhoto",type:"text",required:true},
    type:{label:"TYPE",column:"type",type:"text",required:true},
    matricule:{label:"MATRICULE",column:"matricule",type:"text",required:true},
    chauffeur:{label:"CHAUFFEUR",column:"chauffeur",type:"text",required:true},
    chauffeurCin:{label:"CHAUFFEUR CIN",column:"chauffeurCin",type:"text",required:true},
    reception:{label:"RECEPTION",column:"reception",type:"select",required:true, queryFct:getReceptions, queryArg:undefined, selectLabel:'reference'},

}

export const detailReceptionFields:Fields = {
    qte:{label:"QUANTITE",column:"qte",type:"number",required:true},
    lienPhotoArticle:{label:"LIEN PHOTO ARTICLE",column:"lienPhotoArticle",type:"text",required:true},
    reception:{label:"RECEPTION",column:"reception",type:"select",required:true, queryFct:getReceptions, queryArg:undefined, selectLabel:'reference'},
}


export const detailFactureFields:Fields={
    qteAFacture:{label:"QUANTITE A FACTURE",column:"qteAFacture",type:"number",required:true},
    qteRectifie:{label:"QUANTITE RECTIFIE",column:"qteRectifie",type:"number",required:true},
    prixUnitaireHtRectifie:{label:"PRIX UNITAIRE HT RECTIFIE",column:"prixUnitaireHtRectifie",type:"number",required:true},
    facture:{label:"FACTURE",column:"facture",type:"select",required:true, queryFct:getFactures, queryArg:undefined, selectLabel:'reference'},
}


export const remiseFields:Fields = {
    dateRemise:{label:"DATE REMISE",column:"dateRemise",type:"date",required:true},
    remiseEn:{label:"REMISE EN",column:"remiseEn",type:"text",required:true},
    remiseA:{label:"REMISE A",column:"remiseA",type:"text",required:true},
    remiseVia:{label:"REMISE VIA",column:"remiseVia",type:"text",required:true},
    lienPhotoRemise:{label:"LIEN PHOTO REMISE",column:"lienPhotoRemise",type:"text",required:true},

}
export const compteBanquaireFields:Fields = {
    designation:{label:"DESIGNATION",column:"designation",type:"text",required:true},

}

export const contratDlpFields:Fields = {
    plafond:{label:"PLAFOND",column:"plafond",type:"number",required:true},
    lienContrat:{label:"LIEN CONTRAT",column:"lienContrat",type:"text",required:true},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
}
export const evaluationFournisseurFields:Fields ={
    date:{label:"DATE",column:"date",type:"date",required:true},
    evaluation:{label:"EVALUATION",column:"evaluation",type:"text",required:true},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
}



export const contratPlafondFields:Fields = {
    dateDebut:{label:"DATE DEBUT",column:"dateDebut",type:"date",required:true},
    dateFin:{label:"DATE FIN",column:"dateFin",type:"date",required:true},
    delaiReglement:{label:"DELAI REGLEMENT",column:"delaiReglement",type:"number",required:true},
    //lienContrat:{label:"LIEN CONTRAT",column:"lienContrat",type:"text",required:true},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
}



export const contactFounisseurFields:Fields = {
    nomComplet:{label:"NOM COMPLET",column:"nomComplet",type:"text",required:true},
    fonction:{label:"FONCTION",column:"fonction",type:"text",required:true},
    email:{label:"EMAIL",column:"email",type:"text",required:true},
    tel:{label:"TEL",column:"tel",type:"text",required:true},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
}



export const attestationRgfFields:Fields = {
    dateDebut:{label:"DATE DEBUT",column:"dateDebut",type:"date",required:true},
    dateFin:{label:"DATE FIN",column:"dateFin",type:"date",required:true},
    lienAttestation:{label:"LIEN ATTESTATION",column:"lienAttestation",type:"text",required:true},
    fournisseur:{label:"FOURNISSEUR",column:"fournisseur",type:"select",required:true, queryFct:getFournisseurs, queryArg:undefined, selectLabel:'nom'},
}

export const produitAttentesFields:Fields = {}
export const chargeAttentesFields:Fields = {}
export const qualiteAttentesFields:Fields = {}
export const delaiAttentesFields:Fields = {}

export { produitFields, lotFields, tacheFields };



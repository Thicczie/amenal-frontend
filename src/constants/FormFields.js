

const produitFields = {
    article: { label: "ART", column: "article", type: "text", required: false },
    designation: { label: "DESIGNATION", column: "designation", type: "text", required: false },
    unite: { label: "UNITE", column: "upb", type: "text", required: false },
    qteRef: { label: "QUANTITE", column: "qpm", type: "number", required: false },
    puRef: { label: "PU", column: "ppm", type: "number", required: false },
    "metre.id": { label: "METRE", column: "metre", type: "select", required: false }
};

const lotFields = {

    article: { label: 'ORD', column: "article", type: "text", required: false },
    designation: { label: 'LOT', column: "designation", type: "text", required: false },
    'project.id': { label: 'PROJET', column: "projet", type: "select", required: false }

};

const tacheFields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'PRODUIT', column: "produit", type: "select", required: true },
    lot: { label: 'LOT', column: "lot", type: "select", required: true },
    titreActivite: { label: 'ACTIVITE', column: "activite", type: "text", required: true },
    cleAttachement: { label: 'CLE', column: "c", type: "boolean", required: true },
    unite: { label: 'UNT', column: "upb", type: "text", required: false },
    dateDebut: { label: 'DATEDEBUT', column: "ddb", type: "date", required: true },
    delai: { label: 'DELAI', column: "dlb", type: "number", required: false }
};


export { produitFields, lotFields, tacheFields };





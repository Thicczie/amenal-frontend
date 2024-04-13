

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



// DESIGNATION	LOT	ACTIVITE	UNT	CLE	DETAIL PRODUIT	NBR	DM1	DM2	DM3	RSL

// ordre	produit	lot	activite	upb	cle	reference	nbr	dim1	dim2	dim3	rls


export const detailProduitFields = {
    ordre: { label: 'ORD', column: "ordre", type: "text", required: false },
    produit: { label: 'DESIGNATION', column: "produit", type: "text", required: true },
    lot: { label: 'LOT', column: "lot", type: "text", required: true },
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




// ORD	ARTICLE	LOT	ACTIVITE	UNT	CLE	
// DETAIL CHARGE
// NATURE	UCB	QCB		MCB  PUCHG

// ordre	produit	lot	activite	upb	cle	charge	nature	ucb	qcb	mcb	   rcb	qpb	ddb


export const detailChargeFields = {
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

export { produitFields, lotFields, tacheFields };





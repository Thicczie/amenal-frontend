
export const produitColumnTypes = {
    ordre: "string", // ordre
    produit: "string", // produit
    lot: "string", // lot
    activite: "string", // activite
    upb: "string", // upb
    cle: "boolean", // cle
    reference: "string", // reference
    nbr: "number", // nbr
    dim1: "number", // dim1
    dim2: "number", // dim2
    dim3: "number", // dim3
    rls: "number", // rls
};

export const chargeColumnTypes = {
    ordre: "string",     // ordre
    produit: "string",   // produit
    lot: "string",       // lot
    activite: "string",  // activite
    upb: "string",       // upb
    cle: "boolean",      // cle
    charge: "string",    // charge
    nature: "string",    // nature
    ucb: "string",       // ucb
    qcb: "number",       // qcb
    pcb: "number",       // pcb
    mcb: "number",       // mcb
    rcb: "string",       // rcb
    qpb: "number",       // qpb
    ddb: "date",         // ddb 
};

export const qualiteColumnTypes = {
    ordre: "string",             // ordre
    produit: "string",           // produit
    lot: "string",               // lot
    activite: "string",          // activite
    upb: "string",               // upb
    cle: "boolean",              // cle
    groupe: "string",            // groupe
    pointDeControle: "string",   // pointDeControle
};

export const delaiColumnTypes = {
    ordre: "string",     // ordre
    produit: "string",   // produit
    lot: "string",       // lot
    activite: "string",  // activite
    upb: "string",       // upb
    cle: "boolean",      // cle
    ddb: "date",         // ddb (assuming LocalDate is a date)
    dlb: "number",       // dlb (assuming Integer is a number)
    dfb: "date",         // dfb (assuming LocalDate is a date)
};

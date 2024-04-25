import { IceSkating, RiceBowl } from "@mui/icons-material";

 interface ILayout {
    key :string|null;
    label:string;

}


 interface TLayout {
    ref :string|null;
    date:string|null;

}

const   AvLayout :ILayout[] =[


    {
        key : 'titre',
        label: 'TITRE',
},
{
    key : 'valide',
    label: 'VALIDE',
},
{
    key : 'dateDebut',
    label: 'DATE DEBUT',
},
{
    key : 'delai',
    label: 'DELIA',
},
{
    key : 'reference',
    label: 'REFERENCE',
}

]

const BdgLayout :ILayout[] =[
    {
        key : 'refProject',
        label: 'REFERENCE',
},
{
    key : 'project',
    label: 'TITRE',
},
{
    key : 'observation',
    label: 'OBSERVATION',
},
{
    key : 'lieu',
    label: 'LIEU',
},
{
    key : 'dateOuverture',
    label: 'DATE OUVERTURE',
},
{
    key : 'valide',
    label: 'VALIDE',
},

];




const BsnLayout :ILayout[] =[
    {
        key : 'datePrevu',
        label: 'DATE PREVUE BESOIN',

    },
    {
        key : "charge?.designation",
        label: 'ARTICLE',

    },
    {
        key : 'qte',
        label: 'QUANTITE',

    },
    {
        key : 'prixUnitaire',
        label: 'PRIX U. HT',

    },
    {
        key : 'mntHt',
        label: 'MONTANT HT',

    },
    {
        key : 'mntTva',
        label: 'MONTANT TVA',

    },
    {
        key : 'mntTtc',
        label: 'MONTANT TTC',

    },
    {
        key : 'tache?.project?.project',
        label: 'PROJET',

    },
    {
        key : 'tache?.lot?.lot',
        label: 'LOT',

    },
    {
        key : 'tache',
        label: 'TACHE',

    },
]




const DvfLayout:ILayout[] =[
    {
        key : 'dateDvf',
        label: 'DATE DEVIS',

    },
    {
        key : "fournisseur?.nom",
        label: 'FOURNISSEUR',

    },
    {
        key : 'reference',
        label: 'REF DVF FRS',

    },
    {
        key : 'mntHt',
        label: 'MONTANT HT',

    },
    {
        key : 'mntTva',
        label: 'MONTANT TVA',

    },
    {
        key : 'mntTtc',
        label: 'MONTANT TTC',
    }
]



const DdfLayout:ILayout[] =[
        {
            key:'dateDdf',
            label: 'DATE DDF',

        },
        {
            key:'fournisseur?.nom',
            label: 'FOURNISSEUR',
        }
]



const CmfLayout :ILayout[] =[
    // DATE COMMANDE   dateCmf
    // FOURNISSEUR   devis.fournisseur.nom
    // PROJET  null
    // MONTANT HT  null
    // MONTANT TVA null
    // MONTANT TTC null

    {
        key : 'dateCmf',
        label: 'DATE COMMANDE',

    },
    {
        key : "devis?.fournisseur?.nom",
        label: 'FOURNISSEUR',

    },
    {
        key : 'mntHt',
        label: 'MONTANT HT',

    },
    {
        key : 'mntTva',
        label: 'MONTANT TVA',

    },
    {
        key : 'mntTtc',
        label: 'MONTANT TTC',
    
    }
]
const RcfLayout :ILayout[] =[
    // DATE RECEPTION  dateRcf
    // FOURNISSEUR  "commande.devis.fournisseur.nom"
    // REF RCF FRS (BLF)  reference
    // IMAGE BON LIVRAISON  lienImageBonLivraison
    // PROJET  " "
    // DELAI PAIEMENT / DELAI CONTRAT  null
    // MONTANT HT  "mntHt"
    // MONTANT TVA  "mntTva"
    // MONTANT TTC  "mntTtc"

    {
        key : 'dateRcf',
        label: 'DATE RECEPTION',

    },
    {
        key : "commande?.devis?.fournisseur?.nom",
        label: 'FOURNISSEUR',

    },
    {
        key : 'reference',
        label: 'REF RCF FRS (BLF)',

    },{
        key :'lienImageBonLivraison',
        label: 'IMAGE BON LIVRAISON',
    },
    {
        key: null,
        label: 'PROJET',
    },{
        key:null,
        label: 'DELAI PAIEMENT / DELAI CONTRAT',
    },
    {
        key : 'mntHt',
        label: 'MONTANT HT',

    },
    {
        key : 'mntTva',
        label: 'MONTANT TVA',

    },
    {
        key : 'mntTtc',
        label: 'MONTANT TTC',
    
    
    }

]
const FcfLayout :ILayout[] =[
//     DATE FACTURE dateFcf

//     FOURNISSEUR  fournisseur.nom
//     REF FCF FRS  reference
//     PHOTO FCF FRS  lienPhotoFacture
//     DELAI REEL / DELAI CONTRAT delaiFacture
//     MONTANT HT mntHt

// MONTANT TVA mntTva

// MONTANT TTC mntTtc

// MNT HT FRS  mntHtNote

// MNT TVA FRS mntTvaNote

// MNT TTC FRS mntTtcNote

{
    key : 'dateFcf',
    label: 'DATE FACTURE',

},
{
    key : "fournisseur?.nom",
    label: 'FOURNISSEUR',

},
{
    key : 'reference',
    label: 'REF FCF FRS',

},
{
    key : 'mntHt',
    label: 'MONTANT HT',

},
{
    key : 'mntTva',
    label: 'MONTANT TVA',

},
{
    key : 'mntTtc',
    label: 'MONTANT TTC',

},
{
    key : 'mntHtNote',
    label: 'MNT HT FRS',

},
{
    key : 'mntTvaNote',
    label: 'MNT TVA FRS',

},
{
    key : 'mntTtcNote',
    label: 'MNT TTC FRS',

},
]



const PmfLayout :ILayout[] =[
    // DATE PAIEMENT datePmf
    // FOURNISSEUR fournisseur.nom
    // COMPTE DEBITE compteDebite.designation
    // REF PMF EXT refOperation 
    // PHOTO PMF FRS lienPhotoPlf
    // MONTANT montant

    {
        key : 'datePmf',
        label: 'DATE PAIEMENT',

    },
    {
        key : "fournisseur?.nom",
        label: 'FOURNISSEUR',

    },
    {
        key : 'compteDebite?.designation',
        label: 'COMPTE DEBITE',

    },
    {
        key : 'refOperation',
        label: 'REF PMF EXT',

    },
    {
        key : 'montant',
        label: 'MONTANT',

    },
]
const FrsLayout :ILayout[] =[
    // DATE FOURNISSEUR dateFournisseur
    // NOM nom
    // ADRESSE adresse
    // VILLE ville
    // ICE  ice
    // RESPONSABLE " "
    // ID FISCALE idFiscale
    // DENOMINATION SOCIALE denominationSocial
    // RIB rib 
    // BLOQUE isBloque
    // VILLE REGISTRE COMMERCE villeRegistreCommerce
    // PATTENTE pattente


    {
        key : 'dateFournisseur',
        label: 'DATE FOURNISSEUR',

    },
    {
        key : "nom",
        label: 'NOM',

    },
    {
        key : 'adresse',
        label: 'ADRESSE',

    },
    {
        key : 'ville',
        label: 'VILLE',

    },
    {
        key : 'ice',
        label: 'ICE',

    },
    {
        key:null,
        label: 'RESPONSABLE',
    },
    {
        key : 'idFiscale',
        label: 'ID FISCALE',

    },
    {
        key : 'denominationSocial',
        label: 'DENOMINATION SOCIALE',

    },
    {
        key : 'rib',
        label: 'RIB',

    },
    {
        key : 'villeRegistreCommerce',
        label: 'VILLE REGISTRE COMMERCE',

    },
    {
        key : 'pattente',
        label: 'PATTENTE',

    },
    {
        key : 'isBloque',
        label: 'BLOQUE',

    },



]
const ChgLayout :ILayout[] =[
    // DATE CHARGE null


    // DESIGNATION designation

    // GROUPE PRODUCTIVITE " "

    // GROUPE EXPLOITATION null

    // CATEGORIE " "


    // EMMAGASINABLE emmagasinable

    // RECUPERABLE recupable

    // TRANSPORTABLE transportable

    // PRIX U. HT (STANDARD) prixUnitaire

    // TAUX TVA tva

    // PRIX U. TTC prixUnitaireTtc
    // ARCHIVE  isArchive
    // BLOQUE  isBloque


    {
        key : null,
        label: 'DATE CHARGE',

    },
    {
        key : "designation",
        label: 'DESIGNATION',

    },
    {
        key:null,
        label: 'GROUPE PRODUCTIVITE',
    },
    {
        key:null,
        label: 'GROUPE EXPLOITATION',
    },
    {
        key:null,
        label: 'CATEGORIE',
    },
    {
        key : 'emmagasinable',
        label: 'EMMAGASINABLE',

    },
    {
        key : 'recupable',
        label: 'RECUPERABLE',

    },
    {
        key : 'transportable',
        label: 'TRANSPORTABLE',

    },
    {
        key : 'prixUnitaire',
        label: 'PRIX U. HT (STANDARD)',

    },
    {
        key : 'tva',
        label: 'TAUX TVA',

    },
    {
        key : 'prixUnitaireTtc',
        label: 'PRIX U. TTC',

    },
    {
        key : 'isArchive',
        label: 'ARCHIVE',

    },
    {
        key : 'isBloque',
        label: 'BLOQUE',

    },
]
const ExploitationLayout :ILayout[] =[

]
const CmtLayout :ILayout[] =[
//     SOLDE GENERAL

// SOLDE EN COURS

// SOLDE CONSTATE
]







const CmfTitleLayout :TLayout ={
    ref : 'id',
    date : 'dateCmf',
}
const RcfTitleLayout :TLayout ={
    ref : 'reference',
    date : 'dateRcf',
}
const FcfTitleLayout :TLayout ={
    ref : 'reference',
    date : 'dateFcf',
}
const PmfTitleLayout :TLayout ={
    ref : 'refOperation',
    date : 'datePmf',
}
const FrsTitleLayout :TLayout ={
    ref : 'id',
    date : 'dateFournisseur',
}
const ChgTitleLayout :TLayout ={
    ref : 'id',
    date : null,
}
const ExploitationTitleLayout :TLayout ={
    ref : null,
    date : null,
}
const CmtTitleLayout :TLayout ={
    ref : null,
    date : null,
}





















const DdfTitleLayout :TLayout ={
    ref : 'id',
    date : 'dateDdf',


}


const DvfTitleLayout :TLayout ={
    ref : 'reference',
    date : 'dateDvf',

}

const BsnTitleLayout :TLayout ={
    date : 'datePrevu',
    ref : 'id',

}

const BdgTitleLayout :TLayout ={
    

        date : 'dateOuverture',
   

        ref : 'refProject',

}
const AvTitleLayout :TLayout =
    
    {
        date : 'dateDebut',

        ref: 'reference',

    }



export {AvLayout, AvTitleLayout ,
     BdgLayout , BdgTitleLayout 
    , BsnLayout , BsnTitleLayout ,
    DvfLayout , DvfTitleLayout
    , DdfLayout , DdfTitleLayout,
    CmfLayout , CmfTitleLayout,
    RcfLayout , RcfTitleLayout,
    FcfLayout , FcfTitleLayout,
    PmfLayout , PmfTitleLayout,
    FrsLayout , FrsTitleLayout,
    ChgLayout , ChgTitleLayout,
    
}
export type {ILayout,TLayout}
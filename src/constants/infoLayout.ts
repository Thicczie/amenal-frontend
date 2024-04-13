
 interface ILayout {
    key :string;
    label:string;

}


 interface TLayout {
    ref :string;
    date:string;

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
        key : "charge.designation",
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
        key : 'tache.project.project',
        label: 'PROJET',

    },
    {
        key : 'tache.lot.lot',
        label: 'LOT',

    },
    {
        key : 'tache',
        label: 'TACHE',

    },
]


const BsnTitleLayout :TLayout ={
    date : 'datePrevu',
    ref : 'charge.designation',

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



const  ProduitLayout :ILayout[] =[

];
const  LotLayout :ILayout[] =[];
const TacheLayout:ILayout[] =[];


export {AvLayout, BdgLayout , AvTitleLayout , BdgTitleLayout , BsnLayout , BsnTitleLayout }
export type {ILayout,TLayout}
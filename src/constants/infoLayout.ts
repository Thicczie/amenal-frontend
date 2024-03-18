
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


export {AvLayout, BdgLayout , AvTitleLayout , BdgTitleLayout} 
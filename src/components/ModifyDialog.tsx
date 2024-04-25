import React, { useEffect } from 'react'
import { Fields, avenantFields, bsnFields, budgetFields, chgFields, cmfFields, ddfFields, detailChargeFormFields, detailDelaiFormFields, detailProduitFormFields, detailQualiteFormFields, dvfFields, fcfFields, frsFields, lotFields, pmfFields, produitFields, rcfFields, tacheFields } from '../constants/FormFields';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddForm from '../pages/AddForm';
import { IonButton } from '@ionic/react';
import { MRT_EditActionButtons, MRT_Row, MRT_TableInstance } from 'material-react-table';
import ModifyForm from './ModifyForm';

type Props = {

    currentForm: string;
    row:MRT_Row<any>
    table:MRT_TableInstance<any>
}

const ModifyDialogButton:React.FC<Props> = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    console.log('row', props.row.original , 'table');
    const currentFormField =getFormFields(props.currentForm);
    console.log('currentFormField', props.currentForm);
    

    function getFormFields(currentForm:string):any{  

      switch(props.currentForm){
        case "lot":
          return lotFields;
          
        case "produit":
          return produitFields;
          
        case "tache":
          return tacheFields;
          
        case "detailProduit":
          return detailProduitFormFields;
          
        case "detailCharge":
          return detailChargeFormFields;
          
        case "detailDelai":
          return detailDelaiFormFields;
          
        case "detailQualite":
          return detailQualiteFormFields;
        
        case "avenant":
          return avenantFields;
        case "budget":
          return budgetFields;
        case 'bsn':
        return bsnFields;
        case 'frs':
          return frsFields;
        case 'chg':
          return chgFields
        case 'cmf':
          return cmfFields
        case 'ddf':
          return ddfFields
        case 'dvf':
          return dvfFields
        case 'fcf':
          return fcfFields
        case 'pmf':
          return pmfFields
        case 'rcf':
          return rcfFields
        
          
        default:
          return avenantFields;
          
      }
  
  }

    
    
  return (
   <>
    
   
    <DialogTitle>Edit</DialogTitle>
    <DialogContent>
    <ModifyForm formFields={currentFormField} currentForm={props.currentForm} table={props.table} row={props.row} />
    </DialogContent>

  
   </>
  )
}

export default ModifyDialogButton
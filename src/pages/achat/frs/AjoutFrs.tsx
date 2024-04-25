import React from 'react';
import Ajout from '../../Ajout';
import { frsFields } from '../../../constants/FormFields';

type Props = {}

const AjoutFrs:React.FC = (props: Props) => {
  return (
    <Ajout FormName="fournisseur" formFields={frsFields} />
  
  )
}

export default AjoutFrs
import React from 'react';
import Ajout from '../../Ajout';
import { pmfFields } from '../../../constants/FormFields';

type Props = {}

const AjoutPmf:React.FC = (props: Props) => {
  return (
    <Ajout FormName="paiement" formFields={pmfFields} />
  
  )
}

export default AjoutPmf
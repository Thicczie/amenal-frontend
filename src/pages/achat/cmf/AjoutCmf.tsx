import React from 'react';
import Ajout from '../../Ajout';
import { cmfFields } from '../../../constants/FormFields';

type Props = {}

const AjoutCmf:React.FC = (props: Props) => {
  return (
    <Ajout FormName="commande" formFields={cmfFields} />
  
  )
}

export default AjoutCmf
import React from 'react';
import Ajout from '../../Ajout';
import { rcfFields } from '../../../constants/FormFields';

type Props = {}

const AjoutRcf:React.FC = (props: Props) => {
  return (
    <Ajout FormName="recuPaiement" formFields={rcfFields} />
  
  )
}

export default AjoutRcf
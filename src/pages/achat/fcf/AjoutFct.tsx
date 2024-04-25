import React from 'react';
import Ajout from '../../Ajout';
import { fcfFields } from '../../../constants/FormFields';

type Props = {}

const AjoutFct:React.FC = (props: Props) => {
  return (
    <Ajout FormName="facture" formFields={fcfFields} />
  
  )
}

export default AjoutFct
import React from 'react';
import Ajout from '../../Ajout';
import { dvfFields } from '../../../constants/FormFields';

type Props = {}

const AjoutDvf:React.FC = (props: Props) => {
  return (
    <Ajout FormName="devis" formFields={dvfFields} />
  
  )
}

export default AjoutDvf
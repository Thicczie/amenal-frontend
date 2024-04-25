import React from 'react';
import Ajout from '../../Ajout';
import { ddfFields } from '../../../constants/FormFields';

type Props = {}

const AjoutDdf:React.FC = (props: Props) => {
  return (
    <Ajout FormName="demandeDevis" formFields={ddfFields} />
  
  )
}

export default AjoutDdf
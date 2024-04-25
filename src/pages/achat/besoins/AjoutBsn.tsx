import React from 'react';
import Ajout from '../../Ajout';
import { bsnFields } from '../../../constants/FormFields';

type Props = {}

const AjoutBsn:React.FC = (props: Props) => {
  return (
    <Ajout FormName="besoin" formFields={bsnFields} />
  
  )
}

export default AjoutBsn
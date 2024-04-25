import React from 'react';
import Ajout from '../../Ajout';
import { chgFields } from '../../../constants/FormFields';

type Props = {}

const AjoutChg:React.FC = (props: Props) => {
  return (
    <Ajout FormName="chargeStandard" formFields={chgFields} />
  
  )
}

export default AjoutChg
import React from 'react'
import Ajout from '../Ajout'
import { budgetFields, tacheFields } from '../../constants/FormFields'

type Props = {}

const AjoutBdg:React.FC = (props: Props) => {
  return (
    <Ajout FormName="budget" formFields={budgetFields} />
  
  )
}

export default AjoutBdg
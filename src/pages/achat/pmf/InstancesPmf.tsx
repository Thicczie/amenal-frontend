import React from 'react'
import AchatElemInstance from '../AchatElemInstance'
import { getPaiements } from '../../../api/achat/achat_api'

type Props = {}

const InstancesPmf:React.FC = (props: Props) => {
  return (
    <AchatElemInstance FetchFct={getPaiements} PathTo='/pmf/info' tableName='pmf'/>
  )
}

export default InstancesPmf
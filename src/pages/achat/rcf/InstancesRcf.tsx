import React from 'react'
import AchatElemInstance from '../AchatElemInstance'
import { getReceptions } from '../../../api/achat/achat_api'

type Props = {}

const InstancesRcf:React.FC = (props: Props) => {
  return (
    <AchatElemInstance FetchFct={getReceptions} PathTo='/rcf/info' tableName='rcf'/>
  )
}

export default InstancesRcf
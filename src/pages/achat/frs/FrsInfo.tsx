import React from 'react'
import AchatElemInfo from '../AchatElemInfo'
import { FrsTitleLayout, FrsLayout } from '../../../constants/infoLayout'

type Props = {}

const FrsInfo:React.FC = (props: Props) => {
  return (
    <AchatElemInfo Title='FRS' TitleLayout={FrsTitleLayout} InfoLayout={FrsLayout} />
  )
}

export default FrsInfo
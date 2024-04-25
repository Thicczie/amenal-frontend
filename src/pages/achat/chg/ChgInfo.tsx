import React from 'react'
import AchatElemInfo from '../AchatElemInfo'
import { ChgTitleLayout, ChgLayout } from '../../../constants/infoLayout'

type Props = {}

const ChgInfo:React.FC = (props: Props) => {
  return (
    <AchatElemInfo Title='CHG' TitleLayout={ChgTitleLayout} InfoLayout={ChgLayout} />
  )
}

export default ChgInfo
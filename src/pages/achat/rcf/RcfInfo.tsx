import React from 'react'
import AchatElemInfo from '../AchatElemInfo'
import { RcfTitleLayout, RcfLayout } from '../../../constants/infoLayout'

type Props = {}

const RcfInfo:React.FC = (props: Props) => {
  return (
    <AchatElemInfo Title='RCF' TitleLayout={RcfTitleLayout} InfoLayout={RcfLayout} />
  )
}

export default RcfInfo
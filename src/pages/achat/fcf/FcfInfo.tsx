import React from 'react'
import AchatElemInfo from '../AchatElemInfo'
import { FcfTitleLayout, FcfLayout } from '../../../constants/infoLayout'

type Props = {}

const FcfInfo:React.FC = (props: Props) => {
  return (
    <AchatElemInfo Title='FCF' TitleLayout={FcfTitleLayout} InfoLayout={FcfLayout} />
  )
}

export default FcfInfo
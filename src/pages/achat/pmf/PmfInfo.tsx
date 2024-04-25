import React from 'react'
import AchatElemInfo from '../AchatElemInfo'
import { PmfTitleLayout, PmfLayout } from '../../../constants/infoLayout'

type Props = {}

const PmfInfo:React.FC = (props: Props) => {
  return (
    <AchatElemInfo Title='PMF' TitleLayout={PmfTitleLayout} InfoLayout={PmfLayout} />
  )
}

export default PmfInfo
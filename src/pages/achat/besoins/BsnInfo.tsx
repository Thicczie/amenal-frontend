import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'
import InfoCard from '../../../components/InfoCard'
import TableCard from '../../../components/TableCard'
import { BsnLayout, BsnTitleLayout } from '../../../constants/infoLayout'
import useColumns from '../../../hooks/useColumns'
import { fabClasses } from '@mui/material'
import AchatElemInfo from '../AchatElemInfo'

type Props = {}

const BsnInfo:React.FC = (props: Props) => {
  //   const {id , details}:any=useHistory().location.state ?? {};
  //   const detailsBesoinsColumns=useColumns(details)


  // return (
  //   <IonPage>
  //   <IonHeader>
  //         <IonToolbar>
  //         <IonButtons slot='start'>
  //           <IonBackButton></IonBackButton>
  //       </IonButtons>
  //   <IonTitle >Infos</IonTitle>
  
  //         </IonToolbar>
  //       </IonHeader>
  //   <IonContent >

  //   <InfoCard currentInfo='BSN' TitleLayout={BsnTitleLayout} Layout={BsnLayout} />
  //   <TableCard title='details'  columns={detailsBesoinsColumns} data={details} isPending={false} isError={false}  />

    
  //   </IonContent>
  //   </IonPage>  )
  return <AchatElemInfo Title='BSN' InfoLayout={BsnLayout} TitleLayout={BsnTitleLayout} />
}

export default BsnInfo
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'
import InfoCard from '../../../components/InfoCard'
import TableCard from '../../../components/TableCard'
import { DvfLayout, DvfTitleLayout } from '../../../constants/infoLayout'
import useColumns from '../../../hooks/useColumns'
import AchatElemInfo from '../AchatElemInfo'


type Props = {}

const DvfInfo:React.FC = (props: Props) => {
  //   const {id , details}:any=useHistory().location.state ?? {};
  //   const detailsDevissColumns=useColumns(details)


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

  //   <InfoCard currentInfo='DVF' TitleLayout={DvfTitleLayout} Layout={DvfLayout} />
  //   <TableCard title='details'  columns={detailsDevissColumns} data={details} isPending={false} isError={false}  />

    
  //   </IonContent>
  //   </IonPage>  )

  return <AchatElemInfo Title='DVF' TitleLayout={DvfTitleLayout} InfoLayout={DvfLayout} />
}

export default DvfInfo
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'
import InfoCard from '../../../components/InfoCard'
import TableCard from '../../../components/TableCard'
import { DdfLayout, DdfTitleLayout } from '../../../constants/infoLayout'
import useColumns from '../../../hooks/useColumns'
import AchatElemInfo from '../AchatElemInfo'


type Props = {}

const DdfInfo:React.FC = (props: Props) => {
    // const {id , details}:any=useHistory().location.state ?? {};
    // const detailsDemandeDevissColumns=useColumns(details)


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

  //   <InfoCard currentInfo='DVF' TitleLayout={DdfTitleLayout} Layout={DdfLayout} />
  //   <TableCard title='details'  columns={detailsDemandeDevissColumns} data={details} isPending={false} isError={false}  />

    
  //   </IonContent>
  //   </IonPage>  )

  return <AchatElemInfo Title='DDF' InfoLayout={DdfLayout} TitleLayout={DdfTitleLayout} />
}

export default DdfInfo
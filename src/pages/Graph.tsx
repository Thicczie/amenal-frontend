import React from 'react'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonSpinner,
    IonPopover,
    IonList,
    IonItem,
    IonNavLink,
    IonButton,
    IonBackButton
    } from '@ionic/react'
import { MRT_TableInstance } from 'material-react-table';
import { useHistory } from 'react-router';
import Chart from '../components/Chart';
import { useAppContext } from '../contexts/AppContext';



const Graph:React.FC = () => {

const { tableRows }:any = useHistory().location.state ?? {};



//console.log('tablerows designations ' , tableRows?.map((row:any)=>row?.lot ? row.lot : null));

console.log('tablrows ',tableRows);













  
  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle>Page Two</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">

      <Chart tableRows={tableRows} />
  </IonContent>
  </IonPage>
  )
}

export default Graph

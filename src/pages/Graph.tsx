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



const Graph:React.FC = () => {

const { tableRows }:any = useHistory().location.state ?? {};



  
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
    <h1>Page Two</h1>

  </IonContent>
  </IonPage>
  )
}

export default Graph

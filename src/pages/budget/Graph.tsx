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
import Chart from '../../components/Chart';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useParams } from 'react-router-dom';


const Graph:React.FC = () => {

//const { tableRows }:any = useHistory().location.state ?? {};

const {tableRows}:any = useLocation().state ?? {};
const {projectId, avenantId}=useParams();

console.log('tablerows designations ', tableRows?.map((row:any)=>row.designation));


console.log('projectId ', projectId , 'avenantId ', avenantId , 'state ' ,useLocation().state);












  
  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle>Graph</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">

      <Chart projectId={projectId} avenantId={avenantId} tableRows={tableRows} />
  </IonContent>
  </IonPage>
  )
}

export default Graph

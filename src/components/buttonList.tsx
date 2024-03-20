import React from 'react'
import{
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
    IonNav
    } from '@ionic/react'
import Graph from '../pages/Graph'



const buttonList :React.FC = () => {
  const navRef=React.useRef<HTMLIonNavElement>(null);
  const Navigate=()=>{
       navRef.current?.push('/graph');
    }
  return (

<>
    <button id='export-trigger' type="button" className=" dark:bg-ion-dark  text-white  bg-ion-primary hover:bg-ion-primary-tint dark:hover:bg-ion-dark-tint focus:bg-ion-primary-shade dark:focus:bg-ion-dark-shade font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Export</button>
    <IonPopover trigger="export-trigger" triggerAction="click">
        <IonContent>
        <IonList>
            <IonItem>Pdf</IonItem>
            <IonItem>Excel</IonItem>
        </IonList>
        </IonContent>
      </IonPopover>


      <button id='view-trigger' type="button" className=" dark:bg-ion-dark  text-white  bg-ion-primary hover:bg-ion-primary-tint dark:hover:bg-ion-dark-tint focus:bg-ion-primary-shade dark:focus:bg-ion-dark-shade font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Graph</button>
    <IonPopover trigger="view-trigger" triggerAction="click">
        <IonContent>
        <IonList>
            <IonItem>Chart</IonItem>
            <IonItem>Gantt</IonItem>
        </IonList>
        </IonContent>
      </IonPopover><button id='add-trigger' type="button" className=" dark:bg-ion-dark  text-white  bg-ion-primary hover:bg-ion-primary-tint dark:hover:bg-ion-dark-tint focus:bg-ion-primary-shade dark:focus:bg-ion-dark-shade font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Add</button>
    <IonPopover trigger="add-trigger" triggerAction="click">
        <IonContent>
        <IonList>
            <IonItem>
                <IonNav ref={navRef} >
                    <IonButton onClick={Navigate} >Observation</IonButton>
                </IonNav>
            </IonItem>
            <IonItem>Document</IonItem>
            <IonItem>Taf</IonItem>
        </IonList>
        </IonContent>
      </IonPopover>
</>
  )
}

export default buttonList

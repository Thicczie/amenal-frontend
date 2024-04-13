import { IonButtons, IonCard, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCardTitle,
} from "@ionic/react";
import Table from "../components/Table";

//this will display the list of all the vaidated instances of a budget

const Listes: React.FC = () => {
  return  <IonPage>
  <IonHeader>
  <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonMenuButton  />
          </IonButtons>

          <IonTitle>Listes</IonTitle>

        </IonToolbar>
      </IonHeader>  </IonHeader>
  <IonContent>
   
    
  </IonContent>
  </IonPage>;
};

export default Listes;

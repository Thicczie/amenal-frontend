
import React from "react";
import {

  IonButtons,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

//this will display the form for adding a new instance of a budget

const Ajout: React.FC = () => {
  return   <IonPage>
    <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonMenuButton  />
          </IonButtons>

          <IonTitle>Ajout</IonTitle>

        </IonToolbar>
      </IonHeader>
  <IonContent>
    <div >ajout</div>
</IonContent>
</IonPage>
};

export default Ajout;

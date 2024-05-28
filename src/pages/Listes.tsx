import {
  IonButtons,
  IonCard,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { IonContent, IonHeader, IonPage, IonCardTitle } from "@ionic/react";
import Table from "../components/Table";
import SideMenuButton from "../components/SideMenu";
import PageHeader from "../components/PageHeader";

//this will display the list of all the vaidated instances of a budget

const Listes: React.FC = () => {
  return (
    <IonPage>
      <PageHeader title="Listes" />
      <IonContent></IonContent>
    </IonPage>
  );
};

export default Listes;

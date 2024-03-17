
import React from "react";

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
} from "@ionic/react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import Ajout from "../pages/Ajout";
import Listes from "../pages/Listes";
import Instances from "../pages/Instances";

const CompteBdg :React.FC = () => {


  return <>
  
  
    <IonTabs>

      <IonRouterOutlet >
        <Route exact path="/budget/ajout" component={Ajout} />
        <Route exact path="/budget/instances" component={Instances} />
        <Route exact path="/budget/listes" component={Listes} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/budget/ajout">
          <IonLabel>Ajout</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/budget/instances">
          <IonLabel>Instances</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/budget/listes">
          <IonLabel>Listes</IonLabel>
        </IonTabButton>
      </IonTabBar>

</IonTabs>
  </>
  
};

export default CompteBdg;

import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/react'
import React from 'react'
import { Route } from 'react-router'
import InstancesBsn from './besoins/InstancesBsn'

type Props = {
 
}

const Besoins:React.FC<Props> =(props:Props) =>{
  return (
    <IonTabs>

    <IonRouterOutlet >
    <Route exact path="/achat/instances" component={InstancesBsn} />
      <Route exact path="/achat/ajout" component={InstancesBsn} />
      <Route exact path="/achat/listes" component={InstancesBsn} />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/achat/ajout">
        <IonLabel>Ajout</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/achat/instances">
        <IonLabel>Instances</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/achat/listes">
        <IonLabel>Listes</IonLabel>
      </IonTabButton>
    </IonTabBar>

</IonTabs>   )
}

export default Besoins
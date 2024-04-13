import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/react'
import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router'
import InstancesBsn from './besoins/InstancesBsn'

type Props = {
 
}

const Besoins:React.FC<Props> =(props:Props) =>{

  // const history = useHistory();
  // useEffect(() => {
  //   history.push('/achat/bsn/instances'); // Navigate to the instances route when component mounts
  // }, []);


  return (
    <IonTabs>

    <IonRouterOutlet >
    <Route exact path="/achat/bsn/instances" component={InstancesBsn} />
      <Route exact path="/achat/bsn/ajout" component={InstancesBsn} />
      <Route exact path="/achat/bsn/listes" component={InstancesBsn} />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/achat/bsn/ajout">
        <IonLabel>Ajout</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/achat/bsn/instances">
        <IonLabel>Instances</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/achat/bsn/listes">
        <IonLabel>Listes</IonLabel>
      </IonTabButton>
    </IonTabBar>

</IonTabs>   )
}

export default Besoins
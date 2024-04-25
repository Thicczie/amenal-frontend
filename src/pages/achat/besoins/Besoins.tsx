import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/react'
import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router'
import InstancesBsn from './InstancesBsn'
import Listes from '../../Listes'
import Ajout from '../../Ajout'
import AjoutBsn from './AjoutBsn'
import BottomTabs from '../../../components/BottomTabs'
import { useNavigate } from 'react-router-dom'

type Props = {
 
}

const Besoins:React.FC<Props> =(props:Props) =>{

  const navigate = useNavigate();

  useEffect(() => {
    navigate('instances');
  }, [navigate]);

  return (
//     <IonTabs>

//     <IonRouterOutlet >
//       <Route exact path="/bsn/instances" component={InstancesBsn} />
//       <Route exact path="/bsn/ajout" component={AjoutBsn} />
//       <Route exact path="/bsn/listes" component={Listes} />
//     </IonRouterOutlet>

//     <IonTabBar slot="bottom">
//       <IonTabButton tab="tab1" href="/bsn/ajout">
//         <IonLabel>Ajout</IonLabel>
//       </IonTabButton>
//       <IonTabButton tab="tab2" href="/bsn/instances">
//         <IonLabel>Instances</IonLabel>
//       </IonTabButton>
//       <IonTabButton tab="tab3" href="/bsn/listes">
//         <IonLabel>Listes</IonLabel>
//       </IonTabButton>
//     </IonTabBar>

// </IonTabs> 
<BottomTabs module='bsn' />
  )
}

export default Besoins
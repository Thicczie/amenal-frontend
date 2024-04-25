import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/react'
import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router'

import Listes from '../../Listes'
import Ajout from '../../Ajout'
import InstancesCmf from './InstancesCmf'
import AjoutCmf from './AjoutCmf'
import BottomTabs from '../../../components/BottomTabs'
import { useNavigate } from 'react-router-dom'

type Props = {
 
}

const Cmfs:React.FC<Props> =(props:Props) =>{
  const navigate = useNavigate();

  useEffect(() => {
    navigate('instances');
  }, [navigate]);

  return <>
  <BottomTabs module='cmf' />
</>

}

export default Cmfs
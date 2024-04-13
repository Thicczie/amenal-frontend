import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton } from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Route } from 'react-router'
import { getBesoins } from '../../../api/achat/achat_api'
import useColumns from '../../../hooks/useColumns'
import InfoCard from '../../../components/TableCard'

type Props = {}

const InstancesBsn:React.FC = (props: Props) => {

    const besoins = useQuery({
    queryKey: ['besoins'],
    queryFn: getBesoins,
    })


    const besoinsColumns = useColumns(besoins?.data?.data as any[])

    const handleRowClick = (row:any) => {
        console.log(row?.original)
    }

  return (
    <IonPage>
  <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonMenuButton  />
          </IonButtons>

          <IonTitle>Instances</IonTitle>

        </IonToolbar>
      </IonHeader>
  <IonContent class="ion-padding">


<InfoCard  columns={besoinsColumns} data={besoins?.data?.data as any[]} isPending={besoins.isLoading} isError={besoins.isError}
        handleRwoClick={handleRowClick} 
/>


  </IonContent>
  </IonPage>
   )
}

export default InstancesBsn
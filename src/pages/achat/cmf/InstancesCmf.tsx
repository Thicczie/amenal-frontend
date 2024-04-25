import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonSpinner } from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Route, useHistory, useParams } from 'react-router'
import { getBesoins, getCommandes, getDemandesDevis, getDeviss } from '../../../api/achat/achat_api'
import useColumns from '../../../hooks/useColumns'
import InfoCard from '../../../components/TableCard'
import Table from '../../../components/Table'
import CmfInfo from './CmfInfo'
import AchatElemInstance from '../AchatElemInstance'

type Props = {

}

const InstancesCmf:React.FC<Props> = (props: Props) => {

//     const cmf = useQuery({
//     queryKey: ['cmf'],
//     queryFn: getCommandes,
//     })


//     const cmfColumns = useColumns(cmf?.data?.data as any[])

//     const route = useHistory();

//     const handleRowClick = (row:any) => {
//         console.log(row?.original)

//         // TODO : do not hardcode this
//         let id=row?.original?.id
//         let detailRow = row?.original;
//         let detail :any[]=[row?.original?.besoin , row?.original?.devis]
//         //let detail=row?.original.devis;
//       //  const rowchildren= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value );
//      const rowchildren= Object.entries(row.original).filter(([key, value]) =>  typeof value === 'object').map(([key, value]) => [key,value] );

//      console.log("rowchildren",rowchildren)


//    route.push({ pathname: "/info"  , state: { id:id , details:rowchildren } });

//     }

//   return (
//     <IonPage>
      
//   <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//           <IonMenuButton  />
//           </IonButtons>

//           <IonTitle>Instances</IonTitle>

//         </IonToolbar>
//       </IonHeader>
//   <IonContent >

// {cmf.isLoading ?(
//                    <IonSpinner className=' flex justify-center items-center ' name="crescent"></IonSpinner>

// ) 
// :(

// <Table enableEditing={false} hideColumns columns={cmfColumns} data={cmf?.data?.data as any[]} onRowClick={handleRowClick} />

// ) 
// }



//   </IonContent>
//   </IonPage>
//    )

return <AchatElemInstance FetchFct={getCommandes} PathTo='/cmf/info' tableName='cmf'  />
}

export default InstancesCmf
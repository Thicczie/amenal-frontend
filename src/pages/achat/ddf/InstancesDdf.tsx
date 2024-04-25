import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonSpinner } from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Route, useHistory, useParams } from 'react-router'
import { getBesoins, getDemandesDevis, getDeviss } from '../../../api/achat/achat_api'
import useColumns from '../../../hooks/useColumns'
import InfoCard from '../../../components/TableCard'
import Table from '../../../components/Table'
import AchatElemInstance from '../AchatElemInstance'

type Props = {}

const InstancesDdf:React.FC = (props: Props) => {

//     const ddf = useQuery({
//     queryKey: ['ddf'],
//     queryFn: getDemandesDevis,
//     })


//     const ddfColumns = useColumns(ddf?.data?.data as any[])

//     const route = useHistory();

//     const handleRowClick = (row:any) => {
//         console.log(row?.original)

//         // TODO : do not hardcode this
//         let id=row?.original?.id
//         let details=Object.entries(row?.original).filter(([key, value]) =>  typeof value === 'object').map(([key, value]) => [key,value] );
//         route.push({ pathname: "/ddf/info"  , state: { id:id , details:details } });

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


// {ddf.isLoading ?(
//                    <IonSpinner className=' flex justify-center items-center ' name="crescent"></IonSpinner>

// ) 
// :(
// <Table enableEditing={false} hideColumns columns={ddfColumns} data={ddf?.data?.data as any[]} onRowClick={handleRowClick} />

// ) 
// }



//   </IonContent>
//   </IonPage>
//    )

return <AchatElemInstance FetchFct={getDemandesDevis} PathTo='/ddf/info' tableName='ddf'/>
}

export default InstancesDdf
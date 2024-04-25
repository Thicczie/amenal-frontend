import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonSpinner } from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Route, useHistory, useParams } from 'react-router'
import { getBesoins } from '../../../api/achat/achat_api'
import useColumns from '../../../hooks/useColumns'
import InfoCard from '../../../components/TableCard'
import Table from '../../../components/Table'
import AchatElemInstance from '../AchatElemInstance'

type Props = {}

const InstancesBsn:React.FC = (props: Props) => {

//     const besoins = useQuery({
//     queryKey: ['besoins'],
//     queryFn: getBesoins,
//     })


//     const besoinsColumns = useColumns(besoins?.data?.data as any[])

//     const route = useHistory();

//     const handleRowClick = (row:any) => {
//         console.log(row?.original)
//         let id=row?.original?.id
//         let details=row?.original?.detailBesoins
//         route.push({ pathname: "/bsn/info"  , state: { id:id , details:details } });

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


// {besoins.isLoading ?(
//                    <IonSpinner className=' flex justify-center items-center ' name="crescent"></IonSpinner>

// ) 
// :(
// <Table enableEditing={false} hideColumns columns={besoinsColumns} data={besoins?.data?.data as any[]} onRowClick={handleRowClick} />

// ) 
// }



//   </IonContent>
//   </IonPage>
//    )
return <AchatElemInstance FetchFct={getBesoins} PathTo='/bsn/info' tableName='bsn' />
}

export default InstancesBsn
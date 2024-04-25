import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonSpinner } from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Route, useHistory, useParams } from 'react-router'
import useColumns from '../../hooks/useColumns'
import Table from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import SideMenu from '../../components/SideMenu'
import SideMenuButton from '../../components/SideMenu'

type Props = {
    FetchFct:(...args: any[]) => any;
    PathTo:string;
    tableName:string;
}

const AchatElemInstance:React.FC<Props> = (props: Props) => {

    const instances = useQuery({
    queryKey: ['instances'],
    queryFn: props.FetchFct,
    })


    const instancesColumns = useColumns(instances?.data?.data as any[])

    const navigate = useNavigate();

    const handleRowClick = (row:any) => {
        let id=row?.original?.id
        let details=Object.entries(row?.original).filter(([key, value]) =>  typeof value === 'object').map(([key, value]) => [key,value] );
      // route.push({ pathname: props.PathTo  , state: { id:id , details:details } });
      navigate(`../info/${id}` , { state: { details:details } })
    }

  return (
    <IonPage>
  <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonMenuButton  />
          <SideMenuButton/>
          </IonButtons>

          <IonTitle>Instances</IonTitle>

        </IonToolbar>
      </IonHeader>
  <IonContent >


{instances.isLoading ?(
                   <IonSpinner className=' flex justify-center items-center ' name="crescent"></IonSpinner>

) 
:(
<Table tableName={props.tableName} enableEditing={true} enableXlsxUpload={false} hideColumns={false}  columns={instancesColumns} data={instances?.data?.data as any[]} onRowClick={handleRowClick} />

) 
}



  </IonContent>
  </IonPage>
   )
}

export default AchatElemInstance
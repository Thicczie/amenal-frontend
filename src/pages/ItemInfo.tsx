import React from 'react'
import{
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    } from "@ionic/react";

    import { useHistory } from "react-router";

import { useQuery } from '@tanstack/react-query';
import { getAvenantsByProjectId } from '../api/api';
import useColumns from '../hooks/useColumns';
import InfoCard from '../components/InfoCard';
import TableCard from '../components/TableCard';
import { useAppContext } from '../contexts/AppContext';
import { BdgLayout, BdgTitleLayout } from '../constants/infoLayout';



//this is the BDG screen 

const ItemInfo :React.FC = () => {

    const { AllRowData , displayedRowData , currrentScreen} :any = useHistory().location.state ?? {}; 
    const {projectId,setAvenantId}=useAppContext();



    const { isPending, isError, data } = useQuery({
      queryKey: ['avenants',projectId],
      queryFn: ()=> getAvenantsByProjectId(projectId),
    })


    const columns = useColumns(data);
    const route = useHistory();




    const handleRowClick = (row:any) => {
      setAvenantId(row.original.id);
     route.push({ pathname: "/iteminfo/iteminfodetail"  , state: { AllRowData: row.original , displayedRowData: row._valuesCache   } });
  
    };


  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
    <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
        </IonButtons>
    <IonTitle >infos </IonTitle>

    </IonToolbar>
  </IonHeader>
  <IonContent>

   <InfoCard  TitleLayout={BdgTitleLayout} Layout={BdgLayout} currentInfo={"BDG"}/>
   <TableCard title='Avenants'   data={data} isError={isError} isPending={isPending} columns={columns} 
   handleRwoClick={handleRowClick} 
   enableEditing={true}
   />


</IonContent>
</IonPage>
  )
}

export default ItemInfo
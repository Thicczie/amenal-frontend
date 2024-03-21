
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'
import { useHistory } from 'react-router';

import { getProduitTableByAvenantId,getLotTableByAvenantId,getTacheTableByAvenantId } from '../api/api';
import { useQueries, useQuery } from '@tanstack/react-query';
import TableCard from '../components/TableCard';
import useColumns from '../hooks/useColumns';
import InfoCard from '../components/InfoCard';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '@mui/material';
import ButtonList from '../components/buttonList';


type Props = {}

//this is the AV screen
const ItemDetails:React.FC = () => {

  const { AllRowData ,displayedRowData }:any = useHistory().location.state ?? {};
  const {currentTable, setCurrentTable} = useAppContext();
  const {projectId,avenantId ,currentCharge ,setInfoProduit}=useAppContext();




  const { isPending, isError, data } = useQuery({
    queryKey: ['TableByAvenantId',currentTable],
    queryFn: ()=> fetchTable(currentTable,avenantId,currentCharge),
  })


  const route = useHistory();
  const handleRowClick = (row:any) => {

    const rowchildren= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0];
    if (currentTable=='produit') setInfoProduit({idproduit:row.original?.id,designationProduit:row.original?.designation})
    if((rowchildren as any[])?.length > 0) {
      route.push({pathname:'/details',state:{AllRowData:row.original,displayedRowData:row._valuesCache , currentTable:currentTable,
        tableName:"parent"
      }})
    
    }

  }





  const columns = useColumns(data);

  const fetchTable = (currentTable :string, avenantId:string|number|null ,charge :string|null) => {
    switch (currentTable) {
      case 'produit':
        return getProduitTableByAvenantId(avenantId, charge);
      case 'lot':
        return getLotTableByAvenantId(avenantId, charge);
      case 'tache':
        return getTacheTableByAvenantId(avenantId, charge);
      default:
        throw new Error('Invalid table');
    }
  };
  





  return (
    <IonPage>
     <IonHeader>
    <IonToolbar>
    <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
        </IonButtons>
    <IonTitle >Détails</IonTitle>

    </IonToolbar>
  </IonHeader>
    <IonContent>

    <InfoCard AllRowData={AllRowData} displayedData={displayedRowData} currentInfo={"AV"} />

    <div className=' flex-row flex items-center align-middle '>
    <IonSelect
    className=' w-44 mx-4 dark:bg-ion-item-background shadow-md px-2 ' 
    label="Vue par:" interface="popover" 
    onIonChange={(e:any) => setCurrentTable(e.detail.value)}
    selectedText={currentTable}
    >
          <IonSelectOption   value="produit">Produit</IonSelectOption>
          <IonSelectOption value="lot">Lot</IonSelectOption>
          <IonSelectOption value="tache">Tache</IonSelectOption>
        </IonSelect>

    </div>

  


<TableCard data={data} columns={columns} handleRwoClick={handleRowClick} isError={isError} isPending={isPending} 
    title={currentTable.charAt(0).toUpperCase() + currentTable.slice(1)+"s"}
    enableEditing={true}
    enableGraph={true}
/>
    
      
    </IonContent>
  </IonPage>
  )
}

export default ItemDetails


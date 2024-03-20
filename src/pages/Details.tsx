import React, { useEffect } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel,  } from '@ionic/react'
import { useHistory } from 'react-router'
import InfoCard from '../components/InfoCard';
import { getProjects } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { Tab, Table } from '@mui/material';
import useColumns from '../hooks/useColumns';
import TableCard from '../components/TableCard';
import { useAppContext } from '../contexts/AppContext';
import { getFilteredDetailChargeTableByLotAndAvenant, getFilteredDetailChargeTableByLotAndProduitAndAvenant, getFilteredDetailChargeTableByProduitAndAvenant, getFilteredDetailChargeTableByTacheAndAvenant, getFilteredDetailDelaiTableByLotAndAvenant, getFilteredDetailDelaiTableByLotAndProduitAndAvenant, getFilteredDetailDelaiTableByProduitAndAvenant, getFilteredDetailDelaiTableByTacheAndAvenant, getFilteredDetailProduitTableByLotAndAvenant, getFilteredDetailProduitTableByLotAndProduitAndAvenant, getFilteredDetailProduitTableByProduitAndAvenant, getFilteredDetailProduitTableByTacheAndAvenant, getFilteredDetailQualiteTableByLotAndAvenant, getFilteredDetailQualiteTableByLotAndProduitAndAvenant, getFilteredDetailQualiteTableByProduitAndAvenant, getFilteredDetailQualiteTableByTacheAndAvenant } from '../api/detail_api';




const Details:React.FC = () => {


const route = useHistory();
const {currentTable , infoproduit , avenantId} = useAppContext();
const { AllRowData ,displayedRowData , tableName="" }:any = useHistory().location.state ?? {};
const parentId=AllRowData?.id; // id of the parent row produit or lot or tache or lot de produit

const [currentDetailTable ,setCurrentDetailTable]=React.useState<string>("produits");







const filteredvalueschildren = AllRowData? Object.entries(AllRowData).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0]:[];
const currentTableName :string | null= AllRowData? Object.entries(AllRowData).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => key )[0]:"produit";

const columns = useColumns(filteredvalueschildren as any[]);



// dumb hack to switch between details and details2 enables animation transition
const handleRowClick = (row:any) => {

    const rowchildren= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0];
    if((rowchildren as any[])?.length > 0) {
      const tableName :string | null= AllRowData? Object.entries(AllRowData).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => key )[0]:"produit";
      const newPathname = route.location.pathname === '/details' ? '/details2' : '/details';
      route.push({ pathname: newPathname, state:{AllRowData:row.original,displayedRowData:row._valuesCache , tableName:tableName}});
    
    }
}

const  detailsproduits = useQuery({
  queryKey: ['detailsproduits',currentTable,tableName],
  queryFn: ()=> loadProduits(currentTable,tableName),
});


const  detailscharges = useQuery({
  queryKey: ['detailscharges' , currentTable , tableName],
  queryFn: ()=> loadCharges(currentTable,tableName),
  
});


const  detailsdelais = useQuery({
  queryKey: ['detailsdelais',currentTable,tableName],
  queryFn: ()=> loadDelais(currentTable,tableName)
});

const  detailsqualites = useQuery({
  queryKey: ['detailsqualites',currentTable,tableName],
  queryFn: ()=> loadQualites(currentTable,tableName)
});







const detailChargesColumns= useColumns(detailscharges?.data?.data as any[]);
const detailProduitsColumns= useColumns(detailsproduits?.data?.data as any[]);
const detailDelaisColumns= useColumns(detailsdelais?.data?.data as any[]);
const detailQualitesColumns= useColumns(detailsqualites?.data?.data as any[]);









//sigma :false
const loadCharges = ( currentTable:string|null ,tableName:string ="none" ) => {
  if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
          return  getFilteredDetailChargeTableByLotAndProduitAndAvenant(parentId , infoproduit.idproduit)
            
          case "activite":
          return   getFilteredDetailChargeTableByTacheAndAvenant(parentId)
             
          default:          
        return  getFilteredDetailChargeTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            return getFilteredDetailChargeTableByTacheAndAvenant(parentId)
          
          default:
           return  getFilteredDetailChargeTableByLotAndAvenant(parentId,avenantId)
             
      }
  } else if (currentTable === "tache") {
       return  getFilteredDetailChargeTableByTacheAndAvenant(parentId)

  }
}



const loadProduits = ( currentTable:string|null ,tableName:string ="none" ) => {
  if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
          return  getFilteredDetailProduitTableByLotAndProduitAndAvenant(parentId , infoproduit.idproduit)
            
          case "activite":
          return   getFilteredDetailProduitTableByTacheAndAvenant(parentId)
             
          default:          
        return  getFilteredDetailProduitTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            return getFilteredDetailProduitTableByTacheAndAvenant(parentId)
          
          default:
           return  getFilteredDetailProduitTableByLotAndAvenant(parentId,avenantId)
             
      }
  } else if (currentTable === "tache") {
       return  getFilteredDetailProduitTableByTacheAndAvenant(parentId)

  }
}



const loadQualites = ( currentTable:string|null ,tableName:string ="none" ) => {
  if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
          return  getFilteredDetailQualiteTableByLotAndProduitAndAvenant(parentId , infoproduit.idproduit)
          case "activite":
          return   getFilteredDetailQualiteTableByTacheAndAvenant(parentId)
             
          default:          
        return  getFilteredDetailQualiteTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            return getFilteredDetailQualiteTableByTacheAndAvenant(parentId)
          
          default:
           return  getFilteredDetailQualiteTableByLotAndAvenant(parentId,avenantId)
             
      }
  } else if (currentTable === "tache") {
       return  getFilteredDetailQualiteTableByTacheAndAvenant(parentId)

  }
}



const loadDelais = ( currentTable:string|null ,tableName:string ="none" ) => {
  if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
          return  getFilteredDetailDelaiTableByLotAndProduitAndAvenant(parentId , infoproduit.idproduit)
          case "activite":
          return   getFilteredDetailDelaiTableByTacheAndAvenant(parentId)
             
          default:          
        return  getFilteredDetailDelaiTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            return getFilteredDetailDelaiTableByTacheAndAvenant(parentId)
          
          default:
           return  getFilteredDetailDelaiTableByLotAndAvenant(parentId,avenantId)
             
      }
  } else if (currentTable === "tache") {
       return  getFilteredDetailDelaiTableByTacheAndAvenant(parentId)

  }
}
















  





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


<TableCard title={currentTableName} handleRwoClick={handleRowClick} isPending={false} isError={false} data={filteredvalueschildren} columns={columns} />


   <IonSegment
   onIonChange={(e) => {setCurrentDetailTable(e.detail.value as string)}}
   mode='md' 
    value={currentDetailTable}
       >
          <IonSegmentButton value="produits">
                Produits
          </IonSegmentButton>
          <IonSegmentButton value="charges">
            Charges
          </IonSegmentButton>
          <IonSegmentButton value="delais">
            Délais
          </IonSegmentButton>
          <IonSegmentButton value="qualites">
            Qualités
          </IonSegmentButton>
        </IonSegment>

        {currentDetailTable =="produits" && <TableCard data={detailsproduits?.data} columns={detailProduitsColumns} isError={detailsproduits.isError} isPending={detailsproduits.isPending} hideColumns={true} />}       
        {currentDetailTable =="charges" && <TableCard data={detailscharges?.data} columns={detailChargesColumns} isError={detailscharges.isError} isPending={detailscharges.isPending} hideColumns={true} />}
        {currentDetailTable =="delais" && <TableCard data={detailsdelais?.data} columns={detailDelaisColumns} isError={detailsdelais.isError} isPending={detailsdelais.isPending} />}
        {currentDetailTable =="qualites" && <TableCard data={detailsqualites?.data} columns={detailQualitesColumns} isError={detailsqualites.isError} isPending={detailsqualites.isPending} hideColumns={true}/>}
    </IonContent>
 </IonPage>
  )
}

export default Details

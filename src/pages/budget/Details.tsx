import React, { useEffect } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel,  } from '@ionic/react'
import { useHistory } from 'react-router'
import InfoCard from '../../components/InfoCard';
import { getProjects } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { Tab, Table } from '@mui/material';
import useColumns from '../../hooks/useColumns';
import TableCard from '../../components/TableCard';
import { useAppContext } from '../../contexts/AppContext';
import { getFilteredDetailChargeTableByLotAndAvenant, getFilteredDetailChargeTableByLotAndProduitAndAvenant, getFilteredDetailChargeTableByProduitAndAvenant, getFilteredDetailChargeTableByTacheAndAvenant, getFilteredDetailDelaiTableByLotAndAvenant, getFilteredDetailDelaiTableByLotAndProduitAndAvenant, getFilteredDetailDelaiTableByProduitAndAvenant, getFilteredDetailDelaiTableByTacheAndAvenant, getFilteredDetailProduitTableByLotAndAvenant, getFilteredDetailProduitTableByLotAndProduitAndAvenant, getFilteredDetailProduitTableByProduitAndAvenant, getFilteredDetailProduitTableByTacheAndAvenant, getFilteredDetailQualiteTableByLotAndAvenant, getFilteredDetailQualiteTableByLotAndProduitAndAvenant, getFilteredDetailQualiteTableByProduitAndAvenant, getFilteredDetailQualiteTableByTacheAndAvenant } from '../../api/detail_api';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';




const Details:React.FC = () => {


const route = useLocation();
const navigate= useNavigate();
const { infoproduit , setInfoProduit } = useAppContext();


//const { AllRowData ,displayedRowData , tableName="" }:any = useHistory().location.state ?? {};
const {  tableName , currentTable  , avenantId} :any=useParams();
const {AllRowData}:any=route.state ?? {};

const [rowId,setRowId]=React.useState<string|number|null>(null);
const [currentDetailTable ,setCurrentDetailTable]=React.useState<string>("produits");
const cardTitle:string = 'Détails'+' '+ currentDetailTable.charAt(0).toUpperCase() + currentDetailTable.slice(1);


const filteredvalueschildren = AllRowData? Object.entries(AllRowData).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0]:[];
const currentTableName :string | null= AllRowData? Object.entries(AllRowData).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => key )[0]:"produit";

const columns = useColumns(filteredvalueschildren as any[]);



// dumb hack to switch between details and details2 enables animation transition
const handleRowClick = (row:any) => {



    // const rowchildren= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0];
    // if((rowchildren as any[])?.length > 0) {
    //   const tableName :string | null= AllRowData? Object.entries(AllRowData).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => key )[0]:"produit";
    //   const newPathname = route.location.pathname === '/details' ? '/details2' : '/details';
    //   route.push({ pathname: newPathname, state:{AllRowData:row.original,displayedRowData:row._valuesCache , tableName:tableName}});
    
    // }

    // if (currentTable=='produit') setInfoProduit({idproduit:row.original?.id,designationProduit:row.original?.designation});
     setRowId(row.original?.id);

}

const handleContextMenuClick = (row:any) => {


     
  const rowchildren= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0];
    if (currentTable=='produit') setInfoProduit({idproduit:row.original?.id,designationProduit:row.original?.designation})
    //(rowchildren as any[])?.length > 0
      if((rowchildren as any[])?.length > 0) {

      const tableName= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value))[0][0];
      const newPathname = route.pathname === 'details' ? 'details2' : 'details';
    //  route.push({ pathname: newPathname, state:{AllRowData:row.original,displayedRowData:row._valuesCache , tableName:tableName}});
      navigate(`../${newPathname}/${currentTable}/${tableName}`,{state:{AllRowData:row.original}});
}
}



const  detailsproduits = useQuery({
  queryKey: ['detailsproduits',currentTable , rowId , tableName],
  queryFn: ()=> loadProduits(currentTable ,tableName ),
  enabled:currentTable=="produit" ? !!(infoproduit.idproduit && rowId) : !!rowId
});


const  detailscharges = useQuery({
  queryKey: ['detailscharges' , currentTable ,rowId],
  queryFn: ()=> loadCharges(currentTable,tableName),
  enabled:currentTable=="produit" ? !!(infoproduit.idproduit && rowId) : !!rowId

  
});


const  detailsdelais = useQuery({
  queryKey: ['detailsdelais',currentTable,rowId],
  queryFn: ()=> loadDelais(currentTable,tableName),
  enabled:currentTable=="produit" ? !!(infoproduit.idproduit && rowId) : !!rowId

});

const  detailsqualites = useQuery({
  queryKey: ['detailsqualites',currentTable,rowId],
  queryFn: ()=> loadQualites(currentTable,tableName),
  enabled:currentTable=="produit" ? !!(infoproduit.idproduit && rowId) : !!rowId

});

//reset selected row
useEffect(() => {
  setRowId(null);
}, [currentTable  ,tableName])





const detailChargesColumns= useColumns(detailscharges?.data?.data as any[]);
const detailProduitsColumns= useColumns(detailsproduits?.data?.data as any[]);
const detailDelaisColumns= useColumns(detailsdelais?.data?.data as any[]);
const detailQualitesColumns= useColumns(detailsqualites?.data?.data as any[]);









//sigma :false
const loadCharges = ( currentTable:string|null ,tableName:string ="none" ) => {
  if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
          return  getFilteredDetailChargeTableByLotAndProduitAndAvenant(rowId , infoproduit.idproduit)
            
          case "activite":
          return   getFilteredDetailChargeTableByTacheAndAvenant(rowId)
             
          default:          
        return  getFilteredDetailChargeTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            return getFilteredDetailChargeTableByTacheAndAvenant(rowId)
          
          default:
           return  getFilteredDetailChargeTableByLotAndAvenant(rowId,avenantId)
             
      }
  } else if (currentTable === "tache") {
       return  getFilteredDetailChargeTableByTacheAndAvenant(rowId)

  }
}



const loadProduits = ( currentTable:string|null ,tableName:string ="none" ) => {
  if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
          return  getFilteredDetailProduitTableByLotAndProduitAndAvenant(rowId , infoproduit.idproduit)
            
          case "activite":
          return   getFilteredDetailProduitTableByTacheAndAvenant(rowId)
             
          default:          
        return  getFilteredDetailProduitTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            return getFilteredDetailProduitTableByTacheAndAvenant(rowId)
          
          default:
           return  getFilteredDetailProduitTableByLotAndAvenant(rowId,avenantId)
             
      }
  } else if (currentTable === "tache") {
       return  getFilteredDetailProduitTableByTacheAndAvenant(rowId)

  }
}



const loadQualites = ( currentTable:string|null ,tableName:string ="none" ) => {
  if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
          return  getFilteredDetailQualiteTableByLotAndProduitAndAvenant(rowId , infoproduit.idproduit)
          case "activite":
          return   getFilteredDetailQualiteTableByTacheAndAvenant(rowId)
             
          default:          
        return  getFilteredDetailQualiteTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            return getFilteredDetailQualiteTableByTacheAndAvenant(rowId)
          
          default:
           return  getFilteredDetailQualiteTableByLotAndAvenant(rowId,avenantId)
             
      }
  } else if (currentTable === "tache") {
       return  getFilteredDetailQualiteTableByTacheAndAvenant(rowId)

  }
}



const loadDelais = ( currentTable:string|null ,tableName:string ="none" ) => {
  if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
          return  getFilteredDetailDelaiTableByLotAndProduitAndAvenant(rowId , infoproduit.idproduit)
          case "activite":
          return   getFilteredDetailDelaiTableByTacheAndAvenant(rowId)
             
          default:          
        return  getFilteredDetailDelaiTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            return getFilteredDetailDelaiTableByTacheAndAvenant(rowId)
          
          default:
           return  getFilteredDetailDelaiTableByLotAndAvenant(rowId,avenantId)
             
      }
  } else if (currentTable === "tache") {
       return  getFilteredDetailDelaiTableByTacheAndAvenant(rowId)

  }
}
















  





  return (
    <IonPage>
    <IonHeader>
   <IonToolbar>
   <IonButtons slot='start'>
           <IonBackButton></IonBackButton>
           <BackButton/>
       </IonButtons>
   <IonTitle >Détails</IonTitle>

   </IonToolbar>
 </IonHeader>
   <IonContent>


<TableCard title={currentTableName}
 handleRwoClick={handleRowClick}
  isPending={false}
   isError={false}
    data={filteredvalueschildren}
     columns={columns}
     onRowContextMenu={(row)=>{handleContextMenuClick(row)}}
     tableName={currentTableName}
      />


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

        {currentDetailTable =="produits" && <TableCard tableName='detailProduit' data={detailsproduits?.data} columns={detailProduitsColumns} isError={detailsproduits.isError} isPending={detailsproduits.isFetching} hideColumns={true} enableSeeAll={true}  title={cardTitle}  />}       
        {currentDetailTable =="charges" && <TableCard tableName='detailCharge' data={detailscharges?.data} columns={detailChargesColumns} isError={detailscharges.isError} isPending={detailscharges.isFetching} hideColumns={true} enableSeeAll={true} title={cardTitle} enableFilterByCharge  />}
        {currentDetailTable =="delais" && <TableCard tableName='detailDelai' data={detailsdelais?.data} columns={detailDelaisColumns} isError={detailsdelais.isError} isPending={detailsdelais.isFetching} enableSeeAll={true}  title={cardTitle} />}
        {currentDetailTable =="qualites" && <TableCard tableName='detailQualite' data={detailsqualites?.data} columns={detailQualitesColumns} isError={detailsqualites.isError} isPending={detailsqualites.isFetching} hideColumns={true} enableSeeAll={true} title={cardTitle} />}
    </IonContent>
 </IonPage>
  )
}

export default Details

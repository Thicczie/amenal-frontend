
import { IonBackButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router';

import { getProduitTableByAvenantId,getLotTableByAvenantId,getTacheTableByAvenantId , getSigmaLotTable,getSigmaProduitTable,getSigmaTacheTable } from '../api/api';
import { useQueries, useQuery } from '@tanstack/react-query';
import TableCard from '../components/TableCard';
import useColumns from '../hooks/useColumns';
import InfoCard from '../components/InfoCard';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '@mui/material';
import ButtonList from '../components/buttonList';
import TableSelect from '../components/TableSelect';
import { getFilteredDetailChargeTableByLotAndAvenant, getFilteredDetailChargeTableByLotAndProduitAndAvenant, getFilteredDetailChargeTableByLotAndProject, getFilteredDetailChargeTableByProduitAndAvenant, getFilteredDetailChargeTableByProduitAndLotAndProject, getFilteredDetailChargeTableByProduitAndProject, getFilteredDetailChargeTableByTacheAndAvenant, getFilteredDetailChargeTableByTacheAndProject, getFilteredDetailDelaiTableByLotAndAvenant, getFilteredDetailDelaiTableByLotAndProduitAndAvenant, getFilteredDetailDelaiTableByLotAndProject, getFilteredDetailDelaiTableByProduitAndAvenant, getFilteredDetailDelaiTableByProduitAndLotAndProject, getFilteredDetailDelaiTableByProduitAndProject, getFilteredDetailDelaiTableByTacheAndAvenant, getFilteredDetailDelaiTableByTacheAndProject, getFilteredDetailProduitTableByLotAndAvenant, getFilteredDetailProduitTableByLotAndProduitAndAvenant, getFilteredDetailProduitTableByLotAndProject, getFilteredDetailProduitTableByProduitAndAvenant, getFilteredDetailProduitTableByProduitAndLotAndProject, getFilteredDetailProduitTableByProduitAndProject, getFilteredDetailProduitTableByTacheAndAvenant, getFilteredDetailProduitTableByTacheAndProject, getFilteredDetailQualiteTableByLotAndAvenant, getFilteredDetailQualiteTableByLotAndProduitAndAvenant, getFilteredDetailQualiteTableByLotAndProject, getFilteredDetailQualiteTableByProduitAndAvenant, getFilteredDetailQualiteTableByProduitAndLotAndProject, getFilteredDetailQualiteTableByProduitAndProject, getFilteredDetailQualiteTableByTacheAndAvenant, getFilteredDetailQualiteTableByTacheAndProject } from '../api/detail_api';
import SigmaCheckbox from '../components/SigmaCheckbox';
import { AvLayout, AvTitleLayout } from '../constants/infoLayout';





type Props = {}

//this is the AV screen
const ItemDetails:React.FC = () => {

  const { AllRowData ,displayedRowData , tableName="" }:any = useHistory().location.state ?? {};
  const {currentTable, setCurrentTable ,infoproduit } = useAppContext();
  const {projectId,avenantId ,currentCharge , currentSigma ,setInfoProduit}=useAppContext();

//current segment
  const [currentDetailTable ,setCurrentDetailTable]=React.useState<string>("produits");
  const cardTitle:string = 'Détails'+' '+ currentDetailTable.charAt(0).toUpperCase() + currentDetailTable.slice(1);

  const [rowId,setRowId]=React.useState<string|number|null>(null);





  // returns the data of the table (lot , prod , tache)
  const { isPending, isError, data } = useQuery({
    queryKey: ['TableByAvenantOrProject',currentTable,currentSigma , currentCharge ,avenantId ],
    queryFn: ()=> fetchTable(currentTable,avenantId,currentCharge ,currentSigma),

  })


  const route = useHistory();

  //TOOD: this will be the  voir detail on click 
  // const handleRowClick = (row:any) => {

  //   const rowchildren= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0];
  //   if (currentTable=='produit') setInfoProduit({idproduit:row.original?.id,designationProduit:row.original?.designation})
  //   if((rowchildren as any[])?.length > 0) {
  //     route.push({pathname:'/details',state:{AllRowData:row.original,displayedRowData:row._valuesCache , currentTable:currentTable,
  //       tableName:"parent"
  //     }})
    
  //   }

  // }


  const handleContextMenuClick = (row:any) => {



    
     
    const rowchildren= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0];

      if (currentTable=='produit') setInfoProduit({idproduit:row.original?.id,designationProduit:row.original?.designation})
      if((rowchildren as any[])?.length > 0) {

        const tableName= Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value))[0][0];

        
        route.push({pathname:'/details',state:{AllRowData:row.original,displayedRowData:row._valuesCache , currentTable:currentTable,
          tableName:tableName
        }})


//        const filteredvalueschildren = AllRowData? Object.entries(AllRowData).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => value )[0]:[];


        
  //      const tableName :string | null= row.original ? Object.entries(row.original).filter(([key, value]) =>  Array.isArray(value)).map(([key, value]) => key )[0]:"produit";
         // console.log('subrows array ' ,  Object.entries(AllRowData).filter(([key, value]) =>  Array.isArray(value)) );
      
  }
}


  const handleRowClick=(row:any)=>{

    if (currentTable=='produit') setInfoProduit({idproduit:row.original?.id,designationProduit:row.original?.designation});
    setRowId(row.original?.id);


  }


  const  detailsproduits = useQuery({
    queryKey: ['detailsproduits',currentTable , rowId ,infoproduit],
    queryFn: ()=> loadProduits(currentTable),
    enabled:currentTable=="produit" ? !!infoproduit.idproduit && !!rowId  : !!rowId
  });
  
  
  const  detailscharges = useQuery({
    queryKey: ['detailscharges' , currentTable ,rowId,infoproduit],
    queryFn: ()=> loadCharges(currentTable),
    enabled:currentTable=="produit" ? !!infoproduit.idproduit && !!rowId  : !!rowId

    
  });
  
  
  const  detailsdelais = useQuery({
    queryKey: ['detailsdelais',currentTable,rowId,infoproduit],
    queryFn: ()=> loadDelais(currentTable),
    enabled:currentTable=="produit" ? !!infoproduit.idproduit && !!rowId  : !!rowId

  });
  
  const  detailsqualites = useQuery({
    queryKey: ['detailsqualites',currentTable,rowId,infoproduit],
    queryFn: ()=> loadQualites(currentTable),
    enabled:currentTable=="produit" ? !!infoproduit.idproduit && !!rowId  : !!rowId

  });
  
  
  
  const detailChargesColumns= useColumns(detailscharges?.data?.data as any[]);
  const detailProduitsColumns= useColumns(detailsproduits?.data?.data as any[]);
  const detailDelaisColumns= useColumns(detailsdelais?.data?.data as any[]);
  const detailQualitesColumns= useColumns(detailsqualites?.data?.data as any[]);
  
  
  //reset when changing table
  useEffect(() => {
    setRowId(null);
    setInfoProduit({idproduit:null,designationProduit:null})
  }, [currentTable ,currentSigma ])
  
  
  
  
  
  
  
  //sigma :false
  const loadCharges = ( currentTable:string|null ,tableName:string ="none" ) => {
    if (currentTable === "produit") {
        switch (tableName) {
           
            case "lotsDeProduit":
              if(currentSigma)return getFilteredDetailChargeTableByProduitAndLotAndProject(projectId,rowId ,infoproduit.designationProduit?.toString())
            return  getFilteredDetailChargeTableByLotAndProduitAndAvenant(rowId , infoproduit.idproduit)
              
            case "activite":
              if(currentSigma) return getFilteredDetailChargeTableByTacheAndProject(projectId,rowId)
            return   getFilteredDetailChargeTableByTacheAndAvenant(rowId)
               
            default: 
            if(currentSigma)return getFilteredDetailChargeTableByProduitAndProject (projectId,infoproduit.designationProduit?.toString())        
          return  getFilteredDetailChargeTableByProduitAndAvenant(infoproduit.idproduit,avenantId)
  
               
        }
    } else if (currentTable === "lot") {
        switch (tableName) {
            case "activite":
              if(currentSigma) return getFilteredDetailChargeTableByTacheAndProject(projectId,rowId)
              return getFilteredDetailChargeTableByTacheAndAvenant(rowId)
            
            default:
              if(currentSigma) return getFilteredDetailChargeTableByLotAndProject(projectId,rowId)
             return  getFilteredDetailChargeTableByLotAndAvenant(rowId,avenantId)
               
        }
    } else if (currentTable === "tache") {
      if(currentSigma) return getFilteredDetailChargeTableByTacheAndProject(projectId,rowId)
         return  getFilteredDetailChargeTableByTacheAndAvenant(rowId)
  
    }
  }
  
  
  
  const loadProduits = ( currentTable:string|null ,tableName:string ="none" ) => {
   if (currentTable === "produit") {
        switch (tableName) {
           
            case "lotsDeProduit":
              if(currentSigma)return getFilteredDetailProduitTableByProduitAndLotAndProject(projectId,rowId ,infoproduit.designationProduit?.toString())
            return  getFilteredDetailProduitTableByLotAndProduitAndAvenant(rowId , infoproduit.idproduit)
              
            case "activite":
              if(currentSigma) return getFilteredDetailProduitTableByTacheAndProject(projectId,rowId)
            return   getFilteredDetailProduitTableByTacheAndAvenant(rowId)
               
            default: 
            if(currentSigma)return getFilteredDetailProduitTableByProduitAndProject (projectId,infoproduit.designationProduit?.toString())        
          return  getFilteredDetailProduitTableByProduitAndAvenant(infoproduit.idproduit,avenantId)
  
               
        }
    } else if (currentTable === "lot") {
        switch (tableName) {
            case "activite":
              if(currentSigma) return getFilteredDetailProduitTableByTacheAndProject(projectId,rowId)
              return getFilteredDetailProduitTableByTacheAndAvenant(rowId)
            
            default:
              if(currentSigma) return getFilteredDetailProduitTableByLotAndProject(projectId,rowId)
             return  getFilteredDetailProduitTableByLotAndAvenant(rowId,avenantId)
               
        }
    } else if (currentTable === "tache") {
      if(currentSigma) return getFilteredDetailProduitTableByTacheAndProject(projectId,rowId)
         return  getFilteredDetailProduitTableByTacheAndAvenant(rowId)
  
    }
  }
  
  
  
  const loadQualites = ( currentTable:string|null ,tableName:string ="none" ) => {
    if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
            if(currentSigma)return getFilteredDetailQualiteTableByProduitAndLotAndProject(projectId,rowId ,infoproduit.designationProduit?.toString())
          return  getFilteredDetailQualiteTableByLotAndProduitAndAvenant(rowId , infoproduit.idproduit)
            
          case "activite":
            if(currentSigma) return getFilteredDetailQualiteTableByTacheAndProject(projectId,rowId)
          return   getFilteredDetailQualiteTableByTacheAndAvenant(rowId)
             
          default: 
          if(currentSigma)return getFilteredDetailQualiteTableByProduitAndProject (projectId,infoproduit.designationProduit?.toString())        
        return  getFilteredDetailQualiteTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            if(currentSigma) return getFilteredDetailQualiteTableByTacheAndProject(projectId,rowId)
            return getFilteredDetailQualiteTableByTacheAndAvenant(rowId)
          
          default:
            if(currentSigma) return getFilteredDetailQualiteTableByLotAndProject(projectId,rowId)
           return  getFilteredDetailQualiteTableByLotAndAvenant(rowId,avenantId)
             
      }
  } else if (currentTable === "tache") {
    if(currentSigma) return getFilteredDetailQualiteTableByTacheAndProject(projectId,rowId)
       return  getFilteredDetailQualiteTableByTacheAndAvenant(rowId)

  }
  }
  
  
  
  const loadDelais = ( currentTable:string|null ,tableName:string ="none" ) => {
    if (currentTable === "produit") {
      switch (tableName) {
         
          case "lotsDeProduit":
            if(currentSigma)return getFilteredDetailDelaiTableByProduitAndLotAndProject(projectId,rowId ,infoproduit.designationProduit?.toString())
          return  getFilteredDetailDelaiTableByLotAndProduitAndAvenant(rowId , infoproduit.idproduit)
            
          case "activite":
            if(currentSigma) return getFilteredDetailDelaiTableByTacheAndProject(projectId,rowId)
          return   getFilteredDetailDelaiTableByTacheAndAvenant(rowId)
             
          default: 
          if(currentSigma)return getFilteredDetailDelaiTableByProduitAndProject (projectId,infoproduit.designationProduit?.toString())        
        return  getFilteredDetailDelaiTableByProduitAndAvenant(infoproduit.idproduit,avenantId)

             
      }
  } else if (currentTable === "lot") {
      switch (tableName) {
          case "activite":
            if(currentSigma) return getFilteredDetailDelaiTableByTacheAndProject(projectId,rowId)
            return getFilteredDetailDelaiTableByTacheAndAvenant(rowId)
          
          default:
            if(currentSigma) return getFilteredDetailDelaiTableByLotAndProject(projectId,rowId)
           return  getFilteredDetailDelaiTableByLotAndAvenant(rowId,avenantId)
             
      }
  } else if (currentTable === "tache") {
    if(currentSigma) return getFilteredDetailDelaiTableByTacheAndProject(projectId,rowId)
       return  getFilteredDetailDelaiTableByTacheAndAvenant(rowId)

  }
  }
  
  
  
  
  
  





  const columns = useColumns(data);

  const fetchTable = (currentTable :string, avenantId:string|number|null ,charge :string|null , currentSigma:boolean) => {
    switch (currentTable) {
      case 'produit':
        if(currentSigma) return getSigmaProduitTable(projectId, charge)
        return getProduitTableByAvenantId(avenantId, charge);
      case 'lot':
        if(currentSigma) return getSigmaLotTable(projectId, charge);
        return getLotTableByAvenantId(avenantId, charge);
      case 'tache':
        if(currentSigma) return getSigmaTacheTable(projectId, charge);
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
        <div className='flex flex-row'>
        <IonTitle >Détails</IonTitle>

        <SigmaCheckbox/>
        <TableSelect/>
        </div>
  


    </IonToolbar>
  </IonHeader>
    <IonContent>


    {!currentSigma &&<InfoCard TitleLayout={AvTitleLayout} Layout={AvLayout} currentInfo={"AV"} />
}

  


<TableCard 
    data={data} columns={columns} 
    handleRwoClick={handleRowClick} 
    isError={isError} 
    isPending={isPending} 
    title={ currentTable.charAt(0).toUpperCase() + currentTable.slice(1)+"s"}
    enableEditing={true}
    enableGraph={true}
    onRowContextMenu={(rowData:any)=>handleContextMenuClick(rowData)}
    showFilteredBy={true}
    
/>
    

    


   <IonSegment
   onIonChange={(e) => {setCurrentDetailTable(e.detail.value as string)   }}
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

        {currentDetailTable =="produits" && <TableCard data={detailsproduits?.data} columns={detailProduitsColumns} isError={detailsproduits.isError} isPending={detailsproduits.isFetching} hideColumns={true} title={cardTitle} enableSeeAll={true} />}       
        {currentDetailTable =="charges" && <TableCard data={detailscharges?.data} columns={detailChargesColumns} isError={detailscharges.isError} isPending={detailscharges.isFetching} hideColumns={true} title={cardTitle} enableSeeAll={true} enableFilterByCharge />}
        {currentDetailTable =="delais" && <TableCard data={detailsdelais?.data} columns={detailDelaisColumns} isError={detailsdelais.isError} isPending={detailsdelais.isFetching} title={cardTitle} enableSeeAll={true} />}
        {currentDetailTable =="qualites" && <TableCard data={detailsqualites?.data} columns={detailQualitesColumns} isError={detailsqualites.isError} isPending={detailsqualites.isFetching} hideColumns={true} title={cardTitle} enableSeeAll={true}/>}
   
      
    </IonContent>
  </IonPage>
  )
}

export default ItemDetails


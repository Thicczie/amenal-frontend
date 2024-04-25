import React from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonList, IonGrid, IonRow, IonCol, IonLabel, IonLoading, IonCardTitle, IonSpinner } from '@ionic/react';
import Table from './Table';
import { MRT_ColumnDef } from 'material-react-table';
import { useAppContext } from '../contexts/AppContext';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

interface InfoCardProps {

   
    handleRwoClick?: (row:any) => void;
    onRowContextMenu?: (rowData: any | null) => void;
    columns:MRT_ColumnDef<any>[];
    data:any;
    isPending:boolean;
    isError:boolean;
    title?:string;
    hideColumns?:boolean;
    enableEditing?:boolean;
    enableGraph?:boolean;
    enableSeeAll?:boolean;
    enableFilterByCharge?:boolean;
    showFilteredBy?:boolean;
    HeaderContent?:JSX.Element;
    enableXlsxUpload?:boolean;
    tableName:string;
    

}

const TableCard: React.FC<InfoCardProps> = ({  
  handleRwoClick=()=>{},
   onRowContextMenu ,
    columns,data , isError,isPending  ,
    enableEditing=false,
    title ,
    hideColumns=false ,
    enableGraph=false ,enableSeeAll , enableFilterByCharge,showFilteredBy=false,
    HeaderContent,
    enableXlsxUpload,
    tableName
  }) => {
  const{ currentCharge ,setCurrentCharge}=useAppContext();  
  return (
        <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            <div className='flex justify-between'>

            {title}   
          
          {HeaderContent}
            </div>
         


          </IonCardTitle>    
         {showFilteredBy && currentCharge &&
           <div className='flex justify-end' onClick={()=>setCurrentCharge(null)} >{currentCharge}   <FilterAltOffIcon/> </div>
          
         } 
        </IonCardHeader>
        <IonCardContent className='p-1'>

          {data ?  
            <Table enableEditing={enableEditing} 
             data={data?.data ?? data  as [] }
              columns={columns}
               onRowClick={handleRwoClick}
               onRowContextMenu={onRowContextMenu}
                hideColumns={hideColumns}
                 enableGraph={enableGraph}
                 enableSeeAll={enableSeeAll}
                  enableFilterByCharge={enableFilterByCharge}
                  enableXlsxUpload={enableXlsxUpload}
                  tableName={tableName}
                 />

          :isPending ?<IonSpinner name="crescent"/>
          :isError ? <IonLabel color={'danger'}>Erreur</IonLabel> 
          : <p></p>}
          
        </IonCardContent>
      </IonCard>
    );
};

export default TableCard;
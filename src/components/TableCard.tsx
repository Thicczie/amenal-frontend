import React from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonList, IonGrid, IonRow, IonCol, IonLabel, IonLoading, IonCardTitle, IonSpinner } from '@ionic/react';
import Table from './Table';
import { MRT_ColumnDef } from 'material-react-table';

interface InfoCardProps {

   
    handleRwoClick?: (row:any) => void;
    columns:MRT_ColumnDef<any>[];
    data:any;
    isPending:boolean;
    isError:boolean;
    title?:string;
    hideColumns?:boolean;
    enableEditing?:boolean;

}

const InfoCard: React.FC<InfoCardProps> = ({  handleRwoClick=()=>{},columns,data , isError,isPending  ,enableEditing=false, title ,hideColumns=false}) => {
    return (
        <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title} </IonCardTitle>          
        </IonCardHeader>
        <IonCardContent>

          {data ?  
            <Table enableEditing={enableEditing}  data={data?.data ? data.data : data  as []} columns={columns} onRowClick={handleRwoClick} hideColumns={hideColumns}/>

          :isPending ?<IonSpinner name="crescent"/>
          :isError ? <IonLabel color={'danger'}>Erreur</IonLabel> 
          : <p>loading...</p>}
          
        </IonCardContent>
      </IonCard>
    );
};

export default InfoCard;
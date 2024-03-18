import React from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonList, IonGrid, IonRow, IonCol, IonLabel, IonLoading, IonCardTitle, IonSpinner } from '@ionic/react';
import Table from './Table';
import { MRT_ColumnDef } from 'material-react-table';

interface InfoCardProps {

   
    handleRwoClick: (row:any) => void;
    columns:MRT_ColumnDef<any>[];
    data:any;
    isPending:boolean;
    isError:boolean;
    title:string;


}

const InfoCard: React.FC<InfoCardProps> = ({  handleRwoClick,columns,data , isError,isPending  , title}) => {
    return (
        <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title} </IonCardTitle>          
        </IonCardHeader>

       
        <IonCardContent>

          {data ?  
            <Table data={data?.data as []} columns={columns} onRowClick={handleRwoClick}/>

          :isPending ?<IonSpinner name="crescent"/>
          :isError ? <IonLabel color={'danger'}>Erreur</IonLabel> 
          : <p>loading...</p>}
          
        </IonCardContent>
      </IonCard>
    );
};

export default InfoCard;
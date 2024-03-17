import React from 'react'
import{
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
    } from "@ionic/react";

    import { useHistory, useParams } from 'react-router';
import Table from '../components/Table';




const ItemInfo :React.FC = () => {

    const { AllRowData , displayedRowData}:any = useHistory().location.state ?? {}; 
    console.log('received params', AllRowData, displayedRowData);

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
 
    <IonCard>
    <IonCardHeader >
        <h1 className='text-center'>
            
            {Object.entries(displayedRowData).map(([key, value]: [string, any]) => {

                        return (<></>)
                        
            })}
         </h1>

    </IonCardHeader>

    <IonCardContent>


     


    <IonList>

    {Object.entries(displayedRowData).map(([key, value]: [string, any]) => {

                return (<IonItem>
                <IonLabel>{key + value}</IonLabel>
                    
                </IonItem>)
                }
            )}
       
        </IonList>



    </IonCardContent>
    </IonCard>



        <IonToolbar>
            <IonTitle >
                Détails
            </IonTitle>
        </IonToolbar>
{/*<Table onRowClick={()=>{}}/>

  */}

</IonContent>
</IonPage>
  )
}

export default ItemInfo
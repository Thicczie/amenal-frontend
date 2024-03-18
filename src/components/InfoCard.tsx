import React, { useRef } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonList, IonGrid, IonRow, IonCol, IonLabel, IonLoading, IonSpinner, IonNav } from '@ionic/react';
import { AvLayout,BdgLayout  , AvTitleLayout,BdgTitleLayout} from '../constants/infoLayout';
import { getProjectById , getAvenantById } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import Details from '../pages/Details';
import { useAppContext } from '../contexts/AppContext';

interface InfoCardProps {
    AllRowData: any;
    displayedData: any;
    currentInfo: string;

}

const InfoCard: React.FC<InfoCardProps> = ({ AllRowData, displayedData , currentInfo }) => {
  const Layout = currentInfo === "AV" ? AvLayout : BdgLayout; 
  const TitleLayout = currentInfo === "AV" ? AvTitleLayout : BdgTitleLayout;

const {projectId,avenantId}=useAppContext();
 


  const fetchInfo = () => {
    switch (currentInfo) {
      case 'BDG':
        return getProjectById(projectId);
      case 'AV':
        return getAvenantById(avenantId);
   
      default:
        throw new Error('Invalid table');
    }
  };

  const { isPending, isError, data ,status } = useQuery({
    queryKey: ['info',currentInfo],
    queryFn: fetchInfo
  }) 



    return (
       <IonCard>
        <IonCardHeader >
            <h1 className='text-center'>
                

                  
                        { isPending ?<IonSpinner name="crescent"/>
                            :isError ? <IonLabel color={'danger'}>Erreur</IonLabel> 
                            :  <>
                            {  currentInfo.toUpperCase()+"-"+data?.data[TitleLayout.date]+'/'+data?.data[TitleLayout.ref]}
                            </>

                        }
                    
                              </h1>
                      
        </IonCardHeader>
        <IonCardContent >
            <IonList>
            {data ? (
  <IonGrid>
    {Layout.map(({ key, label }) => (
      <IonRow key={key}>
        <IonCol>
          <IonLabel>{label}</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>{  typeof data?.data[key] === 'boolean'? (data?.data[key] ? 'OUI' :'NON ') : data?.data[key]}</IonLabel>
          {/* TODO: Add coloring */}
        </IonCol>
        

       

      </IonRow>
    ))}
  </IonGrid>
) : (
  <IonLabel color={'danger'}>Erreur</IonLabel>
)}
            </IonList>




        </IonCardContent>
    
        </IonCard>
    );
};

export default InfoCard;
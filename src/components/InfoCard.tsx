import React, { useRef } from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonList, IonGrid, IonRow, IonCol, IonLabel, IonLoading, IonSpinner, IonNav, IonItem, IonAccordionGroup, IonAccordion } from '@ionic/react';
import { AvLayout,BdgLayout  , AvTitleLayout,BdgTitleLayout, TLayout, ILayout} from '../constants/infoLayout';
import { getProjectById , getAvenantById } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import Details from '../pages/budget/Details';
import { useAppContext } from '../contexts/AppContext';
import { getBesoins, getBesoinsById, getChargeStandardsById, getCommandesById, getDemandesDevisById, getDevissById, getFacturesById, getFournisseursById, getPaiementsById, getReceptionsById } from '../api/achat/achat_api';
import { useParams } from 'react-router-dom';


interface InfoCardProps {
    currentInfo: string;
    TitleLayout:TLayout;
    Layout :ILayout[];

}

const InfoCard: React.FC<InfoCardProps> = ({ currentInfo , Layout , TitleLayout }) => {

  //const Layout = currentInfo === "AV" ? AvLayout : BdgLayout; 
  // const TitleLayout = currentInfo === "AV" ? AvTitleLayout : BdgTitleLayout;
const {projectId,avenantId}=useParams();
 //const { id }:any =useHistory().location.state ?? {};
 const id = 1;

 


  const fetchInfo = () => {
    switch (currentInfo) {
      case 'BDG':
        return getProjectById(projectId);
      case 'AV':
        return getAvenantById(avenantId);
      case 'BSN':
        return getBesoinsById(id);
      case 'DDF':
        return getDemandesDevisById(id);
      case 'DVF':
        return getDevissById(id);
      case 'CMF':
        return getCommandesById(id);
      case 'RCF':
        return  getReceptionsById(id);
      case 'FCF':
        return getFacturesById(id);
      case 'FRS':
        return getFournisseursById(id); ;
      case 'PMF':
        return getPaiementsById(id) ;
      case 'CHG':
        return getChargeStandardsById(id) ;
      case 'CMT':
        return ;
      case 'EXPLOITATION':
        return ;

      default:
        return null;
    }
  };

  const { isPending, isError, data ,status } = useQuery({
    queryKey: ['info',currentInfo , avenantId , projectId],
    queryFn: fetchInfo
  }) 



    return (
       <IonCard>


        <IonAccordionGroup>
          <IonAccordion>
          <IonCardHeader slot='header' >
            <h1 className='text-center'>
                

                  
                        { isPending ?<IonSpinner name="crescent"/>
                            :isError ? <IonLabel color={'danger'}>Erreur</IonLabel> 
                            :  <>
                            {currentInfo.toUpperCase() + "-" +( eval('data?.data.' +TitleLayout?.date) ?? '-' ) + '/'+ eval('data?.data.' + TitleLayout?.ref) ?? '-'}
                            </>

                        }
                    
                              </h1>
                      
        </IonCardHeader>
        <IonCardContent slot='content' >
            <IonList>
            {data ? (
  <IonGrid className=' dark:bg-ion-card-background '>

    {Layout.map(({ key, label }) => (
      <IonRow key={key}>
      
        <IonCol>
          <IonLabel>{label}</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>{  typeof eval('data?.data.' + key) === 'boolean'? (eval('data?.data.' + key) ? 'OUI' :'NON ') :(eval('data?.data.' + key) ?? '-')}</IonLabel>
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



          </IonAccordion>
        </IonAccordionGroup>
 
    
    
        </IonCard>
    );
};

export default InfoCard;
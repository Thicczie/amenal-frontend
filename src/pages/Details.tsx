import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel,  } from '@ionic/react'
import { useHistory } from 'react-router'
import InfoCard from '../components/InfoCard';
import { getProjects } from '../api/api';
import { useQuery } from '@tanstack/react-query';




const Details:React.FC = () => {
const route = useHistory();


// dumb hack to switch between details and details2 enables animation transition
const handleClick = () => {
    const newPathname = route.location.pathname === '/details' ? '/details2' : '/details';
    route.push({ pathname: newPathname});
}


const  detailsproduit = useQuery({
    queryKey: ['details'],
    queryFn: ()=> getProjects(),
  });


  console.log('details produit', detailsproduit);
  





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



   <IonSegment
   onIonChange={(e) => console.log('Segment selected', e.detail.value)}
   mode='md' 
    value='produits'
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

     
   </IonContent>
 </IonPage>
  )
}

export default Details

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';



const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>okex</div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

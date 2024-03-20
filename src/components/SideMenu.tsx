import React from "react";

import {
  IonButtons,
  IonButton,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonMenuButton,
  IonContent,
  IonMenu,
  IonSplitPane,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonAccordion, IonAccordionGroup,

} from "@ionic/react";
import { useLocation } from "react-router-dom";




const SideMenu:React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();




  interface AppPage {
    title: string;
    content: {
      label: string;
      path: string;
    }[];
  }

  const items:AppPage[] = [
    {
      title: "comptes",
      content: [
        {
          label: "budget",
          path: "/budget",
        },
        {
          label: "client",
          path: "/client",
        },
      ],
    },

    {
      title: "achat",
      content: [
        {
          label: "commande",
          path: "/commande",
        },
        {
          label: "fournisseur",
          path: "/fournisseur",
        },
      ],
    },
  ];


  const closeMenu = () => {
    (document.getElementById('menu') as HTMLIonMenuElement)?.close();
  }

  return (
    
    <IonMenu id="menu" contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      <IonAccordionGroup>

     
          {items.map((appPage, index) => {
            return (
              <IonAccordion key={index} value={index.toString()}>
                <IonItem slot="header" key={index} >
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>


                {appPage.content.map((content, contentIndex) => (
              <IonItem detail={false} slot="content" key={contentIndex}
              color={location.pathname.includes( content.path) ? 'primary' : ''}
              button onClick={closeMenu} routerLink={content.path}>
                <IonLabel >{content.label}</IonLabel>
              </IonItem>
            ))}
                
                
              </IonAccordion>

    

              
            );
          })}
                        </IonAccordionGroup>


      </IonContent>
    </IonMenu>


  );
};

export default SideMenu;

import React from "react";

import {
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonMenu,
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
      title: "Comptes",
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
      title: "Achat",
      content: [
        {
          label:"BSN",
          path:"/achat/bsn",
          
        },
        {
          label:"DDF",
          path:"/achat/ddf",
          
        }, {
          label:"DVF",
          path:"/dvf",
          
        }, {
          label:"RCF",
          path:"/achat/rcf",
          
        }, {
          label:"FCF",
          path:"/achat/fcf",
          
        }, {
          label:"PMF",
          path:"/achat/pmf",
          
        }, {
          label:"FRS",
          path:"/achat/frs",
          
        }, {
          label:"CHG",
          path:"/achat/chg",
          
        },
        {
          label:"EXPLOITATION",
          path:"/achat/exploitation",
          
        }, {
          label:"CMT",
          path:"/achat/cmt",
          
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

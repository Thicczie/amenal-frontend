import React from "react";

import {
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonMenu,
  IonItem,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/react";
import { NavLink, useLocation } from "react-router-dom";
import { IconButton, SwipeableDrawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const SideMenuButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  //const location = useLocation();

  interface AppPage {
    title: string;
    content: {
      label: string;
      path: string;
    }[];
  }

  const items: AppPage[] = [
    {
      title: "Comptes",
      content: [
        {
          label: "budget",
          path: "/budget",
        },
      ],
    },

    {
      title: "Achat",
      content: [
        {
          label: "BSN",
          path: "/bsn",
        },
        {
          label: "DDF",
          path: "/ddf",
        },
        {
          label: "DVF",
          path: "/dvf",
        },
        {
          label: "CMF",
          path: "/cmf",
        },
        {
          label: "RCF",
          path: "/rcf",
        },
        {
          label: "FCF",
          path: "/fcf",
        },
        {
          label: "PMF",
          path: "/pmf",
        },
        {
          label: "FRS",
          path: "/frs",
        },
        {
          label: "CHG",
          path: "/chg",
        },
        {
          label: "EXPLOITATION",
          path: "/exploitation",
        },
        {
          label: "CMT",
          path: "/cmt",
        },
      ],
    },
  ];

  // const closeMenu = () => {
  //   (document.getElementById('menu') as HTMLIonMenuElement)?.close();
  // }

  const list = (items: AppPage[]) => (
    <div className=" w-64">
      <IonAccordionGroup>
        {items.map((appPage, index) => {
          return (
            <IonAccordion key={index} value={index.toString()}>
              <IonItem slot="header" key={index}>
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
              {appPage.content.map((content, contentIndex) => (
                <IonItem
                  detail={false}
                  slot="content"
                  key={contentIndex}
                  color={
                    location.pathname.includes(content.path) ? "primary" : ""
                  }
                >
                  <NavLink
                    key={contentIndex}
                    to={content.path}
                    className="text-white"
                  >
                    <IonLabel>{content.label}</IonLabel>
                  </NavLink>
                </IonItem>
              ))}
            </IonAccordion>
          );
        })}
      </IonAccordionGroup>
    </div>
  );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMenuOpen(open);
    };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        open={menuOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list(items)}
      </SwipeableDrawer>
    </>
  );
};

export default SideMenuButton;

// {/* <IonMenu id="menu" contentId="main" type="overlay">
// <IonHeader>
//   <IonToolbar>
//     <IonTitle>Menu</IonTitle>
//   </IonToolbar>
// </IonHeader>
// <IonContent>

// <IonAccordionGroup>

//     {items.map((appPage, index) => {
//       return (
//         <IonAccordion key={index} value={index.toString()}>
//           <IonItem slot="header" key={index} >
//             <IonLabel>{appPage.title}</IonLabel>
//           </IonItem>

//           {appPage.content.map((content, contentIndex) => (
//         <IonItem detail={false} slot="content" key={contentIndex}
//         color={location.pathname.includes(content.path) ? 'primary' : ''}

//         button onClick={closeMenu} routerLink={content.path}
//         >
//           <NavLink key={contentIndex} to={content.path}

//             className={isActive => {
//               return isActive ? 'text-primary-700' : '';
//             }}
//                            >
//                            </NavLink>
//           <IonLabel >{content.label}</IonLabel>

//         </IonItem>
//       ))}

//         </IonAccordion>

//       );
//     })}
//                   </IonAccordionGroup>

// </IonContent>
// </IonMenu> */}

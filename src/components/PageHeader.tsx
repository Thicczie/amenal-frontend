import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";
import React from "react";
import SideMenuButton from "./SideMenu";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import BackButton from "./BackButton";

type Props = {
  children?: React.ReactNode;
  title: string;
  enableMenuButton?: boolean;
};

const PageHeader: React.FC<Props> = ({ enableMenuButton = true, ...props }) => {
  const theme = useTheme();
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ paddingTop: "env(safe-area-inset-top)" }}>
          {enableMenuButton ? <SideMenuButton /> : <BackButton />}
          <IonTitle>{props.title}</IonTitle>
          {props.children}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default PageHeader;

{
  /* <IonHeader>
<IonToolbar>
  <IonButtons slot="start">
    {enableMenuButton && <SideMenuButton />}
  </IonButtons>
  <IonTitle color="light">{props.title}</IonTitle>
  {props.children}
</IonToolbar>
</IonHeader> */
}

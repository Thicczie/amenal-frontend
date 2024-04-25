import React from "react";

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import ListIcon from '@mui/icons-material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Route, NavLink, Outlet } from "react-router-dom";


interface Props {
  module : string;
}
const BottomTabs: React.FC<Props> = (props:Props) => {
  return (

    <>
     <div className="mb-14n bg-white">
    <IonRouterOutlet >
       
        <Outlet />
        
    </IonRouterOutlet>
    </div>

<div className="fixed bottom-0 flex justify-center items-center z-50 w-full h-14 border-t dark:bg-ion-toolbar-background border-ion-dark-tint">
  <div className="flex justify-center items-center w-full max-w-4xl h-full">
    <div className="flex justify-around w-full h-full">
      <TabButton label="Ajout" to={`/${props.module}/ajout`} icon={<AddCircleOutlineIcon />} />
      <TabButton label="Instances" to={`/${props.module}/instances`} icon={<HourglassBottomIcon />} />
      <TabButton label="Listes" to={`/${props.module}/listes`} icon={<ListIcon />} />
    </div>
  </div>
</div>
    </>
   
  );
};

export default BottomTabs;



type TabProps={
  label:string;
  icon?:React.ReactNode;
  to:string;

}
const TabButton:React.FC<TabProps>=(props:TabProps)=>{

  return <NavLink

  to={props.to} type="button"
  className={"inline-flex w-full flex-col items-center justify-center px-5 hover:bg-ion-dark-shade bg-ion dark:1f1f1f dark:hover:bg-ion-dark-shade"}

   >
  {props.icon}
  <IonLabel className="text-sm text-ion-light-shade ">{props.label}</IonLabel>


</NavLink> 
}
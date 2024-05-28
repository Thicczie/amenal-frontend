import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from "@ionic/react";
import React, { useEffect } from "react";

import Listes from "../../Listes";
import Ajout from "../../Ajout";
import InstancesDvf from "./InstancesDvf";
import AjoutDvf from "./AjoutDvf";
import BottomTabs from "../../../components/BottomTabs";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const Dvfs: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("instances");
  // }, [navigate]);

  return (
    <>
      <Outlet />
      <BottomTabs module="dvf" />
    </>
  );
};

export default Dvfs;

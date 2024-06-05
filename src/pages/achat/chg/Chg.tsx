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
import InstancesChg from "./InstancesChg";
import AjoutChg from "./AjoutChg";
import BottomTabs from "../../../components/BottomTabs";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const Chgs: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("instances");
  }, []);

  return (
    <>
      <Outlet />
      <BottomTabs module="chg" />
    </>
  );
};

export default Chgs;

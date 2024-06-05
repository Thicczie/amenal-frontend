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
import InstancesCmf from "./InstancesCmf";
import AjoutCmf from "./AjoutCmf";
import BottomTabs from "../../../components/BottomTabs";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const Cmfs: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("instances");
  }, []);

  return (
    <>
      <Outlet />
      <BottomTabs module="cmf" />
    </>
  );
};

export default Cmfs;

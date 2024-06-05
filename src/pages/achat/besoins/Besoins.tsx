import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from "@ionic/react";
import React, { useEffect } from "react";

import InstancesBsn from "./InstancesBsn";
import Listes from "../../Listes";
import Ajout from "../../Ajout";
import AjoutBsn from "./AjoutBsn";
import BottomTabs from "../../../components/BottomTabs";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const Besoins: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("instances");
  }, []);

  return (
    <>
      <Outlet />
      <BottomTabs module="bsn" />
    </>
  );
};

export default Besoins;

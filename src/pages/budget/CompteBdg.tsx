import React, { ReactNode, useEffect } from "react";

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
} from "@ionic/react";
import ListIcon from "@mui/icons-material/List";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Ajout from "../Ajout";
import Listes from "../Listes";
import Instances from "./Instances";
import AjoutBdg from "./AjoutBdg";
import {
  NavLinkProps,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import BottomTabs from "../../components/BottomTabs";
import { Box } from "@mui/material";
const CompteBdg: React.FC = () => {
  //onst history = useHistory();

  // useEffect(() => {
  //   history.push('/budget/instances'); // Navigate to the instances route when component mounts
  // }, []);
  const navigate = useNavigate();

  const from = useLocation().state?.from?.pathname || "/";

  // useEffect(() => {
  //   if (from === "/budget") navigate("instances");
  // }, [from]);

  return (
    // <>
    //   <Outlet />
    //   <BottomTabs module="budget" />
    // </>

    <>
      {" "}
      {/* Adjust the value as needed */}
      <Outlet />
      <BottomTabs module="budget" />
    </>
  );
};

export default CompteBdg;

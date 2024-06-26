import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSpinner,
  IonPopover,
  IonList,
  IonItem,
  IonNavLink,
  IonButton,
  IonNav,
} from "@ionic/react";
import Graph from "../pages/budget/Graph";

import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MRT_TableInstance } from "material-react-table";
import { useNavigate } from "react-router-dom";

interface ButtonListProps {
  table: MRT_TableInstance<any>;
}

const ButtonList: React.FC<ButtonListProps> = ({ table }) => {
  const navigate = useNavigate();

  const popoverRef = React.useRef<HTMLIonPopoverElement>(null);

  const [viewAnchorEl, setViewAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [addAnchorEl, setAddAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const viewOpen = Boolean(viewAnchorEl);
  const addOpen = Boolean(addAnchorEl);

  const tables = table.getFilteredRowModel().rows;
  const tableRows = tables.map((row) => row.original);

  const handleViewClick = (event: any) => {
    setViewAnchorEl(event?.currentTarget);
  };

  const handleAddClick = (event: any) => {
    setAddAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setViewAnchorEl(null);
    setAddAnchorEl(null);
  };
  const Navigate = (to?: string) => {
    handleClose();
    if (to) navigate(to, { state: { tableRows } });
    else return;

    // navRef.current?.push(Graph);
  };
  return (
    <>
      <button
        id="view-trigger"
        type="button"
        className="p-2"
        onClick={handleViewClick}
      >
        <BarChartIcon />
      </button>

      {/* <button id='add-trigger' type="button"  className='p-2'
     onClick={handleAddClick}
      >
      <AddIcon/>
      </button> */}

      <Menu
        id="view-trigger"
        anchorEl={viewAnchorEl}
        open={viewOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={() => Navigate("graph")}>Graph</MenuItem>

        <MenuItem onClick={() => Navigate()}>Gantt</MenuItem>
      </Menu>

      {/* <Menu
        id="add-trigger"
        anchorEl={addAnchorEl}
        open={addOpen}
        onClose={handleClose}
   
      >
        <MenuItem onClick={()=>Navigate()}>Observationss</MenuItem>
        <MenuItem onClick={()=>Navigate()}>Document</MenuItem>
        <MenuItem onClick={()=>Navigate()}>Taf</MenuItem>
      </Menu> */}
    </>
  );
};

export default ButtonList;

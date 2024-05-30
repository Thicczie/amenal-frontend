import React from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useQuery } from "@tanstack/react-query";
import { getAvenantsByProjectId } from "../../api/api";
import useColumns from "../../hooks/useColumns";
import InfoCard from "../../components/InfoCard";
import TableCard from "../../components/TableCard";
import { useAppContext } from "../../contexts/AppContext";
import { BdgLayout, BdgTitleLayout } from "../../constants/infoLayout";
import ButtonList from "../../components/buttonList";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@mui/material";
import AddForm from "../AddForm";
import {
  avenantFields,
  budgetFields,
  produitFields,
} from "../../constants/FormFields";

import AddDialogButton from "../../components/AddDialogButton";
import SigmaCheckbox from "../../components/SigmaCheckbox";
import TableSelect from "../../components/TableSelect";
import ItemDetails from "./ItemDetails";
import BackButton from "../../components/BackButton";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { DoneAllOutlined } from "@mui/icons-material";
import FabDialog from "../../components/fabDialog";

//this is the BDG screen

const ItemInfo: React.FC = () => {
  const { setAvenantId, currentSigma } = useAppContext();
  const { projectId } = useParams();

  const [open, setOpen] = React.useState(false);

  const { isPending, isError, data } = useQuery({
    queryKey: ["avenants", projectId],
    queryFn: () => getAvenantsByProjectId(projectId),
    enabled: !!projectId,
  });

  const columns = useColumns(data);

  const match = useMatch("/budget/iteminfo/:projectId");
  const navigate = useNavigate();

  const handleRowClick = (row: any) => {
    setAvenantId(row.original.id);
    //route.push({ pathname: "/iteminfo/iteminfodetail"  , state: { AllRowData: row.original , displayedRowData: row._valuesCache   } });
    navigate(`iteminfodetail/${row.original.id}`);
  };

  if (!match) return <Outlet />;
  return (
    <IonPage>
      <PageHeader title="Infos" enableMenuButton={false}>
        {currentSigma && <TableSelect />}
        <SigmaCheckbox />
      </PageHeader>
      <IonContent>
        <InfoCard
          TitleLayout={BdgTitleLayout}
          Layout={BdgLayout}
          currentInfo={"BDG"}
        />

        {currentSigma ? (
          <ItemDetails isComponentParent={true} />
        ) : (
          <TableCard
            title="Avenants"
            data={data}
            isError={isError}
            isPending={isPending}
            columns={columns}
            handleRwoClick={handleRowClick}
            enableEditing={true}
            enableXlsxUpload={false}
            HeaderContent={
              <AddDialogButton
                formFields={avenantFields}
                currentForm="avenant"
              />
            }
            tableName="avenant"
          />
        )}
        {/* <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
          <div className="flex gap-2 flex-col">
            <Fab color="primary">
              <LockOpenOutlinedIcon />
            </Fab>
            <Fab color="primary">
              <DoneAllOutlined />
            </Fab>
          </div>
        </Box> */}
        <FabDialog />
      </IonContent>
    </IonPage>
  );
};

export default ItemInfo;

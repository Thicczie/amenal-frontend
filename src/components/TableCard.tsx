import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonLoading,
  IonCardTitle,
  IonSpinner,
} from "@ionic/react";
import Table from "./Table";
import { MRT_ColumnDef } from "material-react-table";
import { useAppContext } from "../contexts/AppContext";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Card, CardContent } from "@mui/material";

interface InfoCardProps {
  handleRwoClick?: (row: any) => void;
  onRowContextMenu?: (rowData: any | null) => void;
  columns: MRT_ColumnDef<any>[];
  data: any;
  isPending: boolean;
  isError: boolean;
  title?: string;
  hideColumns?: boolean;
  enableEditing?: boolean;
  enableGraph?: boolean;
  enableSeeAll?: boolean;
  enableFilterByCharge?: boolean;
  showFilteredBy?: boolean;
  HeaderContent?: JSX.Element;
  enableXlsxUpload?: boolean;
  tableName: string;
}

const TableCard: React.FC<InfoCardProps> = ({
  handleRwoClick = () => {},
  onRowContextMenu,
  columns,
  data,
  isError,
  isPending,
  enableEditing = false,
  title,
  hideColumns = false,
  enableGraph = false,
  enableSeeAll,
  enableFilterByCharge,
  showFilteredBy = false,
  HeaderContent,
  enableXlsxUpload,
  tableName,
}) => {
  const { currentCharge, setCurrentCharge } = useAppContext();
  console.log("tablename", tableName);

  return (
    <Card
      variant="outlined"
      sx={{
        margin: "0.625rem",
        backgroundColor: "white",
        borderColor: "#c9cedd",
      }}
    >
      <IonCardHeader>
        <IonCardTitle>
          <div className="flex text-slate-600 items-center justify-between">
            {title}

            {HeaderContent}
          </div>
        </IonCardTitle>
        {showFilteredBy && currentCharge && (
          <div
            className="flex justify-end"
            onClick={() => setCurrentCharge(null)}
          >
            {currentCharge} <FilterAltOffIcon />{" "}
          </div>
        )}
      </IonCardHeader>
      <CardContent sx={{ padding: 0.5 }}>
        {isPending ? (
          <IonSpinner name="crescent" />
        ) : data ? (
          <Table
            enableEditing={enableEditing}
            data={
              (data?.data as []) ?? (Array.isArray(data) ? data : [data]) ?? []
            }
            columns={columns}
            onRowClick={handleRwoClick}
            onRowContextMenu={onRowContextMenu}
            hideColumns={hideColumns}
            enableGraph={enableGraph}
            enableSeeAll={enableSeeAll}
            enableFilterByCharge={enableFilterByCharge}
            enableXlsxUpload={enableXlsxUpload}
            tableName={tableName}
          />
        ) : isError ? (
          <IonLabel color={"danger"}>Erreur</IonLabel>
        ) : (
          <p></p>
        )}
      </CardContent>
    </Card>
  );
};

export default TableCard;

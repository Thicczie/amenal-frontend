import { IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { Menu, MenuItem, Select } from "@mui/material";

const TableSelect = () => {
  const { currentTable, setCurrentTable } = useAppContext();

  return (
    <>
      {/* <IonSelect
        className=" w-fit mx-4 bg-transparent px-2 justify-center    "
        label="Vue par:"
        interface="popover"
        onIonChange={(e: any) => setCurrentTable(e.detail.value)}
        selectedText={currentTable}
      >
        <IonSelectOption value="produit">Produits</IonSelectOption>
        <IonSelectOption value="lot">Lot</IonSelectOption>
        <IonSelectOption value="tache">Tache</IonSelectOption>
      </IonSelect> */}

      <Select
        value={currentTable}
        label="Age"
        onChange={(e: any) => setCurrentTable(e.target.value)}
        sx={{ border: 0, color: "white", backgroundColor: "transparent" }}
        variant="filled"
      >
        <MenuItem value="produit">Produits</MenuItem>
        <MenuItem value="lot">Lots</MenuItem>
        <MenuItem value="tache">Taches</MenuItem>
      </Select>
    </>
  );
};

export default TableSelect;

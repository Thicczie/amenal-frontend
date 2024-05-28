import { IonCheckbox } from "@ionic/react";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import FunctionsIcon from "@mui/icons-material/Functions";
import Checkbox from "@mui/material/Checkbox";

const SigmaCheckbox: React.FC = () => {
  const { currentSigma, setCurrentSigma } = useAppContext();
  const handleCheck = (e: any) => {
    setCurrentSigma(e.target.checked);
  };

  return (
    <div className="p-2 justify-center flex items-center mx-1">
      <FunctionsIcon fontSize="small" />

      <Checkbox
        checked={currentSigma}
        sx={{
          color: "white",
          "&.Mui-checked": {
            color: "white",
          },
        }}
        onChange={(e) => handleCheck(e)}
      />
    </div>
  );
};

export default SigmaCheckbox;

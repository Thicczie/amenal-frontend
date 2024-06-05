import { IonButton, IonCheckbox, IonItem, IonModal } from "@ionic/react";
import { Button } from "@mui/material";
import React, { FormEvent, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";

// This is a modal component that displays a list of checkboxes to select from

interface Props {
  sheetNames: string[];
  onFormSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

const container = document.createElement("div");
document.body.appendChild(container);

const Modal: React.FC<Props> = ({ sheetNames, onFormSubmit }) => {
  const sheetSelectRef = React.useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    return () => {
      sheetSelectRef.current?.dismiss();
    };
  }, []);

  return ReactDOM.createPortal(
    <IonModal
      ref={sheetSelectRef}
      style={{
        "--width": "fit-content",
        "--min-width": "250px",
        "--height": "fit-content",
      }}
      animated={true}
      isOpen={true}
    >
      <div className="p-5 border border-ion-dark-tint  ">
        <form
          onSubmit={(e) => {
            onFormSubmit(e);
            sheetSelectRef.current?.dismiss();
          }}
        >
          <h3>Selectionner les feuilles à ajouter</h3>
          <p className=" text-ion-warning">
            les noms des feuilles doivent correspondre à un ou plusieur de ces
            noms: ARTICLES ,LOTS ,TACHES ,DETAIL PRODUIT ,DETAIL CHARGE ,DETAIL
            DELAI ,DETAIL QUALITE
          </p>

          {sheetNames?.map((item: any) => (
            <IonItem key={item}>
              <IonCheckbox value={item}>{item}</IonCheckbox>
            </IonItem>
          ))}

          <div className="flex flex-row justify-around m-1">
            <Button
              variant="contained"
              onClick={() => sheetSelectRef.current?.dismiss()}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Ok
            </Button>
          </div>
        </form>
      </div>
    </IonModal>,

    document.body
  );
};

function CheckboxSelectionModal(sheetNames: string[]): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    try {
      createRoot(container).render(
        <Modal sheetNames={sheetNames} onFormSubmit={onSubmit} />
      );

      function onSubmit(e: FormEvent): void {
        e.preventDefault();

        //get checked sheets names
        const checkedSheets: string[] = [];
        e.currentTarget
          .querySelectorAll("ion-checkbox")
          .forEach((item: any) => {
            if (item?.ariaChecked === "true") checkedSheets.push(item?.value);
          });

        if (checkedSheets?.length > 0) {
          ReactDOM.unmountComponentAtNode(container);
          container.remove();
          resolve(checkedSheets);
        } else {
          alert("Selectionner au moins une feuille");
        }
      }
    } catch (error) {
      console.log("error submit selected sheets ", error);
      reject(error);
    }
  });
}

export default CheckboxSelectionModal;

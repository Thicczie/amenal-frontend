import React, { useState, useRef, useImperativeHandle, useEffect } from "react";

import useCrudApi from "../api/crudAPI";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppContext } from "../contexts/AppContext";
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPicker,
  IonSelect,
  IonSpinner,
  PickerColumn,
  getPlatforms,
} from "@ionic/react";
import UploadIcon from "@mui/icons-material/Upload";

import { FilePicker } from "@capawesome/capacitor-file-picker";
import { Filesystem } from "@capacitor/filesystem";
import * as XLSX from "xlsx";

import { Dialog } from "@capacitor/dialog";
import { IonModal } from "@ionic/react";

import useFormFields from "../constants/FormFields";
import { LinearProgress, MenuItem } from "@mui/material";
import CheckboxSelectionModal from "./CheckboxSelectionModal";
import useDetailApi from "../api/detail_api";
import { AssignmentReturnTwoTone } from "@mui/icons-material";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import toast from "react-hot-toast";
import useApi from "../api/api";

interface XLSXUploadProps {
  handleCloseMenu?: () => void;
  buttonRef?: any;
}

const XLSXUpload: React.FC<XLSXUploadProps> = ({
  handleCloseMenu = () => {},
  buttonRef,
}) => {
  useImperativeHandle(buttonRef, () => ({
    showModal() {
      setMetreModal(true);
    },
  }));

  const { getProjects } = useApi();
  const {
    getMetresByAvenantId,
    saveAllLots,
    saveAllProduits,
    saveAllTaches,
    saveLot,
    saveProduit,
    saveTache,
  } = useCrudApi();
  const {
    getDetailChargeAttentesByAvenantId,
    getDetailDelaiAttentesByAvenantId,
    getDetailProduitAttentesByAvenantId,
    getDetailQualiteAttentesByAvenantId,
    saveAllDetailChargeAttentes,
    saveAllDetailDelaiAttentes,
    saveAllDetailProduitAttentes,
    saveAllDetailQualiteAttentes,
  } = useDetailApi();
  const {
    produitFields,
    lotFields,
    tacheFields,
    detailProduitFields,
    detailChargeFields,
    detailDelaiFields,
    detailQualiteFields,
  } = useFormFields();

  const { avenantId, projectId, currentTable } = useAppContext();

  const sheetSelectRef = useRef<HTMLIonModalElement>(null);
  const [sheetNamesRef, setsheetNamesRef] = useState<any[]>([]);
  const [xlsxData, setXlsxData] = useState<any[]>([]);

  const queryClient = useQueryClient();

  const selectedMetre = useRef();
  const [metreModal, setMetreModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const metresRef = useRef([]);
  const projectsRef = useRef([]);

  const renamedArticles = useRef<any>([]);
  const renamedLots = useRef<any>([]);
  const renamedTaches = useRef<any>([]);

  const Projects = useQuery({
    queryKey: ["projectsss"],
    queryFn: () => getProjects(),
  });
  const Metres = useQuery({
    queryKey: ["avenantsss", avenantId],
    queryFn: () => getMetresByAvenantId(avenantId),
    enabled: !!avenantId,
  });

  //state to store duplicates and bad request rows
  const [DuplicatesArray, setDuplicatesArray] = React.useState<any>([]);
  const [BadReqArray, setBadReqArray] = React.useState<any>([]);

  const mutation = useMutation({
    mutationFn: (variables: { data: any[]; currentTable: string }) =>
      HandleMutate(variables.currentTable, variables.data),
    onMutate: () => {
      // const id =toast.loading("Importation en cours ...");
      // toast.update(id, { render: "All is good", type: "success", isLoading: false });

      setLoading(true);
    },
    onError: (error) => {
      setLoading(false);
      alert("mutation error " + error);
    },
    onSettled(data, error, variables, context) {
      setLoading(false);
      //if (data?.status == 400) BadReqArray.push(variables?.data);
      //if (data?.status == 409) DuplicatesArray.push(variables?.data);

      if (data?.status == 200 || data?.status == 201) {
        toast.success("Importation reussie");
      } else if (data?.status == 401 || data?.status == 409) {
        toast.error("Les enregistrements existent déjà");
      } else if (data?.status == 403) {
        toast.error("Accès non autorisé");
      } else {
        toast.error("Erreur! " + data?.originalError?.message, {
          style: {
            zIndex: 1000,
          },
        });
      }
    },
  });

  const getAttente = async (
    avenantId: string | number | null,
    currentDetailTable: string
  ) => {
    switch (currentDetailTable) {
      case "Charges":
        return getDetailChargeAttentesByAvenantId(avenantId);

        break;
      case "Produits":
        return getDetailProduitAttentesByAvenantId(avenantId);

        break;
      case "Délais":
        return getDetailDelaiAttentesByAvenantId(avenantId);

        break;

      case "Qualités":
        return getDetailQualiteAttentesByAvenantId(avenantId);

        break;

      default:
        break;
    }
  };

  // progress bar toast callback
  const onUploadProgress = (progressEvent: any, element: string) => {
    console.log(
      "progress",
      element,
      progressEvent.loaded / progressEvent.total
    );
    const toastex = toast(
      (t) => (
        <div>
          <div>Importation {element} ...</div>
          <div>
            {/* {Math.round((progressEvent.loaded / progressEvent.total) * 100)}% */}
            <LinearProgress
              variant="determinate"
              value={(progressEvent.loaded / progressEvent.total) * 100}
            />
          </div>
        </div>
      ),
      { duration: 100000000, id: element }
    );
  };

  // use mutation mutate function
  const HandleMutate = async (currentTable: string, data: any[]) => {
    switch (currentTable) {
      case "produit": {
        return saveAllProduits(data);
      }
      case "lot": {
        return saveAllLots(data);
      }
      case "tache": {
        return saveAllTaches(data);
      }
      case "detailProduit": {
        return saveAllDetailProduitAttentes(data, onUploadProgress);
      }
      case "detailCharge": {
        return saveAllDetailChargeAttentes(data, onUploadProgress);
      }
      case "detailDelai": {
        return saveAllDetailDelaiAttentes(data, onUploadProgress);
      }
      case "detailQualite": {
        return saveAllDetailQualiteAttentes(data, onUploadProgress);
      }

      default:
        console.log("no table selected");
        alert("aucune table selectionnée");
        break;
    }
  };

  //show dialog with errors or success message
  const showSettledDialog = (element: string) => {
    // if (BadReqArray.length > 0) {
    //   Dialog.alert({
    //     title: "Erreur",
    //     message:
    //       "Erreur de requête pour \n" +
    //       BadReqArray.map(
    //         (item: any) =>
    //           Object.entries(item)
    //             .slice(0, 2)
    //             .map(([key, val]: any) => key + " : " + val)
    //             .join(",    ") + "\n"
    //       ),
    //   });
    //   setBadReqArray([]);
    // }
    // if (DuplicatesArray.length > 0) {
    //   Dialog.alert({
    //     title: "Erreur",
    //     message:
    //       "Doublons détectés pour \n " +
    //       DuplicatesArray.map(
    //         (item: any) =>
    //           Object.entries(item)
    //             .slice(0, 2)
    //             .map(([key, val]: any) => key + " : " + val)
    //             .join(",    ") + "\n"
    //       ),
    //   });
    //   setDuplicatesArray([]);
    // }
    // if (BadReqArray.length == 0 && DuplicatesArray.length == 0) {
    //   Dialog.alert({
    //     title: "Succès",
    //     message: "Importation réussie",
    //   });
    //   }

    toast.success(element + " importé(e)s ", { id: element, duration: 0 });
    queryClient.invalidateQueries();
  };

  // Function to rename array keys to match specifications
  const renameKeys = (data: any[], fieldMappings: any) => {
    // Map over each item in the data array
    return data.map((item) => {
      // Create a new object to store renamed keys
      const newItem: any = {};
      // Iterate over each key-value pair in the item
      Object.entries(item).forEach(([key, value]: [any, any]) => {
        // Find the mapping corresponding to the current key
        const mapping: any = Object.entries(fieldMappings).find(
          ([mappedKey, mapping]) => {
            return (mapping as any).label === key || mappedKey === key;
          }
        );
        if (mapping) {
          // Use the mapping key as the new key
          newItem[mapping[0]] = value;
          // Check if the key exists in produitFields
          if (fieldMappings[mapping[0 as number]]) {
            // Perform type casting based on the type defined in produitFields
            switch (fieldMappings[mapping[0 as number]].type) {
              case "boolean":
                newItem[mapping[0]] =
                  value === "true" ||
                  value === "1" ||
                  value === 1 ||
                  value === true ||
                  value === "TRUE" ||
                  value === "vrai" ||
                  value === "VRAI" ||
                  value === "oui" ||
                  value === "OUI";
                break;
              case "date":
                const ParseDate = (value: any): string[] | Date => {
                  try {
                    if (typeof value === "string") {
                      const parts = value.split("/");
                      const day = parseInt(parts[0], 10);
                      const month = parseInt(parts[1], 10) - 1;
                      const year = parseInt(parts[2], 10);
                      return new Date(year, month, day);
                    } else {
                      return new Date(
                        (value - 1) * 24 * 60 * 60 * 1000 +
                          new Date(1899, 11, 31).getTime()
                      );
                    }
                  } catch (e) {
                    return new Date();
                  }
                };

                newItem[mapping[0]] = ParseDate(value);
                break;
              case "number":
                newItem[mapping[0]] = parseFloat(value as string);
                break;
              // Add more cases as needed for other types
            }
          }
        } else {
          // If no matching mapping is found, keep the original key
          newItem[key] = value;
        }
      });
      return newItem;
    });
  };

  //  Function to handle XLSX file upload
  const handleXLSXUpload = async () => {
    setLoading(true);

    return new Promise(async (resolve, reject) => {
      try {
        const file = await FilePicker.pickFiles({
          types: [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ],
        });

        if (file?.files[0]) {
          const uri = file.files[0].path;
          const filename = file.files[0].name;
          // Read the file content as a Base64 string

          let data: any = null;
          if ((getPlatforms() as string[])?.includes("desktop")) {
            data = file.files[0].blob;

            // Convert the blob to a data URL
            const reader = new FileReader();
            reader.onload = async (event) => {
              if (event.target && event.target.result) {
                const workbook = XLSX.read(event.target.result, {
                  type: "binary",
                });
                const sheetNames = workbook.SheetNames;
                const jsonData: any = {};

                sheetNames.forEach((sheetName: string) => {
                  const sheet = workbook.Sheets[sheetName];
                  jsonData[sheetName] = XLSX.utils.sheet_to_json(sheet);
                });

                resolve({ jsonData, sheetNames });
              }
            };
            reader.readAsBinaryString(data);
          } else {
            const { data: filedata } = await Filesystem.readFile({
              path: uri as string,
            });

            data = filedata;

            // Parse the XLSX content from the data string
            const workbook = XLSX.read(data, { type: "base64" });
            const sheetNames = workbook.SheetNames;
            const jsonData: any = {};

            sheetNames.forEach((sheetName: string) => {
              const sheet = workbook.Sheets[sheetName];
              jsonData[sheetName] = XLSX.utils.sheet_to_json(sheet);
            });

            resolve({ jsonData, sheetNames });
          }
        }
      } catch (error) {
        setLoading(false);
        reject(error);
        console.log("Erreur lors de l'importation du fichier", error);
      } finally {
        setLoading(false);
      }
    });
  };

  const Upload = async (data: any, currentTable: string) => {
    switch (currentTable) {
      case "produit": {
        //addind metre row to each produit row
        let metreid = selectedMetre.current;
        for (const obj of data) {
          obj.metre = Metres.data?.data.filter(
            (item: any) => item?.id == metreid
          )[0];
        }

        mutation
          .mutateAsync({ data: data, currentTable: currentTable })
          .then(() => showSettledDialog("produit"));

        break;
      }
      case "lot": {
        //adding project row to each lot row
        let projectID = projectId;
        data.project = Projects.data?.data.filter(
          (item: any) => item?.id == projectID
        )[0];
        for (const obj of data) {
          obj.project = Projects.data?.data.filter(
            (item: any) => item?.id == projectID
          )[0];
        }

        mutation
          .mutateAsync({ data: data, currentTable: currentTable })
          .then(() => showSettledDialog("lot"));

        break;
      }

      case "tache": {
        // let lotID = data.lot;
        // let produitID = data.produit;

        // data.lot = lotsRef.current.filter((item) => item.id == lotID)[0];
        // data.produit = produitsRef.current.filter((item) => item.id == produitID)[0];

        // saveTache(data).then((response) => {

        //     return response;

        // }).catch((error) => { console.log('error save tache', error) })
        console.log("uploading tache ...");

        //   showSettledDialog();

        break;
      }
      case "detailProduit": {
        mutation
          .mutateAsync({ data: data, currentTable: "detailProduit" })
          .then(() => showSettledDialog("detailProduit"));
        break;
      }
      case "detailCharge": {
        mutation
          .mutateAsync({ data: data, currentTable: "detailCharge" })
          .then(() => showSettledDialog("detailCharge"));
        break;
      }
      case "detailDelai": {
        mutation
          .mutateAsync({ data: data, currentTable: "detailDelai" })
          .then(() => showSettledDialog("detailDelai"));
        break;
      }
      case "detailQualite": {
        mutation
          .mutateAsync({ data: data, currentTable: "detailQualite" })
          .then(() => showSettledDialog("detailQualite"));
        break;
      }
      default:
        alert("aucune table selectionnée");
        break;
    }
  };

  const handleUpload = async (uploadedExcel: any, selectedSheets: string[]) => {
    try {
      const promises = selectedSheets.map(async (sheetName) => {
        switch (sheetName) {
          case "ARTICLES": {
            renamedArticles.current = renameKeys(
              uploadedExcel[sheetName],
              produitFields
            );
            return Upload(renamedArticles.current, "produit");
          }
          case "LOTS": {
            renamedLots.current = renameKeys(
              uploadedExcel[sheetName],
              lotFields
            );
            return Upload(renamedLots.current, "lot");
          }
          case "TACHES": {
            renamedTaches.current = renameKeys(
              uploadedExcel[sheetName],
              tacheFields
            );
            return Upload(renamedTaches.current, "tache");
          }
          case "DETAIL PRODUIT": {
            //check for attentes
            const attentes = await getAttente(avenantId, "Produits");

            if (attentes?.data?.length > 0) {
              alert(
                "Attente trouvés pour les produits , veuillez les valider "
              );
              return;
            } else {
              let metreid = selectedMetre.current;

              const detailsprod = renameKeys(
                uploadedExcel[sheetName],
                detailProduitFields
              );
              for (const obj of detailsprod) {
                obj.metre = Metres.data?.data.filter(
                  (item: any) => item?.id == metreid
                )[0];
              }

              return Upload(detailsprod, "detailProduit");
            }
          }
          case "DETAIL CHARGE": {
            getAttente(avenantId, "Charges").then((response) => {
              if (response?.data?.length > 0) {
                alert(
                  "Attente trouvés pour les produits , veuillez les valider "
                );
                return;
              } else {
                let metreid = selectedMetre.current;

                const detailsCharge = renameKeys(
                  uploadedExcel[sheetName],
                  detailChargeFields
                );
                for (const obj of detailsCharge) {
                  obj.metre = Metres.data?.data.filter(
                    (item: any) => item?.id == metreid
                  )[0];
                }

                return Upload(detailsCharge, "detailCharge");
              }
            });

            return;
          }
          case "DETAIL DELAI": {
            const attentes = await getAttente(avenantId, "Délais");

            if (attentes?.data?.length > 0) {
              alert("Attente trouvés pour les délais , veuillez les valider ");
              return;
            } else {
              let metreid = selectedMetre.current;

              const detailsdelais = renameKeys(
                uploadedExcel[sheetName],
                detailDelaiFields
              );
              for (const obj of detailsdelais) {
                obj.metre = Metres.data?.data.filter(
                  (item: any) => item?.id == metreid
                )[0];
              }

              return Upload(detailsdelais, "detailDelai");
            }

            return;
          }
          case "DETAIL QUALITE": {
            const attentes = await getAttente(avenantId, "Qualités");
            if (attentes?.data?.length > 0) {
              alert("Attente trouvés pour les qualités , veuillez les valider");
              return;
            } else {
              let metreid = selectedMetre.current;

              const detailsqualite = renameKeys(
                uploadedExcel[sheetName],
                detailQualiteFields
              );
              for (const obj of detailsqualite) {
                obj.metre = Metres.data?.data.filter(
                  (item: any) => item?.id == metreid
                )[0];
              }

              return Upload(detailsqualite, "detailQualite");
            }
          }
          default:
            alert("aucune feuille trouvé avec les nom correspondants");
            break;
        }
      });

      Promise.all(promises);
    } catch (error) {
      alert("Erreur lors de l'importation du fichier " + error);
      console.log("Erreur lors de l'importation du fichier ", error);
    }
  };

  //metre picker params
  type optionProps = {
    text: string;
    value: string;
  }[];

  const metresList = (data: any[]): optionProps => {
    return data?.map((item) => ({
      text: item.titre?.toString(),
      value: item.id?.toString(),
    }));
  };

  const options: optionProps = metresList(Metres.data?.data);
  const columns: PickerColumn = {
    name: "Metre",
    options: options,

    prefix: "Metre :",
    suffix: " ",
  };

  const buttons = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Confirm",
      handler: (value: any) => {
        setMetreModal(false);
        onConfirm(value);
      },
    },
  ];
  //

  const onConfirm = async (value: any) => {
    (selectedMetre.current as unknown) = parseInt(value.Metre.value);

    const { jsonData, sheetNames }: any = await handleXLSXUpload();

    setsheetNamesRef(sheetNames);
    setXlsxData(jsonData);
    //CheckboxSelectionModal(sheetNames).then((checkedSheets:any)=> { handleUpload(jsonData ,checkedSheets)});
    const checkedSheets = await CheckboxSelectionModal(sheetNames);
    if (checkedSheets?.length > 0) handleUpload(jsonData, checkedSheets);
    // toast("okex");
    // toast("toastexx");
  };

  return (
    <>
      {/* <button 
        className='p-2'
        >
        <MenuItem
        onClick={async () => {
            //handleCloseMenu();
             //setMetreModal(true);
         }}
        >Import
        <UploadIcon/>
        </MenuItem>
        </button> */}

      {loading ? (
        <IonSpinner name="crescent"></IonSpinner>
      ) : Metres.data ? (
        <>
          <IonPicker
            isOpen={metreModal}
            onDidDismiss={() => setMetreModal(false)}
            columns={[columns]} // Wrap the columns object inside an array
            buttons={buttons}
          ></IonPicker>
        </>
      ) : (
        <></>
      )}

      {/* <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"

      >

      </ToastContainer>  */}

      {/**sheet selection form */}
      {/* <IonModal ref={sheetSelectRef}
        style={{
            '--width': 'fit-content',
            '--min-width': '250px',
            '--height': 'fit-content',
        }}
        animated={true}
        >
            <div className="p-5 border border-ion-dark-tint  ">
                <form
                onSubmit={(e) => {
                    e.preventDefault();
                  
                    //get checked sheets names
                    const checkedSheets:string[]= [];
                    e.currentTarget.querySelectorAll("ion-checkbox").forEach((item:any)=> {if(item?.ariaChecked==='true') checkedSheets.push(item?.value)});
                    
                    if(checkedSheets?.length>0){
                              handleUpload(xlsxData ,checkedSheets);
                    sheetSelectRef.current?.dismiss();
                    }else {
                        alert('Selectionner au moins une feuille')
                    }
                    

                }}
                >

                          
                <h3>Selectionner les feuilles à ajouter</h3>
                    <p className=' text-ion-warning'>les noms des feuilles doivent correspondre à un ou plusieur de ces noms: 
                    ARTICLES ,LOTS ,TACHES ,DETAIL PRODUIT ,DETAIL CHARGE ,DETAIL DELAI ,DETAIL QUALITE
                    </p>


                    { sheetNamesRef?.map((item:any)=> 
                                <IonItem key={item}>
                                    <IonCheckbox value={item}  >{item}</IonCheckbox>
                                </IonItem>
                    
                    )}
                        
                        <div className="flex flex-row justify-around m-1">

                                <IonButton onClick={()=>sheetSelectRef.current?.dismiss()}  >Cancel</IonButton>
                                <IonButton type="submit">Ok</IonButton>

                        </div>


                </form>
                  
            </div>

         
        </IonModal> */}
    </>
  );
};

export default XLSXUpload;

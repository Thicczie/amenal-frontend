import React, { useState, useRef, useImperativeHandle } from 'react';


import { getMetresByAvenantId, saveLot, saveProduit, saveTache } from '../api/crudAPI';

import { useMutation, useQuery } from '@tanstack/react-query';
import { getProjects } from '../api/api';
import { useAppContext } from '../contexts/AppContext';
import { IonButton, IonCheckbox, IonContent, IonItem, IonLabel, IonList, IonPicker, IonSelect, IonSpinner, PickerColumn, getPlatforms } from '@ionic/react';
import UploadIcon from '@mui/icons-material/Upload';

import { FilePicker } from '@capawesome/capacitor-file-picker';
import {  Filesystem } from '@capacitor/filesystem';
import * as  XLSX from 'xlsx';

import { Dialog } from '@capacitor/dialog';
import { IonModal } from '@ionic/react';


import { produitFields, lotFields, tacheFields , detailProduitFields, detailChargeFields } from '../constants/FormFields';
import { MenuItem } from '@mui/material';
import CheckboxSelectionModal from './CheckboxSelectionModal';
import { getDetailChargeAttentesByAvenantId, getDetailDelaiAttentesByAvenantId, getDetailProduitAttentesByAvenantId, getDetailQualiteAttentesByAvenantId, saveAllDetailChargeAttentes, saveAllDetailDelaiAttentes, saveAllDetailProduitAttentes, saveAllDetailQualiteAttentes } from '../api/detail_api';

interface XLSXUploadProps {
    handleCloseMenu?:()=>void;
    buttonRef?:any;
}

const XLSXUpload: React.FC<XLSXUploadProps> = ({handleCloseMenu=()=>{} , buttonRef  }) => {

    useImperativeHandle(buttonRef, () => ({


    
          showModal(){ setMetreModal(true)}
        
        })
    );

    const { avenantId, projectId, currentTable } = useAppContext();

    const sheetSelectRef = useRef<HTMLIonModalElement>(null);
    const [sheetNamesRef , setsheetNamesRef] = useState<any[]>([]);
    const [xlsxData , setXlsxData] = useState<any[]>([]);

    const selectedMetre = useRef();
    const [metreModal, setMetreModal] = useState(false);
    const [loading, setLoading] = useState(false);


    const metresRef = useRef([]);
    const projectsRef = useRef([]);

    const renamedArticles = useRef<any>([]);
    const renamedLots = useRef<any>([]);
    const renamedTaches = useRef<any>([]);





    const Projects = useQuery({
        queryKey: ['projectsss'],
        queryFn: () => getProjects(),
    })
    const Metres = useQuery({
        queryKey: ['avenantsss', avenantId],
        queryFn: () => getMetresByAvenantId(avenantId),
        enabled: !!avenantId,
    })


 



    //state to store duplicates and bad request rows
   const[ DuplicatesArray,setDuplicatesArray]=React.useState<any>([]);
   const[ BadReqArray,setBadReqArray]=React.useState<any>([]);



    const mutation = useMutation({
        mutationFn: (variables:{data:any[] , currentTable :string} ) => HandleMutate( variables.currentTable , variables.data),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            setLoading(false);
        

        },
        onError: (error) => {
            setLoading(false);
            alert('mutation error ' + error);
        },
        onSettled(data, error, variables, context) {

            if(data?.status == 400) BadReqArray.push(variables?.data)
            if(data?.status ==409) DuplicatesArray.push(variables?.data)
        

        },
    });



    const getAttente = async (avenantId:string|number|null , currentDetailTable :string ) => {

        switch (currentDetailTable) {
            case "Charges":
                return getDetailChargeAttentesByAvenantId(avenantId);


                break;
            case "Produits":
                return getDetailProduitAttentesByAvenantId(avenantId);

                break;
            case "Délais":
                return getDetailDelaiAttentesByAvenantId(avenantId)

                break;

            case "Qualités":
                return getDetailQualiteAttentesByAvenantId(avenantId)

                break;

            default:
                break;
        }

    }

    const SaveAttente = async (data : any , currentDetailTable :string ) => {

    
        switch (currentDetailTable) {
            case "Charges":
                return saveAllDetailChargeAttentes(data);


                break;
            case "Produits":
                return saveAllDetailProduitAttentes(data);

                break;
            case "Délais":
                return saveAllDetailDelaiAttentes(data)

                break;

            case "Qualités":
                return saveAllDetailQualiteAttentes(data)

                break;

            default:
                break;
        }


    }




    // use mutation mutate function
    const HandleMutate =async (currentTable :string , data : any[])=>{
        switch (currentTable) {
            case 'produit': {
               

                    return saveProduit(data)


            }
            case 'lot': {

                    return saveLot(data)

            }

            case 'tache': {

        
                    return saveTache(data)

                
            }
            case 'detailProduit': {
                        return  SaveAttente(data , 'Produits');
            }
            case 'detailCharge': {
                        return  SaveAttente(data , 'Charges');
            }
            case 'detailDelai': {
                    
            }
            case 'detailQualite': {
            }

            default:
                console.log('no table selected')
                break;
        }

    }


//show dialog with errors or success message
    const showSettledDialog = () => {

    
        if (BadReqArray.length > 0) {
            Dialog.alert({
                title: 'Erreur',
                message: 'Erreur de requête pour \n' + BadReqArray.map((item: any) => Object.entries(item).slice(0,2).map(([key , val]:any)=> key+ " : " +val).join(',    ')  + '\n'),
            });
            setBadReqArray([]);
            
            
        }
        if (DuplicatesArray.length > 0) {
            Dialog.alert({
                title: 'Erreur',
                message: 'Doublons détectés pour \n ' + DuplicatesArray.map((item: any) => Object.entries(item).slice(0,2).map(([key , val]:any)=> key+ " : " +val).join(',    ')  + '\n'),
            });
                    setDuplicatesArray([]);

        }
        if(BadReqArray.length == 0 && DuplicatesArray.length == 0){
            Dialog.alert({
                title: 'Succès',
                message: 'Importation réussie',
            });
        }
       
    }



    // Function to rename array keys to match specifications
    const renameKeys = (data: any[], fieldMappings: any) => {
        // Map over each item in the data array
        return data.map(item => {
            // Create a new object to store renamed keys
            const newItem: any = {};
            // Iterate over each key-value pair in the item
            Object.entries(item).forEach(([key, value]) => {
                // Find the mapping corresponding to the current key
                const mapping: any = Object.entries(fieldMappings).find(([mappedKey, mapping]) => {
                    return (mapping as any).label === key || mappedKey === key;
                });
                if (mapping) {
                    // Use the mapping key as the new key
                    newItem[mapping[0]] = value;
                    // Check if the key exists in produitFields
                    if (fieldMappings[mapping[0 as number]]) {
                        // Perform type casting based on the type defined in produitFields
                        switch (fieldMappings[mapping[0 as number]].type) {
                            case "boolean":
                                newItem[mapping[0]] = value === 'true' || value === '1' || value === 1 || value === true || value === 'TRUE' || value==="vrai" || value==="VRAI" || value ==="oui" || value ==="OUI";
                                break;
                            case "date":
                                const parts = (value as string)?.split('/');
                                const day = parseInt(parts[0], 10);
                                const month = parseInt(parts[1], 10) - 1;
                                const year = parseInt(parts[2], 10);
                                newItem[mapping[0]] = new Date(year, month, day);
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
    const handleXLSXUpload = async ()  => {

        setLoading(true);

        return new Promise(async (resolve, reject) => {
            try {

                const file = await FilePicker.pickFiles({
                    types: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    
                })
    
                console.log('file', file.files[0].name);
                
    
    
    
    
                if (file?.files[0]) {
                    const uri = file.files[0].path;
                    const filename = file.files[0].name;
                    // Read the file content as a Base64 string
                    
    
    
    
                    let data: any = null;
                    if ((getPlatforms() as string[])?.includes('desktop')) {
    
                        data = file.files[0].blob;
    
    
                        // Convert the blob to a data URL
                        const reader = new FileReader();
                        reader.onload = async (event) => {
                            if (event.target && event.target.result) {
                                const workbook = XLSX.read(event.target.result, { type: 'binary' });
                                const sheetNames = workbook.SheetNames;
                                const jsonData:any = {};
    
    
                                sheetNames.forEach((sheetName: string) => {
                                    const sheet = workbook.Sheets[sheetName];
                                    jsonData[sheetName] = XLSX.utils.sheet_to_json(sheet);
                                });
    
                                resolve({jsonData , sheetNames});
    
                             
                            }
                        };
                        reader.readAsBinaryString(data);
    
                    } else {
    
                        const { data: filedata } = await Filesystem.readFile({
                            path: uri as string,
                        });
    
                        data = filedata;
    
                        // Parse the XLSX content from the data string
                        const workbook = XLSX.read(data, { type: 'base64' });
                        const sheetNames = workbook.SheetNames;
                        const jsonData:any = {};
    
    
                        sheetNames.forEach((sheetName: string) => {
                            const sheet = workbook.Sheets[sheetName];
                            jsonData[sheetName] = XLSX.utils.sheet_to_json(sheet);
                        });

                        resolve({jsonData , sheetNames});
    
                    
                    }
                    
    
    
    
    
    
    
    
                }
            }
    
            catch (error) {
    
                setLoading(false);
                reject(error);  
                console.log("Erreur lors de l'importation du fichier", error);
    
            } finally {
                setLoading(false);
                
            }


        })

        
    };


    const Upload = async (data: any, currentTable: string) => {

        switch (currentTable) {
            case 'produit': {
                //addind metre row to each produit row
                let metreid = selectedMetre.current;
                for (const obj of data) {
                    obj.metre = Metres.data?.data.filter((item: any) => item?.id == metreid)[0];
                }



                    const promises = data.map((item: any) => mutation.mutateAsync({data:item , currentTable:currentTable}));

                    Promise.all(promises)
                        .then((responses) => {
                            // All mutations have completed here
                            showSettledDialog();

                        })
                        .catch((error) => {
                            console.error(error);
                            // Handle error here
                        });
              



                break;
            }
            case 'lot': {

                //adding project row to each lot row
                let projectID = projectId;
                data.project = Projects.data?.data.filter((item: any) => item?.id == projectID)[0];
                for (const obj of data) {
                    obj.project = Projects.data?.data.filter((item: any) => item?.id == projectID)[0];
                }


                const promises = data.map((item: any) => mutation.mutateAsync({data:item , currentTable:currentTable}));
                Promise.all(promises)
                .then((responses) => {
                    // All mutations have completed here
                    showSettledDialog();
                })
                .catch((error) => {
                    console.error(error);
                    // Handle error here
                });


                break;
            }


            case 'tache': {

                // let lotID = data.lot;
                // let produitID = data.produit;


                // data.lot = lotsRef.current.filter((item) => item.id == lotID)[0];
                // data.produit = produitsRef.current.filter((item) => item.id == produitID)[0];



                // saveTache(data).then((response) => {

                //     return response;

                // }).catch((error) => { console.log('error save tache', error) })
                console.log('uploading tache ...');
                


                //   showSettledDialog();

                break;
            }
            case 'detailProduit': {
                mutation.mutateAsync({data: data  , currentTable:'detailProduit'}).then(()=>showSettledDialog())
                break;
                   

            }
            case 'detailCharge': {
                mutation.mutateAsync({data: data  , currentTable:'detailCharge'}).then(()=>showSettledDialog())
                break;

            }
            case 'detailDelai': {
            }
            case 'detailQualite': {
            }
            default:
                alert("aucune table selectionnée")
                break;
        }
    }

    const handleUpload = async (uploadedExcel: any , selectedSheets:string[]) => {




        try {

            const promises = selectedSheets.map(async (sheetName) => {
                switch (sheetName) {

                    case 'ARTICLES': {
                        renamedArticles.current = renameKeys(uploadedExcel[sheetName], produitFields);
                        return Upload(renamedArticles.current, 'produit');
                    }
                    case 'LOTS': {
                        renamedLots.current = renameKeys(uploadedExcel[sheetName], lotFields);
                        return Upload(renamedLots.current, 'lot');
                    }
                    case 'TACHES': {
                        renamedTaches.current = renameKeys(uploadedExcel[sheetName], tacheFields);
                        return Upload(renamedTaches.current, 'tache');
                    }
                    case 'DETAIL PRODUIT': { 
                                //check for attentes 
                                const attentes= await getAttente(avenantId,'Produits');


                                if(attentes?.data?.length>0){
                                    alert('Attente trouvés pour les produits , veuillez les valider ');
                                    return;
                                }else{


                                    let metreid = selectedMetre.current;
                                            
                                    const detailsprod = renameKeys(uploadedExcel[sheetName], detailProduitFields);
                                    for (const obj of detailsprod) {
                                        obj.metre = Metres.data?.data.filter((item: any) => item?.id == metreid)[0];
                                    }

                                    return  Upload(detailsprod, 'detailProduit');

                                }

                          
                    }
                    case 'DETAIL CHARGE': {
                        getAttente(avenantId , 'Charges').then((response)=> {                              
                            if(response?.data?.length>0){
                                alert('Attente trouvés pour les produits , veuillez les valider ');
                                return;
                            }else{


                                let metreid = selectedMetre.current;
                                        
                                const detailsCharge = renameKeys(uploadedExcel[sheetName], detailChargeFields);
                                for (const obj of detailsCharge) {
                                    obj.metre = Metres.data?.data.filter((item: any) => item?.id == metreid)[0];
                                }

                                return  Upload(detailsCharge, 'detailCharge');

                            }
                                
                        })


                            return  
                    }
                    case 'DETAIL DELAI': {
                            return  
                    }
                    case 'DETAIL QUALITE': {
                            return  
                    }
                    default:
                        alert('aucune feuille trouvé avec les nom correspondants')
                        break;
                }
            });

            Promise.all(promises);
             

        } catch (error) {
            alert('Erreur lors de l\'importation du fichier ' + error);
            console.log('Erreur lors de l\'importation du fichier ', error);
        }





    }



    //metre picker params
    type optionProps = {
        text: string,
        value: string,
    }[]

    const metresList = (data: any[]): optionProps => {
        return data?.map(item => ({
            text: item.titre.toString(),
            value: item.id.toString(),
        }));
    }


    const options: optionProps = metresList(Metres.data?.data);
    const columns: PickerColumn =
    {
        name: 'Metre',
        options: options,
       
       
        prefix: 'Metre :',
        suffix: ' ',
        

    };

    const buttons = [
        {
            text: 'Cancel',
            role: 'cancel',
        },
        {
            text: 'Confirm',
            handler: (value: any) => {

                console.log('value', value);
                
                setMetreModal(false);
                onConfirm(value);

            },
        },
        
    ];
    //

    const onConfirm = async (value: any) => {

        (selectedMetre.current as unknown) = parseInt(value.Metre.value);


         const {jsonData , sheetNames} :any = await handleXLSXUpload()
      

        setsheetNamesRef(sheetNames);
        setXlsxData(jsonData);
       // CheckboxSelectionModal(sheetNames).then((checkedSheets:any)=> { handleUpload(jsonData ,checkedSheets)});
        const checkedSheets = await CheckboxSelectionModal(sheetNames);
        if(checkedSheets?.length>0) handleUpload(jsonData ,checkedSheets);        


    
        
        
    



    }




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

        {loading ? (<IonSpinner name='crescent'></IonSpinner>) :
                Metres.data ? (
                    <>
                        <IonPicker
                            isOpen={metreModal}
                            onDidDismiss={() => setMetreModal(false)}
                            columns={[columns]} // Wrap the columns object inside an array
                            buttons={buttons}
                        ></IonPicker>
                    </>
                ) : (<></>)
            }





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

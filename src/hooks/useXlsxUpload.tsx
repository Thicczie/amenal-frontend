 import { FilePicker } from '@capawesome/capacitor-file-picker';
import { getPlatforms } from '@ionic/react';
import * as XLSX from 'xlsx';
import React from 'react'
import { Filesystem } from '@capacitor/filesystem';

 
 
 
 
 const useXlsxUpload = async ():Promise<{
    jsonData: any;
    loading: boolean;
} | undefined>  =>  {

    const [loading, setLoading] = React.useState<boolean>(false);

        setLoading(true);
        try {

            const file  = await FilePicker.pickFiles({
                types: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
             
            })

            console.log('file',file.files[0].name);
              

            

            if (file?.files[0]) {
                const uri  = file.files[0].path;
                const filename = file.files[0].name;
                // Read the file content as a Base64 string

                

                
                let data : any =null;
                if ((getPlatforms() as string[])?.includes('desktop')) {

                     data = file.files[0].blob;


                      // Convert the blob to a data URL
                                const reader = new FileReader();
                                reader.onload = async (event) => {
                                    if (event.target && event.target.result) {
                                        const workbook = XLSX.read(event.target.result, { type: 'binary' });
                                        const sheetNames = workbook.SheetNames;
                                        const jsonData: any = {};
                                
                                        sheetNames.forEach((sheetName: string) => {
                                            const sheet = workbook.Sheets[sheetName];
                                            jsonData[sheetName] = XLSX.utils.sheet_to_json(sheet);
                                        });
                                
                                        if (jsonData) {
                                            setLoading(false);
                                            alert('Fichier importé avec succès');
                                            console.log("jsondata dekstop:" , jsonData);
                                            
                                            return {jsonData  , loading};
                                        }
                                    }
                                };
                                reader.readAsBinaryString(data);

                }else{
                    
                        const { data:filedata } = await Filesystem.readFile({
                            path: uri as string,
                        });

                        data=filedata;

                        // Parse the XLSX content from the data string
                        const workbook = XLSX.read(data, { type: 'base64' });
                        const sheetNames = workbook.SheetNames;
                        const jsonData :any = {};
            
                        sheetNames.forEach((sheetName :string) => {
                            const sheet = workbook.Sheets[sheetName];
                            jsonData[sheetName]  = XLSX.utils.sheet_to_json(sheet);
                        });
            
                        if (jsonData) {
                            setLoading(false);
                            alert('fichier importé avec succès');
                            return {jsonData  , loading};
                        }
        
                }
                
               


    


        }
    }

        catch (error) {

            setLoading(false);
            alert("Erreur lors de l'importation du fichieer  " +error);
            console.log("Erreur lors de l'importation du fichier" ,error);
            
        } finally {
            setLoading(false);
        }
    };


    export default useXlsxUpload;

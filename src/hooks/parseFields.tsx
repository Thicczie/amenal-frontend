import { Fields } from "../constants/FormFields";

export function parseFields(data:any,formFields:Fields):any {
    for (let key in data) {
        if (formFields[key]) {
            switch (formFields[key].type) {
  
                case "boolean":
                    data[key] = data[key] === "true";
                    break;
                case "date":

                    const parts = data[key].split('-' || '/' || '.');
                    const year = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const day = parseInt(parts[2], 10);
  
                    data[key] = new Date(year, month, day)
                    console.log('parsed date', data[key].toLocaleDateString())
                    if (isNaN(data[key].getTime())) {
                        data[key] = null;
                    }
                    break;
                case "number":
                    data[key] = parseFloat(data[key]);
                    if (isNaN(data[key])) {
                        data[key] = null;
                    }
                    break;
                default:
                  
                    break;
            
                    
            }
        }
    }
    return data;
}
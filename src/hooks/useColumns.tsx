import { IonNav } from '@ionic/react';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';


// This hook is used to generate the columns for the MaterialReactTable component
const useColumns = (data:any) => {
  return useMemo(() => {
    if (!data || !data.data || (data?.data as any[]).length === 0) {
      return []; // Return empty array if data is undefined, null, or empty
    }

      const firstDataItem: any[] = (data?.data as any[])[0];


     Object.entries(firstDataItem).forEach(([key, value]: [string, any]) => {
        // Check if the value is null, and replace it with ''
        if (value === null) {
          firstDataItem[key as any] = '';
        }    

      });
      
      const keyValuePairs = Object.entries(firstDataItem);


    const columns : MRT_ColumnDef<any>[] = keyValuePairs
      .filter(([key, value]) =>  typeof value !== 'object')
      .map(([key, value]) => ({
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key
        size: undefined,
      
      }))


    return columns;
  }, [data]);
};

export default useColumns;

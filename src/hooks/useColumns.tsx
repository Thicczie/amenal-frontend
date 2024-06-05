import { IonNav } from "@ionic/react";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

// This hook is used to generate the columns for the MaterialReactTable component
const useColumns = (data: any) => {
  return useMemo(() => {
    const Data: any = data?.data ? data?.data : data;

    if (
      !Data ||
      Data.length === 0 ||
      typeof Data === "undefined" ||
      Data === null
    ) {
      return []; // Return empty array if data is undefined, null, or empty
    }

    const firstDataItem: any[] = (Data as any[])[0] || (Data as any[]) || {};

    Object.entries(firstDataItem).forEach(([key, value]: [string, any]) => {
      // Check if the value is null, and replace it with ''
      if (value === null) {
        firstDataItem[key as any] = "";
      }
    });

    const keyValuePairs = Object.entries(firstDataItem);

    const columns: MRT_ColumnDef<any>[] = keyValuePairs
      .filter(([key, value]) => typeof value !== "object")
      .map(([key, value]) => ({
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key
        enableEditing: key === "id" ? false : true,
        grow: key === "id" ? 0 : 1,
        size: undefined,
        muiEditTextFieldProps: {
          required: true,
        },
      }));

    return columns;
  }, [data]);
};

export default useColumns;

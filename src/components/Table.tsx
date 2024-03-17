import { useEffect, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';






interface TableProps {
  onRowClick: (rowData: any) => void; // Define prop for callback function
  data: any[];
  columns: MRT_ColumnDef<any>[];
}


const Table:React.FC <TableProps> = ({onRowClick ,data , columns}) => {







  //should be memoized or stable


  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnResizing: true,
    enablePagination:true,
    enableFullScreenToggle:false,
  
      
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {

          onRowClick(row); // Call the callback function with the row data
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
  });

  return <MaterialReactTable  table={table} />;
};

export default Table;

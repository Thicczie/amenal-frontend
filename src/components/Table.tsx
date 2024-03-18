import { Children, useEffect, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { IonButton, IonNavLink, LocationHistory, NavCustomEvent } from '@ionic/react';
import Details from '../pages/Details';






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
    initialState:{
      columnVisibility:{
        'id':false
      },
      density:'compact',
    },
    enableEditing:true,

  
      
    muiTableBodyRowProps: ({ row ,table }) => ({
      onClick: (event) => {

        console.log('clicked table ', table);
        
          onRowClick(row); // Call the callback function with the row data
          //NavCustomEvent.push({pathname: "/details" , state: { AllRowData: row.original , displayedRowData: row._valuesCache   } });
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },      
    }),

    muiTableBodyCellProps: ({ cell }) => {
      if(typeof cell.getValue() ==='boolean'){
        return  {children : cell.getValue() ? 'OUI':'NON'}
      }else{
        return {children : undefined}
      }
    }
  });

  return <MaterialReactTable  table={table} />;
};

export default Table;

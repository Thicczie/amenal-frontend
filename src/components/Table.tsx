import { Children, useEffect, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { IonButton, IonNavLink, LocationHistory, NavCustomEvent } from '@ionic/react';
import Details from '../pages/Details';
import { Button } from '@mui/material';
import ButtonList from './buttonList';

interface TableProps {
  onRowClick: (rowData: any) => void; // Define prop for callback function
  data: any[];
  columns: MRT_ColumnDef<any>[];
  enableEditing: boolean;
  hideColumns:boolean;
}

const Table:React.FC <TableProps> = ({onRowClick ,data , columns , enableEditing=false ,hideColumns=false}) => {

  // Define the table instance using the useMaterialReactTable hook
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnResizing: true,
    enablePagination:true,
    enableFullScreenToggle:false,
    enableStickyHeader:true,
    
    initialState:{   
      columnVisibility:{
        'id':false, //hide id on displayed table
        'produitId':false,
        'lotId':false,
        'activiteId':false,
        'ordre':!hideColumns,  // hides unwanted columns
        'produit':!hideColumns,
        'lot':!hideColumns,
        'activite':!hideColumns,
        'upb':!hideColumns,
      },
    
      density:'compact',
    },
    enableEditing:enableEditing,

    onEditingRowSave: ({ table, values  }) => {
      //validate data
      //save data to api

      console.log('onEditingRowSave', values);


      table.setEditingRow(null); //exit editing mode
    },
    renderTopToolbarCustomActions: ({ table }) => {

  
      
      return  <ButtonList table={table}/>;
    },
    
    muiTableBodyRowProps: ({ row ,table }) => ({
      onClick: (event) => {
          onRowClick(row); // Call the callback function with the row data
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

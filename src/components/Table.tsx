import { Children, useEffect, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';

import { Button } from '@mui/material';
import ButtonList from './buttonList';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownload  from '@mui/icons-material/FileDownload';

import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from  'jspdf-autotable'
import { mkConfig, generateCsv, download } from 'export-to-csv' //or use your library of choice here




interface TableProps {
  onRowClick: (rowData: any) => void; // Define prop for callback function
  data: any[];
  columns: MRT_ColumnDef<any>[];
  enableEditing: boolean;
  hideColumns:boolean;
  enableGraph?:boolean;
}




const Table:React.FC <TableProps> = ({onRowClick ,data , columns , enableEditing=false ,hideColumns=false , enableGraph=false}) => {

  const handleExportRowsPdf = (rows: MRT_Row<any>[]) => {
    const doc = new jsPDF();
    const tableData :any[] = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  };


  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const handleExportRowsCsv = (rows: MRT_Row<any>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };


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

  

    return (
<>

         { enableGraph &&  <ButtonList table={table} />}
         <button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          className='p-2'
          onClick={() =>
            handleExportRowsPdf(table.getRowModel().rows)
          }
          
        >
          <PictureAsPdfIcon/>
          
       
          </button>


          <button
          className='p-2'
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRowsCsv(table.getPrePaginationRowModel().rows)
          }
          
        >
          <FileDownload/>
          
       
          </button>

          </>

          
    );
 


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

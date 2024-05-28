import { Children, useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
  MRT_EditActionButtons,
} from "material-react-table";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ButtonList from "./buttonList";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownload from "@mui/icons-material/FileDownload";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable, { Row } from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { MRT_Localization_FR } from "material-react-table/locales/fr";

import {
  Directory,
  Encoding,
  Filesystem,
  WriteFileOptions,
  ReadFileOptions,
} from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

import { getPlatforms } from "@ionic/react";
import { useAppContext } from "../contexts/AppContext";
import XLSXUpload from "./xlsxUpload";
import ReactDOM from "react-dom";
import React from "react";

import { Upload } from "@mui/icons-material";
import ModifyDialogButton from "./ModifyDialog";
import { produitFields } from "../constants/FormFields";
import DeleteDialogButton from "./DeleteDialogButton";
import { useLongPress } from "../hooks/useLongPress";
import { useNavigate } from "react-router-dom";

interface TableProps {
  onRowClick: (rowData: any) => void; // Define prop for callback function
  onRowContextMenu?: (rowData: any | null) => void;
  data: any[];
  columns: MRT_ColumnDef<any>[];
  enableEditing: boolean;
  hideColumns: boolean;
  enableGraph?: boolean;
  enableSeeAll?: boolean;
  enableFilterByCharge?: boolean;
  enableXlsxUpload?: boolean;
  tableName: string;
}

const Table: React.FC<TableProps> = ({
  onRowClick,
  onRowContextMenu = null,
  data,
  columns,
  enableEditing = false,
  hideColumns = false,
  enableGraph = false,
  enableSeeAll = false,
  enableFilterByCharge = false,
  enableXlsxUpload = true,
  tableName,
}) => {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
    row?: MRT_Row<any>;
  } | null>(null);

  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [crudMenuAcnhorEl, setcrudMenuAcnhorEl] =
    React.useState<null | HTMLElement>(null);
  const actionMenuOpen = Boolean(actionMenuAnchorEl);
  const crudMenuOpen = Boolean(crudMenuAcnhorEl);
  const { currentCharge, setCurrentCharge } = useAppContext();

  const onFilterByCharge = (row: MRT_Row<any> | undefined) => {
    //console.log('onFilterByCharge', row?.original?.charge);

    setCurrentCharge(row?.original?.charge);
  };

  const handleActionMenuClick = (event: any) => {
    setActionMenuAnchorEl(event?.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleCrudMenuClick = (event: any) => {
    setcrudMenuAcnhorEl(event?.currentTarget);
  };
  const handleCrudMenuClose = () => {
    setcrudMenuAcnhorEl(null);
  };

  const navigate = useNavigate();
  const handleVoirToutClick = (event: any) => {
    event.preventDefault();
    navigate("allDetails");
  };

  const handleExportRowsPdf = async (rows: MRT_Row<any>[]) => {
    const doc = new jsPDF();
    const tableData: any[] = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    const docBlob = doc.output();

    const options: WriteFileOptions = {
      path: "Table.pdf",
      data: docBlob,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    };
    //get the file

    if ((getPlatforms() as string[])?.includes("desktop")) {
      doc.save("Table.pdf");
    } else {
      try {
        const writenFile = await Filesystem.writeFile(options).then(
          (result) => {
            return result;
          }
        );
        const fileContent = await Filesystem.readFile(options).then(
          (result) => {
            return result;
          }
        );

        console.log("PDF file written to:", fileContent);

        const shareResult = await Share.share({
          title: "Export as PDF",
          url: writenFile?.uri,
          dialogTitle: "Share PDF file",
        });
      } catch (error) {
        console.log("Unable to share PDF file:", error);
      }
    }
  };

  // Define the CSV configuration
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  // handle export to csv
  const handleExportRowsCsv = async (rows: MRT_Row<any>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);

    try {
      // Write CSV data to a temporary file
      const fileName = "exported_data.csv";

      const options: WriteFileOptions = {
        path: fileName,
        data: csv.toString(), // Convert csv to string
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      };
      //get the file
      const writenFile = await Filesystem.writeFile(options).then((result) => {
        return result;
      });

      if ((getPlatforms() as string[])?.includes("desktop")) {
        download(csvConfig)(csv);
      } else {
        // Share the file with the user
        const shareResult = await Share.share({
          title: "Export as Csv",
          url: writenFile?.uri,
          dialogTitle: "Share CSV file",
        });
      }
      //   console.log('CSV file shared successfully!');
    } catch (error) {
      console.error("Unable to share CSV file:", error);
      alert("export error: " + (error as any)?.message);
    }
  };

  const onLongPress = (event: React.TouchEvent<any>, row: MRT_Row<any>) => {
    console.log("Long press detected.", event, row);
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.touches[0].clientX + 2,
            mouseY: event.touches[0].clientY - 6,
            row: row,
          }
        : null
    );
  };

  const [selectedRow, setSelectedRow] = React.useState<MRT_Row<any>>();
  const xlsxButtonRef = React.useRef<any>();

  // Define the table instance using the useMaterialReactTable hook
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnResizing: true,
    enablePagination: true,
    enableFullScreenToggle: true,
    enableStickyHeader: true,
    enableEditing: enableEditing,
    enableDensityToggle: false,
    enableRowActions: true,
    localization: { ...MRT_Localization_FR, rowsPerPage: "" },

    initialState: {
      columnVisibility: {
        id: false, //hide id on displayed table
        produitId: false,
        lotId: false,
        activiteId: false,
        status: false,
        ordre: !hideColumns, // hides unwanted columns
        produit: !hideColumns,
        lot: !hideColumns,
        activite: !hideColumns,
        upb: !hideColumns,
      },

      density: "compact",
    },

    onEditingRowSave: ({ table, values }) => {
      //validate data
      //save data to api

      console.log("onEditingRowSave", values);

      table.setEditingRow(null); //exit editing mode
    },
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <ModifyDialogButton currentForm={tableName} table={table} row={row} />
    ),
    // renderRowActions: ({ row, table }) => (

    //   <Tooltip title='actions'>
    //     <>
    //    <IconButton
    //       className='p-2'

    //       //export all rows, including from the next page, (still respects filtering and sorting)
    //       onClick={(e) =>
    //         handleCrudMenuClick(e)
    //       }
    //     >
    //       <MoreHorizIcon/>
    //     </IconButton>
    //      <Menu open={crudMenuOpen}
    //      anchorEl={crudMenuAcnhorEl}
    //       onClose={handleCrudMenuClose}
    //      >
    //       <MenuItem className=' gap-2' onClick={()=>{table.setEditingRow(row); handleCrudMenuClose()}}><EditIcon/>Modifier</MenuItem>
    //       <MenuItem className='gap-2'><DeleteIcon/><DeleteDialogButton handleCrudMenuClose={handleCrudMenuClose} currentTable={tableName}/></MenuItem>
    //       </Menu>
    //     </>
    //   </Tooltip>
    // ),

    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <>
          <div className=" flex flex-row">
            <button
              className="p-2"
              //export all rows, including from the next page, (still respects filtering and sorting)
              onClick={(e) => handleActionMenuClick(e)}
            >
              <MoreHorizIcon />
            </button>

            <Menu
              open={actionMenuOpen}
              anchorEl={actionMenuAnchorEl}
              onClose={handleActionMenuClose}
            >
              <MenuItem
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                className="p-2"
                onClick={() => {
                  handleExportRowsPdf(table.getRowModel().rows);
                  handleActionMenuClose();
                }}
              >
                <PictureAsPdfIcon />
                Exporter Pdf
              </MenuItem>
              <MenuItem
                className="p-2"
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                //export all rows, including from the next page, (still respects filtering and sorting)
                onClick={() => {
                  handleExportRowsCsv(table.getPrePaginationRowModel().rows);
                  handleActionMenuClose();
                }}
              >
                <FileDownload />
                Exporter Excel
              </MenuItem>

              {enableXlsxUpload && (
                <MenuItem
                  onClick={() => {
                    handleActionMenuClose();
                    xlsxButtonRef.current?.showModal();
                  }}
                  disabled={!enableXlsxUpload}
                >
                  <UploadIcon />
                  Importer Excel
                </MenuItem>
              )}

              {enableSeeAll && (
                <MenuItem
                  onClick={(e) => {
                    handleVoirToutClick(e);
                    handleActionMenuClose();
                  }}
                >
                  Voir Tout
                </MenuItem>
              )}
            </Menu>

            {enableXlsxUpload && <XLSXUpload buttonRef={xlsxButtonRef} />}

            {enableGraph && <ButtonList table={table} />}
          </div>
        </>
      );
    },

    muiTableBodyRowProps: ({ row, table }) => {
      const longPressProps = useLongPress((event: React.TouchEvent) =>
        onLongPress(event, row)
      );

      return {
        ...longPressProps,
        onClick: (event) => {
          event.preventDefault();
          setSelectedRow(row);
          onRowClick(row);
        },
        onContextMenu: (event) => {
          event.preventDefault();
          setContextMenu(
            contextMenu === null
              ? {
                  mouseX: event.clientX + 2,
                  mouseY: event.clientY - 6,
                  row: row,
                }
              : null
          );
        },
        sx: {
          cursor: "pointer", //you might want to change the cursor too when adding an onClick
          backgroundColor: row === selectedRow ? "rgba(0,0,0,0.1)" : undefined, // Change the background color if the row is selected
          fontWeight: row === selectedRow ? "bold" : "normal",
          border:
            row.original?.charge && row.original?.charge === currentCharge
              ? "1px solid #3880ff"
              : undefined,
        },
      };
    },

    muiBottomToolbarProps(props) {
      return {
        sx: {
          maxHeight: "50px",
          "& .MuiTablePagination-root": {
            maxHeight: "50px",
          },
        },
      };
    },
    // parse bool value to text
    muiTableBodyCellProps: ({ cell, row }) => {
      let colorStyle;
      switch (row.original?.status) {
        case 0:
          colorStyle = { sx: { color: "red" } };
          break;
        case 1:
          colorStyle = { sx: { color: "green" } };
          break;
        default:
          colorStyle = { sx: { color: "black" } };
      }

      if (typeof cell.getValue() === "boolean") {
        return {
          children: cell.getValue() ? "OUI" : "NON",
          ...colorStyle,
        };
      } else {
        return { children: undefined, ...colorStyle };
      }
    },
    muiTablePaperProps(props) {
      return {
        sx: {
          backgroundColor: "#fff",
          boxShadow: 0,
        },
      };
    },
  });

  return (
    <>
      {contextMenu &&
        ReactDOM.createPortal(
          <Menu
            open={true}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
            onClose={() => setContextMenu(null)}
          >
            {onRowContextMenu && (
              <MenuItem
                onClick={() => {
                  onRowContextMenu(contextMenu?.row);
                  setContextMenu(null);
                }}
              >
                Voir Détails
              </MenuItem>
            )}

            <DeleteDialogButton
              onClose={() => setContextMenu(null)}
              handleCrudMenuClose={handleCrudMenuClose}
              currentTable={tableName}
            />

            {enableFilterByCharge && (
              <MenuItem
                onClick={() => {
                  onFilterByCharge(contextMenu?.row);
                  setContextMenu(null);
                }}
              >
                Filtrer par Charge
              </MenuItem>
            )}
          </Menu>,
          document.body
        )}
      <MaterialReactTable table={table} />
    </>
  );
};

export default Table;

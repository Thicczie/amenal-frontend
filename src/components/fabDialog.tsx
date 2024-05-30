import { DoneAllOutlined, LockOpenOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@mui/material";
import React from "react";

type Props = {};

const FabDialog = (props: Props) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState("");
  const handleClickOpen = (actionType: string) => {
    setDialogOpen(true);
    setActionType(actionType);
  };
  return (
    <>
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <div className="flex gap-2 flex-col">
          <Fab color="primary" onClick={() => handleClickOpen("Figer")}>
            <LockOpenOutlined />
          </Fab>
          <Fab color="primary">
            <DoneAllOutlined onClick={() => handleClickOpen("Valider")} />
          </Fab>
        </div>
      </Box>
      <Dialog open={dialogOpen} fullWidth onClose={() => setDialogOpen(false)}>
        <DialogTitle>{actionType + " ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Etes vous sur de vouloir {actionType} ce projet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Annuller
          </Button>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
            autoFocus
          >
            {actionType}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FabDialog;

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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../api/api";
import toast from "react-hot-toast";

type Props = {};

const FabDialog = (props: Props) => {
  const { projectId } = useParams();
  const client = useQueryClient();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState("");
  const handleClickOpen = (actionType: string) => {
    setDialogOpen(true);
    setActionType(actionType);
  };

  const { getProjectById, figerProjet, validerProjet } = useApi();

  const mutation = useMutation({
    mutationFn: (actionType: string) => HandleAction(actionType),
    onSettled: (data, error, variables, context) => {
      // The mutation has successfully completed!
      if (data?.status == 200 || data?.status == 201) {
        console.log("mutation success");
        toast.success(actionType + "!");
        setDialogOpen(false);
        client.invalidateQueries();
      } else {
        console.log("mutation failed");
        setDialogOpen(false);
        toast.error("Erreur! " + data?.originalError?.message);
      }
    },
  });

  const project = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });

  const projectStatus = project.data?.data?.status;

  const HandleAction = async (actionType: string) => {
    switch (actionType) {
      case "Figer":
        return figerProjet(projectId);
      case "Valider":
        return validerProjet(projectId);
    }
  };
  return (
    <>
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <div className="flex gap-2 flex-col">
          <Fab
            color="primary"
            disabled={
              !(projectStatus == 1) ||
              projectStatus == null ||
              projectStatus == 3
            }
            onClick={() => handleClickOpen("Figer")}
          >
            <LockOpenOutlined />
          </Fab>
          <Fab
            color="primary"
            disabled={projectStatus <= 1 || projectStatus == 3}
            onClick={() => handleClickOpen("Valider")}
          >
            <DoneAllOutlined />
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
              mutation.mutate(actionType);
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

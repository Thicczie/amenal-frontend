import React, { useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import PageHeader from "../components/PageHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserMgApi from "../api/auth/userMgApi";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button, Menu, MenuItem } from "@mui/material";
import useColumns from "../hooks/useColumns";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import toast from "react-hot-toast";
import DeleteDialogButton from "../components/DeleteDialogButton";

type Props = {};

const Users = (props: Props) => {
  const {
    getUserById,
    getUsers,
    setToAdmin,
    setToManager,
    setToSupManager,
    deleteUser,
  } = useUserMgApi();
  const { userCredentials } = useAuth();
  const Navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const queryClient = useQueryClient();
  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const mutation = useMutation({
    mutationFn: (variables: { role: string; id: number }) =>
      changeRole(variables.role, variables.id),
    onSettled(data, error, variables, context) {
      // The mutation has successfully completed!
      console.log("data settled ", data);

      if (data?.status == 200 || data?.status == 201) {
        console.log("mutation success");
        toast.success("Modifié!");
        users.refetch();
        setMenuOpen(false);
      } else if (data?.status == 403) {
        toast.error("Accès non autorisé");
      } else if (data?.status == 401) {
        console.log("entry already exists");
        toast.error("L'enregistrement existe déjà");
      } else {
        console.log("mutation failed");
        toast.error("Erreur! " + data?.originalError?.message);
      }
    },
  });

  const changeRole = async (role: string, id: number) => {
    switch (role) {
      case "admin":
        return setToAdmin(id);

      case "manager":
        return setToManager(id);

      case "supManager":
        return setToSupManager(id);

      case "delete":
        return deleteUser(id);

      default:
        console.log("role not found");
        break;
    }
  };

  useEffect(() => {
    if (userCredentials?.role !== "ADMIN") {
      Navigate("/unauthorized");
    }
  }, [userCredentials]);

  const userColumns = useColumns(users?.data?.data as []);
  const table = useMaterialReactTable({
    data: (users?.data?.data as any[]) || [],
    columns: [
      ...userColumns,
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <>
            <Button
              onClick={(e) => {
                setContextMenu({
                  mouseX: e.clientX - 2,
                  mouseY: e.clientY - 4,
                });
                setMenuOpen(true);
              }}
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              open={menuOpen}
              anchorReference="anchorPosition"
              anchorPosition={{
                top: contextMenu?.mouseY || 0,
                left: contextMenu?.mouseX || 0,
              }}
              onClose={() => setMenuOpen(false)}
            >
              <MenuItem
                onClick={() => {
                  mutation.mutate({ role: "admin", id: row?.original?.id });
                }}
              >
                Administrateur
              </MenuItem>
              <MenuItem
                onClick={() => {
                  mutation.mutate({ role: "manager", id: row.original.id });
                }}
              >
                Manager
              </MenuItem>
              <MenuItem
                onClick={() => {
                  mutation.mutate({ role: "supManager", id: row.original.id });
                }}
              >
                Super Manager
              </MenuItem>
              <DeleteDialogButton
                currentTable="user"
                row={row}
                handleCrudMenuClose={() => setMenuOpen(false)}
                onClose={() => setMenuOpen(false)}
              />
            </Menu>
          </>
        ),
      },
    ],
    initialState: {
      columnVisibility: { id: false },
    },
  });

  return (
    <IonPage>
      <PageHeader title="Utilisateurs" />
      <IonContent>
        <MaterialReactTable table={table} />
      </IonContent>
    </IonPage>
  );
};

export default Users;

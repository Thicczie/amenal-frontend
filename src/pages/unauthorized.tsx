import React from "react";
import PageHeader from "../components/PageHeader";
import { IonPage, IonContent } from "@ionic/react";
import { Box, Typography } from "@mui/material";

type Props = {};

const unauthorized = (props: Props) => {
  return (
    <IonPage>
      <PageHeader title="Unauthorized" />
      <IonContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            Vous n'avez pas le droit d'accéder à cette page
          </Typography>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default unauthorized;

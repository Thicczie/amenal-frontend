import React, { useRef } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonLoading,
  IonSpinner,
  IonNav,
  IonItem,
  IonAccordionGroup,
  IonAccordion,
} from "@ionic/react";
import {
  AvLayout,
  BdgLayout,
  AvTitleLayout,
  BdgTitleLayout,
  TLayout,
  ILayout,
} from "../constants/infoLayout";
import { getProjectById, getAvenantById } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import Details from "../pages/budget/Details";
import { useAppContext } from "../contexts/AppContext";
import {
  getBesoins,
  getBesoinsById,
  getChargeStandardsById,
  getCommandesById,
  getDemandesDevisById,
  getDevissById,
  getFacturesById,
  getFournisseursById,
  getPaiementsById,
  getReceptionsById,
} from "../api/achat/achat_api";
import { useParams } from "react-router-dom";
import { InfoOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";

interface InfoCardProps {
  currentInfo: string;
  TitleLayout: TLayout;
  Layout: ILayout[];
}

const InfoCard: React.FC<InfoCardProps> = ({
  currentInfo,
  Layout,
  TitleLayout,
}) => {
  //const Layout = currentInfo === "AV" ? AvLayout : BdgLayout;
  // const TitleLayout = currentInfo === "AV" ? AvTitleLayout : BdgTitleLayout;
  const { projectId, avenantId, id } = useParams();
  //const { id }:any =useHistory().location.state ?? {};

  const fetchInfo = () => {
    switch (currentInfo) {
      case "BDG":
        return getProjectById(projectId);
      case "AV":
        return getAvenantById(avenantId);
      case "BSN":
        return getBesoinsById(id);
      case "DDF":
        return getDemandesDevisById(id);
      case "DVF":
        return getDevissById(id);
      case "CMF":
        return getCommandesById(id);
      case "RCF":
        return getReceptionsById(id);
      case "FCF":
        return getFacturesById(id);
      case "FRS":
        return getFournisseursById(id);
      case "PMF":
        return getPaiementsById(id);
      case "CHG":
        return getChargeStandardsById(id);
      case "CMT":
        return;
      case "EXPLOITATION":
        return;

      default:
        return null;
    }
  };

  function getStatus(data: any): string {
    switch (data?.data?.status) {
      case 0:
        return "text-red-500";
      case 1:
        return "text-green-500";
      default:
        return "";
    }
  }

  const { isPending, isError, data, status } = useQuery({
    queryKey: ["info", currentInfo, avenantId, projectId],
    queryFn: fetchInfo,
  });

  return (
    <Card
      variant="outlined"
      sx={{
        margin: "0.625rem",
        backgroundColor: "white",
        borderColor: "#c9cedd",
      }}
    >
      <Accordion sx={{ margin: 0, padding: 0, backgroundColor: "transparent" }}>
        <h1
          className={`text-center justify-center flex items-center text-slate-600 ${getStatus(
            data
          )} `}
        >
          {isPending ? (
            <IonSpinner name="crescent" />
          ) : isError ? (
            <IonLabel color={"danger"}>Erreur</IonLabel>
          ) : (
            <>
              <div hidden>okex</div>
              {currentInfo.toUpperCase() +
                "-" +
                (eval("data?.data." + TitleLayout?.date) ?? "-") +
                "/" +
                eval("data?.data." + TitleLayout?.ref) ?? "-"}{" "}
            </>
          )}
          <AccordionSummary>
            <IconButton sx={{ marginRight: -5 }}>
              <InfoOutlined />
            </IconButton>
          </AccordionSummary>
        </h1>

        <CardContent slot="content">
          <div>
            {data ? (
              <IonGrid>
                {Layout.map(({ key, label }) => (
                  <IonRow key={key}>
                    <IonCol>
                      <div className="text-gray-500">{label}</div>
                    </IonCol>
                    <IonCol>
                      <div
                        className={` ${getStatus(
                          data
                        )} text-blue-400 font-bold`}
                      >
                        {typeof eval("data?.data." + key) === "boolean"
                          ? eval("data?.data." + key)
                            ? "OUI"
                            : "NON "
                          : eval("data?.data." + key) ?? "-"}
                      </div>
                    </IonCol>
                  </IonRow>
                ))}
              </IonGrid>
            ) : (
              <IonLabel color={"danger"}>Erreur</IonLabel>
            )}
          </div>
        </CardContent>
      </Accordion>
    </Card>
  );
};

export default InfoCard;

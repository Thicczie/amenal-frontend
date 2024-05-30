import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SideMenuButton from "../components/SideMenu";
import PageHeader from "../components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import TableCard from "../components/TableCard";
import { MRT_Column, MRT_ColumnDef } from "material-react-table";
import useColumns from "../hooks/useColumns";

const Home: React.FC = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["dashBoardSummary"],
    queryFn: () => getDashboardSummary(),
  });

  const getDashboardSummary = async () => {
    return apiClient.get("/homeDashboard");
  };

  const dashboardData: any = data?.data;

  const budgetsNonFinaliseColumns = useColumns(
    dashboardData?.budgetsNonFinalise
  );
  const tachesEnCoursColumns = useColumns(dashboardData?.tachesEnCours);
  const facturesAPayerColumns = useColumns(dashboardData?.facturesAPayer);
  const receptionsDeCetteSemaineColumns = useColumns(
    dashboardData?.receptionsDeCetteSemaine
  );
  return (
    <IonPage>
      <PageHeader title="Home" />
      <IonContent>
        <Typography
          className="  text-slate-600"
          variant="h5"
          sx={{ padding: "0.5rem" }}
        >
          Tableau de bord
        </Typography>
        <Grid container>
          {/*cards */}
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <DashBoardCard
              title="Projets Totaux"
              value={dashboardData?.totalProjets}
              icon={<ApartmentIcon />}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <DashBoardCard
              title="Total charges à venir "
              value={dashboardData?.totalTachesAVenir}
              icon={<PaymentsIcon />}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <DashBoardCard
              title="Total charges budgetisées"
              value={dashboardData?.totalChargesBudgetise}
              icon={<AccountBalanceWalletIcon />}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <DashBoardCard
              title="Dépenses totales"
              value={dashboardData?.totalDepenses}
              icon={<PaidOutlinedIcon />}
            />
          </Grid>
          {/*tables */}
          <Grid item xs={12} md={12} lg={6}>
            <DashBoardTable
              title="Taches en cours"
              data={dashboardData?.tachesEnCours}
              columns={tachesEnCoursColumns}
              isPending={isLoading}
              isError={isError}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <DashBoardTable
              title="Receptions de cette semaine"
              data={dashboardData?.receptionsDeCetteSemaine}
              columns={receptionsDeCetteSemaineColumns}
              isPending={isLoading}
              isError={isError}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <DashBoardTable
              title="Budgets non finalisés"
              data={dashboardData?.budgetsNonFinalise}
              columns={budgetsNonFinaliseColumns}
              isPending={isLoading}
              isError={isError}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <DashBoardTable
              title="Factures a payer"
              data={dashboardData?.facturesAPayer}
              columns={facturesAPayerColumns}
              isPending={isLoading}
              isError={isError}
            />
          </Grid>
        </Grid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

type dashboardTableProps = {
  title: string;
  data: any;
  columns: MRT_ColumnDef<any>[];
  isPending: boolean;
  isError: boolean;
};
const DashBoardTable: React.FC<dashboardTableProps> = (
  props: dashboardTableProps
) => {
  return (
    <TableCard
      tableName={props.title}
      title={props.title}
      columns={props.columns}
      data={props.data}
      isPending={props.isPending}
      isError={props.isError}
    />
  );
};

type dashboardCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};
const DashBoardCard: React.FC<dashboardCardProps> = (
  props: dashboardCardProps
) => {
  return (
    <Card
      variant="outlined"
      sx={{
        margin: "0.625rem",
        backgroundColor: "white",
        borderColor: "#c9cedd",
        maxHeight: "100px",
        maxWidth: 350,
      }}
    >
      <CardContent className="relative">
        <div className=" text-gray-500 flex justify-start whitespace-nowrap ">
          {props.title}
        </div>
        <div className="w-fit  flex justify-start font-normal  text-slate-600  text-3xl ">
          {props.value}
        </div>
        <div className="  w-fit  absolute bottom-0 right-0 mb-1 mr-2   ">
          {props.icon}
        </div>
      </CardContent>
    </Card>
  );
};

import React, { useEffect, useMemo } from "react";
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonNav,
  NavComponentWithProps,
  IonSpinner,
} from "@ionic/react";
import Table from "../../components/Table";

import { useQuery } from "@tanstack/react-query";

import { getProjects } from "../../api/api";
import { ApiResponse } from "apisauce";
import { MRT_ColumnDef } from "material-react-table";
import useColumns from "../../hooks/useColumns";
import { useAppContext } from "../../contexts/AppContext";
import { Outlet, useNavigate, useMatch, useLocation } from "react-router-dom";
import SideMenuButton from "../../components/SideMenu";
import PageHeader from "../../components/PageHeader";

//this will display the list of all the  instances of a budget

//TODO: ADD API CALLS

const Instances: React.FC = () => {
  //const route =useIonRouter();
  const location = useLocation();
  const navigate = useNavigate();

  const { isPending, isError, data, error, isFetching } = useQuery({
    queryKey: ["projets"],
    queryFn: getProjects,
  });

  const collumns = useMemo(() => {
    if (
      !data ||
      !data.data ||
      typeof data === "undefined" ||
      data === null ||
      (data?.data as any[]).length === 0
    ) {
      return []; // Return empty array if data is undefined, null, or empty
    }

    const Projects: any[] = [];

    (data?.data as any[]).forEach((item: any) => {
      const { id, refProject, project, observation, dateOuverture } = item;

      if (
        id !== null &&
        refProject !== null &&
        project !== null &&
        observation !== null &&
        dateOuverture !== null
      ) {
        Projects.push({ id, refProject, project, observation, dateOuverture });
      }
    });

    return Object.keys(Projects[0]).map((value: string) => ({
      accessorKey: value,
      header:
        value?.toString().charAt(0).toUpperCase() + value?.toString().slice(1), // You may modify this to customize the header representation of the value
    })) as MRT_ColumnDef<any>[];
  }, [data]);

  const { projectId, setProjectId } = useAppContext();
  const handleRowClick = (row: any) => {
    setProjectId(row.original.id);
    // route.push({ pathname: "/iteminfo", state: { AllRowData: row.original , displayedRowData: row._valuesCache  , currrentScreen:"Budget"  }});
    navigate(`/budget/iteminfo/${row.original.id}`);
  };

  const match = useMatch("/budget/instances");
  if (!match) return <Outlet></Outlet>;
  return (
    <IonPage>
      <PageHeader title={"Instances"} />
      <IonContent>
        {isFetching ? (
          <IonSpinner
            className=" flex justify-center items-center "
            name="crescent"
          ></IonSpinner>
        ) : (
          <Table
            tableName="budget"
            enableXlsxUpload={false}
            hideColumns={false}
            enableEditing={true}
            data={(data?.data as []) ?? []}
            columns={collumns}
            onRowClick={handleRowClick}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Instances;

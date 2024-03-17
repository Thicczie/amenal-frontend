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
  IonSpinner
} from "@ionic/react";
import Table from "../components/Table";
import { useHistory } from "react-router";
import { useQuery } from "@tanstack/react-query";


import {getProjects} from "../api/api";
import { ApiResponse } from "apisauce";
import { MRT_ColumnDef } from "material-react-table";

//this will display the list of all the  instances of a budget

//TODO: ADD API CALLS

const Instances : React.FC= () => {






  //const route =useIonRouter();
  const route = useHistory();
  const { isPending, isError, data, error, isFetching } = useQuery({
    queryKey: ['projets'],
    queryFn: getProjects,
  })



 const columns = useMemo(() => {
    if (!data || !data.data || (data?.data as any[]).length === 0) {
      return []; // Return empty array if data is undefined, null, or empty
    }

    const firstDataItem: any[] = (data?.data as any[])[0];


     
  return Object.keys(firstDataItem)
  .filter((key: string) => {
    const val = firstDataItem[key as keyof typeof firstDataItem];
    return typeof val !== 'object';
  })
  .map((key: string) => ({
    accessorKey: key,
    header: key, // You may modify this to capitalize the first letter if needed
    size: 150,
  })) as MRT_ColumnDef<any>[];
  }, [data]);


 const collumns =  useMemo(() => {

  if (!data || !data.data || (data?.data as any[]).length === 0) {
    return []; // Return empty array if data is undefined, null, or empty
  }

  const Projects: any[] = [];


  console.log('data',data?.data);

  (data?.data as any[]).forEach((item: any) => {
  const { id,refProject, project, observation, dateOuverture } = item;



  if (id !== null && refProject !== null && project !== null && observation !== null && dateOuverture !== null) {
    Projects.push({ id , refProject, project, observation, dateOuverture });
  } 
});


  console.log('Projects',Object.keys(Projects[0]));

    console.log(
      Projects.map((item: string) => (item)
    ));

    return Object.keys(Projects[0]).map((value: string) => ({
      accessorKey: value,
      header: value.toString().charAt(0).toUpperCase() + value.toString().slice(1), // You may modify this to customize the header representation of the value
    })) as MRT_ColumnDef<any>[];

  
 },[data]);




  const handleRowClick = (row:any) => {

    console.log('row',row);

    route.push({ pathname: "/iteminfo", state: { AllRowData: row.original , displayedRowData: row._valuesCache   }});

  };



  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonMenuButton  />
          </IonButtons>

          <IonTitle>Instances</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent>
    
      {isPending ? (
           <IonSpinner className=' flex justify-center items-center ' name="crescent"></IonSpinner>

      ):(
        <Table  data={data?.data as []} columns={collumns} onRowClick={handleRowClick}  />
      )}
      


    </IonContent>
    </IonPage>
  );
};

export default Instances;

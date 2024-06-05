import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonSpinner,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import useAchatApi from "../../../api/achat/achat_api";
import useColumns from "../../../hooks/useColumns";
import InfoCard from "../../../components/TableCard";
import Table from "../../../components/Table";
import AchatElemInstance from "../AchatElemInstance";

type Props = {};

const InstancesDvf: React.FC = (props: Props) => {
  const { getBesoins, getDemandesDevis, getDeviss } = useAchatApi();
  //     const dvf = useQuery({
  //     queryKey: ['dvf'],
  //     queryFn: getDeviss,
  //     })

  //     const dvfColumns = useColumns(dvf?.data?.data as any[])

  //     const route = useHistory();

  //     const handleRowClick = (row:any) => {
  //         console.log(row?.original)
  //         let id=row?.original?.id
  //         let details=row?.original?.detailDevis
  //         route.push({ pathname: "/dvf/info"  , state: { id:id , details:details } });

  //     }

  //   return (
  //     <IonPage>
  //   <IonHeader>
  //         <IonToolbar>
  //           <IonButtons slot="start">
  //           <IonMenuButton  />
  //           </IonButtons>

  //           <IonTitle>Instances</IonTitle>

  //         </IonToolbar>
  //       </IonHeader>
  //   <IonContent >

  // {dvf.isLoading ?(
  //                    <IonSpinner className=' flex justify-center items-center ' name="crescent"></IonSpinner>

  // )
  // :(
  // <Table enableEditing={false} hideColumns columns={dvfColumns} data={dvf?.data?.data as any[]} onRowClick={handleRowClick} />

  // )
  // }

  //   </IonContent>
  //   </IonPage>
  //    )
  return (
    <AchatElemInstance
      FetchFct={getDeviss}
      PathTo="/dvf/info"
      tableName="dvf"
    />
  );
};

export default InstancesDvf;

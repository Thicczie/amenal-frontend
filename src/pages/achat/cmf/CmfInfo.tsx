import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonBackButton,
  IonSpinner,
} from "@ionic/react";
import React from "react";

import InfoCard from "../../../components/InfoCard";
import TableCard from "../../../components/TableCard";
import { CmfLayout, CmfTitleLayout } from "../../../constants/infoLayout";
import useColumns from "../../../hooks/useColumns";
import AchatElemInfo from "../AchatElemInfo";

type Props = {};

const CmfInfo: React.FC = (props: Props) => {
  //   const {id , details}:any=useHistory().location.state ?? {};

  //     const detailsColumns=  details?.map((detail:any)=>{
  //     return useColumns(detail[1] as any[])});

  // return (
  //   <IonPage>
  //   <IonHeader>
  //         <IonToolbar>
  //         <IonButtons slot='start'>
  //           <IonBackButton></IonBackButton>
  //       </IonButtons>
  //   <IonTitle >Infos</IonTitle>

  //         </IonToolbar>
  //       </IonHeader>
  //   <IonContent >

  //   <InfoCard currentInfo='CMF' TitleLayout={CmfTitleLayout} Layout={CmfLayout} />

  //   {
  //     details ?(

  //       details?.map((detail:any ,key:number)=>(
  //         <TableCard title={detail[0]}  columns={detailsColumns[key]} data={Array.isArray(detail[1]) ? detail[1] : [detail[1]] as any[]} isPending={false} isError={false}  />
  //       ))

  //     ) :(<IonSpinner name='crescent'/>)
  //   }

  //   </IonContent>
  //   </IonPage>  )
  return (
    <AchatElemInfo
      Title="CMF"
      InfoLayout={CmfLayout}
      TitleLayout={CmfTitleLayout}
    />
  );
};

export default CmfInfo;

import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonBackButton, IonSpinner } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'
import { ILayout, TLayout } from '../../constants/infoLayout'
import InfoCard from '../../components/InfoCard'
import TableCard from '../../components/TableCard'
import useColumns from '../../hooks/useColumns'
import { useLocation, useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'


type Props = {
    InfoLayout : ILayout[];
    TitleLayout:TLayout;
    Title:string;
}

const AchatElemInfo:React.FC<Props> = (props: Props) => {
    const {details}:any=useLocation().state ?? {};
    const {id}=useParams();
     
      const detailsColumns=  details?.map((detail:any)=>{
      return useColumns(detail[1] as any[])});
                

  return (
    <IonPage>
    <IonHeader>
          <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
            <BackButton/>
        </IonButtons>
    <IonTitle >Infos</IonTitle>
  
          </IonToolbar>
        </IonHeader>
    <IonContent >

    <InfoCard currentInfo={props.Title} TitleLayout={props.TitleLayout} Layout={props.InfoLayout} />
 
    {
      details ?(
       

        details?.map((detail:any ,key:number)=>
          { let title=(detail[0].charAt(0).toUpperCase() + detail[0].slice(1)).replace(/([a-z0-9])([A-Z])/g, '$1 $2') //camel case parser
          return   (
          <TableCard tableName={props.Title.toLowerCase()} key={key} title={title} enableEditing  columns={detailsColumns[key]} data={Array.isArray(detail[1]) ? detail[1] : [detail[1]] as any[]} isPending={false} isError={false}  />          
        )})

      ) :(<IonSpinner name='crescent'/>)
    }

    
    </IonContent>
    </IonPage>  )
}

export default AchatElemInfo
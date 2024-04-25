import React from 'react'
import{
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    } from "@ionic/react";



import { useQuery } from '@tanstack/react-query';
import { getAvenantsByProjectId } from '../../api/api';
import useColumns from '../../hooks/useColumns';
import InfoCard from '../../components/InfoCard';
import TableCard from '../../components/TableCard';
import { useAppContext } from '../../contexts/AppContext';
import { BdgLayout, BdgTitleLayout } from '../../constants/infoLayout';
import ButtonList from '../../components/buttonList';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddForm from '../AddForm';
import { avenantFields, budgetFields, produitFields } from '../../constants/FormFields';

import AddDialogButton from '../../components/AddDialogButton';
import SigmaCheckbox from '../../components/SigmaCheckbox';
import TableSelect from '../../components/TableSelect';
import ItemDetails from './ItemDetails';
import BackButton from '../../components/BackButton';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';



//this is the BDG screen 

const ItemInfo :React.FC = () => {

    const {setAvenantId , currentSigma}=useAppContext();
    const {projectId }=useParams();


    const [open, setOpen] = React.useState(false);


    const { isPending, isError, data } = useQuery({
      queryKey: ['avenants',projectId],
      queryFn: ()=> getAvenantsByProjectId(projectId),
      enabled:!!projectId,
    })


    const columns = useColumns(data);

    const match = useMatch('/budget/iteminfo/:projectId')
    const navigate = useNavigate();


    const handleRowClick = (row:any) => {
      setAvenantId(row.original.id);
     //route.push({ pathname: "/iteminfo/iteminfodetail"  , state: { AllRowData: row.original , displayedRowData: row._valuesCache   } });
      navigate(`/budget/iteminfo/${projectId}/iteminfodetail/${row.original.id}`);
    };

  if (!match ) return <Outlet/>;   
  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
    <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
            <BackButton/> 
        </IonButtons>
        <div className='flex flex-row'>
        <IonTitle >Infos</IonTitle>

        <SigmaCheckbox/>
        {currentSigma && <TableSelect/> } 
        </div>

    </IonToolbar>
  </IonHeader>
  <IonContent>

   <InfoCard  TitleLayout={BdgTitleLayout} Layout={BdgLayout} currentInfo={"BDG"}/>

   { currentSigma ? 
     <ItemDetails isComponentParent/> 
     :
     <TableCard title='Avenants'   data={data} isError={isError} isPending={isPending} columns={columns} 
     handleRwoClick={handleRowClick} 
     enableEditing={true}
     enableXlsxUpload={false}
     HeaderContent={<AddDialogButton formFields={avenantFields} currentForm='avenant' />}
    tableName='avenant'
     />
    }


  

</IonContent>
</IonPage>
  )
}

export default ItemInfo
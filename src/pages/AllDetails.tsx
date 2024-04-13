import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSegment, IonSegmentButton, IonBackButton, IonButton, IonSpinner } from '@ionic/react'
import React from 'react'
import TableCard from '../components/TableCard'
import { useMutation, useQuery } from '@tanstack/react-query';
import useColumns from '../hooks/useColumns';
import { useAppContext } from '../contexts/AppContext';
import { getDetailChargeAttentesByAvenantId, getDetailChargeTable , getDetailChargeTableByAvenantId,
        getDetailDelaiAttentesByAvenantId,
        getDetailDelaiTable , getDetailDelaiTableByAvenantId,
        getDetailProduitAttentesByAvenantId,
        getDetailProduitTable , getDetailProduitTableByAvenantId,
        getDetailQualiteAttentesByAvenantId,
        getDetailQualiteTable , getDetailQualiteTableByAvenantId,
        validerDetailChargeAttentesByAvenantId,validerDetailDelaiAttentesByAvenantId,
        validerDetailProduitAttentesByAvenantId,validerDetailQualiteAttentesByAvenantId

        
 } from '../api/detail_api';
import SigmaCheckbox from '../components/SigmaCheckbox';
import { Dialog } from '@capacitor/dialog';



const AllDetails:React.FC = () => {


    const [currentDetailTable, setCurrentDetailTable] = React.useState<string>('produits');
    const { currentSigma , projectId , avenantId} = useAppContext();
    const detailCardTitle:string = 'Détails'+' '+ currentDetailTable.charAt(0).toUpperCase() + currentDetailTable.slice(1);
    const attentesCardTitle:string= 'Attentes'+' '+ currentDetailTable.charAt(0).toUpperCase() + currentDetailTable.slice(1);

    const  detailsproduits = useQuery({
        queryKey: ['alldetailsproduits',currentSigma],
        queryFn: ()=> loadProduits()

      });
      
      
      const  detailscharges = useQuery({
        queryKey: ['alldetailscharges' , currentSigma],
        queryFn: ()=> loadCharges(),
    
        
      });
      
      
      const  detailsdelais = useQuery({
        queryKey: ['alldetailsdelais',currentSigma],
        queryFn: ()=> loadDelais(),
      });
      
      const  detailsqualites = useQuery({
        queryKey: ['alldetailsqualites',currentSigma],
        queryFn: ()=> loadQualites(),
    
      });




      const  detailsproduitsAttentes = useQuery({
        queryKey: ['alldetailsproduitsAttentes',avenantId],
        queryFn: ()=> loadProduitsAttentes(),
        enabled: !currentSigma

      });
      
      
      const  detailschargesAttentes = useQuery({
        queryKey: ['alldetailschargesAttentes',avenantId],
        queryFn: ()=> loadChargesAttentes(),
        enabled: !currentSigma
    
        
      });
      
      
      const  detailsdelaisAttentes = useQuery({
        queryKey: ['alldetailsdelaisAttentes',avenantId],
        queryFn: ()=> loadDelaisAttentes(),
        enabled: !currentSigma
      });
      
      const  detailsqualitesAttentes = useQuery({
        queryKey: ['alldetailsqualitesAttentes',avenantId],
        queryFn: ()=> loadQualitesAttentes(),
        enabled: !currentSigma
    
      });
      
      
      
      const detailChargesColumns= useColumns(detailscharges?.data?.data as any[]);
      const detailProduitsColumns= useColumns(detailsproduits?.data?.data as any[]);
      const detailDelaisColumns= useColumns(detailsdelais?.data?.data as any[]);
      const detailQualitesColumns= useColumns(detailsqualites?.data?.data as any[]);


         
      const detailChargesAttentesColumns= useColumns(detailschargesAttentes?.data?.data as any[]);
      const detailProduitsAttentesColumns= useColumns(detailsproduitsAttentes?.data?.data as any[]);
      const detailDelaisAttentesColumns= useColumns(detailsdelaisAttentes?.data?.data as any[]);
      const detailQualitesAttentesColumns= useColumns(detailsqualitesAttentes?.data?.data as any[]);




     function loadProduits() {
        if(currentSigma) return   getDetailProduitTable(projectId) 
        return getDetailProduitTableByAvenantId(avenantId)
}
    
    function loadCharges() {
        if(currentSigma) return  getDetailChargeTable(projectId)
        return getDetailChargeTableByAvenantId(avenantId)
       }
    
    function loadDelais() {
        if(currentSigma) return getDetailDelaiTable(projectId)
        return   getDetailDelaiTableByAvenantId(avenantId)
     }
    
    function loadQualites() {
        if(currentSigma) return getDetailQualiteTable(projectId)
        return    getDetailQualiteTableByAvenantId(avenantId)
      }
    


    function loadProduitsAttentes() {
        if(currentSigma) return  
            return getDetailProduitAttentesByAvenantId(avenantId)

          }
    function loadChargesAttentes() {
        if(currentSigma) return  
        return getDetailChargeAttentesByAvenantId(avenantId)
       }
    function loadDelaisAttentes() {
        if(currentSigma) return 
        return   getDetailDelaiAttentesByAvenantId(avenantId)
     }
    function loadQualitesAttentes() {
        if(currentSigma) return
        return    getDetailQualiteAttentesByAvenantId(avenantId)
      }
    

  function RefetchData() {
    switch(currentDetailTable){
      case 'produits':
        detailsproduits.refetch()
        detailsproduitsAttentes.refetch()
        break;
      case 'charges':
        detailscharges.refetch()
        detailschargesAttentes.refetch()
        break;
      case 'delais':
        detailsdelais.refetch()
        detailsdelaisAttentes.refetch()
        break;
      case 'qualites':
        detailsqualites.refetch()
        detailsqualitesAttentes.refetch()
        break;

    }
  }


      const ValiderButton:React.FC = () => {
        const { avenantId} = useAppContext();
        const [isMutating , setIsMutating] = React.useState<boolean>(false)
      
        const mutation = useMutation({
          mutationFn: () => Valider(),
          onMutate: () => {
            setIsMutating(true)
          },
          onSettled:(data,error,variables,context)=>{
            setIsMutating(false);
            if (data?.status === 200 || data?.status === 201) {  Dialog.alert({
              title: 'Validation',
              message: 'Les attentes ont été validées avec succès',
            })
              RefetchData();
            } else{
              Dialog.alert({
                title: 'Validation',
                message: 'Une erreur est survenue lors de la validation' + error?.message,
              })
            }
      
      
            
      
          }
        })
      
        const HandleValiderClick = () => {
          Dialog.confirm({
            title: 'Valider attentes',
            message: 'Voulez vous vraiment valider ces attentes ? \n les éléments avec des erreurs seront ignorés',
            okButtonTitle: 'Valider',
            cancelButtonTitle: 'Annuler'
          }).then((result) => {
      
            if(result.value){
              mutation.mutateAsync();
            }
            
          })
      
          
        }
      
        const Valider = async () => {
          switch(currentDetailTable){
            case 'produits':
              return validerDetailProduitAttentesByAvenantId(avenantId)
            case 'charges':
              return validerDetailChargeAttentesByAvenantId(avenantId)
            case 'delais':
              return validerDetailDelaiAttentesByAvenantId(avenantId)
            case 'qualites':
              return validerDetailQualiteAttentesByAvenantId(avenantId)
          
          }
        }

        function isDataEmpty (){
          switch(currentDetailTable){
            case 'produits':
              return detailsproduitsAttentes?.data?.data?.length === 0
            case 'charges':
              return detailschargesAttentes?.data?.data?.length === 0
            case 'delais':
              return detailsdelaisAttentes?.data?.data?.length === 0
            case 'qualites':
              return detailsqualitesAttentes?.data?.data?.length === 0
          }

        }
      
      
        if(isDataEmpty()) return null;
        return <IonButton disabled={isMutating}  onClick={()=>{HandleValiderClick()}} >
          {isMutating ? <IonSpinner name='crescent'/> : 'Valider'}
        </IonButton>
      
      }
      





    return   <IonPage>
     <IonHeader>
    <IonToolbar>
    <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
        </IonButtons>
        <div className='flex flex-row'>
        <IonTitle >All Details</IonTitle>
        <SigmaCheckbox/>

        </div>
  


    </IonToolbar>
  </IonHeader>
  <IonContent>


  <IonSegment
   onIonChange={(e) => {setCurrentDetailTable(e.detail.value as string)   }}
   mode='md' 
    value={currentDetailTable}
       >
          <IonSegmentButton value="produits">
                Produits
          </IonSegmentButton>
          <IonSegmentButton value="charges">
            Charges
          </IonSegmentButton>
          <IonSegmentButton value="delais">
            Délais
          </IonSegmentButton>
          <IonSegmentButton value="qualites">
            Qualités
          </IonSegmentButton>
        </IonSegment>

        {currentDetailTable =="produits" && <TableCard data={detailsproduits?.data} columns={detailProduitsColumns} isError={detailsproduits.isError} isPending={detailsproduits.isFetching} hideColumns={true} title={detailCardTitle}  />}       
        {currentDetailTable =="charges" && <TableCard data={detailscharges?.data} columns={detailChargesColumns} isError={detailscharges.isError} isPending={detailscharges.isFetching} hideColumns={true} title={detailCardTitle}  />}
        {currentDetailTable =="delais" && <TableCard data={detailsdelais?.data} columns={detailDelaisColumns} isError={detailsdelais.isError} isPending={detailsdelais.isFetching}  title={detailCardTitle} />}
        {currentDetailTable =="qualites" && <TableCard data={detailsqualites?.data} columns={detailQualitesColumns} isError={detailsqualites.isError} isPending={detailsqualites.isFetching} hideColumns={true} title={detailCardTitle} />}
   
        {currentDetailTable =="produits" && !currentSigma && <TableCard data={detailsproduitsAttentes?.data} columns={detailProduitsAttentesColumns} isError={detailsproduitsAttentes.isError} isPending={detailsproduitsAttentes.isFetching} hideColumns={true} title={attentesCardTitle} HeaderContent={ <ValiderButton/>} />}
        {currentDetailTable =="charges" && !currentSigma &&  <TableCard data={detailschargesAttentes?.data} columns={detailChargesAttentesColumns} isError={detailschargesAttentes.isError} isPending={detailschargesAttentes.isFetching} hideColumns={true} title={attentesCardTitle} HeaderContent={<ValiderButton/>} />}
        {currentDetailTable =="delais" && !currentSigma &&  <TableCard data={detailsdelaisAttentes?.data} columns={detailDelaisAttentesColumns} isError={detailsdelaisAttentes.isError} isPending={detailsdelaisAttentes.isFetching} hideColumns={true} title={attentesCardTitle} HeaderContent={<ValiderButton/>} />}
        {currentDetailTable =="qualites" && !currentSigma &&  <TableCard data={detailsqualitesAttentes?.data} columns={detailQualitesAttentesColumns} isError={detailsqualitesAttentes.isError} isPending={detailsqualitesAttentes.isFetching} hideColumns={true} title={attentesCardTitle} HeaderContent={<ValiderButton/>} />}
</IonContent>
</IonPage>
}






export default AllDetails




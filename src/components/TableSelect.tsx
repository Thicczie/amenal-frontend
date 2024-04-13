import { IonSelect, IonSelectOption } from '@ionic/react'
import React from 'react'
import { useAppContext } from '../contexts/AppContext'


const TableSelect = () => {
    const {currentTable,setCurrentTable}=useAppContext();

  return (
    <IonSelect
    className=' w-fit mx-4 bg-transparent px-2 justify-center    ' 
    label="Vue par:" interface="popover" 
    onIonChange={(e:any) => setCurrentTable(e.detail.value)}
    selectedText={currentTable}
    >
          <IonSelectOption value="produit">Produits</IonSelectOption>
          <IonSelectOption value="lot">Lot</IonSelectOption>
          <IonSelectOption value="tache">Tache</IonSelectOption>
        </IonSelect>
  )
}

export default TableSelect

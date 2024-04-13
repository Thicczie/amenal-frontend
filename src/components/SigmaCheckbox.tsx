import { IonCheckbox } from '@ionic/react'
import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import FunctionsIcon from '@mui/icons-material/Functions';

const SigmaCheckbox:React.FC = () => {
    const {currentSigma, setCurrentSigma} = useAppContext(); 
    const handleCheck = (e: any) => {
        setCurrentSigma(e.detail.checked)
        
      
        
    }
            
return (
    <div className='p-2 justify-center flex items-center mx-1'>
        <FunctionsIcon fontSize='small'/> 
        <IonCheckbox
        onIonChange={(e) => handleCheck(e)}
        alignment='start'
        checked={currentSigma}
        >
        </IonCheckbox>
        </div>
)
}

export default SigmaCheckbox

// ChargeContext.js
import React, { createContext, useState, useContext, Context } from 'react';

interface AppContextInterface {
    currentCharge: string | null;
    setCurrentCharge: (charge: string | null) => void;
    currentSigma: boolean;
    setCurrentSigma: (sigma: boolean) => void;
    projectId: string | number | null;
    setProjectId: (projectId: string | number) => void;
    avenantId: string | number | null;
    setAvenantId: (avenantId: string | number) => void;
    currentTable: string ;
    setCurrentTable: (currentTable: string ) => void;
    infoproduit: { idproduit: number |null , designationProduit: string|null },
    setInfoProduit: (infoproduit: { idproduit: number |null , designationProduit: string|null }) => void;
}

interface AppProviderProps {
    children: React.ReactNode;
}

const AppContext  = createContext<AppContextInterface>(
    {
        currentCharge: null,
        setCurrentCharge: (charge: string| null) => {},
        currentSigma: false,
        setCurrentSigma: (sigma: boolean) => {},
        projectId: null,
        setProjectId: (projectId: string | number) => {},
        avenantId: null,
        setAvenantId: (avenantId: string | number) => {},
        currentTable: 'produit',
        setCurrentTable: (currentTable: string) => {},
        infoproduit: { idproduit: null , designationProduit: null },
        setInfoProduit: (infoproduit: { idproduit: number |null , designationProduit: string|null }) => {},
    }
);



export const AppProvider:React.FC <AppProviderProps> = ({ children  }) => {



    const [currentCharge, setCurrentCharge] = useState<string | null>(null);
    const [currentSigma, setCurrentSigma] = useState<boolean>(false);
    const [projectId, setProjectId] = useState<string | number | null>(null);
    const [avenantId, setAvenantId] = useState<string | number | null>(null);

    const [currentTable, setCurrentTable] = useState<string>('produit');
    const [infoproduit, setInfoProduit] = useState<{ idproduit: number |null , designationProduit: string|null }>({ idproduit: null , designationProduit: null });



    return (
        <AppContext.Provider 
        value={{ currentCharge, setCurrentCharge, 
                 currentSigma, setCurrentSigma,
                 projectId, setProjectId,
                 avenantId, setAvenantId,
                 currentTable, setCurrentTable,
                 infoproduit, setInfoProduit
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

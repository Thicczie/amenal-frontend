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
    }
);



export const AppProvider:React.FC <AppProviderProps> = ({ children  }) => {



    const [currentCharge, setCurrentCharge] = useState<string | null>(null);
    const [currentSigma, setCurrentSigma] = useState<boolean>(false);
    const [projectId, setProjectId] = useState<string | number | null>(null);
    const [avenantId, setAvenantId] = useState<string | number | null>(null);


    return (
        <AppContext.Provider 
        value={{ currentCharge, setCurrentCharge, 
                 currentSigma, setCurrentSigma,
                 projectId, setProjectId,
                 avenantId, setAvenantId
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

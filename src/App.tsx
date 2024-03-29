import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


import Home from './pages/Home';
import CompteBdg from './pages/CompteBdg';
import Ajout from './pages/Ajout';
import Instances from './pages/Instances';
import Listes from './pages/Listes';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SideMenu from './components/SideMenu';
import ItemInfo from './pages/ItemInfo';
import {
  Experimental_CssVarsProvider as CssVarsProvider, useColorScheme,
} from '@mui/material/styles';
import { useEffect } from 'react';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ItemDetails from './pages/ItemDetails';
import Details from './pages/Details';
import Details2 from './pages/Details2';
import { AppProvider } from './contexts/AppContext';

setupIonicReact();
const queryClient= new QueryClient();

const App: React.FC = () => {
  return (
    <IonApp>
    <QueryClientProvider client={queryClient}>

      <CssVarsProvider>
        <AppProvider>
        <AppContent />
        </AppProvider>
      </CssVarsProvider>
      </QueryClientProvider>
    </IonApp>
  );
};

const AppContent: React.FC = () => {

  const { mode, setMode } = useColorScheme();
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const updateMode = () => {
      if (prefersDark.matches) {
        setMode('dark');
      } else {
        setMode('light');
      }
    };
    updateMode();
    prefersDark.addEventListener('change', updateMode);

    return () => prefersDark.removeEventListener('change', updateMode);
  }, [setMode]);


  
   

   return <IonReactRouter>
  <IonSplitPane contentId="main">
    <SideMenu />


    <IonRouterOutlet id="main">
      <Route exact path="/home" component={Home} />
      <Route exact path="/"><Redirect to="/home" /></Route>
      <Route path="/budget" component={CompteBdg} />
      <Route exact path='/iteminfo' component={ItemInfo}/>
      <Route exact path='/iteminfo/iteminfodetail' component={ItemDetails}/>
      <Route exact path='/details' component={Details}/>
      <Route exact path='/details2' component={Details2}/>


  

      
      
    </IonRouterOutlet>

    </IonSplitPane>
 
    
  </IonReactRouter>



};

export default App;

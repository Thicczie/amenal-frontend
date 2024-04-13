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
import Graph from './pages/Graph';
import ItemDetails2 from './pages/ItemDetails2';
import AllDetails from './pages/AllDetails';
import Besoins from './pages/achat/Besoins';

setupIonicReact();
const queryClient= new QueryClient();

const App: React.FC = () => {
  return (
    <IonApp>
    <QueryClientProvider client={queryClient}>

      <CssVarsProvider>
        {/* <AppProvider> */}
        <AppContent />
        {/* </AppProvider> */}
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
      <AppProvider>
      <Route exact path="/home" component={Home} />
      <Route exact path="/"><Redirect to="/budget" /></Route>
      <Route path="/budget" component={CompteBdg} />
      <Route exact path='/iteminfo' component={ItemInfo}/>
      <Route exact path='/iteminfo/iteminfodetail' component={ItemDetails}/>
      <Route exact path='/iteminfo/iteminfodetail2' component={ItemDetails2}/>
      <Route exact path='/AllDetails' component={AllDetails}/>
      <Route exact path='/details' component={Details}/>
      <Route exact path='/details2' component={Details2}/>
      <Route exact path='/graph' component={Graph}/>
      </AppProvider>


      <Route exact path="/achat" component={Besoins}/>
      <Route exact path="/achat/bsn" component ={Besoins}/>
      <Route exact path="/achat/ddf" component={Listes} />
      <Route exact path="/achat/dvf" component={Listes} />
      <Route exact path="/achat/cmf" component={Listes} />
      <Route exact path="/achat/rcf" component={Listes} />
      <Route exact path="/achat/fcf" component={Listes} />
      <Route exact path="/achat/pmf" component={Listes} />
      <Route exact path="/achat/frs" component={Listes} />
      <Route exact path="/achat/chg" component={Listes} />
      <Route exact path="/achat/exploitation" component={Listes} />
      <Route exact path="/achat/cmt" component={Listes} />




  

      
      
    </IonRouterOutlet>

    </IonSplitPane>
 
    
  </IonReactRouter>



};

export default App;

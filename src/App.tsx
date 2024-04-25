import {  Route, RouterProvider } from 'react-router-dom';
import { IonApp, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter  } from '@ionic/react-router';
// import { Route , Redirect } from 'react-router';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import CompteBdg from './pages/budget/CompteBdg';
import Ajout from './pages/Ajout';
import Instances from './pages/budget/Instances';
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
import ItemInfo from './pages/budget/ItemInfo';
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
import ItemDetails from './pages/budget/ItemDetails';
import Details from './pages/budget/Details';
import Details2 from './pages/budget/Details2';
import { AppProvider } from './contexts/AppContext';
import Graph from './pages/budget/Graph';
import ItemDetails2 from './pages/budget/ItemDetails2';
import AllDetails from './pages/budget/AllDetails';
import Besoins from './pages/achat/besoins/Besoins';
import BsnInfo from './pages/achat/besoins/BsnInfo';

import Dvfs from './pages/achat/dvf/Dvf';
import DvfInfo from './pages/achat/dvf/DvfInfo';
import Ddfs from './pages/achat/ddf/Ddf';
import DdfInfo from './pages/achat/ddf/DdfInfo';
import CmfInfo from './pages/achat/cmf/CmfInfo';
import Cmfs from './pages/achat/cmf/Cmf';
import RcfInfo from './pages/achat/rcf/RcfInfo';
import Rcfs from './pages/achat/rcf/Rcf';
import FcfInfo from './pages/achat/fcf/FcfInfo';
import Fcfs from './pages/achat/fcf/Fcf';
import Pmfs from './pages/achat/pmf/Pmf';
import PmfInfo from './pages/achat/pmf/PmfInfo';
import Frss from './pages/achat/frs/Frs';
import FrsInfo from './pages/achat/frs/FrsInfo';
import Chgs from './pages/achat/chg/Chg';
import ChgInfo from './pages/achat/chg/ChgInfo';
import { Bounce, ToastContainer } from 'react-toastify';
import { Router, router } from './routes/routes';

setupIonicReact({
  mode:'md'
});
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


//   <IonSplitPane contentId="main">


// <SideMenu/>
// <IonRouterOutlet id="main">
//   <AppProvider>
//         <RouterProvider router={router}>
//           {/* Your routes go here */}
//         </RouterProvider>
//     </AppProvider>    
//       </IonRouterOutlet>
// </IonSplitPane>


    return (<>
<AppProvider>
<RouterProvider router={router}>
</RouterProvider>
</AppProvider>

   
    </>
   
    )
  
//   return <IonReactRouter>
       
//   <IonSplitPane contentId="main">
//     <SideMenu />


//     <IonRouterOutlet id="main">
      
//       <AppProvider>
//       <Route exact path="/home" component={Home} />
//       <Route exact path="/"><Redirect to="/home" /></Route>
//       <Route path="/budget" component={CompteBdg} />
//       <Route exact path='/iteminfo' component={ItemInfo}/>
//       <Route exact path='/iteminfo/iteminfodetail' component={ItemDetails}/>
//       <Route exact path='/iteminfo/iteminfodetail2' component={ItemDetails2}/>
//       <Route exact path='/AllDetails' component={AllDetails}/>
//       <Route exact path='/details' component={Details}/>
//       <Route exact path='/details2' component={Details2}/>
//       <Route exact path='/graph' component={Graph}/>
//       </AppProvider>

//       {/* <Route exact path="/achat" component={Besoins}/> */}
//       <Route  path="/bsn" component ={Besoins}/>
//       <Route  path="/bsn/info" component={BsnInfo} />

//       <Route  path="/ddf" component={Ddfs} />
//       <Route  path="/ddf/info" component={DdfInfo} />


//       <Route  path="/dvf" component={Dvfs} />
//       <Route  path="/dvf/info" component={DvfInfo} />

      
//       <Route  path="/cmf" component={Cmfs} />
//       <Route exact  path="/cmf/info" component={CmfInfo} />

   
//       <Route  path="/rcf" component={Rcfs} />
//       <Route exact path="/rcf/info" component={RcfInfo} />

//       <Route  path="/fcf" component={Fcfs} />
//       <Route exact path="/fcf/info" component={FcfInfo} />
 
//       <Route  path="/pmf" component={Pmfs} />
//       <Route exact path="/pmf/info" component={PmfInfo} />

//       <Route  path="/frs" component={Frss} />
//       <Route exact path="/frs/info" component={FrsInfo} />


//       <Route  path="/chg" component={Chgs} />
//       <Route exact path="/chg/info" component={ChgInfo} /> 



//       <Route  path="/exploitation" component={Listes} />
//       <Route  path="/cmt" component={Listes} />



  

      
      
//     </IonRouterOutlet>

//     </IonSplitPane>
 
    
//   </IonReactRouter>



};

export default App;

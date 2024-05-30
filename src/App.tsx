import { Route, RouterProvider } from "react-router-dom";
import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";

import Home from "./pages/Home";
import CompteBdg from "./pages/budget/CompteBdg";
import Ajout from "./pages/Ajout";
import Instances from "./pages/budget/Instances";
import Listes from "./pages/Listes";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import SideMenu from "./components/SideMenu";
import ItemInfo from "./pages/budget/ItemInfo";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from "@mui/material/styles";
import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ItemDetails from "./pages/budget/ItemDetails";
import Details from "./pages/budget/Details";
import Details2 from "./pages/budget/Details2";
import { AppProvider } from "./contexts/AppContext";
import Graph from "./pages/budget/Graph";
import ItemDetails2 from "./pages/budget/ItemDetails2";
import AllDetails from "./pages/budget/AllDetails";
import Besoins from "./pages/achat/besoins/Besoins";
import BsnInfo from "./pages/achat/besoins/BsnInfo";

import Dvfs from "./pages/achat/dvf/Dvf";
import DvfInfo from "./pages/achat/dvf/DvfInfo";
import Ddfs from "./pages/achat/ddf/Ddf";
import DdfInfo from "./pages/achat/ddf/DdfInfo";
import CmfInfo from "./pages/achat/cmf/CmfInfo";
import Cmfs from "./pages/achat/cmf/Cmf";
import RcfInfo from "./pages/achat/rcf/RcfInfo";
import Rcfs from "./pages/achat/rcf/Rcf";
import FcfInfo from "./pages/achat/fcf/FcfInfo";
import Fcfs from "./pages/achat/fcf/Fcf";
import Pmfs from "./pages/achat/pmf/Pmf";
import PmfInfo from "./pages/achat/pmf/PmfInfo";
import Frss from "./pages/achat/frs/Frs";
import FrsInfo from "./pages/achat/frs/FrsInfo";
import Chgs from "./pages/achat/chg/Chg";
import ChgInfo from "./pages/achat/chg/ChgInfo";
import { Router, router } from "./routes/routes";
import { ThemeOptions } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { CloseOutlined } from "@mui/icons-material";
import React from "react";
import { AuthProvider } from "./contexts/AuthContextProvider";
import { CookiesProvider } from "react-cookie";

setupIonicReact({
  mode: "md",
});
const queryClient = new QueryClient();

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#418ace",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#fff",
      paper: "#f3f6fb",
    },
  },
};

const muiTheme = createTheme(themeOptions);

const App: React.FC = () => {
  return (
    <IonApp>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={muiTheme}>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </IonApp>
  );
};

const ToastContainer = () => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <ToastBar position="top-right" toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <CloseOutlined />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

const AppContent: React.FC = () => {
  // const { mode, setMode } = useColorScheme();
  // useEffect(() => {
  //   // const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  //   // const updateMode = () => {
  //   //   if (prefersDark.matches) {
  //   //     setMode("dark");
  //   //   } else {
  //   //     setMode("light");
  //   //   }
  //   // };
  //   // updateMode();
  //   // prefersDark.addEventListener("change", updateMode);

  //   // return () => prefersDark.removeEventListener("change", updateMode);
  //   setMode("light");
  // }, [setMode]);

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

  // Check for online status and display a toast
  const [wasOffline, setWasOffline] = React.useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!window.navigator.onLine) {
        setWasOffline(true);
        toast.error("Vous êtes hors-ligne", {
          id: "no-internet",
          duration: 0,
        });
      } else if (wasOffline) {
        toast.success("Vous êtes en ligne", {
          id: "no-internet",
          duration: 2000,
        });
        setWasOffline(false);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [window.navigator.onLine]);

  return (
    <>
      <AuthProvider>
        <CookiesProvider>
          <AppProvider>
            {/* <RouterProvider router={router}></RouterProvider> */}
            <ToastContainer />
            <Router></Router>
          </AppProvider>
        </CookiesProvider>
      </AuthProvider>
    </>
  );
};

export default App;

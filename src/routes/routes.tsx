import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProps,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import CompteBdg from "../pages/budget/CompteBdg";
import ItemDetails from "../pages/budget/ItemDetails";
import ItemInfo from "../pages/budget/ItemInfo";
import Instances from "../pages/budget/Instances";
import AjoutBdg from "../pages/budget/AjoutBdg";
import Listes from "../pages/Listes";
import Details from "../pages/budget/Details";
import Details2 from "../pages/budget/Details2";
import Graph from "../pages/budget/Graph";
import Besoins from "../pages/achat/besoins/Besoins";
import BsnInfo from "../pages/achat/besoins/BsnInfo";
import Ddfs from "../pages/achat/ddf/Ddf";
import DdfInfo from "../pages/achat/ddf/DdfInfo";
import Dvfs from "../pages/achat/dvf/Dvf";
import DvfInfo from "../pages/achat/dvf/DvfInfo";
import Cmfs from "../pages/achat/cmf/Cmf";
import CmfInfo from "../pages/achat/cmf/CmfInfo";
import Rcfs from "../pages/achat/rcf/Rcf";
import RcfInfo from "../pages/achat/rcf/RcfInfo";
import Fcfs from "../pages/achat/fcf/Fcf";
import FcfInfo from "../pages/achat/fcf/FcfInfo";
import Pmfs from "../pages/achat/pmf/Pmf";
import PmfInfo from "../pages/achat/pmf/PmfInfo";
import Frss from "../pages/achat/frs/Frs";
import FrsInfo from "../pages/achat/frs/FrsInfo";
import Chgs from "../pages/achat/chg/Chg";
import ChgInfo from "../pages/achat/chg/ChgInfo";
import InstancesBsn from "../pages/achat/besoins/InstancesBsn";
import AjoutBsn from "../pages/achat/besoins/AjoutBsn";
import AjoutDdf from "../pages/achat/ddf/AjoutDdf";
import InstancesDdf from "../pages/achat/ddf/InstancesDdf";
import AjoutChg from "../pages/achat/chg/AjoutChg";
import InstancesChg from "../pages/achat/chg/InstancesChg";
import AjoutCmf from "../pages/achat/cmf/AjoutCmf";
import InstancesCmf from "../pages/achat/cmf/InstancesCmf";
import AjoutDvf from "../pages/achat/dvf/AjoutDvf";
import InstancesDvf from "../pages/achat/dvf/InstancesDvf";
import AjoutFct from "../pages/achat/fcf/AjoutFct";
import InstancesFcf from "../pages/achat/fcf/InstancesFcf";
import AjoutPmf from "../pages/achat/pmf/AjoutPmf";
import InstancesPmf from "../pages/achat/pmf/InstancesPmf";
import AjoutRcf from "../pages/achat/rcf/AjoutRcf";
import InstancesRcf from "../pages/achat/rcf/InstancesRcf";
import AjoutFrs from "../pages/achat/frs/AjoutFrs";
import InstancesFrs from "../pages/achat/frs/InstancesFrs";
import AllDetails from "../pages/budget/AllDetails";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import RequireAuth from "../components/auth/RequireAuth";

//TODO : non linear routing

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/budget",
    element: <CompteBdg />,
    children: [
      {
        path: "instances",
        element: <Instances />,
        index: true,
      },
      {
        path: "iteminfo/:projectId",
        element: <ItemInfo />,
        children: [
          {
            path: "iteminfodetail/:avenantId",
            element: <ItemDetails />,
            children: [
              {
                path: "details/:currentTable/:tableName",
                element: <Details />,
              },
              {
                path: "details2/:currentTable/:tableName",
                element: <Details2 />,
              },
              {
                path: "graph",
                element: <Graph />,
              },
              {
                path: "allDetails",
                element: <AllDetails />,
              },
            ],
          },
          {
            path: "graph",
            element: <Graph />,
          },
          {
            path: "allDetails",
            element: <AllDetails />,
          },
        ],
      },

      {
        path: "ajout",
        element: <AjoutBdg />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "/bsn",
    element: <Besoins />,
    children: [
      {
        path: "instances",
        element: <InstancesBsn />,
      },
      {
        path: "ajout",
        element: <AjoutBsn />,
      },
      {
        path: "info/:id",
        element: <BsnInfo />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "ddf",
    element: <Ddfs />,
    children: [
      {
        path: "info/:id",
        element: <DdfInfo />,
      },
      {
        path: "ajout",
        element: <AjoutDdf />,
      },
      {
        path: "instances",
        element: <InstancesDdf />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "dvf",
    element: <Dvfs />,
    children: [
      {
        path: "info/:id",
        element: <DvfInfo />,
      },
      {
        path: "ajout",
        element: <AjoutDvf />,
      },
      {
        path: "instances",
        element: <InstancesDvf />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "cmf",
    element: <Cmfs />,
    children: [
      {
        path: "info/:id",
        element: <CmfInfo />,
      },
      {
        path: "ajout",
        element: <AjoutCmf />,
      },
      {
        path: "instances",
        element: <InstancesCmf />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "rcf",
    element: <Rcfs />,
    children: [
      {
        path: "info/:id",
        element: <RcfInfo />,
      },
      {
        path: "ajout",
        element: <AjoutRcf />,
      },
      {
        path: "instances",
        element: <InstancesRcf />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "fcf",
    element: <Fcfs />,
    children: [
      {
        path: "info/:id",
        element: <FcfInfo />,
      },
      {
        path: "ajout",
        element: <AjoutFct />,
      },
      {
        path: "instances",
        element: <InstancesFcf />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "pmf",
    element: <Pmfs />,
    children: [
      {
        path: "info/:id",
        element: <PmfInfo />,
      },
      {
        path: "ajout",
        element: <AjoutPmf />,
      },
      {
        path: "instances",
        element: <InstancesPmf />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "frs",
    element: <Frss />,
    children: [
      {
        path: "info/:id",
        element: <FrsInfo />,
      },
      {
        path: "ajout",
        element: <AjoutFrs />,
      },
      {
        path: "instances",
        element: <InstancesFrs />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
  {
    path: "chg",
    element: <Chgs />,
    children: [
      {
        path: "info/:id",
        element: <ChgInfo />,
      },
      {
        path: "ajout",
        element: <AjoutChg />,
      },
      {
        path: "instances",
        element: <InstancesChg />,
      },
      {
        path: "listes",
        element: <Listes />,
      },
    ],
  },
]);

interface Props {
  children?: React.ReactNode;
}
export const Router: React.FC<Props> = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        {children}
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<CompteBdg />}>
              <Route index path="instances" element={<Instances />} />
              <Route path="iteminfo/:projectId" element={<ItemInfo />}>
                <Route
                  path="iteminfodetail/:avenantId"
                  element={<ItemDetails />}
                >
                  <Route
                    path="details/:currentTable/:tableName"
                    element={<Details />}
                  />
                  <Route
                    path="details2/:currentTable/:tableName"
                    element={<Details2 />}
                  />
                  <Route path="graph" element={<Graph />} />
                  <Route path="allDetails" element={<AllDetails />} />
                </Route>
                <Route
                  path="details/:currentTable/:tableName"
                  element={<Details />}
                />
                <Route
                  path="details2/:currentTable/:tableName"
                  element={<Details2 />}
                />
                <Route path="graph" element={<Graph />} />
                <Route path="allDetails" element={<AllDetails />} />
              </Route>
              <Route path="ajout" element={<AjoutBdg />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/bsn" element={<Besoins />}>
              <Route path="instances" element={<InstancesBsn />} />
              <Route path="ajout" element={<AjoutBsn />} />
              <Route path="info/:id" element={<BsnInfo />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/ddf" element={<Ddfs />}>
              <Route path="info/:id" element={<DdfInfo />} />
              <Route path="ajout" element={<AjoutDdf />} />
              <Route path="instances" element={<InstancesDdf />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/dvf" element={<Dvfs />}>
              <Route path="info/:id" element={<DvfInfo />} />
              <Route path="ajout" element={<AjoutDvf />} />
              <Route path="instances" element={<InstancesDvf />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/cmf" element={<Cmfs />}>
              <Route path="info/:id" element={<CmfInfo />} />
              <Route path="ajout" element={<AjoutCmf />} />
              <Route path="instances" element={<InstancesCmf />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/rcf" element={<Rcfs />}>
              <Route path="info/:id" element={<RcfInfo />} />
              <Route path="ajout" element={<AjoutRcf />} />
              <Route path="instances" element={<InstancesRcf />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/fcf" element={<Fcfs />}>
              <Route path="info/:id" element={<FcfInfo />} />
              <Route path="ajout" element={<AjoutFct />} />
              <Route path="instances" element={<InstancesFcf />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/pmf" element={<Pmfs />}>
              <Route path="info/:id" element={<PmfInfo />} />
              <Route path="ajout" element={<AjoutPmf />} />
              <Route path="instances" element={<InstancesPmf />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/frs" element={<Frss />}>
              <Route path="info/:id" element={<FrsInfo />} />
              <Route path="ajout" element={<AjoutFrs />} />
              <Route path="instances" element={<InstancesFrs />} />
              <Route path="listes" element={<Listes />} />
            </Route>
            <Route path="/chg" element={<Chgs />}>
              <Route path="info/:id" element={<ChgInfo />} />
              <Route path="ajout" element={<AjoutChg />} />
              <Route path="instances" element={<InstancesChg />} />
              <Route path="listes" element={<Listes />} />
            </Route>
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

// <Route exact path="/home" component={Home} />
// <Route exact path="/"><Redirect to="/home" /></Route>
// <Route path="/budget" component={CompteBdg} />
// <Route exact path='/iteminfo' component={ItemInfo}/>
// <Route exact path='/iteminfo/iteminfodetail' component={ItemDetails}/>
// <Route exact path='/iteminfo/iteminfodetail2' component={ItemDetails2}/>
// <Route exact path='/AllDetails' component={AllDetails}/>
// <Route exact path='/details' component={Details}/>
// <Route exact path='/details2' component={Details2}/>
// <Route exact path='/graph' component={Graph}/>

//       {/* <Route exact path="/achat" component={Besoins}/> */}
//       <Route  path="/bsn" component ={Besoins}/>
//       <Route  path="/bsn/info/:id" component={BsnInfo} />

//       <Route  path="/ddf" component={Ddfs} />
//       <Route  path="/ddf/info/:id" component={DdfInfo} />

//       <Route  path="/dvf" component={Dvfs} />
//       <Route  path="/dvf/info/:id" component={DvfInfo} />

//       <Route  path="/cmf" component={Cmfs} />
//       <Route exact  path="/cmf/info/:id" component={CmfInfo} />

//       <Route  path="/rcf" component={Rcfs} />
//       <Route exact path="/rcf/info/:id" component={RcfInfo} />

//       <Route  path="/fcf" component={Fcfs} />
//       <Route exact path="/fcf/info/:id" component={FcfInfo} />

//       <Route  path="/pmf" component={Pmfs} />
//       <Route exact path="/pmf/info/:id" component={PmfInfo} />

//       <Route  path="/frs" component={Frss} />
//       <Route exact path="/frs/info/:id" component={FrsInfo} />

//       <Route  path="/chg" component={Chgs} />
//       <Route exact path="/chg/info/:id" component={ChgInfo} />

//       <Route  path="/exploitation" component={Listes} />
//       <Route  path="/cmt" component={Listes} />

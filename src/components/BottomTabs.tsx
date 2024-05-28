import React from "react";

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import ListIcon from "@mui/icons-material/List";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import {
  Route,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Box, Slide, Tab, useScrollTrigger } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AddCircle, Margin, Padding } from "@mui/icons-material";

interface Props {
  module: string;
}
const BottomTabs: React.FC<Props> = (props: Props) => {
  const [value, setValue] = React.useState<string>("instances");
  const navigate = useNavigate();

  // const [lastScrollTop, setLastScrollTop] = React.useState(
  //   window.scrollY || document.documentElement.scrollTop
  // );
  // const [isVisible, setIsVisible] = React.useState(true);

  // // React.useEffect(() => {
  //   function handleScroll() {
  //     console.log("scrolling");

  //     let st = window.scrollY || document.documentElement.scrollTop;
  //     if (st > lastScrollTop) {
  //       setIsVisible(false);
  //     } else {
  //       setIsVisible(true);
  //     }
  //     setLastScrollTop(st <= 0 ? 0 : st);
  //   }

  //   document.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue, { state: { from: location.pathname } });
  };

  // dumbass hack to not render bottom tabs of child routes
  const location = useLocation();
  const shouldRenderBottomTabs =
    location.pathname.endsWith("instances") ||
    location.pathname.endsWith("ajout") ||
    location.pathname.endsWith("listes") ||
    location.pathname.endsWith("budget") ||
    location.pathname.endsWith("bsn") ||
    location.pathname.endsWith("cmf") ||
    location.pathname.endsWith("ddf") ||
    location.pathname.endsWith("dvf") ||
    location.pathname.endsWith("chg") ||
    location.pathname.endsWith("fcf") ||
    location.pathname.endsWith("frs") ||
    location.pathname.endsWith("pmf") ||
    location.pathname.endsWith("rcf");

  if (!shouldRenderBottomTabs) return <></>;
  return (
    <Box sx={{ transition: "ease-in-out" }}>
      <div className="bg-blue-700">
        <Outlet />
      </div>

      <div className="fixed bottom-0 flex justify-center items-center z-50 w-full  h-14  bg-ion-toolbar-background">
        <div className="flex justify-center items-center w-full  ">
          <div className="flex justify-around w-full h-full">
            <Box>
              <StyledTabs
                value={value}
                onChange={handleTabChange}
                aria-label="styled tabs example"
              >
                <StyledTab
                  label="Ajout"
                  value="ajout"
                  icon={<AddCircleOutlineIcon fontSize="small" />}
                />
                <StyledTab
                  label="Instances"
                  value="instances"
                  icon={<HourglassBottomIcon fontSize="small" />}
                />
                <StyledTab
                  label="Listes"
                  value="listes"
                  icon={<ListIcon fontSize="small" />}
                />
              </StyledTabs>
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default BottomTabs;

type TabProps = {
  label: string;
  icon?: React.ReactNode;
  to: string;
};
const TabButton: React.FC<TabProps> = (props: TabProps) => {
  return (
    <NavLink
      to={props.to}
      type="button"
      className={
        "inline-flex w-full flex-col items-center justify-center px-5 hover:bg-ion-dark-shade bg-ion dark:1f1f1f dark:hover:bg-ion-dark-shade"
      }
    >
      {props.icon}
      <IonLabel className="text-sm text-ion-light-shade ">
        {props.label}
      </IonLabel>
    </NavLink>
  );
};

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import { alignProperty } from "@mui/material/styles/cssUtils";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  onClick?: (event: React.SyntheticEvent, newValue: string) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    onChange={props.onChange}
    onClick={() => props.onClick}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  >
    {props.children}
  </Tabs>
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    top: 8,
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 60,
    width: "100%",
    backgroundColor: "#fff",
  },
  "& .css-0": {
    width: "100%",
  },
});

interface StyledTabProps {
  label: string;
  icon?: any;
  value: string;
  onClick?: (event: React.SyntheticEvent) => void;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab
    {...props}
    icon={props?.icon}
    onClick={props?.onClick}
    value={props?.value}
  />
))(({ theme }) => ({
  textTransform: "none",
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

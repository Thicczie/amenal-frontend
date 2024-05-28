import React from "react";

import {
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonMenu,
  IonItem,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccountBalanceOutlined,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  CreditCardOffOutlined,
  ExpandLess,
  ExpandMore,
  LocalShippingOutlined,
  PaymentsOutlined,
  ReceiptLongOutlined,
  ShoppingCartCheckout,
  WalletOutlined,
} from "@mui/icons-material";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

const needIcon = (): React.ReactNode => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill={theme.palette.grey[600]}
    >
      <path d="M517-518 347-688l57-56 113 113 227-226 56 56-283 283ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z" />
    </svg>
  );
};

const SideMenuButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showDropdown, setShowDropDown] = React.useState(false);
  const moreHorizRef = React.useRef(null);
  const toggleDropdown = () => {
    setShowDropDown(!showDropdown);
  };
  const location = useLocation();

  interface AppPage {
    title: string;
    icon?: React.ReactNode;
    content: {
      label: string;
      icon?: React.ReactNode;
      path: string;
    }[];
  }

  const items: AppPage[] = [
    {
      title: "Comptes",
      icon: <AccountBalanceOutlined />,
      content: [
        {
          label: "budget",
          path: "/budget",
          icon: <WalletOutlined />,
        },
      ],
    },

    {
      title: "Achat",
      icon: <CreditCardOffOutlined />,
      content: [
        {
          label: "BSN",
          path: "/bsn",
          icon: needIcon(),
        },
        {
          label: "DDF",
          path: "/ddf",
          icon: <ArrowUpwardOutlined />,
        },

        {
          label: "DVF",
          path: "/dvf",
          icon: <ArrowDownwardOutlined />,
        },
        {
          label: "CMF",
          path: "/cmf",
          icon: <ShoppingCartCheckout />,
        },
        {
          label: "RCF",
          path: "/rcf",
          icon: <ReceiptLongOutlined />,
        },
        {
          label: "FCF",
          path: "/fcf",
          icon: <ReceiptLongOutlined />,
        },
        {
          label: "PMF",
          path: "/pmf",
          icon: <PaymentsOutlined />,
        },
        {
          label: "FRS",
          path: "/frs",
          icon: <LocalShippingOutlined />,
        },
        {
          label: "CHG",
          path: "/chg",
        },
        {
          label: "EXPLOITATION",
          path: "/exploitation",
        },
        {
          label: "CMT",
          path: "/cmt",
        },
      ],
    },
  ];

  // const closeMenu = () => {
  //   (document.getElementById('menu') as HTMLIonMenuElement)?.close();
  // }
  // const [expanded, setExpanded] = React.useState<string | false>(false);

  const [expanded, setExpanded] = React.useState<boolean[]>(
    items.map(() => false)
  );

  const handleChange = (index: number) => {
    setExpanded(
      expanded.map((value, i) => {
        if (i === index) {
          return !value;
        }
        return value;
      })
    );
  };

  const list = (items: AppPage[]) => (
    <List className=" w-64  ">
      {items.map((appPage, index) => {
        return (
          <>
            <ListItemButton onClick={() => handleChange(index)}>
              <ListItemIcon>{appPage?.icon}</ListItemIcon>
              <ListItemText primary={appPage.title} />
              {expanded[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {appPage.content.map((content, contentIndex) => (
              <NavLink
                key={contentIndex}
                to={content.path}
                className="text-black"
              >
                {/* <AccordionSummary
                  className={`ml-9 flex justify-around bg-ion-primary  ${
                    location?.pathname.includes(content.path)
                      ? "bg-ion-primary"
                      : ""
                  } `}
                  sx={{
                    marginLeft: "2rem",
                    display: "flex",
                  }}
                >
                  <div className=" mr-6">{content.icon}</div>

                  {content.label}
                </AccordionSummary> */}
                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>{content?.icon}</ListItemIcon>
                      <ListItemText primary={content.label} />
                    </ListItemButton>
                  </List>
                </Collapse>
              </NavLink>
              // </IonItem>
            ))}
          </>
        );
      })}
    </List>
  );

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMenuOpen(open);
    };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        // sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <SwipeableDrawer
        open={menuOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Link to="/" className="flex items-center ps-2.5 my-5">
          <img src="/public/logo.png" alt="logo" className="h-10 me-3 sm:h-7" />

          <div className="self-center text-xl font-semibold whitespace-nowrap ">
            Menu
          </div>
        </Link>
        <Divider />
        {list(items)}
        <Divider />
        <div className="p-3 fixed bottom-0 w-64 h-14  flex flex-row justify-between border-t items-center ">
          <img
            id="avatarButton"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="w-10 h-10 rounded-full cursor-pointer"
            src="https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
            alt="User dropdown"
          />
          <Menu
            open={showDropdown}
            anchorEl={document.getElementById("account-more-button")}
            onClose={() => setShowDropDown(false)}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Log Out</MenuItem>
          </Menu>
          John Doe
          <IconButton
            className="bg-white"
            id="account-more-button"
            onClick={() => toggleDropdown()}
          >
            <MoreHoriz />
          </IconButton>
        </div>
      </SwipeableDrawer>
      {/* <Drawer
        variant="persistent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "16rem" },
        }}
        open
      >
        {list(items)}
      </Drawer> */}
    </>
  );
};

export default SideMenuButton;

// {/* <IonMenu id="menu" contentId="main" type="overlay">
// <IonHeader>
//   <IonToolbar>
//     <IonTitle>Menu</IonTitle>
//   </IonToolbar>
// </IonHeader>
// <IonContent>

// <IonAccordionGroup>

//     {items.map((appPage, index) => {
//       return (
//         <IonAccordion key={index} value={index.toString()}>
//           <IonItem slot="header" key={index} >
//             <IonLabel>{appPage.title}</IonLabel>
//           </IonItem>

//           {appPage.content.map((content, contentIndex) => (
//         <IonItem detail={false} slot="content" key={contentIndex}
//         color={location.pathname.includes(content.path) ? 'primary' : ''}

//         button onClick={closeMenu} routerLink={content.path}
//         >
//           <NavLink key={contentIndex} to={content.path}

//             className={isActive => {
//               return isActive ? 'text-primary-700' : '';
//             }}
//                            >
//                            </NavLink>
//           <IonLabel >{content.label}</IonLabel>

//         </IonItem>
//       ))}

//         </IonAccordion>

//       );
//     })}
//                   </IonAccordionGroup>

// </IonContent>
// </IonMenu> */}

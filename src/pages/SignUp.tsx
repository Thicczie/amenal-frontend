// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// function Copyright(props: any) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" to="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function SignUp() {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstname"
//                   required
//                   fullWidth
//                   id="firstname"
//                   label="First Name"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastname"
//                   label="Last Name"
//                   name="lastname"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox value="allowExtraEmails" color="primary" />
//                   }
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link to="/signin">Already have an account? Sign in</Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, useField, useFormik } from "formik";
import * as yup from "yup";
import useAuthApi from "../api/auth/auth_api";
import useApiClient from "../api/apiClient";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const [rememberMe, setRememberMe] = React.useState(false);
  const apiClient = useApiClient();
  const { register } = useAuthApi(apiClient);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Entrer une adresse email valide")
      .required("Email est requis"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Password est requis"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
      .required("Veuillez confirmer le mot de passe"),
    firstname: yup.string().required("Prénom est requis"),
    lastname: yup.string().required("Nom est requis"),
  });
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { retypePassword, ...formData } = values; // remove retypePassword from formData
      console.log(formData);
      register(formData);
      navigate("/signin");
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        // backgroundImage: 'url("/public/login_bg.jpg")', // Replace with your background image path
        // backgroundSize: "fit",
        // backgroundPosition: "center",
        // //clipPath: "polygon(0 0, 100% 0, 50% 50%, 0 100%)", // Custom clip path
        // padding: 0, // Remove padding to cover the entire container
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // filter: "blur(5px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: 'url("/public/login_bg.jpg")', // Replace with your background image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)",
          zIndex: -1, // Place it behind the content
        }}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            padding: "2rem",
            zIndex: 100,
          }}
        >
          <Box sx={{ m: 1 }}>
            <img src="/Logo.png" alt="logo" width={50} />
          </Box>
          <Typography component="h1" variant="h5">
            Inscrivez-Vous
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container mt={1} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstname"
                  fullWidth
                  name="firstname"
                  label="Nom"
                  autoFocus
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastname"
                  fullWidth
                  name="lastname"
                  label="Prénom"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Mot de Passe"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              fullWidth
              id="retypePassword"
              name="retypePassword"
              label="Retaper le Mot de Passe"
              type="password"
              value={formik.values.retypePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.retypePassword &&
                Boolean(formik.errors.retypePassword)
              }
              helperText={
                formik.touched.retypePassword && formik.errors.retypePassword
              }
            />
            <Button
              sx={{ mt: 2 }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              S'inscrire
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin">Déjà un compte? Se connecter</Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </Box>
  );
}

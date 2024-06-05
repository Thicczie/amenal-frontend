import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, useField, useFormik } from "formik";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";
import apiClient from "../api/apiClient";
import useAuthMethods from "../hooks/useAuthMethods";

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
  const [signinError, setSigninError] = React.useState(false);
  const { setAuthTokens, AuthToken } = useAuth();
  const { Login } = useAuthMethods();
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (AuthToken) {
  //     navigate("/");
  //   }
  // }, [AuthToken]);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Entrer une adresse email valide")
      .required("Email est requis"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Password est requis"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // login(values).then((res): any => {
      //   if (!res.ok) {
      //     setSigninError(true);
      //     formik.resetForm();
      //   } else {
      //     setSigninError(false);
      //     console.log("res", res);

      //     const data: any = res?.data;
      //     setAuth((prevAuth: any) => ({
      //       ...prevAuth,
      //       token: data?.access_token ?? null,
      //     }));
      //     apiClient.setHeaders({
      //       Authorization: `Bearer ${data?.access_token}`,
      //     });
      //     navigate("/");
      //   }
      // });

      const res = await Login(values.email, values.password);
      console.log("res", res);

      if (res) {
        navigate("/");
      } else {
        setSigninError(true);
        formik.resetForm();
      }
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
            Connectez-Vous
          </Typography>
          <span style={{ color: "red" }}>
            {signinError ? "Email ou mot de passe incorrect!" : ""}
          </span>
          <form onSubmit={formik.handleSubmit}>
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
            <Button
              sx={{ mt: 2 }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Se Connecter
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup">Pas de compte? S'inscrire</Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </Box>
  );
}

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
import { login } from "../api/auth/auth_api";
import useAuth from "../hooks/useAuth";
import apiClient from "../api/apiClient";

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
  const { authTokens, Login } = useAuth();
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
        console.log("navigating");
        console.log("authTokenssss login", authTokens);

        navigate("/");
      } else {
        setSigninError(true);
        formik.resetForm();
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            <Link to="/signup">Don't have an account? Sign up</Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";

type Props = {};

const BackButton = (props: Props) => {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)}>
      <ArrowBackOutlined sx={{ color: "white" }} />
    </IconButton>
  );
};

export default BackButton;

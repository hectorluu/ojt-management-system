import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { errorPage } from "logic/constants/global";

const UnauthorizePage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Fragment>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: "center",
              }}
            >
              <img
                alt="Under development"
                src={errorPage}
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 400,
                }}
              />
            </Box>
            <Typography align="center" sx={{ mb: 1 }} variant="h3">
              404: Trang bạn đang tìm kiếm không tồn tại
            </Typography>
            <Button
              component={Link}
              onClick={goBack}
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowBackIcon />
                </SvgIcon>
              }
              sx={{ mt: 3, px: 3 }}
              variant="contained"
            >
              Quay trở lại
            </Button>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default UnauthorizePage;

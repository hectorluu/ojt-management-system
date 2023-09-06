import { useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Stack,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";

const TrainerProfilePage = () => {
  const handleChange = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <MainCard title="Hồ sơ">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader sx={{ ml: -1.5, mt: -3 }} title="Thông tin cá nhân" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First name"
                    name="firstName"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained">Save details</Button>
          </CardActions>
        </Card>
      </form>
      <Divider />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader sx={{ mb: -2 }} title="Đổi mật khẩu" />
          <CardContent>
            <Stack spacing={3} sx={{ maxWidth: 400 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
                value={""}
              />
              <TextField
                fullWidth
                label="Password (Confirm)"
                name="confirm"
                onChange={handleChange}
                type="password"
                value={""}
              />
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained">Update</Button>
          </CardActions>
        </Card>
      </form>
    </MainCard>
  );
};

export default TrainerProfilePage;

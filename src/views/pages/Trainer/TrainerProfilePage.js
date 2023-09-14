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
import DatePicker from "react-date-picker";
import { Label } from "views/components/label";

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
                  <Label className="mb-2">Họ</Label>
                  <TextField
                    fullWidth
                    name="firstName"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Label className="mb-2">Tên</Label>
                  <TextField
                    fullWidth
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Label className="mb-2">Email</Label>
                  <TextField
                    fullWidth
                    name="email"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Label className="mb-2">Số điện thoại</Label>
                  <TextField
                    fullWidth
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Label className="mb-2">Giới tính</Label>
                  <TextField
                    fullWidth
                    name="gender"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Label className="mb-2">Ngày sinh</Label>
                  <DatePicker
                    name=""
                    value={""}
                    format="dd-MM-yyyy"
                    autoComplete="off"
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Label className="mb-2">Mã số nhân viên</Label>
                  <TextField
                    disabled
                    fullWidth
                    name="rollNumber"
                    onChange={handleChange}
                    required
                    value={""}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Label className="mb-2">Vị trí</Label>
                  <TextField
                    disabled
                    fullWidth
                    name="positionName"
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
                name="currentpassword"
                onChange={handleChange}
                type="password"
                value={""}
              />
              <TextField
                fullWidth
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

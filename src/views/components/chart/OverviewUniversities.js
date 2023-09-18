import PropTypes from "prop-types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,
} from "@mui/material";

export const OverviewUniversities = (props) => {
  const { sx, childlren } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Trường đại học liên kết" />
      <CardContent>{childlren}</CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowForwardIcon />
            </SvgIcon>
          }
          size="small"
        >
          Xem thêm
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewUniversities.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
  children: PropTypes.node,
};

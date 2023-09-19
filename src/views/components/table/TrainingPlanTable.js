// @mui
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// components
import PerfectScrollbar from "react-perfect-scrollbar";

// ----------------------------------------------------------------------

TrainingPlanTable.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function TrainingPlanTable({
  title,
  subheader,
  list,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <PerfectScrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </PerfectScrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button size="small" color="inherit" endIcon={<ChevronRightIcon />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { title, description } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        alt={title}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}

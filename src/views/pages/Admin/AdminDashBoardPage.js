import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import {
  Button,
  CardActions,
  Unstable_Grid2 as Grid,
  Typography,
  useTheme,
} from "@mui/material";
import TotalGrowthBarChart from "views/components/chart/TotalGrowthBarChart";
import { UniversityCard } from "views/components/cards/UniversityCard";
import { coursePath, universityPath } from "logic/api/apiUrl";
import { courseStatus, defaultPageIndex } from "logic/constants/global";
import MainCard from "views/components/cards/MainCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useNavigate } from "react-router-dom";
import { CourseCard } from "views/components/cards/CourseCard";
import HorizontalLineChart from "views/components/chart/HorizontalLineChart";
import PieChart from "views/components/chart/PieChart";

const AdminDashBoardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Get university
  const [universities, setUniversities] = useState([]);
  const fetchUniversities = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY_LIST +
          "?PageSize=" +
          100000 +
          "&PageIndex=" +
          defaultPageIndex
      );
      // Get 3 universities
      setUniversities(response.data.data.slice(0, 3));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Get course
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        coursePath.GET_COURSE_LIST +
          "?PageSize=" +
          100000 +
          "&PageIndex=" +
          defaultPageIndex +
          "&filterStatus" +
          courseStatus.ACTIVE
      );
      // Get 5 courses
      setCourses(response.data.data.slice(0, 3));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Grid container spacing={2}>
        {/* University Part */}
        <Grid item xs={12}>
          <MainCard>
            <Typography variant="h3" className="mb-5">
              Trường đại học liên kết
            </Typography>

            <Grid container spacing={3}>
              {universities.map((university) => (
                <Grid xs={12} md={6} lg={4} key={university.id}>
                  <UniversityCard university={university} />
                </Grid>
              ))}
            </Grid>

            <CardActions
              sx={{ py: 1.25, pt: 2, mb: -2, justifyContent: "center" }}
            >
              <Button
                size="small"
                disableElevation
                sx={{ px: 2 }}
                component={Link}
                onClick={() => navigate("/university-list")}
              >
                Xem tất cả
                <ChevronRightIcon />
              </Button>
            </CardActions>
          </MainCard>
        </Grid>

        {/* Course Part */}
        <Grid item xs={12}>
          <MainCard>
            <Typography variant="h3" className="mb-5">
              Khóa học hiện có
            </Typography>

            <Grid container spacing={3}>
              {courses.map((course) => (
                <Grid xs={12} md={6} lg={4} key={course.id}>
                  <CourseCard course={course} />
                </Grid>
              ))}
            </Grid>

            <CardActions
              sx={{ py: 1.25, pt: 2, mb: -2, justifyContent: "center" }}
            >
              <Button
                size="small"
                disableElevation
                sx={{ px: 2 }}
                component={Link}
                onClick={() => navigate("/course-list")}
              >
                Xem tất cả
                <ChevronRightIcon />
              </Button>
            </CardActions>
          </MainCard>
        </Grid>

        {/* ... Chart Part */}
        <Grid item xs={12} md={12}>
          <TotalGrowthBarChart isLoading={isLoading} />
        </Grid>

        {/* ... Line Chart Part */}
        <Grid item xs={12} md={6} lg={8}>
          <HorizontalLineChart
            title={<span className="text-xl font-bold">Đào tạo viên</span>}
            chartData={[
              { label: "Italy", value: 400 },
              { label: "Japan", value: 430 },
              { label: "China", value: 448 },
              { label: "Canada", value: 470 },
              { label: "France", value: 540 },
              { label: "Germany", value: 580 },
              { label: "South Korea", value: 690 },
              { label: "Netherlands", value: 1100 },
              { label: "United States", value: 1200 },
              { label: "United Kingdom", value: 1380 },
            ]}
          />
        </Grid>

        {/* ... Pie Chart Part */}
        <Grid item xs={12} md={6} lg={4}>
          <PieChart
            title="Current Visits"
            chartData={[
              { label: "America", value: 4344 },
              { label: "Asia", value: 5435 },
              { label: "Europe", value: 1443 },
              { label: "Africa", value: 4443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.warning.main,
              theme.palette.error.main,
            ]}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AdminDashBoardPage;

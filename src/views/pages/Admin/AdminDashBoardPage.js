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
import { UniversityCard } from "views/components/cards/UniversityCard";
import { chartPath, coursePath, universityPath } from "logic/api/apiUrl";
import { courseStatus, defaultPageIndex } from "logic/constants/global";
import MainCard from "views/components/cards/MainCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useNavigate } from "react-router-dom";
import { CourseCard } from "views/components/cards/CourseCard";
import HorizontalLineChart from "views/components/chart/HorizontalLineChart";
import PieChart from "views/components/chart/PieChart";
import ColumnAndLineChart from "views/components/chart/ColumnAndLineChart";

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

  /// Chart Part
  // Get Batch And Trainee Chart
  const [batchAndTrainee, setBatchAndTrainee] = useState([
    {
      name: "Thực tập sinh",
      type: "column",
      fill: "solid",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Đợt OJT",
      type: "line",
      fill: "solid",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const tempChartBatchAndTraineeLabels = [
    "01/01/2003",
    "01/02/2003",
    "01/03/2003",
    "01/04/2003",
    "01/05/2003",
    "01/06/2003",
    "01/07/2003",
    "01/08/2003",
    "01/09/2003",
    "01/10/2003",
    "01/11/2003",
    "01/12/2003",
  ];

  // Replace the year part in each label with the currentYear using string manipulation
  const chartBatchAndTraineeLabels = tempChartBatchAndTraineeLabels.map(
    (label) => {
      // Assuming the date format is always "DD/MM/YYYY"
      const yearIndex = label.lastIndexOf("/") + 1; // Find the index of the last '/'
      return label.substring(0, yearIndex) + currentYear;
    }
  );

  const fetchBatchAndTrainee = async () => {
    try {
      setIsLoading(true);
      // First get data of current year
      const response = await axiosPrivate.get(
        chartPath.GET_BATCH_AND_TRAINEE + currentYear
      );
      // Get 5 courses

      // turn it into the format that chart can read
      setBatchAndTrainee([
        {
          name: "Thực tập sinh",
          type: "column",
          fill: "solid",
          data: response.data.numberofTrainees,
        },
        {
          name: "Đợt OJT",
          type: "line",
          fill: "solid",
          data: response.data.numberOfOjtBatches,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Get Batch And Trainee Chart
  const [trainerAndTotalTrainees, setTrainerAndTotalTrainees] = useState([]);
  const fetchTrainerAndTotalTrainees = async () => {
    try {
      setIsLoading(true);
      // Get at most 10 trainers
      const response = await axiosPrivate.get(
        chartPath.GET_TRAINER_AND_TOTAL_TRAINEES + 10
      );

      setTrainerAndTotalTrainees(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Get Batch And Trainee Chart
  const [traineeWithPosition, setTraineeWithPosition] = useState([]);
  const fetchTraineeWithPosition = async () => {
    try {
      setIsLoading(true);
      // Get at most 10 trainers
      const response = await axiosPrivate.get(
        chartPath.GET_TRAINEE_WITH_POSITION
      );
      setTraineeWithPosition(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
    fetchCourses();

    // Fetch chart
    fetchBatchAndTrainee();
    fetchTrainerAndTotalTrainees();
    fetchTraineeWithPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYear]);

  return (
    <Fragment>
      <Grid container spacing={2}>
        {/* University Part */}
        <Grid xs={12}>
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
        <Grid xs={12}>
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
        <Grid xs={12} md={12}>
          <ColumnAndLineChart
            title="Tổng đợt OJT và thực tập sinh theo tháng"
            chartLabels={chartBatchAndTraineeLabels}
            chartData={batchAndTrainee}
          />
        </Grid>

        {/* ... Line Chart Part */}
        <Grid xs={12} md={6} lg={8}>
          <HorizontalLineChart
            title="Đào tạo viên với số thực tập sinh nhiều nhất"
            chartData={trainerAndTotalTrainees}
          />
        </Grid>

        {/* ... Pie Chart Part */}
        <Grid xs={12} md={6} lg={4}>
          <PieChart
            title="Vị trí thực tập"
            chartData={traineeWithPosition}
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

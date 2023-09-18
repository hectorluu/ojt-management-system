import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import CampaignFeature from "views/modules/campaign/CampaignFeature";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import {
  Button,
  CardActions,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  SvgIcon,
  Typography,
} from "@mui/material";
import TotalGrowthBarChart from "views/components/chart/TotalGrowthBarChart";
import { UniversityCard } from "views/components/cards/UniversityCard";
import { coursePath, universityPath } from "logic/api/apiUrl";
import { courseStatus, defaultPageIndex } from "logic/constants/global";
import MainCard from "views/components/cards/MainCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useNavigate } from "react-router-dom";
import { CourseCard } from "views/components/cards/CourseCard";

const AdminDashBoardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

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
      setCourses(response.data.data.slice(0, 5));
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
        <Grid container spacing={3}>
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
              {/* <OverviewUniversities isLoading={isLoading}></OverviewUniversities> */}

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
                    <CourseCard courses={course} />
                  </Grid>
                ))}
              </Grid>
              {/* <OverviewUniversities isLoading={isLoading}></OverviewUniversities> */}

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

          {/* ... Chart Part */}
          <Grid item xs={12} md={12}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <CampaignFeature></CampaignFeature>
      <Gap></Gap>
      <Heading number={10}>Current Available Courses </Heading>

      <Gap></Gap>
    </Fragment>
  );
};

export default AdminDashBoardPage;

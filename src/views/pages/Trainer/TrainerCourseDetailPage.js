import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  TextareaAutosize,
  Stack,
  Rating,
  Button,
  SvgIcon,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import { Label } from "views/components/label";
import { defaultCourseImage, defaultImage } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { coursePath } from "logic/api/apiUrl";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { useNavigate, useParams } from "react-router-dom";
import ProfileSkeleton from "views/modules/account/ProfileSkeleton";
import SubCard from "views/components/cards/SubCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const TrainerCourseDetailPage = () => {
  const { courseId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [isFetchingLoading, setIsFetchingLoading] = useState(false);
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [platformName, setPlatformName] = useState("");
  const [description, setDescription] = useState("");
  const [courseSkills, setCourseSkills] = useState([]);
  const [coursePositions, setCoursePositions] = useState([]);

  const fetchCourseDetail = async () => {
    try {
      setIsFetchingLoading(true);
      const response = await axiosPrivate.get(coursePath.GET_COURSE + courseId);
      console.log(response.data);
      setName(response.data.name);
      setPlatformName(response.data.platformName);
      setDescription(response.data.description);
      setLink(response.data.link);
      setUrl(response.data.imageURL);
      setIsFetchingLoading(false);
      setCoursePositions(response.data.coursePositions);
      setCourseSkills(response.data.courseSkills);
    } catch (error) {
      console.log(error);
      setIsFetchingLoading(false);
    }
  };

  useEffect(() => {
    if (!courseId) {
      navigate("/trainer-dashboard");
    }
    fetchCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainCard
      title="Thông tin khoá học"
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <ArrowOutwardIcon />
            </SvgIcon>
          }
          onClick={() => window.open(link)}
          variant="contained"
          component="label"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Đến khoá học
        </Button>
      }
    >
      {isFetchingLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Card>
            <div className="relative w-full h-[300px] overflow-hidden">
              <img
                src={url || defaultCourseImage}
                className="w-full h-full object-cover object-scale-down"
                alt="courseImg"
                onError={(e) => {
                  e.target.src = defaultCourseImage;
                }}
              />
            </div>
            <CardHeader
              title={<span className="text-xl font-bold">Thông tin</span>}
            />
            <CardContent sx={{ pt: 0 }}>
              <FormGroup>
                <Label>Tên khoá học (*)</Label>
                <TextField
                  name="name"
                  placeholder="ex: Reactjs for beginner"
                  value={name}
                  inputProps={{ readOnly: true }}
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label>Nền tảng (*)</Label>
                  <TextField
                    name="platformName"
                    placeholder="Ex: Udemy"
                    value={platformName}
                    inputProps={{ readOnly: true }}
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>Miêu tả (*)</Label>
                <TextField
                  value={description}
                  multiline
                  fullWidth
                  InputProps={{
                    inputComponent: TextareaAutosize,
                    inputProps: {
                      minRows: 5,
                      readOnly: true,
                      maxRows: 8,
                      placeholder: "Viết mô tả về khóa học....",
                      onChange: (e) => setDescription(e.target.value),
                      onKeyDown: (e) => setDescription(e.target.value),
                    },
                  }}
                />
              </FormGroup>
            </CardContent>
          </Card>
          <Divider />
          <Card>
            <CardHeader
              sx={{ mb: -2 }}
              title={
                <span className="text-xl font-bold">Chi tiết kĩ năng</span>
              }
            />
            <SubCard>
              {courseSkills.length !== 0 ? (
                courseSkills.map((item, index) => (
                  <Stack key={index} direction="row" spacing={2}>
                    <Typography variant="h3" color="text.secondary">
                      {item.skillName}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={item.recommendedLevel}
                      readOnly
                    />
                    <ArrowForwardIcon />
                    <Rating
                      name="read-only"
                      value={item.afterwardLevel}
                      readOnly
                    />
                  </Stack>
                ))
              ) : (
                <>
                  <Typography
                    variant="h3"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Khoá học không yêu cầu kĩ năng
                  </Typography>
                </>
              )}
            </SubCard>
          </Card>
          <Divider />
          <Card>
            <CardHeader
              sx={{ mb: -2 }}
              title={
                <span className="text-xl font-bold">Vị trí khuyến nghị</span>
              }
            />
            <SubCard>
              {coursePositions.length !== 0 ? (
                coursePositions.map((item, index) => (
                  <Stack key={index} direction="row" spacing={4}>
                    <Typography
                      variant="h3"
                      color="text.secondary"
                      sx={{ mb: 4 }}
                    >
                      {item.positionName}:{" "}
                    </Typography>
                    <Typography
                      variant="h3"
                      color="text.secondary"
                      sx={{ mb: 4 }}
                    >
                      {item.isCompulsory ? "Bắt buộc" : "Không bắt buộc"}
                    </Typography>
                  </Stack>
                ))
              ) : (
                <>
                  <Typography
                    variant="h3"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Khoá học không yêu cầu vị trí
                  </Typography>
                </>
              )}
            </SubCard>
          </Card>
        </>
      )}
    </MainCard>
  );
};

export default TrainerCourseDetailPage;

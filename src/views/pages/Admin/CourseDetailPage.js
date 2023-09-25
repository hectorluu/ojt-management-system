import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  TextareaAutosize,
  Stack,
  Rating,
  Autocomplete,
  IconButton,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import AddIcon from '@mui/icons-material/Add';
import { Label } from "views/components/label";
import {
  courseOptions,
  defaultCourseImage,
} from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { coursePath } from "logic/api/apiUrl";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import {
  courseNoti,
  generalNoti,
} from "logic/constants/notification";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import ProfileSkeleton from "views/modules/account/ProfileSkeleton";
import SubCard from "views/components/cards/SubCard";
import { coursePositionValid, courseSkillValid, updateCourseValid } from "logic/utils/validateUtils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ModalAddCoursePosition from "views/components/modal/ModalAddCoursePosition";
import ModalAddCourseSkill from "views/components/modal/ModalAddCourseSkill";

const CourseDetailPage = () => {
  const { courseId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [isFetchingLoading, setIsFetchingLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isModalOpenPosition, setIsModalOpenPosition] = useState(false);
  const [isModalOpenSkill, setIsModalOpenSkill] = useState(false);
  const [status, setStatus] = useState(0);
  const [link, setLink] = useState("");
  const [platformName, setPlatformName] = useState("");
  const [description, setDescription] = useState("");
  const [coursePositions, setCoursePositions] = useState([]);
  const [courseSkills, setCourseSkills] = useState([]);

  const fetchCourseDetail = async () => {
    try {
      setIsFetchingLoading(true);
      const response = await axiosPrivate.get(coursePath.GET_COURSE + courseId);
      setName(response.data.name);
      setPlatformName(response.data.platformName);
      setDescription(response.data.description);
      setLink(response.data.link);
      setUrl(response.data.imageURL);
      setStatus(response.data.status);
      setCoursePositions(response.data.coursePositions);
      setCourseSkills(response.data.courseSkills);
      setIsFetchingLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsFetchingLoading(false);
    }
  };

  useEffect(() => {
    if (!courseId) {
      navigate("/admin-dashboard");
    }
    fetchCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (imgURL) {
      handleUpdateCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgURL]);

  const onImageChange = (file) => {
    setUrl(URL.createObjectURL(file));
    setImage(file);
  };

  async function uploadFile() {
    setIsLoading(true);
    const course = {
      name,
      platformName,
      description,
      link,
      imageURL: imgURL,
      status,
    };
    const valid = updateCourseValid(course);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      if (image) {
        try {
          const imageRef = ref(storage, "images/universities/" + image.name);
          await uploadBytes(imageRef, image).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((downloadURL) => {
              setImgURL(downloadURL);
            });
          });
        } catch (e) {
          toast.error(generalNoti.ERROR.UPLOAD_FAIL);
        }
      } else {
        setImgURL(url);
      }
    }
    setIsLoading(false);
  }

  const handleOpenPosition = (id) => {
    setIsModalOpenPosition(true);
  };

  const handleOpenSkill = (id) => {
    setIsModalOpenSkill(true);
  };

  const handleUpdateCourse = async () => {
    try {
      setIsSubmitLoading(true);
      const course = {
        name,
        platformName,
        description,
        link,
        imageURL: imgURL,
        status,
      };
      await axiosPrivate.put(
        coursePath.UPDATE_COURSE + courseId,
        course
      );
      toast.success(courseNoti.SUCCESS.UPDATE);
      setIsSubmitLoading(false);
      navigate("/course-list");
    } catch (e) {
      toast.error(e.response.data);
      setIsSubmitLoading(false);
    }
  };

  const handleUpdateSkill = async (skillId, before, after) => {
    try {
      setIsFetchingLoading(true);
      const courseSkill = {
        skillId: skillId,
        recommendedLevel: before,
        afterwardLevel: after,
      };
      if (after < before) {
        toast.error(courseNoti.ERROR.AFTERWARD_LEVEL_TOO_LOW);
        setIsFetchingLoading(false);
        return;
      }
      await axiosPrivate.put(
        coursePath.UPDATE_COURSE_SKILL + courseId,
        courseSkill
      );
      toast.success(courseNoti.SUCCESS.UPDATE);
      fetchCourseDetail();
      setIsFetchingLoading(false);
    } catch (e) {
      toast.error(e.response.data);
      setIsFetchingLoading(false);
    }
  }

  const handleUpdatePosition = async (positionId, isCompulsory) => {
    try {
      setIsFetchingLoading(true);
      const coursePosition = {
        positionId: positionId,
        isCompulsory: isCompulsory,
      };
      await axiosPrivate.put(
        coursePath.UPDATE_COURSE_POSITION + courseId,
        coursePosition
      );
      toast.success(courseNoti.SUCCESS.UPDATE);
      fetchCourseDetail();
      setIsFetchingLoading(false);
    } catch (e) {
      toast.error(e.response.data);
      setIsFetchingLoading(false);
    }
  };

  const handleAddNewCoursePosition = async (item) => {
    setIsSubmitLoading(true);
    const position = {
      positionId: item.positionId,
      isCompulsory: item.isCompulsory,
    };
    const valid = coursePositionValid(position);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        await axiosPrivate.post(coursePath.CREATE_COURSE_POSITION + courseId, position);
        toast.success(courseNoti.SUCCESS.UPDATE);
        fetchCourseDetail();
        setIsSubmitLoading(false);
        setIsModalOpenPosition(false);
      } catch (e) {
        toast.error(e.response.data);
        setIsSubmitLoading(false);
        setIsModalOpenPosition(false);
      }
    };
    setIsSubmitLoading(false);
  };

  const handleAddNewCourseSkill = async (item) => {
    setIsSubmitLoading(true);
    const skill = {
      skillId: item.skillId,
      recommendedLevel: item.recommendedLevel,
      afterwardLevel: item.afterwardLevel,
    };
    const valid = courseSkillValid(skill);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        await axiosPrivate.post(coursePath.CREATE_COURSE_SKILL + courseId, skill);
        toast.success(courseNoti.SUCCESS.UPDATE);
        fetchCourseDetail();
        setIsSubmitLoading(false);
        setIsModalOpenSkill(false);
      } catch (e) {
        toast.error(e.response.data);
        setIsSubmitLoading(false);
        setIsModalOpenSkill(false);
      }
    };
    setIsSubmitLoading(false);
  };

  return (
    <MainCard
      title="Thông tin khoá học"
    >
      {isModalOpenPosition ?
        <ModalAddCoursePosition
          onRequestClose={() => setIsModalOpenPosition(false)}
          handleAddNewCoursePosition={handleAddNewCoursePosition}
          isSubmitLoading={isSubmitLoading}
          error={error}
        ></ModalAddCoursePosition>
        : null}
      {isModalOpenSkill ?
        <ModalAddCourseSkill
          onRequestClose={() => setIsModalOpenSkill(false)}
          handleAddNewCourseSkill={handleAddNewCourseSkill}
          isSubmitLoading={isSubmitLoading}
          error={error}
        ></ModalAddCourseSkill>
        : null}
      {isFetchingLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Card>
            <div className="relative w-full h-[300px] overflow-hidden">
              <img
                className="w-full h-full object-cover object-scale-down"
                src={url}
                alt="courseImg"
                onError={(e) => {
                  e.target.src = defaultCourseImage;
                }}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center mt-2">
                <input
                  id="image-updload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onImageChange(e.target.files[0])}
                  className="hidden"
                />
                <Button
                  variant="outlined"
                  className="mt-1 p-2 rounded-lg bg-white"
                  onClick={() =>
                    document.getElementById("image-updload").click()
                  }
                >
                  <span className="mx-auto">Chọn ảnh</span>
                </Button>
              </div>
            </div>
            <CardHeader title="Thông tin" />
            <CardContent sx={{ pt: 0 }}>
              <FormGroup>
                <Label>Tên khoá học (*)</Label>
                <TextField
                  error={error?.name ? true : false}
                  helperText={error?.name}
                  name="name"
                  placeholder="ex: Reactjs for beginner"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)}
                  value={name}
                  inputProps={{ maxLength: 100 }}
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label>Đường dẫn (*)</Label>
                  <TextField
                    error={error?.link ? true : false}
                    helperText={error?.link}
                    name="link"
                    placeholder="Ex: https://example.com"
                    onChange={(e) => setLink(e.target.value)}
                    onBlur={(e) => setLink(e.target.value)}
                    value={link}
                    inputProps={{ maxLength: 500 }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Nền tảng (*)</Label>
                  <TextField
                    error={error?.platformName ? true : false}
                    helperText={error?.platformName}
                    name="platformName"
                    placeholder="Ex: Udemy"
                    onChange={(e) => setPlatformName(e.target.value)}
                    onBlur={(e) => setPlatformName(e.target.value)}
                    value={platformName}
                    inputProps={{ maxLength: 100 }}
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>Miêu tả (*)</Label>
                <TextField
                  value={description}
                  multiline
                  error={error?.description ? true : false}
                  helperText={error?.description}
                  fullWidth
                  InputProps={{
                    inputComponent: TextareaAutosize,
                    inputProps: {
                      minRows: 5,
                      maxLength: 500,
                      maxRows: 8,
                      placeholder: "Viết mô tả về khóa học....",
                      onChange: (e) => setDescription(e.target.value),
                      onKeyDown: (e) => setDescription(e.target.value),
                    },
                  }}
                />
              </FormGroup>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end", mt: -4 }}>
              <LoadingButton
                variant="contained"
                component={"label"}
                onClick={() => uploadFile()}
                loading={isLoading}
              >
                Cập nhật
              </LoadingButton>
            </CardActions>
          </Card>
          <Divider />
          <Card>
            <CardHeader sx={{ mb: -2 }} title="Chi tiết kĩ năng" />
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
                      onChange={(event, newValue) => {
                        handleUpdateSkill(item.skillId, newValue, item.afterwardLevel);
                      }}
                    />
                    <ArrowForwardIcon />
                    <Rating
                      name="read-only"
                      value={item.afterwardLevel}
                      onChange={(event, newValue) => {
                        handleUpdateSkill(item.skillId, item.recommendedLevel, newValue);
                      }}
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
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton color="primary" aria-label="delete" onClick={() => handleOpenSkill()}>
                  <AddIcon />
                </IconButton>
              </Stack>
            </SubCard>
          </Card>
          <Divider />
          <Card>
            <CardHeader sx={{ mb: -2 }} title="Vị trí khuyến nghị" />
            <SubCard>
              {coursePositions.length !== 0 ? (
                coursePositions.map((item, index) => (
                  <Stack key={index} direction="row" spacing={2}>
                    <Typography
                      variant="h3"
                      color="text.secondary"
                      sx={{ pt: 2 }}
                    >
                      {item.positionName}:{" "}
                    </Typography>
                    <Autocomplete
                      value={courseOptions.find((label) => label.value === item.isCompulsory)}
                      sx={{ width: 300 }}
                      disablePortal={false}
                      options={courseOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Lựa chọn"
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          handleUpdatePosition(item.positionId, newValue.value);
                        }
                      }}
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
                    Khoá học không yêu cầu vị trí
                  </Typography>
                </>
              )}
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton color="primary" aria-label="delete" onClick={() => handleOpenPosition()}>
                  <AddIcon />
                </IconButton>
              </Stack>
            </SubCard>
          </Card>
        </>
      )}
    </MainCard>
  );
};

export default CourseDetailPage;

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
  TablePagination,
  TextareaAutosize,
  Stack,
  Rating,
  Autocomplete,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import { Label } from "views/components/label";
import {
  courseOptions,
  defaultCourseImage,
  defaultPageIndex,
  defaultPageSize,
} from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { coursePath, ojtBatchPath } from "logic/api/apiUrl";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import {
  generalNoti,
  ojtBatchNoti,
  universityNoti,
} from "logic/constants/notification";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import ProfileSkeleton from "views/modules/account/ProfileSkeleton";
import SubCard from "views/components/cards/SubCard";
import { ojtBatchValid, updateCourseValid } from "logic/utils/validateUtils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CourseDetailPage = () => {
  const { courseId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [ojtBatch, setOjtBatchs] = useState([]);
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const [isFetchingLoading, setIsFetchingLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedId, setClickedId] = useState(0);
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
      console.log(error);
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
        setImgURL(defaultCourseImage);
      }
    }
    setIsLoading(false);
  }

  const handleUpdateBatch = async (data) => {
    const valid = ojtBatchValid(data);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        setIsSubmitLoading(true);
        const response = await axiosPrivate.put(
          ojtBatchPath.UPDATE_BATCH + clickedId,
          data
        );
        console.log(response);
        toast.success(ojtBatchNoti.SUCCESS.UPDATE);
        setIsSubmitLoading(false);
        setIsModalOpen(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleOpenMenu = (id) => {
    setClickedId(id);
    setIsModalOpen(true);
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
      const response = await axiosPrivate.put(
        coursePath.UPDATE_COURSE + courseId,
        course
      );
      console.log(response);
      toast.success(universityNoti.SUCCESS.UPDATE);
      setIsSubmitLoading(false);
    } catch (e) {
      console.log(e);
      setIsSubmitLoading(false);
    }
  };

  return (
    <MainCard
      title="Thông tin khoá học"
    >
      {/* <ModalEditOJTBatch
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        idClicked={clickedId}
        handleUpdateBatch={handleUpdateBatch}
        isSubmitLoading={isSubmitLoading}
        error={error}
      ></ModalEditOJTBatch> */}
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
                    />
                    <ArrowForwardIcon />
                    <Rating
                      name="read-only"
                      value={item.afterwardLevel}
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
                      value={courseOptions.find((item) => item.value === item.isCompulsory)}
                      sx={{ width: 300 }}
                      disablePortal={false}
                      options={courseOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Lựa chọn"
                          error={
                            error?.coursePosition?.[index]?.isCompulsory
                              ? true
                              : false
                          }
                          helperText={
                            error?.coursePosition?.[index]?.isCompulsory
                          }
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          console.log(
                            newValue.value
                          );
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
            </SubCard>
          </Card>
        </>
      )}
    </MainCard>
  );
};

export default CourseDetailPage;

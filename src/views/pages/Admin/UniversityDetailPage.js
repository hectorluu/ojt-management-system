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
  SvgIcon,
  TablePagination,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import { Label } from "views/components/label";
import {
  defaultPageIndex,
  defaultPageSize,
  defaultUniversityImage,
} from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { ojtBatchPath, universityPath } from "logic/api/apiUrl";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { generalNoti, ojtBatchNoti, universityNoti } from "logic/constants/notification";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import ProfileSkeleton from "views/modules/account/ProfileSkeleton";
import AddIcon from "@mui/icons-material/Add";
import SubCard from "views/components/cards/SubCard";
import ModalEditOJTBatch from "views/components/modal/ModalEditOJTBatch";
import { ojtBatchValid, universityValid } from "logic/utils/validateUtils";

const UniversityDetailPage = () => {
  const { universityId } = useParams();

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
  const [address, setAddress] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [joinDate, setJoinDate] = useState(new Date());
  const [universityCode, setUniversityCode] = useState("");
  const moment = require("moment");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedId, setClickedId] = useState(0);
  const [status, setStatus] = useState(0);

  const fetchOJTBatchs = async () => {
    try {
      const response = await axiosPrivate.get(
        ojtBatchPath.GET_OJT_BATCH_LIST_OF_UNIVERSITY + "/" + universityId +
        "?PageIndex=" +
        page +
        "&PageSize=" +
        rowsPerPage
      );
      setOjtBatchs(response.data.data);
      setTotalItem(response.data.totalItem);
      console.log("fetchOJTBatchs ~ response", response);
    } catch (error) {
      console.log("fetch ~ error", error);
    }
  };

  const fetchUniversityDetail = async () => {
    try {
      setIsFetchingLoading(true);
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY + universityId
      );
      setName(response.data.name);
      setAddress(response.data.address);
      setUrl(response.data.imgURL);
      setJoinDate(response.data.joinDate);
      setUniversityCode(response.data.universityCode);
      setStatus(response.data.status);
      // setOjtBatchs(response.data.ojtBatchs);
      setIsFetchingLoading(false);
    } catch (error) {
      console.log(error);
      setIsFetchingLoading(false);
    }
  };

  useEffect(() => {
    if (!universityId) {
      navigate("/admin-dashboard");
    }
    fetchOJTBatchs();
    fetchUniversityDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (imgURL) {
      handleUpdateUniversity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgURL]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const onImageChange = (file) => {
    setUrl(URL.createObjectURL(file));
    setImage(file);
  };

  async function uploadFile() {
    setIsLoading(true);
    const joinDateConvert = new Date(joinDate);
    const university = {
      name,
      address,
      universityCode,
      joinDate: joinDateConvert,
    };
    const valid = universityValid(university);
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
        setImgURL(defaultUniversityImage);
      }
    }
    setIsLoading(false);
  };

  const handleUpdateBatch = async (data) => {
    setIsSubmitLoading(true);
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
        fetchOJTBatchs();
      } catch (e) {
        console.log(e);
        setIsSubmitLoading(false);
      }
    };
    setIsSubmitLoading(false);
  };

  const handleOpenMenu = (id) => {
    setClickedId(id);
    setIsModalOpen(true);
  };

  const handleUpdateUniversity = async () => {
    try {
      setIsSubmitLoading(true);
      const university = {
        name,
        address,
        universityCode,
        joinDate,
        imgURL,
        status
      };
      const response = await axiosPrivate.put(
        universityPath.UPDATE_UNIVERSITY + universityId,
        university
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
      title="Hồ sơ"
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to={`/create-new-ojt-batch/${universityId}`}
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm đợt thực tập mới
        </Button>
      }
    >
      <ModalEditOJTBatch
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        idClicked={clickedId}
        handleUpdateBatch={handleUpdateBatch}
        isSubmitLoading={isSubmitLoading}
        error={error}
        universityId={universityId}
      ></ModalEditOJTBatch>
      {isFetchingLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Card>
            <div className="relative w-full h-[300px] overflow-hidden">
              <img className="w-full h-full object-cover object-scale-down" src={url} alt="courseImg"
                onError={(e) => { e.target.src = defaultUniversityImage }}
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
                <Label>Tên Trường (*)</Label>
                <TextField
                  error={error?.name ? true : false}
                  helperText={error?.name}
                  name="name"
                  placeholder="ex: FPT University"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)}
                  value={name}
                  inputProps={{ maxLength: 100 }}
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label>Mã (*)</Label>
                  <TextField
                    error={error?.universityCode ? true : false}
                    helperText={error?.universityCode}
                    name="universityCode"
                    placeholder="Ex: FPTU"
                    onChange={(e) => setUniversityCode(e.target.value)}
                    onBlur={(e) => setUniversityCode(e.target.value)}
                    value={universityCode}
                    inputProps={{ maxLength: 100 }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Ngày tham gia (*)</Label>
                  <DatePicker
                    value={moment(joinDate)}
                    onChange={(newValue) => setJoinDate(newValue.toDate())}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        error: error?.joinDate ? true : false,
                        helperText: error?.joinDate,
                        readOnly: true,
                      },
                    }}
                  />
                </FormGroup>
              </FormRow>
              <FormGroup>
                <Label>Địa chỉ (*)</Label>
                <TextField
                  error={error?.address ? true : false}
                  helperText={error?.address}
                  name="address"
                  placeholder="Ex: HCM city"
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={(e) => setAddress(e.target.value)}
                  value={address}
                  inputProps={{ maxLength: 500 }}
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
            <CardHeader sx={{ mb: -2 }} title="Đợt thực tập" />
            <SubCard>
              {ojtBatch.length > 0 ? ojtBatch.map((item) => (
                <Card
                  sx={{ display: "flex" }}
                  className="rounded-2xl border-0 py-3 pb-1 hover:shadow-xl transition duration-500 ease-in-out border-solid border-2 border-slate-200"
                  key={item.id}
                >
                  <div className="flex items-center space-x-96 gap-x-6 ml-5 w-full">
                    <div className="flex-1">
                      <h1 className="text-[22px] font-semibold mb-2">
                        {item.name}
                      </h1>
                      <p className="mb-2 text-sm text-text2">University</p>
                      <p className="mb-2 text-sm text-text2">
                        Thời gian thực tập: {item.startTime} - {item.endTime}
                      </p>
                    </div>
                    <div className="flex items-center justify-center text-white rounded-full w-fit bg-opacity-60">
                      <Button
                        variant="outlined"
                        component="label"
                        className="mr-3"
                        onClick={() => handleOpenMenu(item.id)}
                      >
                        Chọn
                      </Button>
                    </div>
                  </div>
                </Card>
              )) :
                <>
                  <Typography variant="h3" color="text.secondary" sx={{ mb: 2 }}>
                    Chưa có đợt thực tập nào
                  </Typography>
                </>
              }
              <TablePagination
                labelRowsPerPage="Số dòng"
                component="div"
                count={totalItem}
                page={page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
                }
              />
            </SubCard>
          </Card>
        </>
      )}
    </MainCard>
  );
};

export default UniversityDetailPage;

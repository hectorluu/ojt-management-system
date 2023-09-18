import { Fragment, useEffect, useState } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import ImageUpload from "views/components/image/ImageUpload";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { universityPath } from "logic/api/apiUrl";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { universityNoti } from "logic/constants/notification";
import { defaultUniversityImage } from "logic/constants/global";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import { universityValid } from "logic/utils/validateUtils";

const CreateNewUniversityPage = () => {
  const { handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [imgURL, setImgURL] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [universityCode, setUniversityCode] = useState("");
  const [address, setAddress] = useState("");
  const [joinDate, setJoinDate] = useState(new Date());
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const moment = require("moment");

  useEffect(() => {
    if (imgURL) {
      handleAddNewUniversity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgURL]);

  const handleAddNewUniversity = async () => {
    try {
      await axiosPrivate.post(universityPath.CREATE_UNIVERSITY, {
        name,
        imgURL,
        universityCode,
        address,
        joinDate,
      });
      toast.success(universityNoti.SUCCESS.CREATE);
      setIsLoading(false);
      navigate("/university-list");
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  async function uploadFile() {
    setIsLoading(true);
    const university = {
      name,
      universityCode,
      address,
      joinDate,
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
          toast.error("Upload img error");
        }
      } else {
        setImgURL(defaultUniversityImage);
      }
    };
    setIsLoading(false);
  }

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Thêm trường đại học mới
          </h1>
          <form onSubmit={handleSubmit(uploadFile)}>
            <FormRow>
              <FormGroup>
                <Label>Tên trường đại học (*)</Label>
                <TextField
                  error={error?.name ? true : false}
                  helperText={error?.name}
                  name="name"
                  placeholder="Ex: Đại học FPT TP Hồ Chí Minh"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Mã trường đại học (*)</Label>
                <TextField
                  error={error?.universityCode ? true : false}
                  helperText={error?.universityCode}
                  name="universityCode"
                  placeholder="Ex: FPT"
                  onChange={(e) => setUniversityCode(e.target.value)}
                  onBlur={(e) => setUniversityCode(e.target.value)} />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Địa chỉ (*)</Label>
                <TextField
                  error={error?.address ? true : false}
                  helperText={error?.address}
                  name="address"
                  placeholder="Ex: số 54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội..."
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={(e) => setAddress(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Ngày liên kết (*)</Label>
                <DatePicker
                  value={moment(joinDate)}
                  onChange={(newValue) => setJoinDate(newValue.toDate())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: error?.joinDate ? true : false,
                      helperText: error?.joinDate,
                    },
                  }}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Tải ảnh lên</Label>
                <ImageUpload onChange={setImage}></ImageUpload>
              </FormGroup>
              {image && (
                <FormGroup>
                  <Label>Preview</Label>
                  <label className="w-full h-[200px] border border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center">
                    <img
                      className="w-full h-full object-contain"
                      src={URL.createObjectURL(image)}
                      alt="img"
                    ></img>
                  </label>
                </FormGroup>
              )}
            </FormRow>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
                isLoading={isLoading}
              >
                Thêm mới{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment >
  );
};

export default CreateNewUniversityPage;

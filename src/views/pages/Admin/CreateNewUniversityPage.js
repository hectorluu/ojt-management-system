import { Fragment, useEffect, useState } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import ImageUpload from "views/components/image/ImageUpload";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import { Input } from "views/components/input";
import { Button } from "views/components/button";
import DatePicker from "react-date-picker";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { universityPath } from "logic/api/apiUrl";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { universityNoti } from "logic/constants/notification";
import { defaultUniversityImage } from "logic/constants/global";
import { useNavigate } from "react-router-dom";

const CreateNewUniversityPage = () => {
  const { handleSubmit, control, getValues } = useForm();
  const [image, setImage] = useState(null);
  const [joinDate, setJoinDate] = useState(new Date());
  const [imgURL, setImgURL] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    if (imgURL) {
      handleAddNewUniversity(getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgURL]);

  const handleAddNewUniversity = async (values) => {
    try {
      await axiosPrivate.post(universityPath.CREATE_UNIVERSITY, {
        ...values,
        imgURL,
        joinDate,
      });
      toast.success(universityNoti.SUCCESS.CREATE);
      setIsLoading(false);
      navigate("/university-list");
    } catch (error) {
      console.log("error", error);
      toast.error(error);
      setIsLoading(false);
    }
  };

  async function uploadFile() {
    setIsLoading(true);
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
                <Input
                  control={control}
                  name="name"
                  placeholder="Ex: Đại học FPT TP Hồ Chí Minh"
                  autoComplete="off"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Ngày liên kết (*)</Label>
                <DatePicker
                  name=""
                  onChange={setJoinDate}
                  value={joinDate}
                  format="dd-MM-yyyy"
                  autoComplete="off"
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>Địa chỉ (*)</Label>
              <Input
                control={control}
                name="address"
                placeholder="Ex: số 54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội..."
              ></Input>
            </FormGroup>
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
    </Fragment>
  );
};

export default CreateNewUniversityPage;

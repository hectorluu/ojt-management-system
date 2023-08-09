import { Fragment } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import ImageUpload from "views/components/image/ImageUpload";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import { Input } from "views/components/input";
import { Button } from "views/components/button";
import { apiURL } from "logic/config/general-config/config";

const CreateNewUniversityPage = () => {
  const { handleSubmit, control, setValue, reset } = useForm();

  const resetValues = () => {
    reset({});
  };

  const handleAddNewUniversity = async (values) => {
    try {
      await axios.post(`${apiURL}/`, {
        ...values,
      });
      toast.success("Create university successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new account");
    }
    // values, dateOfBirth
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Thêm trường đại học mới
          </h1>
          <form onSubmit={handleSubmit(handleAddNewUniversity)}>
            <FormRow>
              <FormGroup>
                <Label>Tên trường đại học (*)</Label>
                <Input
                  control={control}
                  name="university name"
                  placeholder="Ex: Đại học FPT TP Hồ Chí Minh"
                  autoComplete="off"
                ></Input>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Địa chỉ (*)</Label>
                <Input
                  control={control}
                  name="address"
                  placeholder="Ex: số 54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội..."
                ></Input>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Tải ảnh lên (*)</Label>
                <ImageUpload
                  onChange={setValue}
                  name="featured_image"
                ></ImageUpload>
              </FormGroup>
              <FormGroup></FormGroup>
            </FormRow>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
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

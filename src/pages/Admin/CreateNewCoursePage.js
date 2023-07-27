import { courseOptions } from "constants/global";
import React, { Fragment } from "react";
import { Input, Textarea } from "components/input";
import ImageUpload from "components/image/ImageUpload";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { coursePath } from "api/apiUrl";

const CreateNewCoursePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { handleSubmit, control, setValue, reset, watch } = useForm();
  
  const getDropdownLabel = (name, options = [{ value: "", label: "" }], defaultValue = "") => {
    const value = watch(name) || defaultValue;
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  const resetValues = () => {
    reset({});
  };

  const handleAddNewCourse = async (values) => {
    try {
      await axiosPrivate.post(coursePath.CREATE_COURSE, {
        ...values,
      });
      toast.success("Create course successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new course");
    }
    // values, dateOfBirth
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo khóa học mới
          </h1>
          <form onSubmit={handleSubmit(handleAddNewCourse)}>
            <FormRow>
              <FormGroup>
                <Label>Tên khóa học (*)</Label>
                <Input
                  control={control}
                  name="name"
                  placeholder="Ex: Object-oriented programming"
                  autoComplete="off"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Nền tảng (*)</Label>
                <Input
                  control={control}
                  name="platformName"
                  placeholder="Ex: Udemy"
                  autoComplete="off"
                ></Input>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Link (*)</Label>
                <Input
                  control={control}
                  name="link"
                  placeholder=""
                  autoComplete="off"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Bắt buộc / Không bắt buộc (*)</Label>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getDropdownLabel("Lựa chọn",courseOptions , "Lựa chọn")}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    {courseOptions.map((option) => (
                      <Dropdown.Option
                        key={option.value}
                        onClick={() =>
                          handleSelectDropdownOption("Lựa chọn", option.value)
                        }
                      >
                        <span className="capitalize">{option.label}</span>
                      </Dropdown.Option>
                    ))}
                  </Dropdown.List>
                </Dropdown>
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>Mô tả khóa học *</Label>
              <Textarea
                name="description"
                placeholder="Viết mô tả về khóa học...."
                control={control}
              ></Textarea>
            </FormGroup>
            {/* This is the line to separate between section */}
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            <FormRow>
              <FormGroup>
                <Label>Kĩ năng khóa học (*)</Label>
                <Input
                  control={control}
                  name="skill"
                  placeholder="Ex: javascript, c#, ..."
                ></Input>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Level kĩ năng thấp nhất để được học (*)</Label>
                <Input
                  control={control}
                  name="recommened level"
                  placeholder="Từ 1 - 5"
                  autoComplete="off"
                  type="number"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Level sẽ đạt được sau khóa học (*)</Label>
                <Input
                  control={control}
                  name="afterward level"
                  placeholder="Từ 1 - 5"
                  autoComplete="off"
                  type="number"
                ></Input>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Tải ảnh khóa học (*)</Label>
                <ImageUpload
                  onChange={setValue}
                  name="imageURL"
                ></ImageUpload>
              </FormGroup>
              <FormGroup></FormGroup>
            </FormRow>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Bước tiếp theo{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewCoursePage;

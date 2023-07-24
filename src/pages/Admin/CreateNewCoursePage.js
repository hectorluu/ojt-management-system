import { courseOptions } from "constants/global";
import React, { Fragment } from "react";
import { Input, Textarea } from "components/input";
import ImageUpload from "components/image/ImageUpload";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiURL } from "config/config";

const CreateNewCoursePage = () => {
  const { handleSubmit, control, setValue, reset, watch } = useForm();

  const getDropdownLabel = (name, defaultValue = "") => {
    const value = watch(name) || defaultValue;
    return value;
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  const resetValues = () => {
    reset({});
  };

  const handleAddNewCourse = async (values) => {
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
                  name="platform name"
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
                    placeholder={getDropdownLabel("Lựa chọn", "Lựa chọn")}
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
                name="short_description"
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

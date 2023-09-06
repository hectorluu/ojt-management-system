import React, { Fragment, useState } from "react";
import { Input, Textarea } from "views/components/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiURL } from "logic/config/general-config/config";
import { toast } from "react-toastify";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import DatePicker from "react-date-picker";
import { Label } from "views/components/label";
import { Button } from "views/components/button";

const CreateNewTrainingPlanPage = () => {
  const { handleSubmit, control, reset } = useForm();

  const resetValues = () => {
    reset({});
  };

  const handleAddNewTrainingPlan = async (values) => {
    try {
      await axios.post(`${apiURL}/`, {
        ...values,
        startDate,
        endDate,
      });
      toast.success("Create university successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new account");
    }
    // values, dateOfBirth
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-slate-700 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo kế hoạch đào tạo mới
          </h1>
          <form onSubmit={handleSubmit(handleAddNewTrainingPlan)}>
            <FormGroup>
              <Label>Tên kế hoạch đào tạo (*)</Label>
              <Input
                control={control}
                name="training plan name"
                placeholder="Ex: Kế hoạch đào tạo cho sinh viên trường Đại học FPT quý 3 năm 2023"
                autoComplete="off"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Mô tả *</Label>
              <Textarea
                name="short_description"
                placeholder="Viết mô tả về kế hoạch...."
                control={control}
              ></Textarea>
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Label>Ngày bắt đầu (*)</Label>
                <DatePicker
                  onChange={setStartDate}
                  value={startDate}
                  format="dd-MM-yyyy"
                />
              </FormGroup>
              <FormGroup>
                <Label>Ngày kết thúc (*)</Label>
                <DatePicker
                  onChange={setEndDate}
                  value={endDate}
                  format="dd-MM-yyyy"
                />
              </FormGroup>
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

export default CreateNewTrainingPlanPage;

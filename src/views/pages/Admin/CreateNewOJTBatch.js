import { Fragment, useEffect, useState } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import { Input } from "views/components/input";
import { Dropdown } from "views/components/dropdown";
import { Button } from "views/components/button";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { ojtBatchPath, universityPath } from "logic/api/apiUrl";
import { ojtBatchNoti } from "logic/constants/notification";

const CreateNewOJTBatch = () => {
  const [startday, setStartDay] = useState(new Date());
  const [endday, setEndDay] = useState(new Date());

  const axiosPrivate = useAxiosPrivate();

  const [universityId, setUniversityId] = useState(0);
  const [universityList, setUniversityList] = useState([]);

  const { handleSubmit, control, reset, watch } = useForm();

  useEffect(() => {
    fetchUniversities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY_LIST
      );
      setUniversityList(response.data.data);
      console.log("fetchUniversities ~ success", response);
    } catch (error) {
      console.log("fetchUniversities ~ error", error);
    }
  };

  const getDropdownLabel = (
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const value = watch(name) || defaultValue;
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  const resetValues = () => {
    reset({});
  };

  const handleAddNewOJTBatch = async (values) => {
    try {
      await axiosPrivate.post(ojtBatchPath.CREATE_OJT_BATCH, {
        ...values,
      });

      console.log(values);
      toast.success(ojtBatchNoti.SUCCESS.CREATE);
      resetValues();
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getApiDropdownLabel = (
    value,
    options = [{ id: "", name: "" }],
    defaultValue = ""
  ) => {
    const label = options.find((label) => label.id === value);
    return label ? label.name : defaultValue;
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo đợt thực tập mới
          </h1>
          <form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label>Tên đợt thực tập (*)</Label>
                <Input
                  control={control}
                  name="ojtbatchname"
                  placeholder="Ex: Đợt thực tập quý 3 năm 2021 trường Đại học Bách Khoa Hà Nội"
                  autoComplete="off"
                ></Input>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Tên trường đại học(*)</Label>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getApiDropdownLabel(
                      universityId,
                      universityList,
                      "Chọn trường đại học"
                    )}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    {universityList.map((university) => (
                      <Dropdown.Option
                        key={university.id}
                        onClick={() => setUniversityId(university.id)}
                      >
                        <span className="capitalize">{university.name}</span>
                      </Dropdown.Option>
                    ))}
                  </Dropdown.List>
                </Dropdown>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Ngày bắt đầu (*)</Label>
                <DatePicker
                  name=""
                  onChange={setStartDay}
                  value={startday}
                  format="dd-MM-yyyy"
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label>Ngày kết thúc (*)</Label>
                <DatePicker
                  name=""
                  onChange={setEndDay}
                  value={endday}
                  format="dd-MM-yyyy"
                  autoComplete="off"
                />
              </FormGroup>
            </FormRow>

            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Tạo mới{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewOJTBatch;

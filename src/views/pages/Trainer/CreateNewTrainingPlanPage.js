import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { trainingPlanPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { trainingPlanNoti } from "logic/constants/notification";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const CreateNewTrainingPlanPage = () => {
  const { handleSubmit, getValues } = useForm();
  const [error, setError] = useState({});
  const [trainingPlanName, setTrainingPlanName] = useState("");

  const trainingPlanIdCreated = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleAddNewTrainingPlan = async (values) => {
    try {
      await axiosPrivate.post(trainingPlanPath.CREATE_NEW_TRAINING_PLAN, {
        trainingPlanName,
      });
      toast.success(trainingPlanNoti.SUCCESS.CREATE);

      navigate("/create-training-plan-detail/" + trainingPlanIdCreated);
    } catch (error) {
      toast.error(error);
    }
  };

  // const handleAddField = () => {
  //   if (
  //     filteredSkillList.length > 0 &&
  //     createSkills.length < skillList.length
  //   ) {
  //     const newField = {
  //       skillId: "",
  //       initLevel: "",
  //     };
  //     setCreateSkills([...createSkills, newField]);
  //   } else {
  //     toast.error(accountNoti.ERROR.SKILL_OVERFLOW);
  //   }
  // };

  // const handleRemoveField = (index) => {
  //   let temp = createSkills.slice();
  //   temp.pop();
  //   setCreateSkills(temp);
  // };

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
              <TextField
                error={error?.trainingPlanName ? true : false}
                helperText={error?.trainingPlanName}
                name="trainingplanname"
                placeholder="Ex: Kế hoạch đào tạo cho sinh viên trường Đại học FPT quý 3 năm 2023"
                onChange={(e) => setTrainingPlanName(e.target.value)}
                onBlur={(e) => setTrainingPlanName(e.target.value)}
              />
            </FormGroup>
            {/* This is the line to separate between section */}
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>

            {/* {createSkills.map((userSkill, index) => (
              <div key={index}>
                <FormRow>
                  <FormGroup>
                    <Label>Kỹ năng (*)</Label>
                    <Autocomplete
                      disablePortal={false}
                      id="combo-box-demo"
                      options={filteredSkillList}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Chọn kỹ năng"
                          error={
                            error?.createSkills?.[index]?.skillId ? true : false
                          }
                          helperText={error?.createSkills?.[index]?.skillId}
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          onChangeUserSkill(index, "skillId", newValue.id);
                        } else {
                          onChangeUserSkill(index, "skillId", "");
                        }
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Trình độ (*)</Label>
                    <Autocomplete
                      disablePortal={false}
                      id="combo-box-demo"
                      options={skillLevel}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Chọn trình độ"
                          type="number"
                          error={
                            error?.createSkills?.[index]?.initLevel
                              ? true
                              : false
                          }
                          helperText={error?.createSkills?.[index]?.initLevel}
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          onChangeUserSkill(index, "initLevel", newValue.value);
                        } else {
                          onChangeUserSkill(index, "initLevel", "");
                        }
                      }}
                    />
                  </FormGroup>
                </FormRow>
              </div>
            ))}
            <Stack direction="row" spacing={1} justifyContent="center">
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => handleRemoveField()}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => handleAddField()}
              >
                <AddIcon />
              </IconButton>
            </Stack> */}

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

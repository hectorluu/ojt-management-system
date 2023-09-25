import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import { Autocomplete, Box, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FormRow from "../common/FormRow";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { skillPath } from "logic/api/apiUrl";
import { skillLevel } from "logic/constants/global";

const ModalAddCourseSkill = ({
  onRequestClose,
  handleAddNewCourseSkill,
  isSubmitLoading,
  error,
}) => {
  const { handleSubmit } = useForm();
  const [skillId, setSkillId] = useState("");
  const [recommendedLevel, setRecommendedLevel] = useState("");
  const [afterwardLevel, setAfterwardLevel] = useState("");
  const [skillList, setSkillList] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL_LIST + "?PageSize=" + 100000 + "&PageIndex=" + 1
      );
      setSkillList(response.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleAdd = async () => {
    await handleAddNewCourseSkill({ skillId, recommendedLevel, afterwardLevel });
  };

  return (
    <Modal open={true} onClose={onRequestClose}>
      <Box
        sx={{
          borderRadius: "0.5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <button
          className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-1 top-1 text-text1"
          onClick={onRequestClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="font-bold text-[25px] mb-10 text-center">
          Thêm vị trí mới
        </h2>
        <div>
          <div className="bg-white shadow-1 rounded-xl p-2">
            <form onSubmit={handleSubmit(handleAdd)}>
              <FormGroup>
                <Label>Kỹ năng (*)</Label>
                <Autocomplete
                  disablePortal={false}
                  options={skillList}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn kỹ năng"
                      error={
                        error?.skillId ? true : false
                      }
                      helperText={error?.skillId}
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSkillId(newValue.id);
                    } else {
                      setSkillId("");
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </FormGroup>
              <FormRow>
                <FormGroup>
                  <Label>Trình độ khuyến nghị (*)</Label>
                  <Autocomplete
                    disablePortal={false}
                    options={skillLevel}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Lựa chọn"
                        error={
                          error?.recommendedLevel
                            ? true
                            : false
                        }
                        helperText={
                          error?.recommendedLevel
                        }
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setRecommendedLevel(newValue.value);
                      } else {
                        setRecommendedLevel("");
                      }
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Trình độ hoàn thành (*)</Label>
                  <Autocomplete
                    disablePortal={false}
                    options={skillLevel}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Lựa chọn"
                        error={
                          error?.afterwardLevel
                            ? true
                            : false
                        }
                        helperText={
                          error?.afterwardLevel
                        }
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setAfterwardLevel(newValue.value);
                      } else {
                        setAfterwardLevel("");
                      }
                    }}
                  />
                </FormGroup>
              </FormRow>

              <div className="mt-5 text-center">
                <Button
                  type="submit"
                  className="px-10 mx-auto text-white bg-primary"
                  isLoading={isSubmitLoading}
                >
                  Thêm mới{" "}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalAddCourseSkill;

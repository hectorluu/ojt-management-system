import { useEffect, useState } from "react";
import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import { Autocomplete, Box, Modal, TextField } from "@mui/material";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { trainerPath } from "logic/api/apiUrl";
import { toast } from "react-toastify";

const ModalAssignCourse = ({
  onRequestClose,
  handleAssign,
  isLoading,
  error,
}) => {
  const { handleSubmit } = useForm();
  const [traineeId, setTraineeId] = useState("");
  const [traineeList, setTraineeList] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const handleClick = async () => {
    await handleAssign({ traineeId });
  };

  useEffect(() => {
    async function fetchTraineeList() {
      try {
        const response = await axiosPrivate.get(
          trainerPath.GET_TRAINEE_LIST +
          "?PageIndex=" +
          1 +
          "&PageSize=" +
          1000000
        );
        setTraineeList(response.data.data);
      } catch (error) {
        toast.error(error.response.data);
      }
    }
    fetchTraineeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <h2 className="font-bold text-[25px] mb-5 text-center">
          Giao khoá học
        </h2>
        <div>
          <div className="bg-white shadow-1 rounded-xl p-4">
            <form onSubmit={handleSubmit(handleClick)}>
              <FormGroup>
                <Label>Thực tập sinh (*)</Label>
                <Autocomplete
                  disablePortal={false}
                  options={traineeList}
                  getOptionLabel={(option) => option.lastName + " " + option.firstName + " " + option.email + " " + option.positionName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn thực tập sinh"
                      error={
                        error?.traineeId
                          ? true
                          : false
                      }
                      helperText={
                        error?.traineeId
                      }
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setTraineeId(newValue.id);
                    } else {
                      setTraineeId("");
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </FormGroup>

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
      </Box>
    </Modal>
  );
};

export default ModalAssignCourse;

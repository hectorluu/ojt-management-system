import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import { Autocomplete, Box, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FormRow from "../common/FormRow";
import { courseOptions } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { positionPath } from "logic/api/apiUrl";
import { toast } from "react-toastify";

const ModalAddCoursePosition = ({
  isOpen,
  onRequestClose,
  handleAddNewCoursePosition,
  isSubmitLoading,
  error,
}) => {
  const { handleSubmit } = useForm();
  const [positionId, setPositionId] = useState("");
  const [isCompulsory, setIsCompulsory] = useState("");
  const [positionList, setPositionList] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION_LIST +
        "?PageSize=" +
        100000 +
        "&PageIndex=" +
        1
      );
      setPositionList(response.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleAdd = async () => {
    await handleAddNewCoursePosition({ positionId, isCompulsory });
  };

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
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
              <FormRow>
                <FormGroup>
                  <Label>Vị trí (*)</Label>
                  <Autocomplete
                    disablePortal={false}
                    options={positionList}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Chọn vị trí"
                        error={
                          error?.positionId
                            ? true
                            : false
                        }
                        helperText={
                          error?.positionId
                        }
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setPositionId(newValue.id);
                      } else {
                        setPositionId("");
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Bắt buộc / Không bắt buộc (*)</Label>
                  <Autocomplete
                    disablePortal={false}
                    options={courseOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Lựa chọn"
                        error={
                          error?.isCompulsory
                            ? true
                            : false
                        }
                        helperText={
                          error?.isCompulsory
                        }
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setIsCompulsory(newValue.value);
                      } else {
                        setIsCompulsory("");
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

export default ModalAddCoursePosition;

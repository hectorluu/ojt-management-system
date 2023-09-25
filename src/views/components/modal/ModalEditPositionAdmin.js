import React, { useEffect, useState } from "react";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { positionPath } from "logic/api/apiUrl";
import { useForm } from "react-hook-form";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import {
  Box,
  Modal,
  Skeleton,
  TextField,
} from "@mui/material";
import Button from "../button/Button";
import { toast } from "react-toastify";

const ModalEditPositionAdmin = ({
  isOpen,
  onRequestClose,
  positionIdClicked,
  isSubmitLoading,
  handleUpdatePosition,
  error,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [position, setPosition] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  const fetchPosition = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION + positionIdClicked
      );
      setPosition(response.data);
      setName(response.data.name);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (positionIdClicked !== 0) {
      fetchPosition();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionIdClicked]);

  useEffect(() => {
    if (positionIdClicked) {
      setName(position.name);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const { handleSubmit } = useForm();

  const handleEditSkill = async () => {
    handleUpdatePosition({
      id: positionIdClicked,
      status: position.status,
      name: name,
    });
    // values, dateOfBirth
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
        <h2 className="font-bold text-[25px] mb-5 text-center">
          Chỉnh sửa vị trí
        </h2>
        <div>
          <div className="bg-white shadow-1 rounded-xl p-4">
            <form onSubmit={handleSubmit(handleEditSkill)}>
              <FormGroup>
                <Label className="font-semibold">Tên vị trí (*)</Label>
                {isLoading ? (
                  <Skeleton height={60} />
                ) : (
                  <TextField
                    value={name}
                    error={error?.name ? true : false}
                    helperText={error?.name}
                    name="name"
                    placeholder="Ex: ReactJS"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 100 }}
                  />
                )}
              </FormGroup>

              <div className="mt-5 flex justify-center">
                <Button
                  type="submit"
                  className="px-10 mx-auto text-white bg-primary"
                  isLoading={isLoading}
                >
                  Chỉnh sửa{" "}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalEditPositionAdmin;

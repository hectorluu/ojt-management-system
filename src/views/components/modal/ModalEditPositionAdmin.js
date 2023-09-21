import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button } from "views/components/button";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { positionPath } from "logic/api/apiUrl";
import { useForm } from "react-hook-form";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { Skeleton, TextField } from "@mui/material";

const ModalEditPositionAdmin = ({
  isOpen,
  onRequestClose,
  positionIdClicked,
  isSubmitLoading,
  handleUpdatePosition,
  error
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      className="modal-content w-full max-w-[700px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
    >
      <button
        className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-10 top-[10px] text-text1"
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
              <Label>Tên vị trí (*)</Label>
              {isLoading ? <Skeleton height={60} animation="wave" /> :
                <TextField
                  error={error?.name ? true : false}
                  helperText={error?.name}
                  name="name"
                  placeholder="Ex: ReactJS"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)}
                  inputProps={{ maxLength: 100 }} />
              }
            </FormGroup>

            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
                isLoading={isSubmitLoading}
              >
                Cập nhật{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalEditPositionAdmin;

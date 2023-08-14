import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button } from "views/components/button";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { positionPath } from "logic/api/apiUrl";
import { useForm } from "react-hook-form";
import { apiURL } from "logic/config/general-config/config";
import { toast } from "react-toastify";
import axios from "logic/api/axios";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { Input } from "views/components/input";

const ModalEditPositionAdmin = ({
  isOpen,
  onRequestClose,
  positionIdClicked,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [position, setPosition] = useState([]);

  const fetchPosition = async () => {
    try {
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION + positionIdClicked
      );
      setPosition(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (positionIdClicked !== 0) {
      fetchPosition();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionIdClicked]);

  useEffect(() => {
    if (positionIdClicked) {
      setValue("position name", `${position.name}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const { handleSubmit, control, setValue } = useForm();

  const handleEditSkill = async (values) => {
    try {
      await axios.post(`${apiURL}/`, {
        ...values,
      });
      toast.success("Create new skill successfully");
    } catch (error) {
      toast.error("Can not create new skill");
    }
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
              <Input
                control={control}
                name="position name"
                autoComplete="off"
              ></Input>
            </FormGroup>

            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Chấp nhận{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalEditPositionAdmin;

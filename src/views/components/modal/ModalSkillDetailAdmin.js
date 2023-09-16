import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import { useForm } from "react-hook-form";
import FormGroup from "views/components/common/FormGroup";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { skillPath } from "logic/api/apiUrl";
import { Skeleton, TextField } from "@mui/material";

const ModalSkillDetailAdmin = ({ isOpen, onRequestClose, skillIdClicked, handleUpdateSkill, isSubmitLoading, error }) => {
  const axiosPrivate = useAxiosPrivate();
  const [skill, setSkill] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  const fetchSkill = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL + skillIdClicked
      );
      setSkill(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (skillIdClicked !== 0) {
      fetchSkill();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillIdClicked]);

  useEffect(() => {
    if (skillIdClicked) {
      setName(skill.name);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill]);

  const { handleSubmit } = useForm();

  const handleEditSkill = async () => {
    await handleUpdateSkill({
      id: skillIdClicked,
      status: skill.status,
      name: name,
    });
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      className="modal-content w-full max-w-[500px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
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
        Chỉnh sửa kĩ năng
      </h2>
      <div>
        <div className="bg-white shadow-1 rounded-xl p-4">
          <form onSubmit={handleSubmit(handleEditSkill)}>
            <FormGroup>
              <Label>Tên kĩ năng (*)</Label>
              {isLoading ? <Skeleton height={60} /> :
                <TextField
                  error={error?.name ? true : false}
                  helperText={error?.name}
                  name="name"
                  defaultValue={name}
                  placeholder="Ex: ReactJS"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)} />
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

export default ModalSkillDetailAdmin;

import { Fragment, useState } from "react";
import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import ReactModal from "react-modal";
import { TextField } from "@mui/material";

const ModalAddSkillAdmin = ({ isOpen, onRequestClose, handleAddNewSkill, isLoading, error }) => {
  const { handleSubmit } = useForm();
  const [name, setName] = useState("");

  const handleClick = async () => {
    await handleAddNewSkill(name);
  };


  return (
    <Fragment>
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
          Tạo kỹ năng mới
        </h2>
        <div>
          <div className="bg-white shadow-1 rounded-xl p-4">
            <form onSubmit={handleSubmit(handleClick)}>
              <FormGroup>
                <Label>Tên kĩ năng (*)</Label>
                <TextField
                  error={error?.name?true:false}
                  helperText={error?.name}
                  name="name"
                  placeholder="Ex: ReactJS"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)} />
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
      </ReactModal>
    </Fragment>
  );
};

export default ModalAddSkillAdmin;

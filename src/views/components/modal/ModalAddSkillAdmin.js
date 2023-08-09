import { Fragment } from "react";
import FormGroup from "views/components/common/FormGroup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import { Input } from "views/components/input";
import { Button } from "views/components/button";
import { apiURL } from "logic/config/general-config/config";
import ReactModal from "react-modal";

const ModalAddSkillAdmin = ({ isOpen, onRequestClose }) => {
  const { handleSubmit, control, reset } = useForm();

  const resetValues = () => {
    reset({});
  };

  const handleAddNewSkill = async (values) => {
    try {
      await axios.post(`${apiURL}/`, {
        ...values,
      });
      toast.success("Create new skill successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new skill");
    }
    // values, dateOfBirth
  };

  return (
    <Fragment>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className="modal-content w-full max-w-[1000px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
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
        <h2 className="font-bold text-[25px] mb-10 text-center">
          Tạo kỹ năng mới
        </h2>
        <div>
          <div className="bg-white shadow-1 rounded-xl p-2">
            <form onSubmit={handleSubmit(handleAddNewSkill)}>
              <FormGroup>
                <Label>Tên kĩ năng (*)</Label>
                <Input
                  control={control}
                  name="skill name"
                  placeholder="Ex: ReactJS"
                  autoComplete="off"
                ></Input>
              </FormGroup>

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
      </ReactModal>
    </Fragment>
  );
};

export default ModalAddSkillAdmin;

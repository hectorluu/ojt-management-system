import { Fragment, useEffect, useState } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { ojtBatchPath, templatePath } from "logic/api/apiUrl";
import { ojtBatchNoti } from "logic/constants/notification";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ojtBatchValid } from "logic/utils/validateUtils";
import signalRService from "logic/utils/signalRService";
import { signalRMessage } from "logic/constants/global";

const CreateNewOJTBatch = () => {
  const { universityId } = useParams();
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [templateId, setTemplateId] = useState("");
  const [error, setError] = useState({});
  const [templateList, setTemplateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const moment = require("moment");

  useEffect(() => {
    if (!universityId) {
      navigate("/admin-dashboard");
    };
    fetchTemplateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTemplateList = async () => {
    try {
      const response = await axiosPrivate.get(templatePath.GET_TEMPLATE_UNIVERSITY + universityId);
      setTemplateList(response.data);
    } catch (error) {
      toast.error(error?.response?.data);
    };
  };

  useEffect(() => {
    signalRService.on(signalRMessage.TEMPLATE.CREATED, (message) => {
      fetchTemplateList();
    });
    signalRService.on(signalRMessage.TEMPLATE.UPDATED, (message) => {
      fetchTemplateList();
    });
    signalRService.on(signalRMessage.TEMPLATE.DELETED, (message) => {
      fetchTemplateList();
    });

    return () => {
      signalRService.off(signalRMessage.TEMPLATE.CREATED);
      signalRService.off(signalRMessage.TEMPLATE.UPDATED);
      signalRService.off(signalRMessage.TEMPLATE.DELETED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNewOJTBatch = async (values) => {
    setIsLoading(true);
    const batch = {
      name,
      startTime,
      endTime,
      templateId,
    };
    const valid = ojtBatchValid(batch);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        await axiosPrivate.post(ojtBatchPath.CREATE_OJT_BATCH, {
          name,
          startTime,
          endTime,
          templateId,
          universityId,
        });
        toast.success(ojtBatchNoti.SUCCESS.CREATE);
        setIsLoading(false);
        navigate(`/university/${universityId}`);
      } catch (error) {
        toast.error(error?.response?.data);
        setIsLoading(false);
      }
    };
    setIsLoading(false);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo đợt thực tập mới
          </h1>
          <form onSubmit={handleSubmit(handleAddNewOJTBatch)}>
            <FormRow>
              <FormGroup>
                <Label>Tên đợt thực tập (*)</Label>
                <TextField
                  error={error?.name ? true : false}
                  helperText={error?.name}
                  name="name"
                  placeholder="Ex: Đợt 1"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)}
                  inputProps={{ maxLength: 100 }} />
              </FormGroup>
              <FormGroup>
                <Label>Mẫu đánh giá(*)</Label>
                <Autocomplete
                  disablePortal={false}
                  id="combo-box-demo"
                  options={templateList}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} placeholder="Chọn mẫu đánh giá" error={error?.templateId ? true : false} helperText={error?.templateId} />}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setTemplateId(newValue.id);
                    } else {
                      setTemplateId("");
                    }
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Ngày bắt đầu (*)</Label>
                <DatePicker
                  value={moment(startTime)}
                  onChange={(newValue) => setStartTime(newValue.toDate())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: error?.startTime ? true : false,
                      helperText: error?.startTime,
                      readOnly: true,
                    },
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ngày kết thúc (*)</Label>
                <DatePicker
                  value={moment(endTime)}
                  onChange={(newValue) => setEndTime(newValue.toDate())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: error?.endTime ? true : false,
                      helperText: error?.endTime,
                      readOnly: true,
                    },
                  }}
                />
              </FormGroup>
            </FormRow>

            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
                isLoading={isLoading}
              >
                Tạo mới{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewOJTBatch;

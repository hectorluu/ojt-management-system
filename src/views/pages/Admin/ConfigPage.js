import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { configOptions, signalRMessage } from "logic/constants/global";

import signalRService from "logic/utils/signalRService";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import { FormGroup, Skeleton, SvgIcon } from "@mui/material";
import Gap from "views/components/common/Gap";
import { configPath } from "logic/api/apiUrl";
import FormRow from "views/components/common/FormRow";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { configValid } from "logic/utils/validateUtils";
import { toast } from "react-toastify";

const ConfigPage = () => {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [configs, setConfigs] = useState([]); // New data state
  const [isSubmitLoading, setIsSubmitLoading] = useState(false); // New submit state

  const fetchConfigs = async () => {
    try {
      setIsLoading(true);
      let response = await axiosPrivate.get(configPath.GET_CONFIG_LIST);
      setConfigs(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    signalRService.on(signalRMessage.USER.CREATE, (message) => {
      fetchConfigs();
    });
    signalRService.on(signalRMessage.USER.UPDATE, (message) => {
      fetchConfigs();
    });

    return () => {
      signalRService.off(signalRMessage.USER.CREATE);
      signalRService.off(signalRMessage.USER.UPDATE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchConfigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (id, value) => {
    let temp = configs.slice();
    temp = temp.map((item) => {
      if (item.id === id) {
        return { ...item, value: value };
      }
      return item;
    });
    setConfigs(temp);
  };

  const onSave = async () => {
    setIsSubmitLoading(true);
    const valid = configValid(configs);
    if (valid) {
      try {
        await axiosPrivate.put(configPath.UPDATE_CONFIG, configs);
        fetchConfigs();
        toast.success("Cập nhật thành công");
      } catch (error) {
        toast.error(error.response.data);
      }
    }
    setIsSubmitLoading(false);
  };

  return (
    <MainCard
      title="Cài đặt"
      secondary={
        <LoadingButton
          startIcon={
            <SvgIcon fontSize="small">
              <SaveIcon />
            </SvgIcon>
          }
          component="label"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
          onClick={() => onSave()}
          loading={isSubmitLoading}
        >
          Lưu
        </LoadingButton>
      }
    >
      <SubCard>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" height={45} animation="wave" />
            <Gap />
            <Skeleton variant="rectangular" height={45} animation="wave" />
          </>
        ) : configs.length > 0 ? (
          <>
            {configs.map((config) => (
              <div key={config.id}>
                <FormRow key={config.id} className="flex">
                  <FormGroup>
                    <span className="font-bold text-xl mt-3">
                      {
                        configOptions.find(
                          (label) => label.value === config.name
                        )?.label
                      }
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      defaultValue={config.value}
                      type="number"
                      inputProps={{
                        min: 1, // Set the minimum value here
                        max: configOptions.find(
                          (label) => label.value === config.name
                        )?.maxValue,
                      }}
                      onChange={(e) => onChange(config.id, e.target.value)}
                      disabled={isSubmitLoading}
                      error={
                        config.value < 1 ||
                        config.value >
                        configOptions.find(
                          (label) => label.value === config.name
                        )?.maxValue
                      }
                    />
                  </FormGroup>
                </FormRow>
                <Gap />
              </div>
            ))}
          </>
        ) : (
          <>Không có mục cài đặt nào được tìm thấy.</>
        )}
      </SubCard>
    </MainCard>
  );
};

export default ConfigPage;

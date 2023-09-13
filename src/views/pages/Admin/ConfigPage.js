import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

import { userPath } from "logic/api/apiUrl";
import {
  signalRMessage,
} from "logic/constants/global";

import signalRService from "logic/utils/signalRService";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import { Skeleton } from "@mui/material";
import Gap from "views/components/common/Gap";

const ConfigPage = () => {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [configs, setConfigs] = useState([]); // New data state

  const fetchConfigs = async () => {
    try {
      setIsLoading(true);
      let response = await axiosPrivate.get(
        userPath.GET_USER_LIST
      );
      setConfigs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("fetchConfigs ~ error", error);
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
    // fetchConfigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <MainCard
      title="Cài đặt"
    >
      <SubCard>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular"  height={45} />
            <Gap />
            <Skeleton variant="rectangular"  height={45} />
          </>
        ) : configs.length > 0 ? (
          <></>
        ) :
          <>Không có mục cài đặt nào được tìm thấy.</>
        }
      </SubCard>
    </MainCard>
  );
};

export default ConfigPage;

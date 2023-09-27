import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { certificatePath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  signalRMessage,
  certificateStatusColor,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import signalRService from "logic/utils/signalRService";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import CertificateGrid from "views/modules/certificate/Certificategrid";
import CertificateCardDisplay from "views/modules/certificate/CertificateCardDisplay";
import CertificateSkeleton from "views/modules/certificate/CertificateCardSkeleton";
import { toast } from "react-toastify";
import { certificateNoti } from "logic/constants/notification";
import { submitCertValid } from "logic/utils/validateUtils";
import { Autocomplete, TextField } from "@mui/material";

const TraineeCertificateSubmitPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState();
  const [selected, setSelected] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [isSubmitLoading, setIsSubmitLoading] = useState(false); // New loading state

  useEffect(() => {
    signalRService.on(signalRMessage.CERTIFICATE.PROCESS_CERTIFICATE, (message) => {
      fetchCertificate();
    });
    signalRService.on(signalRMessage.CERTIFICATE.UPDATE_PROCESS, (message) => {
      fetchCertificate();
    });
    signalRService.on(signalRMessage.COURSE.ASSIGNED, (message) => {
      fetchCertificate();
    });

    return () => {
      signalRService.off(signalRMessage.CERTIFICATE.PROCESS_CERTIFICATE);
      signalRService.off(signalRMessage.CERTIFICATE.UPDATE_PROCESS);
      signalRService.off(signalRMessage.COURSE.ASSIGNED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCertificate = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      let response = await axiosPrivate.get(
        certificatePath.GET_CERTIFICATE_LIST +
        "?PageIndex=" +
        page +
        "&PageSize=" +
        rowsPerPage +
        "&status=" +
        `${status === undefined ? "" : status}`
      );
      setCertificates(response.data.data);
      setTotalItem(response.data.totalItem);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchCertificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page, status]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const onSubmitCertificate = async (courseId, status, link) => {
    setIsSubmitLoading(true);
    setSelected(courseId);
    const valid = submitCertValid(link);
    setError(valid);
    if (valid === "") {
      try {
        if (status === 3) {
          await axiosPrivate.put(
            certificatePath.SUBMIT_CERTIFICATE,
            {
              courseId: courseId,
              link: link,
            }
          );
        } else {
          await axiosPrivate.put(
            certificatePath.RE_SUBMIT_CERTIFICATE,
            {
              courseId: courseId,
              link: link,
            }
          );
        }
        toast.success(certificateNoti.SUCCESS.SUBMIT);
        setIsSubmitLoading(false);
        fetchCertificate();
      } catch (error) {
        toast.error(error.response.data);
        setIsSubmitLoading(false);
      }
    }
    setIsSubmitLoading(false);
  };


  return (
    <MainCard
      title={`Chứng chỉ`}
    >
      <SubCard>
        <div className="flex flex-wrap items-start max-w-[200px] w-full">
          <Autocomplete
            disablePortal={false}
            options={certificateStatusColor}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Trạng thái" />
            )}
            onChange={(event, newValue) => {
              if (newValue) {
                setStatus(newValue.value);
              } else {
                setStatus("");
              }
            }}
          />
        </div>
        <CertificateGrid type="secondary">
          {isLoading ? ( // Render skeleton loading when loading is true
            // Use the animate-pulse class for skeleton effect
            <>
              <CertificateSkeleton />
              <CertificateSkeleton />
              <CertificateSkeleton />
            </>
          ) : certificates.length !== 0 ? (
            certificates.map((item, index) => (
              <CertificateCardDisplay certificate={item} key={index} onClickSubmit={onSubmitCertificate} isLoading={isSubmitLoading} error={error} selected={selected} />
            ))
          ) : (
            <>Không có chứng chỉ nào được tìm thấy.</>
          )}
        </CertificateGrid>
        <TablePagination
          labelRowsPerPage="Số dòng"
          component="div"
          count={totalItem}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
          }
        />
      </SubCard>
    </MainCard>
  );
};

export default TraineeCertificateSubmitPage;

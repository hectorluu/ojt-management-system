import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { certificatePath, positionPath, skillPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  signalRMessage,
  positionStatus,
  skillStatus,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import useOnChange from "logic/hooks/useOnChange";
import signalRService from "logic/utils/signalRService";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import CertificateGrid from "views/modules/certificate/Certificategrid";
import CertificateCardDisplay from "views/modules/certificate/CertificateCardDisplay";
import CertificateSkeleton from "views/modules/certificate/CertificateCardSkeleton";

const TraineeCertificateSubmitPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [certificates, setCertificates] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [isSubmitLoading, setIsSubmitLoading] = useState(false); // New loading state

  // useEffect(() => {
  //   signalRService.on(signalRMessage.COURSE.CREATED, (message) => {
  //     fetchCourses();
  //   });
  //   signalRService.on(signalRMessage.COURSE.UPDATED, (message) => {
  //     fetchCourses();
  //   });
  //   signalRService.on(signalRMessage.COURSE.DELETED, (message) => {
  //     fetchCourses();
  //   });

  //   return () => {
  //     signalRService.off(signalRMessage.COURSE.CREATED);
  //     signalRService.off(signalRMessage.COURSE.DELETED);
  //     signalRService.off(signalRMessage.COURSE.UPDATED);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const fetchCertificate = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      let response = await axiosPrivate.get(
        certificatePath.GET_CERTIFICATE_LIST +
        "?PageIndex=" +
        page +
        "&PageSize=" +
        rowsPerPage
      );
      setCertificates(response.data.data);
      setTotalItem(response.data.totalItem);
    } catch (error) {
      console.log("fetchCertificates ~ error", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchCertificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const onSubmitCertificate = async (courseId, link) => {
    try {
      setIsSubmitLoading(true);
      let response = await axiosPrivate.post(
        certificatePath.SUBMIT_CERTIFICATE,
        {
          courseId: courseId,
          link: link,
        }
      );
      if (response.status === 200) {
        fetchCertificate();
      }
    } catch (error) {
      console.log("onSubmitCertificate ~ error", error);
    } finally {
      setIsSubmitLoading(false);
    }
  };


  return (
    <MainCard
      title={`Chứng chỉ`}
    >
      <SubCard>
        <CertificateGrid type="secondary">
          <CertificateCardDisplay />
          {isLoading ? ( // Render skeleton loading when loading is true
            // Use the animate-pulse class for skeleton effect
            <>
              <CertificateSkeleton />
              <CertificateSkeleton />
              <CertificateSkeleton />
            </>
          ) : certificates.length !== 0 ? (
            certificates.map((item) => (
              <CertificateCardDisplay certificate={item} key={item.id} onClickSubmit={onSubmitCertificate} isLoading={isSubmitLoading} />
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

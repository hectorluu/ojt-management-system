import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { certificatePath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import MainCard from "views/components/cards/MainCard";
import {
  Box,
  Button,
  Modal,
} from "@mui/material";
import SubCard from "views/components/cards/SubCard";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import CertificateGrid from "views/modules/certificate/Certificategrid";
import CertificateCardCertify from "views/modules/certificate/CertificateCardCertify";
import CertificateSkeleton from "views/modules/certificate/CertificateCardSkeleton";
import { certificateNoti } from "logic/constants/notification";

const CertificateCertifyPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [isApprove, setIsApprove] = useState(false);
  const [selected, setSelected] = useState({}); // New selected state
  const [taskList, setTaskList] = useState([]); // New task list state

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchPendingCertificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const fetchPendingCertificate = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(certificatePath.GET_PENDING_CERTIFICATE +
        "?PageIndex=" +
        page +
        "&PageSize=" +
        rowsPerPage);
      setTaskList(response.data.data);
      setTotalItem(response.data.totalItem);
      console.log(response.data)
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  // Modal Delete
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (isApprove, item) => {
    setSelected(item);
    setIsApprove(isApprove);
    setIsModalOpen(true);
  };
  const handleCertify = async (item) => {
    console.log(item);
    console.log(isApprove);
    try {
      if (isApprove) {
        await axiosPrivate.put(certificatePath.VALID_CERTIFICATE,
          {
            courseId: item.courseId,
            userId: item.userId
          });
        toast.success(certificateNoti.SUCCESS.CERTIFY);
      } else {
        await axiosPrivate.put(certificatePath.INVALID_CERTIFICATE,
          {
            courseId: item.courseId,
            userId: item.userId
          });
        toast.success(certificateNoti.SUCCESS.CERTIFY);
      }
      fetchPendingCertificate();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const theme = useTheme();

  return (
    <MainCard
      title={`Duyệt chứng chỉ`}
    >
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            borderRadius: "0.5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <button
            className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-1 top-1 text-text1"
            onClick={handleCloseModal}
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
          <div className="text-center">
            <h2 className="font-bold text-[25px]">Duyệt chứng chỉ</h2>

            <div className="text-text1 text-base flex justify-center my-auto h-24 items-center">
              Bạn có chắc muốn {isApprove ? "chấp thuận" : "huỷ bỏ"} chứng chỉ &nbsp;
              <strong className="text-text1">{selected.courseName}</strong>
              &nbsp; của &nbsp;
              <strong className="text-text1">{selected.lastName + " " + selected.firstName}</strong>
              &nbsp; ?
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
            }}
            className="space-x-2"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark, // Color on hover
                },
              }}
              component="label"
              className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
              onClick={handleCloseModal}
            >
              <span className="text-white">Hủy</span>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.error.main,
                "&:hover": {
                  backgroundColor: theme.palette.error.dark, // Color on hover
                },
              }}
              component="label"
              className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
              onClick={() => handleCertify(selected)}
            >
              <span className="text-white">Xác nhận</span>
            </Button>
          </Box>
        </Box>
      </Modal>
      <SubCard>
        <CertificateGrid type="secondary">
          {isLoading ? ( // Render skeleton loading when loading is true
            // Use the animate-pulse class for skeleton effect
            <>
              <CertificateSkeleton />
              <CertificateSkeleton />
              <CertificateSkeleton />
            </>
          ) : taskList.length !== 0 ? (
            taskList.map((item) => (
              <CertificateCardCertify certificate={item} key={item.id} onClickProcess={handleOpenModal} />
            ))
          ) : (
            <>Không có chứng chỉ nào cần được duyệt.</>
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

export default CertificateCertifyPage;

import { Fragment, useEffect, useState } from "react";
import { universityPath } from "logic/api/apiUrl";
import {
  defaultPageIndex,
  defaultPageSize,
  signalRMessage,
} from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { defaultUniversityImage } from "logic/constants/global";
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  SvgIcon,
  TablePagination,
} from "@mui/material";
import Gap from "views/components/common/Gap";
import useOnChange from "logic/hooks/useOnChange";
import signalRService from "logic/utils/signalRService";
import MainCard from "views/components/cards/MainCard";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import SubCard from "views/components/cards/SubCard";
import UniversityGrid from "views/modules/university/UniversityGrid";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";

const UniversityListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [universities, setUniversities] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const theme = useTheme();

  const fetchUniversities = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY_LIST +
          "?PageSize=" +
          rowsPerPage +
          "&PageIndex=" +
          page +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}`
      );
      setUniversities(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    signalRService.on(signalRMessage.UNIVERSITY.CREATED, (message) => {
      fetchUniversities();
    });
    signalRService.on(signalRMessage.UNIVERSITY.DELETED, (message) => {
      fetchUniversities();
    });
    signalRService.on(signalRMessage.UNIVERSITY.UPDATED, (message) => {
      fetchUniversities();
    });

    return () => {
      signalRService.off(signalRMessage.UNIVERSITY.CREATED);
      signalRService.off(signalRMessage.UNIVERSITY.DELETED);
      signalRService.off(signalRMessage.UNIVERSITY.UPDATED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <MainCard
      title={`Danh sách trường đại học`}
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/create-new-university"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm mới
        </Button>
      }
    >
      <SubCard>
        {/*Custom search bar*/}
        <Card className="w-3/5">
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Tìm kiếm ..."
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 550 }}
            onChange={setSearchTerm}
          />
        </Card>
        <Gap />
        <div className="pt-[66px]">
          <div className="w-full max-w-[1000px] mx-auto text-center">
            <UniversityGrid>
              {isLoading ? ( // Render skeleton loading when loading is true
                // Use the animate-pulse class for skeleton effect
                <>
                  <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96">
                    <Skeleton
                      className="mb-5 w-full h-full max-h-40 object-contain"
                      height={300}
                      animation="wave"
                    />
                    <Skeleton className="w-full" animation="wave" />
                    <Skeleton className="w-full" animation="wave" />
                    <Skeleton className="w-full" animation="wave" />
                  </div>
                  <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96">
                    <Skeleton
                      className="mb-5 w-full h-full max-h-40 object-contain"
                      height={300}
                      animation="wave"
                    />
                    <Skeleton className="w-full" animation="wave" />
                    <Skeleton className="w-full" animation="wave" />
                    <Skeleton className="w-full" animation="wave" />
                  </div>
                  <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96">
                    <Skeleton
                      className="mb-5 w-full h-full max-h-40 object-contain"
                      height={300}
                      animation="wave"
                    />
                    <Skeleton className="w-full" animation="wave" />
                    <Skeleton className="w-full" animation="wave" />
                    <Skeleton className="w-full" animation="wave" />
                  </div>
                  <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96">
                    <Skeleton
                      className="mb-5 w-full h-full max-h-40 object-contain"
                      height={300}
                      animation="wave"
                    />
                    <Skeleton className="w-full" animation="wave" />
                    <Skeleton className="w-full" animation="wave" />
                    <Skeleton className="w-full" animation="wave" />
                  </div>
                </>
              ) : universities.length !== 0 ? (
                universities.map((university) => (
                  <div
                    className="bg-white shadow-lg flex flex-col justify-center items-center px-6 pb-6 rounded-2xl w-full h-96"
                    key={university.id}
                  >
                    <img
                      src={university.imgURL}
                      alt=""
                      className="mb-5 w-full h-full max-h-40 object-contain"
                      onError={(e) => {
                        e.target.src = defaultUniversityImage;
                      }}
                    />
                    <div className="max-h-1/2 mt-2">
                      <h1 className="decoration-solid font-medium text-2xl">
                        {university.name}
                      </h1>
                      <p className="mb-6 mt-3 text-sm text-text3">
                        {university.address}
                      </p>
                    </div>

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: theme.palette.success.dark,
                        "&:hover": {
                          backgroundColor: "#009e47", // Color on hover
                        },
                      }}
                      component="label"
                      className="flex items-center justify-center cursor-pointer w-full h-11 text-text1 rounded-lg"
                      onClick={() => {
                        navigate("/university/" + university.id);
                      }}
                    >
                      <span className="text-white">Chọn</span>
                    </Button>
                  </div>
                ))
              ) : (
                <>Không có trường đại học nào được tìm thấy.</>
              )}
            </UniversityGrid>
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
          </div>
        </div>
      </SubCard>
    </MainCard>
  );
};

export default UniversityListPage;

import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  SvgIcon,
  Typography,
} from "@mui/material";

import { attendancePath } from "logic/api/apiUrl";
import PerfectScrollbar from "react-perfect-scrollbar";

import MainCard from "views/components/cards/MainCard";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const AttendancePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const moment = require("moment");

  const [isLoading, setIsLoading] = useState(true); // New loading state

  // Fetch attendance file
  const [attendance, setAttendance] = useState([]);
  const fetchAttendanceFile = async () => {
    try {
      setIsLoading(true);
      let response = await axiosPrivate.get(attendancePath.GET_ATTENDANCE_FILE);
      setAttendance(response.data.data);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log("error", error);
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  // Fetch attendance by month
  const [attendanceByMonth, setAttendanceByMonth] = useState([]); // New loading state

  const fetchAttendanceByMonth = async () => {
    try {
      setIsLoading(true);
      let response = await axiosPrivate.get(
        attendancePath.GET_ATTENDANCE_BY_MONTH + (month + 1) + "/" + year
      );
      setAttendanceByMonth(response.data);
      console.log("attendanceByMonth", attendanceByMonth);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log("error", error);
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  // Fetch attendance by day
  const [attendanceByDay, setAttendanceByDay] = useState([]); // New loading state
  const [selectedDate, setSelectedDate] = useState(new Date()); // New loading state

  const fetchAttendanceByDay = async () => {
    try {
      setIsLoading(true);
      let response = await axiosPrivate.get(
        attendancePath.GET_ATTENDANCE_BY_DATE +
          moment(selectedDate).format("YYYY-MM-DD")
      );
      console.log("attendanceByDay", response.data);
      setAttendanceByDay(response.data.attendanceUsers);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log("error", error);
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  // Calendar
  const MONTH_NAMES = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const DAYS = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [no_of_days, setNoOfDays] = useState([]);
  const [blankdays, setBlankdays] = useState([]);

  const [event_title, setEventTitle] = useState("");
  const [event_date, setEventDate] = useState("");
  const [event_theme, setEventTheme] = useState("blue");

  const themes = [
    {
      value: "blue",
      label: "Blue Theme",
    },
    {
      value: "red",
      label: "Red Theme",
    },
    {
      value: "yellow",
      label: "Yellow Theme",
    },
    {
      value: "green",
      label: "Green Theme",
    },
    {
      value: "purple",
      label: "Purple Theme",
    },
  ];

  // example event day
  const [events, setEvents] = useState([
    {
      event_date: new Date(2023, 3, 1),
      event_title: "April Fool's Day",
      event_theme: "blue",
    },
    {
      event_date: new Date(2023, 3, 10),
      event_title: "Birthday",
      event_theme: "red",
    },
    {
      event_date: new Date(2023, 3, 16),
      event_title: "Upcoming Event",
      event_theme: "green",
    },
  ]);

  const [openEventModal, setOpenEventModal] = useState(false);

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const showEventModal = (date) => {
    setOpenEventModal(true);
    setEventDate(new Date(year, month, date).toDateString());
  };

  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month).getDay();
    let blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankdays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  const initializeCalendar = () => {
    getNoOfDays();
  };

  useEffect(() => {
    // Get the current date values
    const currentDate = moment(new Date()).format("YYYY/MM/DD");
    // Set the selectedDay, selectedMonth, and selectedYear states
    setSelectedDate(currentDate);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    initializeCalendar();
    //eslint-disable-next-line
  }, [month, year]);

  useEffect(() => {
    if (month !== 0) fetchAttendanceByMonth();

    //eslint-disable-next-line
  }, [month]);

  useEffect(() => {
    fetchAttendanceByDay();

    //eslint-disable-next-line
  }, [selectedDate]);

  return (
    <MainCard
      title="Điểm danh"
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/create-new-account"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Tải lên file điểm danh
        </Button>
      }
    >
      {/*Calendar*/}
      <div className="antialiased font-mono h-fit">
        <div x-data="app()" x-init="[initDate(), getNoOfDays()]" x-cloak>
          <div className="container mx-auto px-4 py-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex items-center justify-between py-4 px-6">
                <div>
                  <span className="text-lg font-bold text-gray-800">
                    {MONTH_NAMES[month]}
                  </span>
                  <span className="ml-1 text-lg text-gray-600 font-normal">
                    &nbsp; Năm {year}
                  </span>
                </div>
                <div
                  className="border rounded-lg px-1"
                  style={{ paddingTop: "2px" }}
                >
                  <button
                    type="button"
                    className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center`}
                    onClick={() => {
                      const newMonth = month === 0 ? 11 : month - 1;
                      const newYear = month === 0 ? year - 1 : year;
                      setMonth(newMonth);
                      setYear(newYear);
                      getNoOfDays();
                    }}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 inline-flex leading-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <div className="border-r inline-flex h-6"></div>
                  <button
                    type="button"
                    className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1`}
                    onClick={() => {
                      const newMonth = month === 11 ? 0 : month + 1;
                      const newYear = month === 11 ? year + 1 : year;
                      setMonth(newMonth);
                      setYear(newYear);
                      getNoOfDays();
                    }}
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 inline-flex leading-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="-mx-1 -mb-1">
                <div
                  className="flex flex-wrap"
                  style={{ marginBottom: "-40px" }}
                >
                  {DAYS.map((day, index) => (
                    <div
                      key={index}
                      style={{ width: "14.26%" }}
                      className="px-2 py-2"
                    >
                      <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center font-sans">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap border-t border-l">
                  {blankdays.map((blankday, index) => (
                    <div
                      key={index}
                      style={{ width: "14.28%", height: "120px" }}
                      className="text-center border-r border-b px-4 pt-2"
                    ></div>
                  ))}
                  {no_of_days.map((date, dateIndex) => (
                    <div
                      key={dateIndex}
                      style={{ width: "14.28%", height: "120px" }}
                      className="px-4 pt-2 border-r border-b relative"
                    >
                      <div
                        onClick={() => {
                          const selectedFullDate = new Date(year, month, date);
                          setSelectedDate(selectedFullDate);
                          console.log("selectedDate laaa", selectedDate);
                          showEventModal(date);
                        }}
                        className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${
                          isToday(date)
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-blue-200"
                        }`}
                      >
                        {date}
                      </div>
                      <div
                        style={{ height: "80px" }}
                        className="overflow-y-auto mt-1"
                      >
                        {/* Event rendering */}
                        {/* {events
                          .filter(
                            (event) =>
                              new Date(event.event_date).toDateString() ===
                              new Date(year, month, date).toDateString()
                          )
                          .map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border ${
                                event.event_theme === "blue"
                                  ? "border-blue-200 text-blue-800 bg-blue-100"
                                  : event.event_theme === "red"
                                  ? "border-red-200 text-red-800 bg-red-100"
                                  : event.event_theme === "yellow"
                                  ? "border-yellow-200 text-yellow-800 bg-yellow-100"
                                  : event.event_theme === "green"
                                  ? "border-green-200 text-green-800 bg-green-100"
                                  : event.event_theme === "purple"
                                  ? "border-purple-200 text-purple-800 bg-purple-100"
                                  : ""
                              }`}
                            >
                              <p className="text-sm truncate leading-tight">
                                {event.event_title}
                              </p>
                            </div>
                          ))} */}
                        {/* Event rendering */}
                        {attendanceByMonth.attendanceInMonth &&
                          attendanceByMonth.attendanceInMonth.map(
                            (attendanceData, eventIndex) => {
                              if (attendanceData.day === date) {
                                const totalRecords =
                                  attendanceData.totalRecords;
                                return (
                                  <div
                                    key={eventIndex}
                                    className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border ${
                                      totalRecords > 0
                                        ? "border-green-200 text-green-800 bg-green-100"
                                        : ""
                                    }`}
                                  >
                                    {totalRecords > 0 && (
                                      <p className="text-sm truncate leading-tight font-sans">
                                        Điểm danh: {totalRecords}
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                              return null;
                            }
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal */}
          <Modal open={openEventModal}>
            <Box
              sx={{
                borderRadius: "0.5rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 700,
                height: "fit",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <button
                className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-3 top-3 text-text1"
                onClick={() => setOpenEventModal(false)}
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
              <PerfectScrollbar
                style={{
                  height: "100%",
                  maxHeight: "calc(100vh - 30px)",
                  overflowX: "hidden",
                }}
              >
                <h2 className="font-bold text-2xl mb-6 text-gray-800 pb-2">
                  Chi tiết điểm danh
                </h2>

                {attendanceByDay?.length > 0 ? (
                  attendanceByDay.map((item, index) => (
                    <List className="text-gray-700" key={item.id}>
                      <ListItem className="flex space-between" sx={{ mt: -2 }}>
                        <div className="w-1/2 flex items-center">
                          <Typography className="font-bold w-24">
                            {index + 1}
                            {")"} Họ và tên:
                          </Typography>
                          <ListItemText
                            primary={item?.firstName + " " + item?.lastName}
                          />
                        </div>
                        <div className="w-1/4 flex items-center">
                          <Typography className="font-bold w-24">
                            Email:
                          </Typography>
                          <ListItemText primary={item?.email} />
                        </div>{" "}
                      </ListItem>
                      <ListItem className="flex space-between" sx={{ mt: -2 }}>
                        <div className="w-1/2 flex items-center">
                          <Typography className="font-bold w-24">
                            &nbsp; &nbsp; MSNV:
                          </Typography>
                          <ListItemText primary={item?.rollNumber} />
                        </div>
                        <div className="w-1/2 flex items-center">
                          <Typography className="font-bold w-24">
                            Tổng giờ làm:
                          </Typography>
                          <ListItemText primary={item?.totalWorkingHours} />
                        </div>{" "}
                      </ListItem>
                    </List>
                  ))
                ) : (
                  <p className="text-gray-800 block mb-1 font-bold text-xl text-center">
                    Không có dữ liệu được ghi nhận
                  </p>
                )}
              </PerfectScrollbar>
            </Box>
          </Modal>
        </div>
      </div>
    </MainCard>
  );
};

export default AttendancePage;

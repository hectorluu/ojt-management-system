import Gap from "views/components/common/Gap";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Typography, Paper, Chip, Stack, Button, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "logic/api/axios";
import { apiURL } from "logic/config/general-config/config";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { Input } from "views/components/input";

const DefineFormulaPage = () => {
  // style
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 45rem;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  ///
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const tagData = {
    Attendance: {
      "tổng ngày làm đủ giờ": "[FullHourWorkingDays]",
      "tổng ngày thiếu giờ": "[LackOfHourWorkingDays]",
      "tổng số ngày của khoá thực tập": "[TotalInternshipDays]",
      "độ sôi nổi theo tháng()": "[ExcitementByMonth]",
      "độ sôi nổi theo tuần()": "[ExcitementByWeek]",
    },
    Skill: {
      "tổng số skill ban đầu": "[InitialSkillCount]",
      "tổng số skill học được(không tính skill đã có)": "[NewlyLearnedSkills]",
      "tổng số điểm kỹ năng ban đầu": "[InitialSkillPoints]",
      "tổng số điểm kỹ năng đạt được": "[AchievedSkillPoints]",
      "tổng số kỹ năng 1 sao": "[SkillRating1Star]",
      "tổng số kỹ năng 2 sao": "[SkillRating2Stars]",
      "tổng số kỹ năng 3 sao": "[SkillRating3Stars]",
      "tổng số kỹ năng 4 sao": "[SkillRating4Stars]",
      "tổng số kỹ năng 5 sao": "[SkillRating5Stars]",
    },
    Certificate: {
      "tổng số course bắt buộc": "[RequiredCourses]",
      "tổng số course hoàn thành": "[CompletedCourses]",
      "tổng số course bắt buộc đã hoàn thành": "[CompletedRequiredCourses]",
      "tổng số course optional đã hoàn thành": "[CompletedOptionalCourses]",
    },
    Task: {
      "tổng task làm đúng hạn": "[TasksCompletedOnTime]",
      "tổng task trễ hạn": "[DelayedTasks]",
      "tổng task": "[TotalTasks]",
      "Tổng số công việc (is_evaluate_task)": "[EvaluatedTasks]",
    },
  };

  const tagCategories = Object.keys(tagData);

  const [textareaValue, setTextareaValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedLabel(null);
  };

  const handleChipClick = (label) => {
    setSelectedLabel(label);
    setTextareaValue(
      (prevValue) => prevValue + tagData[selectedCategory][label]
    );
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();

      textareaRef.current.value = textareaValue;
      // Set the caret position to the end of the textarea
      textareaRef.current.selectionStart = textareaValue.length;
      textareaRef.current.selectionEnd = textareaValue.length;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textareaValue]);

  const handleTextareaChange = (event) => {
    const newValue = event.target.value;
    setTextareaValue(newValue);
  };

  const handleTextareaKeyDown = (event) => {};

  const { handleSubmit, control, reset } = useForm();

  const resetValues = () => {
    reset({});
  };

  const handleAddNewFormula = async (values) => {
    try {
      await axios.post(`${apiURL}/campaigns`, {
        ...values,
      });
      toast.success("Create campaign successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new campaign");
    }
    // values, startDate, endDate, content
  };

  return (
    <Fragment>
      <div className="bg-blue-100 rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text2 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo công thức tính điểm mới
          </h1>
        </div>

        <form onSubmit={handleSubmit(handleAddNewFormula)}>
          <FormRow>
            <FormGroup className="bg-white">
              <Label>Tên công thức *</Label>
              <Input
                control={control}
                name="formularname"
                placeholder="Nhập tên công thức"
              ></Input>
            </FormGroup>
          </FormRow>
          <div className="flex justify-center"></div>

          <div className="flex justify-center">
            <Card variant="outlined" className="w-full p-2">
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Từ khóa công thức
              </Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {tagCategories.map((category) => (
                  <Button
                    key={category}
                    variant="outlined"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Button>
                ))}
              </Stack>
            </Card>
          </div>

          <div className="flex justify-center mt-5">
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                listStyle: "none",
                p: 1,
                m: 0,
              }}
              component="ul"
              elevation={3}
              className="w-full min-h-fit"
            >
              {selectedCategory === null && (
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  variant="h7"
                  component="div"
                >
                  Chọn category để hiển thị từ khóa
                </Typography>
              )}
              {selectedCategory &&
                Object.keys(tagData[selectedCategory]).map((label) => (
                  <ListItem key={label}>
                    <Chip
                      label={label}
                      onClick={() => handleChipClick(label)}
                      color={selectedLabel === label ? "primary" : undefined}
                    />
                  </ListItem>
                ))}
            </Paper>
          </div>

          <div className="flex justify-center mt-5">
            <StyledTextarea
              ref={textareaRef}
              minRows={5}
              maxRows={8}
              placeholder="Điền công thức tính"
              value={textareaValue}
              onChange={handleTextareaChange}
              onKeyDown={handleTextareaKeyDown}
              control={control}
            />
          </div>

          <div className="mt-5 text-center">
            <Button variant="contained" color="success">
              Tạo công thức{" "}
            </Button>
          </div>
        </form>
      </div>
      <Gap></Gap>
    </Fragment>
  );
};

export default DefineFormulaPage;

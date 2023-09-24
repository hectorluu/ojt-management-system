import Gap from "views/components/common/Gap";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Typography, Paper, Chip, Stack, Card, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { formulaPath } from "logic/api/apiUrl";
import { formulaNoti } from "logic/constants/notification";
import { Button as ButtonC } from "views/components/button";
import { formulaOptions } from "logic/constants/global";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { formulaValid } from "logic/utils/validateUtils";

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

  const [calculation, setCalculation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [keyList, setKeyList] = useState([]);
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.value);
  };

  const handleChipClick = (key) => {
    setCalculation((prevValue) => prevValue + `(${key.key})`);
  };

  const textareaRef = useRef(null);

  const fetchKeys = async () => {
    try {
      setIsLoading(true);
      let response = await axiosPrivate.get(
        formulaPath.GET_KEY_LIST +
          "?category=" +
          `${selectedCategory === null ? "" : selectedCategory}`
      );
      setKeyList(response.data);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();

      textareaRef.current.value = calculation;
      // Set the caret position to the end of the textarea
      textareaRef.current.selectionStart = calculation.length;
      textareaRef.current.selectionEnd = calculation.length;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculation]);

  const handleTextareaChange = (event) => {
    const newValue = event.target.value;
    setCalculation(newValue);
  };

  const handleTextareaKeyDown = (event) => {};

  const { handleSubmit } = useForm();

  const handleAddNewFormula = async () => {
    setIsLoadingSubmit(true);
    const formula = {
      name: name,
      calculation: calculation,
    };
    const valid = formulaValid(formula);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        await axiosPrivate.post(formulaPath.CREATE_FORMULA, formula);
        toast.success(formulaNoti.SUCCESS.CREATE);
        setIsLoadingSubmit(false);
        navigate("/list-formula");
      } catch (error) {
        setIsLoadingSubmit(false);
        toast.error(error.response.data);
      }
    }
    setIsLoadingSubmit(false);
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
          <FormGroup className="bg-white">
            <Label>
              <span className="font-bold text-xl">Tên công thức *</span>
            </Label>
            <TextField
              error={error?.name ? true : false}
              helperText={error?.name}
              name="name"
              placeholder="Nhập tên công thức"
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => setName(e.target.value)}
              inputProps={{ maxLength: 100 }}
            />
          </FormGroup>
          <div className="flex justify-center"></div>

          <div className="flex justify-center">
            <Card variant="outlined" className="w-full p-2">
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h5"
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
                {formulaOptions?.map((category) => (
                  <LoadingButton
                    key={category.value}
                    component="label"
                    variant={
                      selectedCategory === category.value
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleCategoryClick(category)}
                    loading={
                      selectedCategory === category.value ? isLoading : false
                    }
                  >
                    {category.label}
                  </LoadingButton>
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
              {keyList.length !== 0 ? (
                keyList?.map((key) => (
                  <ListItem key={key.key}>
                    <Chip
                      label={key.name}
                      onClick={() => handleChipClick(key)}
                    />
                  </ListItem>
                ))
              ) : (
                <p>Không có từ khoá nào</p>
              )}
            </Paper>
          </div>
          <div className="flex justify-center mt-5">
            <TextField
              multiline
              error={error?.calculation ? true : false}
              helperText={error?.calculation}
              fullWidth
              InputProps={{
                inputComponent: StyledTextarea,
                inputProps: {
                  minRows: 5,
                  maxLength: 700,
                  maxRows: 8,
                  placeholder: "Điền công thức tính",
                  value: calculation,
                  onChange: handleTextareaChange,
                  onKeyDown: handleTextareaKeyDown,
                  ref: textareaRef,
                },
              }}
            />
          </div>
          <div className="mt-8 text-center">
            <ButtonC
              type="submit"
              className="px-11 mx-auto text-white bg-primary"
              isLoading={isLoadingSubmit}
            >
              Tạo công thức{" "}
            </ButtonC>
          </div>
        </form>
      </div>
      <Gap></Gap>
    </Fragment>
  );
};

export default DefineFormulaPage;

import React, { useEffect, Fragment, useState } from "react";
import { ExcelUtility } from "logic/utils/excelUtils";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { formulaPath, templatePath, universityPath } from "logic/api/apiUrl";
import ExcelUpload from "views/modules/file/ExcelUpload";
import { useForm } from "react-hook-form";
import { isCriteriaOptions, notCriteriaOptions } from "logic/constants/global";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { toast } from "react-toastify";
import { Button } from "views/components/button";
import Gap from "views/components/common/Gap";
import { templateNoti } from "logic/constants/notification";
import { useNavigate } from "react-router-dom";
import Luckysheet from "views/components/Luckysheet/Luckysheet";
import { reportValid } from "logic/utils/validateUtils";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Autocomplete, Stack, TextField } from "@mui/material";



function DefineNewReportPage() {
  const axiosPrivate = useAxiosPrivate();
  const [universityList, setUniversityList] = useState([]);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [universityId, setUniversityId] = useState(0);
  const { handleSubmit } = useForm();
  const [templateHeaders, setTemplateHeaders] = useState([{ name: "", formulaId: undefined, matchedAttribute: "", totalPoint: undefined, isCriteria: false, order: 1 }]);
  const [notCriteriaList, setNotCriteriaList] = useState(notCriteriaOptions);
  const [formulaList, setFormulaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [startCell, setStartCell] = useState("");
  const navigate = useNavigate();


  const openFile = (files) => {
    if (files != null && files.length > 0) {
      ExcelUtility.load(files[0]).then(
        (w) => {
          setFile(files[0]);
          setData(w.sheets);
        },
        (e) => {
          console.error("Workbook Load Error");
        }
      );
    }
  };

  useEffect(() => {
    // const url = "https://firebasestorage.googleapis.com/v0/b/ojt-management-system-8f274.appspot.com/o/reports%2FFile%20danh%20gia%20danh%20sach%20sv%20BKU.xlsx?alt=media&token=d2a90118-f684-4f4b-ba12-ba79c9f11067";
    // ExcelUtility.loadFromUrl(url).then((w) => {
    // });
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (url) {
      handleAddNewTemplate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    const nothing = [{ value: null, label: "Không" }];
    const notCriteria = notCriteriaOptions.slice();
    notCriteria.unshift(...nothing);
    setNotCriteriaList(notCriteria);
    fetchFormulars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFormulars = async () => {
    try {
      const response = await axiosPrivate.get(
        formulaPath.GET_FORMULA_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        100000 +
        "&filterStatus=" +
        2
      );
      setFormulaList(response.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const fetchUniversities = async () => {
    try {
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        100000 +
        "&filterStatus=" +
        2
      );
      setUniversityList(response.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleAddField = () => {
    const newField = {
      name: "",
      formulaId: undefined,
      matchedAttribute: "",
      totalPoint: undefined,
      isCriteria: false,
      order: templateHeaders.length + 1
    };
    setTemplateHeaders([...templateHeaders, newField]);
  };

  const handleRemoveField = (index) => {
    let temp = templateHeaders.slice();
    temp.pop();
    setTemplateHeaders(temp);
  };

  async function uploadFile() {
    if (file) {
      try {
        const reportRef = ref(storage, "reports/" + file.name);
        await uploadBytes(reportRef, file).then(async (snapshot) => {
          setUrl(`reports/${file.name}`);
        });
      } catch (e) {
        setIsLoading(false);
        setUrl("");
        toast.error(e);
      }
    } else {
      setIsLoading(false);
      setUrl("");
      toast.error(templateNoti.ERROR.BLANK_FILE);
    }
  };

  const handleAddNewTemplate = async () => {
    try {
      await axiosPrivate.post(templatePath.CREATE_TEMPLATE, {
        name,
        url,
        startCell,
        universityId,
        templateHeaders,
      });
      setIsLoading(false);
      setUrl("");
      toast.success(templateNoti.SUCCESS.CREATE);
      navigate("/list-template");
    } catch (error) {
      setIsLoading(false);
      setUrl("");
      toast.error(error);
    }
  };

  const onChangeCriteria = (index, name, value) => {
    const newArray = templateHeaders.slice();
    newArray[index][name] = value;
    if (name === "formulaId") {
      newArray[index].matchedAttribute = "Point";
    }
    if (newArray[index].isCriteria === false) {
      newArray[index].formulaId = undefined;
    }
    if (newArray[index].isCriteria === true) {
      newArray[index].matchedAttribute = "Point";
    }
    newArray[index].totalPoint = "";
    setTemplateHeaders(newArray);
  };

  const onChangeCriteriaText = (index, name, value) => {
    const newArray = templateHeaders.slice();
    newArray[index][name] = value;
    setTemplateHeaders(newArray);
  }

  const onClickSubmit = () => {
    setIsLoading(true);
    const template = {
      name: name,
      startCell: startCell,
      universityId: universityId,
      templateHeaders: templateHeaders,
      file: file
    };
    const valid = reportValid(template);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      uploadFile();
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo phiếu đánh giá mới
          </h1>
          <form onSubmit={handleSubmit(onClickSubmit)}>
            <FormGroup>
              <Label>Tên phiếu đánh giá (*)</Label>
              <TextField
                error={error?.name ? true : false}
                helperText={error?.name}
                name="name"
                placeholder="Ex: Phiếu đánh giá thực tập sinh"
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => setName(e.target.value)}
                inputProps={{ maxLength: 100 }} />
            </FormGroup>
            <FormGroup>
              <Label>Tên trường (*)</Label>
              <Autocomplete
                disablePortal={false}
                options={universityList}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} placeholder="Chọn trường đại học"
                  error={error?.universityId ? true : false} helperText={error?.universityId} />}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setUniversityId(newValue.id);
                  } else {
                    setUniversityId("");
                  }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tệp đánh giá (*) (.xlsx)</Label>
              <ExcelUpload
                openFile={openFile}
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Label>Ô bắt đầu dữ liệu</Label>
                <TextField
                  error={error?.startCell ? true : false}
                  helperText={error?.startCell}
                  name="startCell"
                  placeholder="Ex: ABZ12"
                  onChange={(e) => setStartCell(e.target.value)}
                  onBlur={(e) => setStartCell(e.target.value)}
                  inputProps={{ maxLength: 5 }} />
              </FormGroup>
            </FormRow>
            {templateHeaders.map((header, index) => (
              <div key={index}>
                <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
                <FormRow>
                  <FormGroup>
                    <Label>Tên cột(*)</Label>
                    <TextField
                      error={error?.templateHeaders?.[index]?.name ? true : false}
                      helperText={error?.templateHeaders?.[index]?.name}
                      name="name"
                      placeholder="Ex: MSSV"
                      onChange={(e) => onChangeCriteriaText(index, "name", e.target.value)}
                      onBlur={(e) => onChangeCriteriaText(index, "name", e.target.value)}
                      inputProps={{ maxLength: 100 }} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Tiêu chí hệ thống</Label>
                    {header.isCriteria ? (
                      <Autocomplete
                        disablePortal={false}
                        options={formulaList}
                        getOptionLabel={(option) => option.name || ""}
                        renderInput={(params) => <TextField {...params} placeholder="Lựa chọn" />}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            onChangeCriteria(index, "formulaId", newValue.id);
                          } else {
                            onChangeCriteria(index, "formulaId", "");
                          }
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                      />
                    ) : (
                      <Autocomplete
                        disablePortal={false}
                        options={notCriteriaList}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => <TextField {...params} placeholder="Lựa chọn" />}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            onChangeCriteria(index, "matchedAttribute", newValue.value);
                          } else {
                            onChangeCriteria(index, "matchedAttribute", "");
                          }
                        }}
                      />
                    )}
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <Label>Tiêu chí đánh giá (*)</Label>
                    <Autocomplete
                      disablePortal={false}
                      options={isCriteriaOptions}
                      renderInput={(params) => <TextField {...params} placeholder="Lựa chọn" />}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          onChangeCriteria(index, "isCriteria", newValue.value);
                        } else {
                          onChangeCriteria(index, "isCriteria", "");
                        }
                      }}
                    />
                  </FormGroup>
                  {header.isCriteria ? (
                    <FormGroup>
                      <Label>Điểm tối đa(*)</Label>
                      <TextField
                        error={error?.templateHeaders?.[index]?.totalPoint ? true : false}
                        helperText={error?.templateHeaders?.[index]?.totalPoint}
                        type="number"
                        name="totalPoint"
                        placeholder="Ex: 30"
                        InputProps={{
                          inputProps: {
                            min: 0
                          }
                        }}
                        onChange={(e) => onChangeCriteriaText(index, "totalPoint", e.target.value)}
                        onBlur={(e) => onChangeCriteriaText(index, "totalPoint", e.target.value)} />
                    </FormGroup>
                  ) : null}
                </FormRow>
              </div>
            ))}
            <Stack direction="row" spacing={1} justifyContent="center">
              <IconButton color="error" aria-label="delete" onClick={() => handleRemoveField()}>
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" aria-label="delete" onClick={() => handleAddField()}>
                <AddIcon />
              </IconButton>
            </Stack>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-20 mx-auto text-white bg-primary"
                isLoading={isLoading}
              >
                Tạo
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Gap></Gap>
      {data.length > 0 ?
        <Luckysheet data={data} />
        : null}
    </Fragment >
  );
}

export default DefineNewReportPage;

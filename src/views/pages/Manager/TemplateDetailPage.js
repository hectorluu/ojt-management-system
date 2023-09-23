import React, { useEffect, Fragment, useState } from "react";
import { ExcelUtility } from "logic/utils/excelUtils";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { formulaPath, templatePath } from "logic/api/apiUrl";
import ExcelUpload from "views/modules/file/ExcelUpload";
import { useForm } from "react-hook-form";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { toast } from "react-toastify";
import { Button } from "views/components/button";
import Gap from "views/components/common/Gap";
import { templateNoti } from "logic/constants/notification";
import { useNavigate, useParams } from "react-router-dom";
import Luckysheet from "views/components/Luckysheet/Luckysheet";
import { reportValid, templateHeaderValid } from "logic/utils/validateUtils";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Chip, Grid, Skeleton, Stack, TextField, Tooltip } from "@mui/material";
import SubCard from "views/components/cards/SubCard";
import ModalAddTemplateHeader from "views/components/modal/ModalAddTemplateHeader";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

function TemplateDetailPage() {
  const { templateId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [universityId, setUniversityId] = useState(0);
  const { handleSubmit } = useForm();
  const [templateHeaders, setTemplateHeaders] = useState([{ name: "", formulaId: undefined, matchedAttribute: "", totalPoint: undefined, isCriteria: false, order: 1 }]);
  const [formulaList, setFormulaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingLoading, setIsFetchingLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [startCell, setStartCell] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [isAddTemplateHeaderModalOpen, setIsAddTemplateHeaderModalOpen] = useState(false);
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
    const url = "https://firebasestorage.googleapis.com/v0/b/ojt-management-system-8f274.appspot.com/o/reports%2FFile%20danh%20gia%20danh%20sach%20sv%20BKU.xlsx?alt=media&token=c7f588f6-9ea3-421a-b649-64d794d944cf";
    ExcelUtility.loadFromUrl(url).then((w) => {
      setData(w.sheets);
    },
      (e) => {
        console.error("Workbook Load Error");
      }
    );
    console.log(templateId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newUrl) {
      handleUpdateTemplate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUrl]);

  useEffect(() => {

    console.log(templateHeaders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateHeaders]);

  useEffect(() => {
    fetchFormulars();
    fetchTemplateDetail();
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
      console.log("fetchFormula ~ success", response);
    } catch (error) {
      console.log("fetchFormula ~ error", error);
    }
  };

  const fetchTemplateDetail = async () => {
    try {
      setIsFetchingLoading(true);
      const response = await axiosPrivate.get(
        templatePath.GET_TEMPLATE_DETAIL + templateId
      );
      console.log(response.data);
      setName(response.data.name);
      setStartCell(response.data.startCell);
      setUniversityId(response.data.universityId);
      setUrl(response.data.url);
      setTemplateHeaders(response.data.templateHeaders);
      setUniversityName(response.data.universityName);
      setIsFetchingLoading(false);
      console.log("fetchFormula ~ success", response);
    } catch (error) {
      console.log("fetchFormula ~ error", error);
      setIsFetchingLoading(false);
    }
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
        setNewUrl("");
        toast.error(e);
      }
    } else {
      setIsLoading(false);
      setNewUrl("");
      toast.error(templateNoti.ERROR.BLANK_FILE);
    }
  };

  const handleUpdateTemplate = async () => {
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

  const handleAddNewTemplateHeader = async (values) => {
    const valid = templateHeaderValid(values);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        setIsSubmitLoading(true);
        await axiosPrivate.post(templatePath.ADD_TEMPLATE_HEADER + templateId, {
          name: values.name,
          totalPoint: values.totalPoint,
          matchedAttribute: values.matchedAttribute,
          isCriteria: values.isCriteria,
          formulaId: values.formulaId,
          order: templateHeaders?.[templateHeaders.length - 1]?.order + 1
        });
        fetchTemplateDetail();
        setIsSubmitLoading(false);
        setIsAddTemplateHeaderModalOpen(false);
        toast.success(templateNoti.SUCCESS.CREATE);
      } catch (error) {
        setIsSubmitLoading(false);
        toast.error(error.response.data);
      }
    }
    setIsSubmitLoading(false);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Chỉnh sửa phiếu đánh giá
          </h1>
          <ModalAddTemplateHeader
            isOpen={isAddTemplateHeaderModalOpen}
            onRequestClose={() => setIsAddTemplateHeaderModalOpen(false)}
            isLoading={isSubmitLoading}
            handleAddNewTemplateHeader={handleAddNewTemplateHeader}
            error={error}
          />

          <form onSubmit={handleSubmit(onClickSubmit)}>
            <FormGroup>
              <Label>Tên phiếu đánh giá (*)</Label>
              {isFetchingLoading ? (
                <Skeleton height={70} animation="wave" />
              ) : (
                <TextField
                  value={name}
                  error={error?.name ? true : false}
                  helperText={error?.name}
                  name="name"
                  placeholder="Ex: Phiếu đánh giá thực tập sinh"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)}
                  inputProps={{ maxLength: 100 }} />)}
            </FormGroup>
            <FormGroup>
              <Label>Tên trường (*)</Label>
              {isFetchingLoading ? (
                <Skeleton height={70} animation="wave" />
              ) : (
                <TextField
                  value={universityName}
                  name="universityName"
                  placeholder="Ex: Tên trường"
                  inputProps={{
                    readOnly: true,
                  }} />)}
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
                {isFetchingLoading ? (
                  <Skeleton height={70} animation="wave" />
                ) : (
                  <TextField
                    value={startCell}
                    error={error?.startCell ? true : false}
                    helperText={error?.startCell}
                    name="startCell"
                    placeholder="Ex: ABZ12"
                    onChange={(e) => setStartCell(e.target.value)}
                    onBlur={(e) => setStartCell(e.target.value)}
                    inputProps={{ maxLength: 5 }} />)}
              </FormGroup>
            </FormRow>
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            <SubCard sx={{ maxHeight: "400px", overflowY: "auto" }}>
              <Grid container spacing={2}>
                {templateHeaders.map((header, index) => (
                  <Grid item key={index}>
                    <Tooltip
                      title={
                        `${(header.matchedAttribute === "Point" ? (formulaList.find((item) => item.id === header.formulaId) ? "Tiêu chí hệ thống: " + formulaList.find((item) => item.id === header.formulaId).name : "") : ("Tiêu chí hệ thống: " + header.matchedAttribute))} ${header.totalPoint ? "Điểm tối đa: " + header.totalPoint : ""}`
                      }
                      placement="top"
                      className="w-fit whitespace-pre-line"
                      key={index}
                      sx={{ mb: 0.5 }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        {header.status === 2 ?
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => console.log("click")}
                          >
                            <DeleteIcon fontSize="inherit" color="error"/>
                          </IconButton> :
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => console.log("click")}
                          >
                            <ToggleOnIcon fontSize="inherit" color="success"/>
                          </IconButton>}

                        <Chip
                          key={index}
                          variant="contained"
                          sx={{ p: 1 }}
                          label={(index + 1) + ") " + header.name}
                        ></Chip>
                      </Stack>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton color="primary" aria-label="delete" onClick={() => setIsAddTemplateHeaderModalOpen(true)}>
                  <AddIcon />
                </IconButton>
              </Stack>
            </SubCard>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-20 mx-auto text-white bg-primary"
                isLoading={isLoading}
              >
                Chỉnh sửa
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Gap></Gap>
      {data.length > 0 ?
        < Luckysheet data={data} />
        : null}
    </Fragment >
  );
}

export default TemplateDetailPage;

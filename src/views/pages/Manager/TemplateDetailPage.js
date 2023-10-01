import React, { useEffect, Fragment, useState } from "react";
import { ExcelUtility } from "logic/utils/excelUtils";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { formulaPath, templatePath } from "logic/api/apiUrl";
import ExcelUpload from "views/modules/file/ExcelUpload";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { toast } from "react-toastify";
import { Button } from "views/components/button";
import Gap from "views/components/common/Gap";
import { generalNoti, templateNoti } from "logic/constants/notification";
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
import ModalEditTemplateHeader from "views/components/modal/ModalEditTemplateHeader";

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
  const [status, setStatus] = useState(0);
  const [isAddTemplateHeaderModalOpen, setIsAddTemplateHeaderModalOpen] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState({});
  const [isEditTemplateHeaderModalOpen, setIsEditTemplateHeaderModalOpen] = useState(false);
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
    setIsFetchingLoading(true);
    if (url) {
      getDownloadURL(ref(storage, url))
        .then(async (path) => {
          ExcelUtility.loadFromUrl(path).then((w) => {
            setData(w.sheets);
          },
            (e) => {
              console.error("Workbook Load Error");
            }
          );
        })
        .catch((error) => {
          toast.error(generalNoti.ERROR.SERVER_ERROR);
        });
    }
    setIsFetchingLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (newUrl) {
      handleUpdateTemplate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUrl]);

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
    } catch (error) {
      toast.error(generalNoti.ERROR.SERVER_ERROR);
    }
  };

  const fetchTemplateDetail = async () => {
    try {
      setIsFetchingLoading(true);
      const response = await axiosPrivate.get(
        templatePath.GET_TEMPLATE_DETAIL + templateId
      );
      setName(response.data.name);
      setStartCell(response.data.startCell);
      setUniversityId(response.data.universityId);
      setUrl(response.data.url);
      setStatus(response?.data?.status);
      setTemplateHeaders(response.data.templateHeaders);
      setUniversityName(response.data.universityName);
      setIsFetchingLoading(false);
    } catch (error) {
      setIsFetchingLoading(false);
    }
  };

  async function uploadFile() {
    if (file) {
      try {
        const reportRef = ref(storage, "reports/" + file.name);
        await uploadBytes(reportRef, file).then(async (snapshot) => {
          setNewUrl(`reports/${file.name}`);
        });
      } catch (e) {
        setIsLoading(false);
        setNewUrl("");
        toast.error(generalNoti.ERROR.UPLOAD_FAIL);
      }
    } else {
      setIsLoading(false);
      setNewUrl(url);
    }
  };

  const handleUpdateTemplate = async () => {
    try {
      await axiosPrivate.post(templatePath.UPDATE_TEMPLATE + templateId, {
        name: name,
        url: newUrl,
        startCell: startCell,
        universityId: universityId,
        status: status,
      });
      setIsLoading(false);
      setUrl("");
      toast.success(templateNoti.SUCCESS.CREATE);
      navigate("/list-template");
    } catch (error) {
      setIsLoading(false);
      setUrl("");
      toast.error(error?.response?.data);
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

    let check = false;

    for (const key in valid) {
      if (key !== "templateHeaders" && valid[key] !== "") {
        check = true;
        break; // If any non-empty value is found, exit the loop
      } else if (key === "templateHeaders" && Array.isArray(valid[key])) {
        for (const item of valid[key]) {
          for (const itemKey in item) {
            if (item[itemKey] !== "") {
              check = true;
              break; // If any non-empty value is found, exit the loop
            }
          }
          if (check) {
            break; // If any non-empty value is found, exit the loop
          }
        }
      }
    }
    if (!check) {
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
        toast.success(templateNoti.SUCCESS.UPDATE);
      } catch (error) {
        setIsSubmitLoading(false);
        toast.error(error?.response?.data);
      }
    }
    setIsSubmitLoading(false);
  };

  const handleUpdateTemplateHeader = async (values) => {
    const valid = templateHeaderValid(values);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        setIsSubmitLoading(true);
        await axiosPrivate.put(templatePath.UPDATE_TEMPLATE_HEADER + selectedHeader.id, {
          name: values.name,
          totalPoint: values.totalPoint,
          matchedAttribute: values.matchedAttribute,
          isCriteria: values.isCriteria,
          formulaId: values.formulaId,
        });
        fetchTemplateDetail();
        setIsSubmitLoading(false);
        setIsEditTemplateHeaderModalOpen(false);
        toast.success(templateNoti.SUCCESS.UPDATE);
      } catch (error) {
        setIsSubmitLoading(false);
        toast.error(error?.response?.data);
      }
    }
    setIsSubmitLoading(false);
  };

  const handleDisableHeader = async (headerId) => {
    try {
      setIsFetchingLoading(true);
      const response = await axiosPrivate.put(templatePath.DISABLE_HEADER + headerId);
      toast.success(response.data);
      fetchTemplateDetail();
      setIsFetchingLoading(false);
    } catch (error) {
      toast.error(error?.response?.data);
      setIsFetchingLoading(false);
    };
  };
  const handleActiveHeader = async (headerId) => {
    try {
      setIsFetchingLoading(true);
      const response = await axiosPrivate.put(templatePath.ACTIVE_HEADER + headerId);
      toast.success(response.data);
      fetchTemplateDetail();
      setIsFetchingLoading(false);
    } catch (error) {
      toast.error(error?.response?.data);
      setIsFetchingLoading(false);
    };
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Chỉnh sửa phiếu đánh giá
          </h1>
          {isAddTemplateHeaderModalOpen ?
            <ModalAddTemplateHeader
              onRequestClose={() => setIsAddTemplateHeaderModalOpen(false)}
              isLoading={isSubmitLoading}
              handleAddNewTemplateHeader={handleAddNewTemplateHeader}
              error={error}
            />
            : null}
          {isEditTemplateHeaderModalOpen ?
            <ModalEditTemplateHeader
              header={selectedHeader}
              onRequestClose={() => setIsEditTemplateHeaderModalOpen(false)}
              isLoading={isSubmitLoading}
              handleUpdateTemplateHeader={handleUpdateTemplateHeader}
              error={error}
            />
            : null}
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
                            onClick={() => handleDisableHeader(header.id)}
                          >
                            <DeleteIcon fontSize="inherit" color="error" />
                          </IconButton> :
                          <IconButton
                            aria-label="active"
                            size="small"
                            onClick={() => handleActiveHeader(header.id)}
                          >
                            <ToggleOnIcon fontSize="inherit" color="success" />
                          </IconButton>}

                        <Chip
                          key={index}
                          variant="contained"
                          sx={{ p: 1 }}
                          label={(index + 1) + ") " + header.name}
                          onClick={() => {
                            setSelectedHeader(header);
                            setIsEditTemplateHeaderModalOpen(true);
                          }}
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

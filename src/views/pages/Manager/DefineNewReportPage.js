import React, { useRef, useEffect, Fragment, useState } from "react";
import { IgrExcelXlsxModule } from "igniteui-react-excel";
import { IgrExcelCoreModule } from "igniteui-react-excel";
import { IgrExcelModule } from "igniteui-react-excel";
import { IgrSpreadsheetModule } from "igniteui-react-spreadsheet";
import { IgrSpreadsheet } from "igniteui-react-spreadsheet";
import { ExcelUtility } from "logic/utils/excelUtils";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { Dropdown } from "views/components/dropdown";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { templatePath, universityPath } from "logic/api/apiUrl";
import ExcelUpload from "views/modules/file/ExcelUpload";
import { Input } from "views/components/input";
import { useForm } from "react-hook-form";
import { isCriteriaOptions, notCriteriaOptions } from "logic/constants/global";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { toast } from "react-toastify";
import { Button } from "views/components/button";
import Gap from "views/components/common/Gap";

IgrExcelCoreModule.register();
IgrExcelModule.register();
IgrExcelXlsxModule.register();
IgrSpreadsheetModule.register();


function DefineNewReportPage() {
  const axiosPrivate = useAxiosPrivate();
  const spreadsheetRef = useRef(null);
  const [universityList, setUniversityList] = useState([]);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [universityId, setUniversityId] = useState(0);
  const { handleSubmit, control, getValues } = useForm();
  const [templateHeaders, setTemplateHeaders] = useState([{ name: "", formulaId: "", matchedAttribute: "", totalPoint: "", isCriteria: false, order: 1 }]);
  const [notCriteriaList, setNotCriteriaList] = useState(notCriteriaOptions);


  const openFile = (files) => {
    if (files != null && files.length > 0) {
      ExcelUtility.load(files[0]).then(
        (w) => {
          setFile(files[0]);
          spreadsheetRef.current.workbook = w;
        },
        (e) => {
          console.error("Workbook Load Error");
        }
      );
    }
  };

  useEffect(() => {
    // const url = "https://firebasestorage.googleapis.com/v0/b/ojt-management-system-8f274.appspot.com/o/reports%2FFile%20danh%20gia%20danh%20sach%20sv%20BKU.xlsx?alt=media&token=82ffa24d-5428-4e42-b0fb-dc3027957781";
    // ExcelUtility.loadFromUrl(url).then((w) => {
    //   if (spreadsheetRef.current) {
    //     spreadsheetRef.current.workbook = w;
    //   }
    // });
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (url) {
  //     handleAddNewTemplate(getValues());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [url]);

  useEffect(() => {
    console.log(templateHeaders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateHeaders]);

  useEffect(() => {
    const nothing = [{ value: "", label: "Không" }];
    const notCriteria = notCriteriaOptions.slice();
    notCriteria.unshift(...nothing);
    setNotCriteriaList(notCriteria);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApiDropdownLabel = (value, options = [{ value: "", label: "" }], defaultValue = "") => {
    const label = options.find((label) => label.id === value);
    return label ? label.name : defaultValue;
  };

  const fetchUniversities = async () => {
    try {
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY_LIST +
        "?id=" +
        universityId
      );
      setUniversityList(response.data.data);
      console.log("fetchUniversities ~ success", response);
    } catch (error) {
      console.log("fetchUniversities ~ error", error);
    }
  };

  const handleAddField = () => {
    const newField = {
      name: "",
      formulaId: "",
      matchedAttribute: "",
      totalPoint: "",
      isCriteria: false,
      order: templateHeaders.length + 1
    };
    setTemplateHeaders([...templateHeaders, newField]);
  };

  const handleRemoveField = (index) => {
    let temp = templateHeaders.slice();
    temp.splice(index, 1);
    for (let i = 0; i < temp.length; i++) {
      temp[i].order = i + 1;
    }
    setTemplateHeaders(temp);
  };

  const getIsCriteriaDropdownLabel = (
    index,
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const fields = templateHeaders.slice();
    const value = fields[index][name];
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  async function uploadFile() {
    if (file) {
      try {
        const reportRef = ref(storage, "reports/" + file.name);
        await uploadBytes(reportRef, file).then(async (snapshot) => {
          setUrl(`reports/${file.name}`);
        });
      } catch (e) {
        toast.error(e);
      }
    } else {
      toast.error("File cannot be null");
    }
  };

  const handleAddNewTemplate = async (values) => {
    try {
      await axiosPrivate.post(templatePath.CREATE_TEMPLATE, {
        ...values,
        universityId,
        templateHeaders,
        url,
      });
      // toast.success(courseNoti.SUCCESS.CREATE);
    } catch (error) {
      toast.error(error);
    }
  };

  const getCriteriaDropdownLabel = (
    index,
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const criteria = templateHeaders.slice();
    const value = criteria[index][name] !== undefined ? criteria[index][name] : defaultValue;
    const label = options.find((label) => label.value === value);
    return label !== undefined ? label.label : defaultValue;
  };

  const onChangeCriteria = (index, name, value) => {
    const newArray = templateHeaders.slice();
    newArray[index][name] = value;
    newArray[index].totalPoint = "";
    setTemplateHeaders(newArray);
  };

  const onTest = () => {
    console.log(getValues());
    const newArray = templateHeaders.slice();
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].name = getValues(`headerName${i}`);
      newArray[i].totalPoint = getValues(`maxPoint${i}`);
    }
    setTemplateHeaders(newArray);
    console.log(templateHeaders);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo phiếu đánh giá mới
          </h1>
          <form onSubmit={handleSubmit(onTest)}>
            <FormGroup>
              <Label>Tên phiếu đánh giá (*)</Label>
              <Input
                control={control}
                name="name"
                placeholder="Ex: Phiếu đánh giá thực tập sinh"
                autoComplete="off"
              />
            </FormGroup>
            <FormGroup>
              <Label>Tên trường (*)</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={getApiDropdownLabel(
                    universityId,
                    universityList,
                    "Chọn trường đại học"
                  )}
                ></Dropdown.Select>
                <Dropdown.List>
                  {universityList.map((university) => (
                    <Dropdown.Option
                      key={university.id}
                      onClick={() =>
                        setUniversityId(
                          university.id
                        )
                      }
                    >
                      <span className="capitalize">{university.name}</span>
                    </Dropdown.Option>
                  ))}
                </Dropdown.List>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label>Tệp đánh giá (*) (.xlsx, .xls)</Label>
              <ExcelUpload
                openFile={openFile}
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Label>Ô bắt đầu dữ liệu</Label>
                <Input
                  control={control}
                  name="startCell"
                  placeholder="Ex: ABZ12"
                  autoComplete="off"
                />
              </FormGroup>
            </FormRow>
            {templateHeaders.map((header, index) => (
              <div key={index}>
                <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
                <FormRow>
                  <FormGroup>
                    <Label>Tên cột(*)</Label>
                    <Input
                      control={control}
                      name={`headerName${index}`}
                      placeholder="Ex: MSSV"
                      autoComplete="off"
                      onChange={(e) => console.log("onchange here")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Tiêu chí hệ thống</Label>
                    {header.isCriteria ? (
                      <Dropdown>
                        <Dropdown.Select
                        // placeholder={getLevelDropdownLabel(index, "initLevel", skillLevel, "Lựa chọn")}
                        ></Dropdown.Select>
                        <Dropdown.List>
                          {/* {skillLevel.map((option) => (
                      <Dropdown.Option
                        key={option.value}
                        onClick={() =>
                          onChangeUserSkill(index, "initLevel", option.value)
                        }
                      >
                        <span className="capitalize">{option.label}</span>
                      </Dropdown.Option>
                    ))} */}
                        </Dropdown.List>
                      </Dropdown>
                    ) : (
                      <Dropdown>
                        <Dropdown.Select
                          placeholder={getCriteriaDropdownLabel(index, "matchedAttribute", notCriteriaList, "Lựa chọn")}
                        ></Dropdown.Select>
                        <Dropdown.List>
                          {notCriteriaList.map((option) => (
                            <Dropdown.Option
                              key={option.value}
                              onClick={() =>
                                onChangeCriteria(index, "matchedAttribute", option.value)
                              }
                            >
                              <span className="capitalize">{option.label}</span>
                            </Dropdown.Option>
                          ))}
                        </Dropdown.List>
                      </Dropdown>
                    )}
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <Label>Tiêu chí đánh giá (*)</Label>
                    <Dropdown>
                      <Dropdown.Select
                        placeholder={getIsCriteriaDropdownLabel(index, "isCriteria", isCriteriaOptions, "Lựa chọn")}
                      ></Dropdown.Select>
                      <Dropdown.List>
                        {isCriteriaOptions.map((option) => (
                          <Dropdown.Option
                            key={option.value}
                            onClick={() =>
                              onChangeCriteria(index, "isCriteria", option.value)
                            }
                          >
                            <span className="capitalize">{option.label}</span>
                          </Dropdown.Option>
                        ))}
                      </Dropdown.List>
                    </Dropdown>
                  </FormGroup>
                  {header.isCriteria ? (
                    <FormGroup>
                      <Label>Điểm tối đa(*)</Label>
                      <Input
                        control={control}
                        name={`maxPoint${index} `}
                        placeholder="Ex: 30"
                        autoComplete="off"
                        type="number"
                        min="0"
                      />
                    </FormGroup>
                  ) : null}
                </FormRow>
                <button type="button" onClick={() => handleRemoveField(index)}>
                  xoá
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddField()}>
              Thêm
            </button>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Tạo
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Gap></Gap>
      <IgrSpreadsheet
        ref={spreadsheetRef}
        height="100vh"
        width="100%" />
    </Fragment >
  );
}

export default DefineNewReportPage;

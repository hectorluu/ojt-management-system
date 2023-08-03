import React, { useRef, useEffect, Fragment, useState } from "react";
import { IgrExcelXlsxModule } from "igniteui-react-excel";
import { IgrExcelCoreModule } from "igniteui-react-excel";
import { IgrExcelModule } from "igniteui-react-excel";
import { IgrSpreadsheetModule } from "igniteui-react-spreadsheet";
import { IgrSpreadsheet } from "igniteui-react-spreadsheet";
import { ExcelUtility } from "../../utils/excelUtils";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Dropdown } from "components/dropdown";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { universityPath } from "api/apiUrl";
import ExcelUpload from "modules/file/ExcelUpload";
import { Input } from "postcss";
import { useForm } from "react-hook-form";

IgrExcelCoreModule.register();
IgrExcelModule.register();
IgrExcelXlsxModule.register();
IgrSpreadsheetModule.register();


function DefineNewReportPage() {
  const axiosPrivate = useAxiosPrivate();
  const spreadsheetRef = useRef(null);
  const [universityList, setUniversityList] = useState([]);
  const [universityId, setUniversityId] = useState(0);
  const { handleSubmit, control, setValue, reset, watch } = useForm();

  const openFile = (files) => {
    if (files != null && files.length > 0) {
      ExcelUtility.load(files[0]).then(
        (w) => {
          spreadsheetRef.current.workbook = w;
        },
        (e) => {
          console.error("Workbook Load Error");
        }
      );
    }
  };

  useEffect(() => {
    const url = "https://firebasestorage.googleapis.com/v0/b/ojt-management-system-8f274.appspot.com/o/report%2FFile%20danh%20gia%20danh%20sach%20sv%20BKU.xlsx?alt=media&token=cd63b237-850e-4da3-a18f-7394f25e78fd";
    ExcelUtility.loadFromUrl(url).then((w) => {
      spreadsheetRef.current.workbook = w;
    });
    fetchUniversities();
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

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo phiếu đánh giá mới
          </h1>
          <form onSubmit={console.log("aadsads")}>
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
                  name="cellIndex"
                  placeholder="Ex: ABZ12"
                  autoComplete="off"
                ></Input>
              </FormGroup>
            </FormRow>
          </form>
        </div>
      </div>
      <IgrSpreadsheet
        ref={spreadsheetRef}
        height="100vh"
        width="100%" />
    </Fragment >
  );
}

export default DefineNewReportPage;
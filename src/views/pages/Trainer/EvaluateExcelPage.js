import React, { Fragment, useState } from 'react';
import { DataGrid, GridEditInputCell } from '@mui/x-data-grid';
import { useEffect } from 'react';
import useAxiosPrivate from 'logic/hooks/useAxiosPrivate';
import { criteriaPath, templatePath } from 'logic/api/apiUrl';
import { processResponseData } from 'logic/utils/evaluationUtils';

const EvaluateExcelPage = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    console.log(data);
    console.log("header", headers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    fetchPoints();
    fetchHeaders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPoints = async () => {
    try {
      let response = await axiosPrivate.get(
        criteriaPath.GET_STUDENT_PONIT_LIST +
        "/1"
      );
      const point = processResponseData(response.data);
      setData(point);
    } catch (error) {
      console.log("fetchPoints ~ error", error);
    }
  };

  const fetchHeaders = async () => {
    try {
      let response = await axiosPrivate.get(
        templatePath.GET_TEMPLATE_HEADER +
        "/1"
      );
      let columns = [
        {
          id: "firstName",
          field: "firstName",
          headerName: "Họ",
          type: "string",
          editable: false,
          align: "left",
          headerAlign: "left",
        },
        {
          id: "lastName",
          field: "lastName",
          headerName: 'Tên',
          type: 'string',
          editable: false,
          align: 'left',
          headerAlign: 'left',
        },
        {
          id: "rollNumber",
          field: "rollNumber",
          headerName: 'MSNV',
          type: 'string',
          editable: false,
          align: 'left',
          headerAlign: 'left',
        },
      ];
      for (const item of response.data) {
        const column = {
          id: item.teamplateHeaderId,
          field: `${item.teamplateHeaderId}`,
          headerName: item.name,
          type: 'number',
          editable: true,
          align: 'left',
          headerAlign: 'left',
          renderEditCell: (params) => (
            <GridEditInputCell
              {...params}
              inputProps={{
                max: item.maxPoint,
                min: 0,
              }}
            />
          ),
        };
        columns = [...columns, column];
      }
      setHeaders(columns);
      setTimeout(() => { });
    } catch (error) {
      console.log("fetchHeaders ~ error", error);
    }
  };

  const onStopEdit = (newr, old) => {
    console.log("old", old);
    console.log("newr", newr);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Đánh giá sinh viên sau khoá đào tạo
          </h1>
          {data.length !== 0 ? (
            <DataGrid
              rows={data}
              columns={headers}
              disableColumnSelector={true}
              disableDensitySelector={true}
              disableRowSelectionOnClick={true}
              processRowUpdate={onStopEdit}
            />
          ) : null}

        </div>
      </div>
    </Fragment>
  );
};

export default EvaluateExcelPage;
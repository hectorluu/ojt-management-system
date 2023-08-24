import React, { Fragment, useState } from 'react';
import { DataGrid, GridEditInputCell } from '@mui/x-data-grid';
import { useEffect } from 'react';
import useAxiosPrivate from 'logic/hooks/useAxiosPrivate';
import { criteriaPath, templatePath } from 'logic/api/apiUrl';
import { processRequestData, processResponseData } from 'logic/utils/evaluationUtils';
import { StyledBox } from 'views/components/common/StyledBox';
import Button from 'views/components/button/Button';
import Heading from 'views/components/common/Heading';
import { toast } from 'react-toastify';
import { criteraNoti } from 'logic/constants/notification';

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
          flex: 0.15,
        },
        {
          id: "lastName",
          field: "lastName",
          headerName: 'Tên',
          type: 'string',
          editable: false,
          align: 'left',
          headerAlign: 'left',
          flex: 0.15,
        },
        {
          id: "rollNumber",
          field: "rollNumber",
          headerName: 'MSNV',
          type: 'string',
          editable: false,
          align: 'left',
          headerAlign: 'left',
          flex: 0.1,
        },
      ];
      for (const item of response.data) {
        const column = {
          id: item.teamplateHeaderId,
          field: `${item.teamplateHeaderId}`,
          headerName: `${item.name}(${item.maxPoint})`,
          type: 'number',
          editable: true,
          align: 'left',
          headerAlign: 'left',
          flex: 0.1,
          renderEditCell: (params) => (
            <GridEditInputCell
              {...params}
              inputProps={{
                max: item.maxPoint,
                min: 0,
              }}
            />
          ),
          preProcessEditCellProps: (params) => {
            const hasError = params.props.value > item.maxPoint || params.props.value < 0 || params.props.value === null || params.props.value === undefined;
            return { ...params.props, error: hasError };
          },
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
    if (newr.hasError) {
      return newr;
    }
    setData(data.map((row) => (row.id === newr.id ? newr : row)));
    return newr;
  };

  const onClickSubmit = () => {
    const containsNullOrUndefined = data.some(item => {
      return Object.values(item).some(value => value === null || value === undefined);
    });
    if (containsNullOrUndefined) {
      toast.error(criteraNoti.ERROR.POINT_ERROR);
      return;
    };
    const req = processRequestData(data);
    console.log("req", req);
    handleEvaluate(req);
  };

  const handleEvaluate = async (data) => {
    try {
      await axiosPrivate.post(criteriaPath.EVALUATE_STUDENT, data);
      toast.success(criteraNoti.SUCCESS.CREATE);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center">
          <Heading className="text-[2.25rem] font-bold pt-6">
            Đánh giá sinh viên sau khoá đào tạo
          </Heading>
        </div>
        <Button
          className="px-7 float-right"
          type="button"
          kind="secondary"
          onClick={onClickSubmit}
        >
          Nộp điểm
        </Button>
      </div>
      <div className="flex flex-wrap items-start">
        {data.length !== 0 ? (
          <StyledBox>
            <DataGrid
              labelRowsPerPage="Số dòng"
              rows={data}
              columns={headers}
              disableColumnSelector={true}
              disableDensitySelector={true}
              disableRowSelectionOnClick={true}
              processRowUpdate={onStopEdit}
              onProcessRowUpdateError={(error) => {
                console.log("error", error);
              }}
              componentsProps={{
                pagination: {
                  labelRowsPerPage: "Số dòng",
                  defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`; }
                }
              }}
            />
          </StyledBox>
        ) : null}
      </div>
    </Fragment>
  );
};

export default EvaluateExcelPage;
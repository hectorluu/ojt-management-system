import { useEffect, useState } from "react";
import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import { Autocomplete, Box, Modal, Skeleton, TextField } from "@mui/material";
import FormRow from "../common/FormRow";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { formulaPath } from "logic/api/apiUrl";
import { isCriteriaOptions, notCriteriaOptions } from "logic/constants/global";
import { toast } from "react-toastify";

const ModalEditTemplateHeader = ({
  header,
  onRequestClose,
  handleUpdateTemplateHeader,
  isLoading,
  error,
}) => {
  const { handleSubmit } = useForm();
  const [name, setName] = useState(header?.name);
  const [formula, setFormula] = useState(undefined);
  const [matchedAttribute, setMatchedAttribute] = useState(notCriteriaOptions.find((item) => item.value === header.matchedAttribute) || { value: null, label: "Không" });
  const [totalPoint, setTotalpoint] = useState(header?.totalPoint);
  const [isCriteria, setIsCriteria] = useState(header.isCriteria ? isCriteriaOptions[0] : isCriteriaOptions[1]);
  const [formulaList, setFormulaList] = useState([{ id: 0, name: "Lựa chọn" }]);
  const axiosPrivate = useAxiosPrivate();
  const [isFetchingLoading, setIsFetchingLoading] = useState(true);
  const [notCriteriaList, setNotCriteriaList] = useState(notCriteriaOptions);

  useEffect(() => {
    if (formulaList && notCriteriaList) {
      setIsFetchingLoading(false);
    }
  }, [formulaList, notCriteriaList])

  useEffect(() => {
    fetchFormulars();
    console.log(isCriteria);
    if (isCriteria.value === false) {
      setFormula(undefined);
      setMatchedAttribute(notCriteriaOptions.find((item) => item.value === header.matchedAttribute) || { value: null, label: "Không" });
    } else {
      setMatchedAttribute({ value: "Point", label: "Điểm" });
    };
    setTotalpoint("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCriteria]);

  useEffect(() => {
    console.log({
      name: name,
      totalPoint: totalPoint,
      matchedAttribute: matchedAttribute,
      isCriteria: isCriteria,
      formulaId: formula?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  useEffect(() => {
    if (formulaList.length > 0) {
      setFormula(formulaList.find((item) => item.id === header.formulaId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaList]);

  useEffect(() => {
    if (matchedAttribute.value !== "Point") {
      setTotalpoint("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedAttribute]);

  useEffect(() => {
    if (formula) {
      setMatchedAttribute({ value: "Point", label: "Điểm" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formula]);

  useEffect(() => {
    const nothing = [{ value: null, label: "Không" }];
    const notCriteria = notCriteriaOptions.slice();
    notCriteria.unshift(...nothing);
    setNotCriteriaList(notCriteria);
    fetchFormulars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    handleUpdateTemplateHeader({
      name: name,
      totalPoint: totalPoint,
      matchedAttribute: matchedAttribute?.value || "Point",
      isCriteria: isCriteria.value,
      formulaId: formula?.id,
    });
  };

  const fetchFormulars = async () => {
    try {
      setIsFetchingLoading(true);
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
      toast.error(error?.response?.data);
      setIsFetchingLoading(false);
    }
  };

  return (
    <Modal open={true} onClose={onRequestClose}>
      <Box
        sx={{
          borderRadius: "0.5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <button
          className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-1 top-1 text-text1"
          onClick={onRequestClose}
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
        <h2 className="font-bold text-[25px] mb-5 text-center">
          Tạo tiêu chí mới
        </h2>
        <div>
          <div className="bg-white shadow-1 rounded-xl p-4">
            <form onSubmit={handleSubmit(handleClick)}>
              <FormRow>
                <FormGroup>
                  <Label>Tên cột(*)</Label>
                  {isFetchingLoading ? <Skeleton height={60} animation="wave" /> :
                    <TextField
                      value={name || ""}
                      error={error?.name ? true : false}
                      helperText={error?.name}
                      name="name"
                      placeholder="Ex: MSSV"
                      onChange={(e) => setName(e.target.value)}
                      onBlur={(e) => setName(e.target.value)}
                      inputProps={{ maxLength: 100 }} />
                  }
                </FormGroup>
                <FormGroup>
                  <Label>Tiêu chí hệ thống</Label>
                  {isFetchingLoading ? <Skeleton height={60} animation="wave" /> :
                    isCriteria.value ? (
                      <Autocomplete
                        value={formula || null}
                        disablePortal={false}
                        options={formulaList}
                        getOptionLabel={(option) => option.name || ""}
                        defaultValue={formulaList.find((item) => item.id === header.formulaId) || null}
                        renderInput={(params) => <TextField {...params} placeholder="Lựa chọn" />}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setFormula(newValue);
                          } else {
                            setFormula(undefined);
                          }
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                      />
                    ) : (
                      <Autocomplete
                        value={matchedAttribute}
                        disablePortal={false}
                        options={notCriteriaList}
                        defaultValue={matchedAttribute}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} placeholder="Lựa chọn" />}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setMatchedAttribute(newValue);
                          } else {
                            setMatchedAttribute({ value: null, label: "Không" });
                          }
                        }}
                      />
                    )
                  }
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Tiêu chí đánh giá (*)</Label>
                  {isFetchingLoading ? <Skeleton height={60} animation="wave" /> :
                    <Autocomplete
                      value={isCriteria}
                      disablePortal={false}
                      defaultValue={header.isCriteria ? isCriteriaOptions[0] : isCriteriaOptions[1] || null}
                      options={isCriteriaOptions}
                      renderInput={(params) => <TextField {...params} placeholder="Lựa chọn" />}
                      onChange={(event, newValue) => {
                        if (newValue !== "" && newValue !== null && newValue !== undefined) {
                          setIsCriteria(newValue);
                        } else {
                          setIsCriteria({ value: false, label: "Không" });
                        }
                      }}
                    />
                  }
                </FormGroup>
                {isFetchingLoading ? <Skeleton height={60} animation="wave" /> :
                  isCriteria.value ? (
                    <FormGroup>
                      <Label>Điểm tối đa(*)</Label>
                      <TextField
                        value={totalPoint || ""}
                        error={error?.totalPoint ? true : false}
                        helperText={error?.totalPoint}
                        type="number"
                        name="totalPoint"
                        placeholder="Ex: 30"
                        InputProps={{
                          inputProps: {
                            min: 0
                          }
                        }}
                        onChange={(e) => setTotalpoint(e.target.value)}
                        onBlur={(e) => setTotalpoint(e.target.value)} />
                    </FormGroup>
                  ) : null
                }
              </FormRow>

              <div className="mt-5 text-center">
                <Button
                  type="submit"
                  className="px-10 mx-auto text-white bg-primary"
                  isLoading={isLoading}
                >
                  Chỉnh sửa{" "}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalEditTemplateHeader;

import { formulaNoti, templateNoti } from "logic/constants/notification";
import { toast } from "react-toastify";

export function formulaValid(formula) {
  if (!formula.name) {
    toast.error(formulaNoti.ERROR.BLANK_NAME);
    return false;
  }
  if (!formula.calculation) {
    toast.error(formulaNoti.ERROR.BLANK_CALCULATION);
    return false;
  }
  return true;
};

export function reportValid(report) {
  if (!report.name || report.name === "") {
    toast.error(templateNoti.ERROR.BLANK_NAME);
    return false;
  };
  if (report.universityId <= 0) {
    toast.error(templateNoti.ERROR.BLANK_UNIVERSITY);
    return false;
  };
  if (!report.file) {
    toast.error(templateNoti.ERROR.BLANK_FILE);
    return false;
  };
  if (!report.startCell || report.startCell === "") {
    toast.error(templateNoti.ERROR.BLANK_START_CELL);
    return false;
  };
  if (report.templateHeaders.some(item => item.name === "" || item.name === undefined || item.name === null)) {
    toast.error(templateNoti.ERROR.BLANK_HEADER_NAME);
    return false;
  };
  for (let i = 0; i < report.templateHeaders.length; i++) {
    if (report.templateHeaders[i].isCriteria && (!report.templateHeaders[i].maxPoint || report.templateHeaders[i].maxPoint <= 0 || report.templateHeaders[i].maxPoint === "")) {
      toast.error(templateNoti.ERROR.BLANK_MAX_POINT);
      return false;
    };
  };
  return true;
};

export function accountValid(account){

};

export function courseValid(course){

};

export function ojtBatchValid(ojtBatch){

};

export function positionValid(position){

};

export function skillValid(skill){

};

export function universityValid(university){

};

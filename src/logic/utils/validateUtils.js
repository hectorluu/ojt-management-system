import { accountNoti, authNoti, formulaNoti, positionNoti, skillNoti, templateNoti } from "logic/constants/notification";
import { toast } from "react-toastify";
import { emailRegex, phoneRegex, roleExchange } from "logic/constants/global";

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

export function accountValid(account) {
  console.log(new Date().getFullYear());
  if (account.firstName === "" || account.firstName === undefined || account.firstName === null) {
    toast.error(accountNoti.ERROR.BLANK_FIRST_NAME);
    return false;
  };
  if (account.lastName === "" || account.lastName === undefined || account.lastName === null) {
    toast.error(accountNoti.ERROR.BLANK_LAST_NAME);
    return false;
  };
  if (account.phoneNumber === "" || account.phoneNumber === undefined || account.phoneNumber === null) {
    toast.error(accountNoti.ERROR.BLANK_PHONE_NUMBER);
    return false;
  };
  if (account.email === "" || account.email === undefined || account.email === null) {
    toast.error(accountNoti.ERROR.BLANK_EMAIL);
    return false;
  };
  if (account.address === "" || account.address === undefined || account.address === null) {
    toast.error(accountNoti.ERROR.BLANK_ADDRESS);
    return false;
  };
  if (!account.gender) {
    toast.error(accountNoti.ERROR.BLANK_GENDER);
    return false;
  };
  if (!account.birthday) {
    toast.error(accountNoti.ERROR.BLANK_BIRTHDAY);
    return false;
  };
  if (!account.role) {
    toast.error(accountNoti.ERROR.BLANK_ROLE);
    return false;
  };
  if (emailRegex.test(account.email) === false) {
    toast.error(accountNoti.ERROR.EMAIL_FORMAT);
    return false;
  };
  if (phoneRegex.test(account.phoneNumber) === false) {
    toast.error(accountNoti.ERROR.PHONE_FORMAT);
    return false;
  };
  if ((new Date().getFullYear() - account.birthday.getFullYear() + 1) < 18) {
    toast.error(accountNoti.ERROR.BIRTHDAY_ERROR);
    return false;
  };
  if (account.role === roleExchange.TRAINER || account.role === roleExchange.TRAINEE) {
    if (account.rollNumber === "" || account.rollNumber === undefined || account.rollNumber === null) {
      toast.error(accountNoti.ERROR.BLANK_ROLL_NUMBER);
      return false;
    };
    if (!account.position) {
      toast.error(accountNoti.ERROR.BLANK_POSITION);
      return false;
    };
  };
  if (account.role === roleExchange.TRAINEE) {
    if (!account.batchId) {
      toast.error(accountNoti.ERROR.BLANK_OJT_BATCH);
      return false;
    };
    if (account.studentCode === "" || account.studentCode === undefined || account.studentCode === null) {
      toast.error(accountNoti.ERROR.BLANK_STUDENT_CODE);
      return false;
    };
    for(let i = 0; i < account.createSkills.length; i++) {
      if (!account.createSkills[i].skillId) {
        toast.error(accountNoti.ERROR.BLANK_SKILL + `(Dòng số ${i + 1})`);
        return false;
      };
    };
  };
  return true;
};

export function courseValid(course) {

};

export function ojtBatchValid(ojtBatch) {

};

export function positionValid(position) {
  if(position.name === "" || position.name === undefined || position.name === null) {
    toast.error(positionNoti.ERROR.BLANK_NAME);
    return false;
  };
  return true;
};

export function skillValid(skill) {
  if(skill.name === "" || skill.name === undefined || skill.name === null) {
    toast.error(skillNoti.ERROR.BLANK_NAME);
    return false;
  };
  return true;
};

export function universityValid(university) {

};

export function loginValid(user) {
  if (!user.email || user.email === "") {
    toast.error(authNoti.ERROR.BLANK_EMAIL);
    return false;
  };
  if (emailRegex.test(user.email) === false) {
    toast.error(authNoti.ERROR.EMAIL_VALID);
    return false;
  };
  if (!user.password || user.password === "") {
    toast.error(authNoti.ERROR.BLANK_PASSWORD);
    return false;
  };
  return true;
};

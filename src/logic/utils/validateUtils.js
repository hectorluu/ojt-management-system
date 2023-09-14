import { accountNoti, authNoti, configNoti, formulaNoti, positionNoti, skillNoti, templateNoti } from "logic/constants/notification";
import { toast } from "react-toastify";
import { configOptions, configType, emailRegex, phoneRegex, roleExchange } from "logic/constants/global";

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
  let error = [];
  if (emailRegex.test(account.email) === false) {
    error["email"] = accountNoti.ERROR.EMAIL_FORMAT;
  };
  if (phoneRegex.test(account.phoneNumber) === false) {
    error["phoneNumber"] = accountNoti.ERROR.PHONE_FORMAT;
  };
  if ((new Date().getFullYear() - account.birthday?.getFullYear() + 1) < 18) {
    error["birthday"] = accountNoti.ERROR.BIRTHDAY_ERROR;
  };
  if (account.firstName === "" || account.firstName === undefined || account.firstName === null) {
    error["firstName"] = accountNoti.ERROR.BLANK_FIRST_NAME;
    console.log(error);
  };
  if (account.lastName === "" || account.lastName === undefined || account.lastName === null) {
    error["lastName"] = accountNoti.ERROR.BLANK_LAST_NAME;
  };
  if (account.phoneNumber === "" || account.phoneNumber === undefined || account.phoneNumber === null) {
    error["phoneNumber"] = accountNoti.ERROR.BLANK_PHONE;
  };
  if (account.email === "" || account.email === undefined || account.email === null) {
    error["email"] = accountNoti.ERROR.BLANK_EMAIL;
  };
  if (account.address === "" || account.address === undefined || account.address === null) {
    error["address"] = accountNoti.ERROR.BLANK_ADDRESS;
  };
  if (!account.gender) {
    error["gender"] = accountNoti.ERROR.BLANK_GENDER;
  };
  if (!account.birthday) {
    error["birthday"] = accountNoti.ERROR.BLANK_BIRTHDAY;
  };
  if (!account.role) {
    error["role"] = accountNoti.ERROR.BLANK_ROLE;
  };
  if (account.role === roleExchange.TRAINER || account.role === roleExchange.TRAINEE) {
    if (account.rollNumber === "" || account.rollNumber === undefined || account.rollNumber === null) {
      error["rollNumber"] = accountNoti.ERROR.BLANK_ROLL_NUMBER;
    };
    if (!account.position) {
      error["position"] = accountNoti.ERROR.BLANK_POSITION;
    };
  };
  if (account.role === roleExchange.TRAINEE) {
    if (!account.batchId) {
      error["batchId"] = accountNoti.ERROR.BLANK_OJT_BATCH;
    };
    if (account.studentCode === "" || account.studentCode === undefined || account.studentCode === null) {
      error["studentCode"] = accountNoti.ERROR.BLANK_STUDENT_CODE;
    };
    for (let i = 0; i < account.createSkills.length; i++) {
      if (!account.createSkills[i].skillId || !account.createSkills[i].initLevel || account.createSkills[i].initLevel < 1) {
        if (!error["createSkills"]) {
          error["createSkills"] = [{ skillId: "", initLevel: "" }];
        } else {
          error["createSkills"] = [...{ skillId: "", initLevel: "" }];
        }
        if (!account.createSkills[i].skillId) {
          error["createSkills"][i]["skillId"] = accountNoti.ERROR.BLANK_SKILL;
        }
        if (account.createSkills[i].initLevel < 1) {
          error["createSkills"][i]["initLevel"] = accountNoti.ERROR.INIT_LEVEL_ERROR;
        }
        if (!account.createSkills[i].initLevel) {
          error["createSkills"][i]["initLevel"] = accountNoti.ERROR.BLANK_INIT_LEVEL;
        }
      };
    };
  };
  return error;
};

export function courseValid(course) {

};

export function ojtBatchValid(ojtBatch) {

};

export function positionValid(position) {
  if (position.name === "" || position.name === undefined || position.name === null) {
    toast.error(positionNoti.ERROR.BLANK_NAME);
    return false;
  };
  return true;
};

export function skillValid(skill) {
  if (skill.name === "" || skill.name === undefined || skill.name === null) {
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


export function configValid(configs) {
  for (let i = 0; i < configs.length; i++) {
    if (configs[i].name === configType.TOTAL_WORKING_DAYS_PER_MONTH) {
      if (configs[i].value === "" || configs[i].value === undefined || configs[i].value === null) {
        toast.error(configNoti.ERROR.BLANK_DAY_PER_MONTH);
        return false;
      };
      if (configs[i].value <= 1 || configs[i].value > configOptions.find((item) => item.value === configType.TOTAL_WORKING_DAYS_PER_MONTH).maxValue) {
        toast.error(configNoti.ERROR.MAX_DAY);
        return false;
      };
    }
    if (configs[i].name === configType.WORK_HOURS_REQUIRED) {
      if (configs[i].value === "" || configs[i].value === undefined || configs[i].value === null) {
        toast.error(configNoti.ERROR.BLANK_HOUR_PER_DAY);
        return false;
      };
      if (configs[i].value <= 1 || configs[i].value > configOptions.find((item) => item.value === configType.WORK_HOURS_REQUIRED).maxValue) {
        toast.error(configNoti.ERROR.MAX_HOUR);
        return false;
      };
    }
  }
  return true;
}
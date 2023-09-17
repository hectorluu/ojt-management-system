import { accountNoti, authNoti, configNoti, courseNoti, formulaNoti, positionNoti, skillNoti, templateNoti } from "logic/constants/notification";
import { toast } from "react-toastify";
import { configOptions, configType, emailRegex, passwordRegex, phoneRegex, roleExchange } from "logic/constants/global";

export function formulaValid(formula) {
  let error = {};
  if (!formula.name) {
    error["name"] = formulaNoti.ERROR.BLANK_NAME;
  }
  if (!formula.calculation) {
    error["calculation"] = formulaNoti.ERROR.BLANK_CALCULATION;
  }
  return error;
};

export function reportValid(report) {
  let error = {};
  if (!report.name || report.name === "") {
    error["name"] = templateNoti.ERROR.BLANK_NAME;
  };
  if (report.universityId <= 0) {
    error["universityId"] = templateNoti.ERROR.BLANK_UNIVERSITY;
  };
  if (!report.startCell || report.startCell === "") {
    error["startCell"] = templateNoti.ERROR.BLANK_START_CELL;
  };
  for (let i = 0; i < report.templateHeaders.length; i++) {
    if (report.templateHeaders[i].isCriteria) {
      if (!report.templateHeaders[i].name || !report.templateHeaders[i].totalPoint) {
        if (!error["templateHeaders"]) {
          error["templateHeaders"] = [{ name: "", totalPoint: "" }];
        } else {
          error["templateHeaders"] = [...error["templateHeaders"], { name: "", totalPoint: "" }];
        }
        if (!report.templateHeaders[i].name) {
          error["templateHeaders"][i]["name"] = templateNoti.ERROR.BLANK_HEADER_NAME;
        }
        if (!report.templateHeaders[i].totalPoint) {
          error["templateHeaders"][i]["totalPoint"] = templateNoti.ERROR.BLANK_MAX_POINT;
        } else {
          if (report.templateHeaders[i].totalPoint < 1) {
            error["templateHeaders"][i]["totalPoint"] = templateNoti.ERROR.MAX_POINT_TOO_LOW;
          }
        }
      };
    } else {
      if (!report.templateHeaders[i].name || !report.templateHeaders[i].totalPoint) {
        if (!error["templateHeaders"]) {
          error["templateHeaders"] = [{ name: "", totalPoint: "" }];
        } else {
          error["templateHeaders"] = [...error["templateHeaders"], { name: "", totalPoint: "" }];
        }
        if (!report.templateHeaders[i].name) {
          error["templateHeaders"][i]["name"] = templateNoti.ERROR.BLANK_HEADER_NAME;
        }
      };
    }
  };
  return error;
};

export function accountValid(account) {
  let error = {};
  if (account.firstName === "" || account.firstName === undefined || account.firstName === null) {
    error["firstName"] = accountNoti.ERROR.BLANK_FIRST_NAME;
  };
  if (account.lastName === "" || account.lastName === undefined || account.lastName === null) {
    error["lastName"] = accountNoti.ERROR.BLANK_LAST_NAME;
  };
  if (account.phoneNumber === "" || account.phoneNumber === undefined || account.phoneNumber === null) {
    error["phoneNumber"] = accountNoti.ERROR.BLANK_PHONE;
  } else {
    if (phoneRegex.test(account.phoneNumber) === false) {
      error["phoneNumber"] = accountNoti.ERROR.PHONE_FORMAT;
    };
  };
  if (account.email === "" || account.email === undefined || account.email === null) {
    error["email"] = accountNoti.ERROR.BLANK_EMAIL;
  } else {
    if (emailRegex.test(account.email) === false) {
      error["email"] = accountNoti.ERROR.EMAIL_FORMAT;
    };
  };
  if (account.address === "" || account.address === undefined || account.address === null) {
    error["address"] = accountNoti.ERROR.BLANK_ADDRESS;
  };
  if (!account.gender) {
    error["gender"] = accountNoti.ERROR.BLANK_GENDER;
  };
  if (!account.birthday) {
    error["birthday"] = accountNoti.ERROR.BLANK_BIRTHDAY;
  } else {
    if ((new Date().getFullYear() - account.birthday?.getFullYear() + 1) < 18) {
      error["birthday"] = accountNoti.ERROR.BIRTHDAY_ERROR;
    };
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
          error["createSkills"] = [...error["createSkills"], { skillId: "", initLevel: "" }];
        }
        if (!account.createSkills[i].skillId) {
          error["createSkills"][i]["skillId"] = accountNoti.ERROR.BLANK_SKILL;
        }
        if (!account.createSkills[i].initLevel) {
          error["createSkills"][i]["initLevel"] = accountNoti.ERROR.BLANK_INIT_LEVEL;
        } else {
          if (account.createSkills[i].initLevel < 1) {
            error["createSkills"][i]["initLevel"] = accountNoti.ERROR.INIT_LEVEL_ERROR;
          }
        }
      };
    };
  };
  console.log(error);
  return error;
};

export function courseValid(course) {
  let error = {};
  if (course.name === "" || course.name === undefined || course.name === null) {
    error["name"] = courseNoti.ERROR.BLANK_NAME;
  };
  if (course.platformName === "" || course.platformName === undefined || course.platformName === null) {
    error["platformName"] = courseNoti.ERROR.BLANK_PLATFORM_NAME;
  };
  if (course.description === "" || course.description === undefined || course.description === null) {
    error["description"] = courseNoti.ERROR.BLANK_DESCRIPTION;
  };
  if (course.link === "" || course.link === undefined || course.link === null) {
    error["link"] = courseNoti.ERROR.BLANK_LINK;
  };
  for (let i = 0; i < course.coursePosition.length; i++) {
    if (!course.coursePosition[i].positionId || !course.coursePosition[i].isCompulsory) {
      if (!error["coursePosition"]) {
        error["coursePosition"] = [{ positionId: "", isCompulsory: "" }];
      } else {
        error["coursePosition"] = [...error["coursePosition"], { positionId: "", isCompulsory: "" }];
      }
      if (!course.coursePosition[i].positionId) {
        error["coursePosition"][i]["positionId"] = courseNoti.ERROR.BLANK_COURSE_POSITION;
      }
      if (!course.coursePosition[i].isCompulsory) {
        error["coursePosition"][i]["isCompulsory"] = courseNoti.ERROR.BLANK_IS_COMPULSORY;
      }
    };
  };
  for (let i = 0; i < course.courseSkills.length; i++) {
    if (!course.courseSkills[i].skillId || !course.courseSkills[i].recommendedLevel || !course.courseSkills[i].afterwardLevel) {
      if (!error["courseSkills"]) {
        error["courseSkills"] = [{ skillId: "", recommendedLevel: "", afterwardLevel: "" }];
      } else {
        error["courseSkills"] = [...error["courseSkills"], { skillId: "", recommendedLevel: "", afterwardLevel: "" }];
      };
      if (!course.courseSkills[i].skillId) {
        error["courseSkills"][i]["skillId"] = courseNoti.ERROR.BLANK_COURSE_SKILL;
      };
      if (!course.courseSkills[i].recommendedLevel) {
        error["courseSkills"][i]["recommendedLevel"] = courseNoti.ERROR.BLANK_RECOMMEND_LEVEL;
      };
      if (!course.courseSkills[i].afterwardLevel) {
        error["courseSkills"][i]["afterwardLevel"] = courseNoti.ERROR.BLANK_AFTERWARD_LEVEL;
      } else {
        if (course.courseSkills[i].afterwardLevel <= course.courseSkills[i].recommendedLevel) {
          error["courseSkills"][i]["afterwardLevel"] = courseNoti.ERROR.AFTERWARD_LEVEL_TOO_LOW;
        };
      };
    };
  };

  return error;
};

export function ojtBatchValid(ojtBatch) {

};

export function positionValid(position) {
  let error = {};
  if (position.name === "" || position.name === undefined || position.name === null) {
    error["name"] = positionNoti.ERROR.BLANK_NAME;
  };
  return error;
};

export function skillValid(skill) {
  let error = {};
  if (skill.name === "" || skill.name === undefined || skill.name === null) {
    error["name"] = skillNoti.ERROR.BLANK_NAME;
  };
  return error;
};

export function universityValid(university) {

};

export function loginValid(user) {
  let error = {};
  if (emailRegex.test(user.email) === false) {
    error["email"] = authNoti.ERROR.EMAIL_VALID;
  };
  if (!user.email || user.email === "") {
    error["email"] = authNoti.ERROR.BLANK_EMAIL;
  };
  if (!user.password || user.password === "") {
    error["password"] = authNoti.ERROR.BLANK_PASSWORD;
  };
  return error;
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

export function resetPasswordValid(email) {
  let error = "";
  if (email === "" || email === undefined || email === null) {
    error = authNoti.ERROR.BLANK_EMAIL;
  };
  return error;
}

export function changePasswordWithCodeValid(request) {
  let error = {};
  if (request.code === "" || request.code === undefined || request.code === null) {
    error["code"] = authNoti.ERROR.BLANK_CODE;
  };
  if (request.password === "" || request.password === undefined || request.password === null) {
    error["password"] = authNoti.ERROR.BLANK_PASSWORD;
  } else {
    if (!passwordRegex.test(request.password)) {
      error["password"] = authNoti.ERROR.PASSWORD_FORMAT;
    };
  };
  return error;
}
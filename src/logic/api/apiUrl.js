export const authPath = {
  LOGIN: "/authen/login",
  RESET_PASSWORD_CODE: "/authen/reset-password-code",
  VERIFY_RESET_CODE: "/authen/verify-reset-code",
  RESET_PASSWORD: "/authen/reset-password",
};

export const commonPath = {
  GET_ME: "/common/current-user",
};

export const coursePath = {
  GET_COURSE_LIST: "/course",
  GET_COURSE: "/course/",
  CREATE_COURSE: "/course",
  UPDATE_COURSE: "",
};

export const criteriaPath = {
  GET_STUDENT_UNMARKED_POINT_LIST: "/criteria/list-of-trainee-point-by-trainer",
  GET_STUDENT_MARKED_POINT_LIST:
    "/criteria/list-current-point-of-trainee-point-by-trainer",
  EVALUATE_STUDENT: "/criteria",
};

export const ojtBatchPath = {
  GET_OJT_BATCH_LIST_OF_UNIVERSITY: "/ojtbatch/batches-of-university",
  GET_TRAINER_BATCHES: "/ojtbatch/status-grade-batches-trainer",
  CREATE_OJT_BATCH: "/ojtbatch",
  GET_BATCH_EXPORT_STATUS: "/ojtbatch/export-status-batches",
};

export const universityPath = {
  GET_UNIVERSITY_LIST: "/university",
  GET_UNIVERSITY: "/university/",
  CREATE_UNIVERSITY: "/university",
};

export const trainingPlanPath = {
  GET_TRAINING_PLAN_LIST: "/training-plan",
  GET_TRAINING_PLAN: "",
};

export const userPath = {
  GET_USER_LIST: "/user",
  GET_USER: "/user/",
  CREATE_USER: "/user",
  UPADTE_USER: "",
  GET_TRAINEE_LIST: "/user/trainee",
  GET_TRAINER_LIST: "/user/trainer",
  GET_TRAINER_BY_ID: "/user/trainer/",
  GET_TRAINEE_BY_ID: "/user/trainee/",
  GET_TRAINEE_LIST_BY_TRAINER: "/user/manager/trainee-list/",
};

export const skillPath = {
  GET_SKILL_LIST: "/skill",
  GET_SKILL: "/skill/",
  CREATE_SKILL: "/skill",
  UPDATE_SKILL: "/skill/",
};

export const taskPath = {
  GET_TASK_LIST: "trainee-tasks",
};

export const traineeTaskPath = {
  GET_TASK_LIST: "/task-process",
  GET_TASK: "/task-process/",
  GET_TASK_OF_TRAINEE: "/task-process/trainee/",
};

export const positionPath = {
  GET_POSITION_LIST: "/position",
  GET_POSITION: "/position/",
  CREATE_POSITION: "/position",
  UPDATE_POSITION: "/position/",
};

export const templatePath = {
  CREATE_TEMPLATE: "/template",
  GET_TEMPLATE_HEADER: "/template/template-header/criteriaheader",
  GET_TEMPLATE_LIST: "/template",
};

export const formulaPath = {
  GET_FORMULA_LIST: "/formula",
  CREATE_FORMULA: "/formula",
  GET_KEY_LIST: "/formula/data-operand",
  DELETE_FORMULA: "/formula/",
  UPDATE_FORMULA: "/formula/",
};

export const notificationPath = {
  GET_NOTIFICATION_LIST: "/notifications",
  MARK_ALL_AS_READ: "/notifications",
  MARK_ONE_AS_READ: "/notifications/",
  CREATE_EVALUATION_NOTIFICATION: "/notifications/batch/",
};

export const taskProcessPath = {
  SYNC_WEBHOOK: "/task-process/board-webhook",
};

export const trainerPath = {
  GET_TRAINEE_LIST: "/user/trainer/trainee",
};

export const reportPath = {
  EXPORT_REPORT: "/report",
};

export const configPath = {
  GET_CONFIG_LIST: "/config",
  UPDATE_CONFIG: "/config",
};

export const signalRURL = process.env.REACT_APP_SIGNALR_KEY;

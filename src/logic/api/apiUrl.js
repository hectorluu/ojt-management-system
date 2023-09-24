export const authPath = {
  LOGIN: "/authen/login",
  RESET_PASSWORD_CODE: "/authen/reset-password-code/",
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
  UPDATE_COURSE: "/course/",
  GET_RECOMMENDED_LIST: "/course/recommendation-courses",
  GET_TRAINEE_COURSE_LIST: "course/list-course-trainee",
  GET_COMPULSORY_COURSE_LIST: "course/compulsory-courses",
  ENROLL_COURSE: "/course/course-participation/",
  UPDATE_COURSE_SKILL: "/course/courseskill/",
  CREATE_COURSE_SKILL: "/course/courseskill/",
  UPDATE_COURSE_POSITION: "/course/courseposition/",
  CREATE_COURSE_POSITION: "/course/courseposition/",
  ASSIGN_COURSE: "/course/assign-course/{traineeId}/{courseId}",
  GET_TRAINER_COURSE_LIST: "/course/list-course-trainer",
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
  GET_BATCH_DETAIL: "/ojtbatch/",
  UPDATE_BATCH: "/ojtbatch/",
};

export const universityPath = {
  GET_UNIVERSITY_LIST: "/university",
  GET_UNIVERSITY: "/university/",
  CREATE_UNIVERSITY: "/university",
  UPDATE_UNIVERSITY: "/university/",
};

export const trainingPlanPath = {
  GET_TRAINING_PLAN_LIST: "/training-plan",
  GET_TRAINING_PLAN_OF_TRAINER: "/training-plan/owner",
  CREATE_NEW_TRAINING_PLAN: "/training-plan",
  ADD_TRAINING_PLAN_DETAIL: "/training-plan/",
  GET_TRAINING_PLAN_DETAIL: "/training-plan/",
  ASSIGN_TRAINING_PLAN: "/training-plan/assign-trainee",
  APPROVE_PLAN: "/training-plan/verification-accept/",
  DENY_PLAN: "/training-plan/verification-deny/",
  GET_PERSONAL_TRAINING_PLAN: "/training-plan/personal-trainee",
};

export const userPath = {
  GET_USER_LIST: "/user",
  GET_USER: "/user/",
  GET_PERSONAL_USER: "/personal-user",
  UPDATE_PROFILE: "/personal-user",
  CHANGE_PASSWORD: "/personal-user/password",
  CREATE_USER: "/user",
  UPADTE_USER: "",
  GET_TRAINEE_LIST: "/user/trainee",
  GET_TRAINER_LIST: "/user/trainer",
  GET_TRAINER_BY_ID: "/user/trainer/",
  GET_TRAINEE_BY_ID: "/user/trainee/",
  GET_TRAINEE_LIST_BY_TRAINER: "/user/manager/trainee-list/",
  GET_UNASSIGNED_TRAINEE: "/user/unassigned-trainee",
  ASSIGN_TRAINEES_TO_TRAINER: "/user/trainer/assign-trainees",
  GET_TRAINER_TRAINEE: "/user/trainer/trainee",
};

export const attendancePath = {
  GET_ATTENDANCE_FILE: "/attendance/data-of-file-attendance",
  GET_ATTENDANCE_BY_MONTH: "/attendance/attendance-by-month/",
  GET_ATTENDANCE_BY_DATE: "/attendance/attendance-by-date/",
};

export const skillPath = {
  GET_SKILL_LIST: "/skill",
  GET_SKILL: "/skill/",
  CREATE_SKILL: "/skill",
  UPDATE_SKILL: "/skill/",
  DELETE_SKILL: "/skill/disable-skill/",
  ACTIVE_SKILL: "/skill/active-skill/",
};

export const taskPath = {
  GET_TASK_LIST: "trainee-tasks",
};

export const traineeTaskPath = {
  GET_TASK_LIST: "/task-process",
  GET_TASK: "/task-process/",
  GET_TASK_OF_TRAINEE: "/task-process/trainee/",
  GET_ACCOMPLISHED_TASK_LIST: "/trainee-tasks/accomplished-tasks",
};

export const positionPath = {
  GET_POSITION_LIST: "/position",
  GET_POSITION: "/position/",
  CREATE_POSITION: "/position",
  UPDATE_POSITION: "/position/",
  DELETE_POSITION: "/position/disable-position/",
  ACTIVE_POSITION: "/position/active-position/",
};

export const templatePath = {
  CREATE_TEMPLATE: "/template",
  GET_TEMPLATE_HEADER: "/template/template-header/criteriaheader",
  GET_TEMPLATE_LIST: "/template",
  GET_TEMPLATE_DETAIL: "/template/",
  GET_TEMPLATE_UNIVERSITY: "/template/list-active-template-by-university/",
  DELETE_TEMPLATE: "/template/disable-template/",
  ACTIVE_TEMPLATE: "/template/active-template/",
  ADD_TEMPLATE_HEADER: "/template/template-header/",
  DELETE_TEMPLATE_HEADER: "/template/template-header/",
};

export const formulaPath = {
  GET_FORMULA_LIST: "/formula",
  GET_FORMULA_DETAIL: "/formula/",
  CREATE_FORMULA: "/formula",
  GET_KEY_LIST: "/formula/data-operand",
  UPDATE_FORMULA: "/formula/",
  DELETE_FORMULA: "/formula/disable-formula/",
  ACTIVE_FORMLA: "/formula/active-formula/",
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

export const certificatePath = {
  GET_CERTIFICATE_LIST: "/certificate",
  GET_CERTIFICATE_DETAIL: "/certificate/",
  GET_LIST_CERTIFICATE_OF_TRAINEE: "/certificate/trainer/",
  SUBMIT_CERTIFICATE: "/certificate/submition-certificate",
  RE_SUBMIT_CERTIFICATE: "/certificate/resubmition-certificate",
  GET_PENDING_CERTIFICATE: "/certificate/trainer/pending-certificate",
  VALID_CERTIFICATE: "/certificate/trainer/valid-certificate",
  INVALID_CERTIFICATE: "/certificate/trainer/invalid-certificate",
};

export const trainerTaskPath = {
  GET_ACCOMPLISHED_TASK_LIST_BY_BOARD:
    "/task-process/open-board/{boardId}/task-accomplished",
  GET_OPEN_BOARD_LIST: "/task-process/open-board",
  APPROVE_TASK: "/task-process/task-accept/",
  REJECT_TASK: "/task-process/task-reject/",
  GET_TRAINEE_LIST_TASK: "/task-process/trainee/",
};

export const chartPath = {
  GET_BATCH_AND_TRAINEE: "/chart/batch-and-trainee/",
  GET_TRAINER_AND_TOTAL_TRAINEES: "/chart/trainer-with-most-trainees/",
  GET_TRAINEE_WITH_POSITION: "/chart/trainee-position",
  GET_TRAINEE_WITH_TOP_SKILL: "/chart/trainee-top-skill",
  GET_TRAINEE_WITH_TOP_TASKDONE: "/chart/trainee-top-done-task",
};

export const signalRURL = process.env.REACT_APP_SIGNALR_KEY;

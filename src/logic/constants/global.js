export const defaultImage =
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

export const defaultUserIcon = "user.png";

export const defaultCourseImage = "default-course.png";

export const defaultUniversityImage = "default-university.png";

export const errorPage = "error-404.png";

export const defaultPageSize = 10;

export const defaultPageIndex = 1;

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const phoneRegex = /^[0-9]{10}$/;

export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/;

export const genderOptions = [
  { value: 1, label: "Nam" },
  { value: 2, label: "Nữ" },
];

export const courseOptions = [
  { value: 1, label: "Không bắt buộc" },
  { value: 2, label: "Bắt buộc" },
];

export const roleOptions = [
  { value: 1, label: "Admin" },
  { value: 2, label: "Quản lý" },
  { value: 3, label: "Đào tạo viên" },
  { value: 4, label: "Thực tập sinh" },
];

export const roleFilter = [
  { value: 0, label: "Tất cả" },
  { value: 1, label: "Admin" },
  { value: 2, label: "Quản lý" },
  { value: 3, label: "Đào tạo viên" },
  { value: 4, label: "Thực tập sinh" },
];

export const roleExchange = {
  ADMIN: 1,
  MANAGER: 2,
  TRAINER: 3,
  TRAINEE: 4,
};

export const positionOptions = [
  { value: 1, label: "Back-end dev" },
  { value: 2, label: "Front-end dev" },
  { value: 3, label: "Business Analyst" },
  { value: 4, label: "Project Manager" },
  { value: 5, label: "Dev-ops" },
  { value: 6, label: "Tester" },
];

export const traineeTaskStatus = [
  { value: 1, label: "Hoàn thành" },
  { value: 2, label: "Quá Hạn" },
  { value: 3, label: "Đang thực hiện" },
];

export const skillLevel = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export const accountStatus = [
  { value: 1, label: "Đã khóa" },
  { value: 2, label: "Đang hoạt động" },
];

export const skillStatusOptions = [
  { value: 1, label: "Đã xóa" },
  { value: 2, label: "Đang sử dụng" },
  { value: 3, label: "Không sử dụng" },
];

export const positionStatusOptions = [
  { value: 1, label: "Đã xóa" },
  { value: 2, label: "Đang sử dụng" },
  { value: 3, label: "Không sử dụng" },
];

export const formulaStatusOptions = [
  { value: 2, label: "Đang sử dụng" },
  { value: 3, label: "Không sử dụng" },
];

export const templateStatusOptions = [
  { value: 2, label: "Đang sử dụng" },
  { value: 3, label: "Không sử dụng" },
];

export const reportStatusOptions = [
  { value: "Can export", label: "Có thể xuất báo cáo" },
  { value: "Can not export", label: "Chưa thể xuất báo cáo" },
];

export const evaluationStatusOptions = [
  { value: "Graded", label: "Đã chấm điểm" },
  { value: "Not Grade yet", label: "Chưa chấm điểm" },
];

export const isCriteriaOptions = [
  { value: true, label: "Có" },
  { value: false, label: "Không" },
];

export const statusColor = {
  DELETED: "bg-red-500",
  ACTIVE: "bg-green-500",
  INACTIVE: "bg-yellow-500",
};

export const skillStatus = {
  DELETED: 1,
  ACTIVE: 2,
  INACTIVE: 3,
};

export const positionStatus = {
  DELETED: 1,
  ACTIVE: 2,
  INACTIVE: 3,
};

export const trainingPlanStatus = {
  PENDING: 2,
  ACTIVE: 3,
  DENIED: 4,
  CLOSED: 5,
};

export const reportStatus = {
  CAN: "Can export",
  CANNOT: "Can not export",
};

export const evaluationStatus = {
  DONE: "Graded",
  NOTYET: "Not Grade yet",
};

export const evaluationOptions = {
  CREATE: 1,
  EDIT: 2,
};

export const notCriteriaOptions = [
  { value: "STT", label: "Số thứ tự" },
  { value: "LastName", label: "Họ" },
  { value: "FirstName", label: "Tên" },
  { value: "Email", label: "Email" },
  { value: "RollNumber", label: "Mã số nhân viên" },
  { value: "Gender", label: "Giới tính" },
  { value: "PhoneNumber", label: "Số điện thoại" },
  { value: "Address", label: "Địa chỉ" },
  { value: "Birthday", label: "Ngày sinh" },
  { value: "PositionId", label: "Vị trí" },
  { value: "StudentCode", label: "Mã số sinh viên" },
  { value: "Total", label: "Tổng điểm" },
];

export const formulaOptions = [
  { value: "Attendance", label: "Điểm danh" },
  { value: "Skill", label: "Kỹ năng" },
  { value: "Certificate", label: "Khoá học" },
  { value: "Task", label: "Công việc" },
];

export const configOptions = [
  { value: "Total Working Days Per Month", label: "Số ngày làm việc trong tháng:", maxValue: 31 },
  { value: "Work Hours Required", label: "Số giờ làm việc trong ngày:", maxValue: 24 },
];

export const notiOptions = [
  { value: "All", label: "Tất cả" },
  { value: true, label: "Đã đọc" },
  { value: false, label: "Chưa đọc" },
];

export const configType = {
  TOTAL_WORKING_DAYS_PER_MONTH: "Total Working Days Per Month",
  WORK_HOURS_REQUIRED: "Work Hours Required",
};

export const notiOptionsVaue = {
  ALL: "All",
  READ: true,
  NOT_READ: false,
};

export const notiStyle = {
  CERTIFICATE_TYPE: 1,
  TRAINING_PLAN_TYPE: 2,
  BATCH_TYPE: 3,
};

export const signalRMessage = {
  COURSE: {
    CREATED: "New Course Created",
    UPDATED: "New Course Updated",
    DELETED: "New Course Deleted",
  },
  SKILL: {
    CREATED: "New Skill Created",
    UPDATED: "New Skill Updated",
    DELETED: "New Skill Deleted",
  },
  USER: {
    CREATE: "New User Created",
    UPDATE: "User Profile Updated",
  },
  TRAINING_PLAN: {
    CREATE: "New Training Plan Created",
    UPDATE: "Training Plan Updated",
    DELETE: "Training Plan Deleted",
    DETAIL_DELETE: "Detail of training plan Deleted",
    ASSIGN: "Training plan assigned to trainee",
    PROCESS: "Training plan has been process. Please reload get training plan and get notification for user.",
  },
  TASK: {
    UPDATE_FINISH: "Trainee has checked finish a Task on Trello. Please process it.",
    UPDATE_PROCESS: "Update Task Processing for Trainer",
  },
  CERTIFICATE: {
    PROCESS_CERTIFICATE: "Trainer process Trainee certificate. Trainee reload notificattion and get certificate.",
    UPDATE_PROCESS: "Update Task Processing for Trainer",
  },
  NOTIFICATION: {
    UPDATE_NOTI: "Update Notification Read. Reload notification list.",
    CREATE_NOTI: "Notification created. Reload notification list.",
  },
  TEMPLATE: {
    CREATED: "New Template Created",
    UPDATED: "New Template Updated",
    DELETED: "New Template Deleted",
  },
  TEMPLATE_HEADER: {
    CREATED: "New Template Header Created",
    UPDATED: "New Template Header Updated",
    DELETED: "New Template Header Deleted",
  },
  UNIVERSITY: {
    CREATED: "New University Created",
    UPDATED: "New University Updated",
    DELETED: "New University Deleted",
  },
  POSITION: {
    CREATED: "New Position Created",
    UPDATED: "New Position Updated",
    DELETED: "New Position Deleted",
  },
  OJTBATCH: {

  },
};

export const certificateStatus = {
  DELETED: 1,
  PENDING: 2,
  NOT_SUBMIT: 3,
  APPROVED: 4,
  DENY: 5,
};

export const traineeCourseOptions = [
  { value: 1, label: "Khuyến nghị" },
  { value: 2, label: "Tất cả" },
];
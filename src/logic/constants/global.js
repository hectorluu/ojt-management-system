export const defaultImage =
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

export const defaultUserIcon = "user.png";

export const defaultCourseImage = "default-course.png";

export const defaultUniversityImage = "default-university.png";

export const defaultPageSize = 10;

export const defaultPageIndex = 1;

export const genderOptions = [
  { value: 1, label: "Nam" },
  { value: 2, label: "Nữ" },
  { value: 3, label: "Khác" },
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
  { value: 1, label: "Đã xóa" },
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

export const signalRMessage = {
  COURSE: "New Course Created",
  SKILL: "New Skill Created",
  USER: "New User Created",
  TRAINING_PLAN: "New Training Plan Created",
  POSITION: "New Position Created",
  OJTBATCH: "New OJT Batch Created",
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
];

export const formulaOptions = [
  { value: "Attendance", label: "Điểm danh" },
  { value: "Skill", label: "Kỹ năng" },
  { value: "Certificate", label: "Khoá học" },
  { value: "Task", label: "Công việc" },
];

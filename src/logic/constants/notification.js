export const authNoti = {
  SUCCESS: {
    LOGIN: "Đăng nhập thành công !",
    RESET_CODE: "Gửi mã qua email thành công !",
    RESET_PASSWORD: "Đổi mật khẩu thành công !",
    CHANGE_PASSWORD: "Đổi mật khẩu thành công !",
  },

  ERROR: {
    LOGIN: "Tài khoản hoặc mật khẩu không đúng !",
    EMAIL_VALID: "Email không hợp lệ !",
    PASSWORD_VALID: "Mật khẩu không hợp lệ !",
    BLANK_EMAIL: "Email không được để trống !",
    BLANK_PASSWORD: "Mật khẩu không được để trống !",
    PASSWORD_FORMAT:
      "Mật khẩu phải chứa ít nhất 8 ký tự, 1 in hoa, 1 in thường, 1 chữ số và 1 ký tự đặc biệt !",
    WRONG_EMAIL_PASSWORD: "Email hoặc mật khẩu không đúng !",
    BLANK_CODE: "Mã xác thực không được để trống !",
    RESET_CODE: "Không thể gửi mã qua email !",
    WRONG_CODE: "Mã xác thực không đúng !",
    COMFIRM_NOT_MATCH: "Mật khẩu không khớp !",
  },
};

export const accountNoti = {
  SUCCESS: {
    CREATE: "Tạo tài khoản thành công !",
    UPDATE: "Cập nhật tài khoản thành công !",
    UPDATE_PASSWORD: "Cập nhật mật khẩu thành công !",
    UPDATE_PROFILE: "Cập nhật thông tin thành công !",
    UPDATE_USER: "Cập nhật tải khoản thành công !",
  },

  ERROR: {
    EXISTED_EMAIL: "Email này đã được sử dụng !",
    SKILL_OVERFLOW: "Đã đạt giới hạn số kỹ năng của hệ thống !",
    BLANK_FIRST_NAME: "Tên không được để trống !",
    BLANK_LAST_NAME: "Họ không được để trống !",
    BLANK_PHONE: "Số điện thoại không được để trống !",
    BLANK_EMAIL: "Email không được để trống !",
    BLANK_ADDRESS: "Địa chỉ không được để trống !",
    BLANK_GENDER: "Vui lòng chọn giới tính !",
    BLANK_BIRTHDAY: "Vui lòng chọn ngày sinh !",
    BLANK_ROLE: "Vui lòng chọn chức vụ !",
    BLANK_ROLL_NUMBER: "Mã số nhân viên không được để trống !",
    BLANK_POSITION: "Vui lòng chọn vị trí !",
    BLANK_OJT_BATCH: "Vui lòng chọn đợt thực tập !",
    BLANK_STUDENT_CODE: "Mã sinh viên không được để trống !",
    BLANK_SKILL: "Vui lòng chọn kỹ năng !",
    BLANK_INIT_LEVEL: "Vui lòng chọn trình độ !",
    INIT_LEVEL_ERROR: "Trình độ không được nhỏ hơn 1",
    EMAIL_FORMAT: "Email không hợp lệ !",
    PHONE_FORMAT: "Số điện thoại không hợp lệ !",
    BIRTHDAY_ERROR: "Nhân viên phải ít nhất 18 tuổi !",
  },
};

export const courseNoti = {
  SUCCESS: {
    CREATE: "Tạo khoá học thành công !",
    UPDATE: "Cập nhật khoá học thành công !",
    ASSIGN: "Giao khoá học thành công !",
    ENROLL: "Đăng kí khoá học thành công !"
  },

  ERROR: {
    SKILL_OVERFLOW: "Đã đạt giới hạn số kỹ năng của hệ thống !",
    POSITION_OVERFLOW: "Đã đạt giới hạn số vị trí của hệ thống !",
    BLANK_NAME: "Tên khoá học không được để trống !",
    BLANK_PLATFORM_NAME: "Tên nền tảng không được để trống !",
    BLANK_DESCRIPTION: "Mô tả không được để trống !",
    BLANK_LINK: "Đường dẫn không được để trống !",
    BLANK_IMG_URL: "Ảnh không được để trống !",
    BLANK_COURSE_POSITION: "Vị trí không được để trống !",
    BLANK_IS_COMPULSORY: "Chọn ràng buộc cho khoá học !",
    BLANK_COURSE_SKILL: "Kỹ năng không được để trống !",
    BLANK_RECOMMEND_LEVEL: "Trình độ không được để trống !",
    BLANK_AFTERWARD_LEVEL: "Trình độ không được để trống !",
    AFTERWARD_LEVEL_TOO_LOW: "Trình độ sau phải cao hơn trình độ trước !",
  },
};

export const criteraNoti = {
  SUCCESS: {
    CREATE: "Thành công lưu đánh giá !",
  },

  ERROR: {
    POINT_ERROR: "Phiếu đánh giá chưa phù hợp !",
  },
};

export const templateNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo mẫu đánh giá !",
    DELETE: "Thành công vô hiệu mẫu đánh giá !",
    ACTIVE: "Thành công kích hoạt mẫu đánh giá !",
    UPDATE: "Thành công cập nhật mẫu đánh giá !",
  },

  ERROR: {
    BLANK_NAME: "Tên mẫu đánh giá không được để trống !",
    BLANK_UNIVERSITY: "Phải chọn trường đại học !",
    BLANK_FILE: "Tệp mẫu không được để trống !",
    BLANK_START_CELL: "Ô bắt đầu không được để trống !",
    BLANK_HEADER_NAME: "Tên cột không được để trống !",
    BLANK_MAX_POINT: "Điểm tối đa không được để trống !",
    MAX_POINT_TOO_LOW: "Điểm tối đa quá thấp !",
  },
};

export const trainingPlanNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo kế hoạch đào tạo !",
    DELETE: "Thành công xóa kế hoạch đào tạo !",
    ACTIVE: "Thành công kích hoạt kế hoạch đào tạo !",
    ASSIGN: "Thành công phân công đào tạo viên !",
    UPDATE: "Thành công cập nhật kế hoạch đào tạo !",
  },

  ERROR: {
    BLANK_NAME: "Tên kế hoạch đào tạo không được để trống !",
    BLANK_DETAILS_NAME: "Chi tiết không được để trống !",
    BLANK_DESCRIPTION: "Mô tả không được để trống !",
    BLANK_STARTDAY: "Ngày bắt đầu không được để trống !",
    BLANK_ENDDAY: "Ngày kết thúc không được để trống !",
    ITEMS_OVERFLOW: "Đã đạt giới hạn số mục của hệ thống !",
    INVALID_ENDDAY: "Ngày kết thúc phải sau ngày bắt đầu !",
    BLANK_PLAN: "Vui lòng chọn kế hoạch đào tạo !",
    BLANK_TRAINEE: "Vui lòng chọn thực tập sinh !",
    DETAILS_LIMITE: "Không thể xoá thêm chi tiết !",
  },
};

export const formulaNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo công thức tính !",
    UPDATE: "Thành công cập nhật công thức tính !",
    DELETE: "Thành công xóa công thức tính !",
    ACTIVE: "Thành công kích hoạt công thức tính !",
  },

  ERROR: {
    BLANK_NAME: "Tên công thức không được để trống !",
    BLANK_CALCULATION: "Công thức tính không được để trống !",
  },
};

export const ojtBatchNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo đợt thực tập mới !",
    UPDATE: "Thành công cập nhật đợt thực tập !",
  },

  ERROR: {
    BLANK_NAME: "Tên đợt thực tập không được để trống !",
    BLANK_TEMPLATE: "Phải chọn 1 mẫu đánh giá !",
    BLANK_START_DATE: "Ngày bắt đầu không được để trống !",
    BLANK_END_DATE: "Ngày kết thúc không được để trống !",
    END_DATE_ERROR: "Ngày kết thúc phải sau ngày bắt đầu !",
    END_DATE_PAST: "Ngày kết thúc phải sau ngày hiện tại !",
  },
};

export const universityNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo trường đại học mới !",
    UPDATE: "Thành công cập nhật trường đại học !",
  },

  ERROR: {
    OJT_BATCH_ERROR: "Thông tin đợt thực tập chưa phù hợp !",
    BLANK_NAME: "Tên trường đại học không được để trống !",
    BLANK_CODE: "Mã trường đại học không được để trống !",
    BLANK_ADDRESS: "Địa chỉ không được để trống !",
    BLANK_JOIN_DATE: "Ngày liên kết không được để trống !",
    ERROR_JOIN_DATE: "Ngày liên kết không hợp lệ !",
  },
};

export const reportNoti = {
  SUCCESS: {
    EXPORT: "Thành công xuất tệp báo cáo !",
    NOTI: "Thành công thông báo đánh giá sinh viên !",
  },

  ERROR: {
    TEMPLATE_URL_FALSE: "Tệp báo cáo mẫu không có đường dẫn phù hợp !",
  },
};

export const generalNoti = {
  SUCCESS: {},

  ERROR: {
    SERVER_ERROR: "Lỗi hệ thống !",
    UPLOAD_FAIL: "Tải tệp lên không thành công !",
  },
};

export const skillNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo kỹ năng mới !",
    UPDATE: "Thành công cập nhật kỹ năng !",
    DELETE: "Thành công vô hiệu kỹ năng !",
    ACTIVE: "Thành công kích hoạt kỹ năng !",
  },

  ERROR: {
    CREATE: "Không tạo được kỹ năng mới !",
    UPDATE: "Không cập nhật được kỹ năng !",
    DELETE: "Không vô hiệu được kỹ năng !",
    ACTIVE: "Không kích hoạt được kỹ năng !",
    BLANK_NAME: "Tên kỹ năng không được để trống !",
  },
};

export const positionNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo vị trí mới !",
    UPDATE: "Thành công cập nhật vị trí !",
    DELETE: "Thành công vô hiệu vị trí !",
    ACTIVE: "Thành công kích hoạt vị trí !",
  },

  ERROR: {
    CREATE: "Không tạo được vị trí mới !",
    UPDATE: "Không cập nhật được vị trí !",
    DELETE: "Không vô hiệu được vị trí !",
    ACTIVE: "Không kích hoạt được vị trí !",
    BLANK_NAME: "Tên vị trí không được để trống !",
  },
};

export const configNoti = {
  SUCCESS: {
    UPDATE: "Thành công cập nhật cài đặt !",
  },

  ERROR: {
    BLANK_DAY_PER_MONTH: "Số ngày không được để trống !",
    BLANK_HOUR_PER_DAY: "Số giờ không được để trống !",
    MAX_DAY: "Số ngày không phù hợp !",
    MAX_HOUR: "Số giờ không phù hợp !",
  },
};

export const certificateNoti = {
  SUCCESS: {
    SUBMIT: "Thành công nộp chứng chỉ !",
    CERTIFY: "Thành công duyệt chứng chỉ !",
  },
  ERROR: {
    BLANK_LINK: "Đường dẫn không được để trống !",
    LINK_FORMAT: "Đường dẫn không hợp lệ !",
  },
};

export const assignNoti = {
  SUCCESS: {
    ASSIGN: "Thành công phân công thực tập sinh !",
  },
  ERROR: {
    DUPPLICATED: "Thực tập sinh đã tồn tại trong danh sách !",
    BLANK_TRAINER: "Vui lòng chọn đào tạo viên !",
    BLANK_TRAINEE: "Vui lòng chọn thực tập sinh !",
  },
};

export const taskNoti = {
  SUCCESS: {
    CERTIFY: "Thành công duyệt công việc !",
  },
  ERROR: {
    DUPPLICATED: "Thực tập sinh đã tồn tại trong danh sách !",
    BLANK_TRAINER: "Vui lòng chọn đào tạo viên !",
    BLANK_TRAINEE: "Vui lòng chọn thực tập sinh !",
  },
};

export const attendanceNoti = {
  SUCCESS: {
    IMPORT: "Thành công nhập dữ liệu điểm danh !",
  },
};

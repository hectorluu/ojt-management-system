export const authNoti = {
  SUCCESS: {
    LOGIN: "Đăng nhập thành công!!!",
  },

  ERROR: {
    LOGIN: "Tài khoản hoặc mật khẩu không đúng!!!",
    EMAIL_VALID: "Email không hợp lệ!!!",
    PASSWORD_VALID: "Mật khẩu không hợp lệ!!!",
    BLANK_EMAIL: "Email không được để trống!!!",
    BLANK_PASSWORD: "Mật khẩu không được để trống!!!",
    WRONG_EMAIL_PASSWORD: "Email hoặc mật khẩu không đúng!!!",
  },
};

export const accountNoti = {
  SUCCESS: {
    CREATE: "Tạo tài khoản thành công!!!",
  },

  ERROR: {
    EXISTED_EMAIL: "Email này đã được sử dụng!!!",
    SKILL_OVERFLOW: "Đã đạt giới hạn số kỹ năng của hệ thống!!!",
    BLANK_FIRST_NAME: "Tên không được để trống!!!",
    BLANK_LAST_NAME: "Họ không được để trống!!!",
    BLANK_PHONE: "Số điện thoại không được để trống!!!",
    BLANK_EMAIL: "Email không được để trống!!!",
    BLANK_ADDRESS: "Địa chỉ không được để trống!!!",
    BLANK_GENDER: "Vui lòng chọn giới tính!!!",
    BLANK_BIRTHDAY: "Vui lòng chọn ngày sinh!!!",
    BLANK_ROLE: "Vui lòng chọn chức vụ!!!",
    BLANK_ROLL_NUMBER: "Mã số nhân viên không được để trống!!!",
    BLANK_POSITION: "Vui lòng chọn vị trí!!!",
    BLANK_OJT_BATCH: "Vui lòng chọn đợt thực tập!!!",
    BLANK_STUDENT_CODE: "Mã sinh viên không được để trống!!!",
    BLANK_SKILL: "Vui lòng chọn kỹ năng!!!",
    EMAIL_FORMAT: "Email không hợp lệ!!!",
    PHONE_FORMAT: "Số điện thoại không hợp lệ!!!",
    BIRTHDAY_ERROR: "Nhân viên phải ít nhất 18 tuổi!!!",
  },
};

export const courseNoti = {
  SUCCESS: {
    CREATE: "Tạo khoá học thành công!!!",
  },

  ERROR: {
    SKILL_OVERFLOW: "Đã đạt giới hạn số kỹ năng của hệ thống!!!",
    POSITION_OVERFLOW: "Đã đạt giới hạn số vị trí của hệ thống!!!",
  },
};

export const criteraNoti = {
  SUCCESS: {
    CREATE: "Thành công lưu đánh giá!!!",
  },

  ERROR: {
    POINT_ERROR: "Phiếu đánh giá chưa phù hợp!!!",
  },
};

export const templateNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo mẫu đánh giá!!!",
  },

  ERROR: {
    BLANK_NAME: "Tên mẫu đánh giá không được để trống!!!",
    BLANK_UNIVERSITY: "Phải chọn trường đại học!!!",
    BLANK_FILE: "Tệp mẫu không được để trống!!!",
    BLANK_START_CELL: "Ô bắt đầu không được để trống!!!",
    BLANK_HEADER_NAME: "Tên cột không được để trống!!!",
    BLANK_MAX_POINT: "Điểm tối đa không được để trống!!!",
  },
};

export const formulaNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo công thức tính!!!",
    DELETE: "Thành công xóa công thức tính!!!",
    ACTIVE: "Thành công kích hoạt công thức tính!!!"
  },

  ERROR: {
    BLANK_NAME: "Tên công thức không được để trống!!!",
    BLANK_CALCULATION: "Công thức tính không được để trống!!!",
  },
};

export const ojtBatchNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo đợt thực tập mới!!!",
  },

  ERROR: {
    POINT_ERROR: "Thông tin đợt thực tập chưa phù hợp!!!",
  },
};

export const universityNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo trường đại học mới!!!",
  },

  ERROR: {
    POINT_ERROR: "Thông tin đợt thực tập chưa phù hợp!!!",
  },
};

export const reportNoti = {
  SUCCESS: {
    EXPORT: "Thành công xuất tệp báo cáo!!!",
    NOTI: "Thành công thông báo đánh giá sinh viên!!!",
  },

  ERROR: {
    TEMPLATE_URL_FALSE: "Tệp báo cáo mẫu không có đường dẫn phù hợp!!!",
  },
};

export const generalNoti = {
  SUCCESS: {

  },

  ERROR: {
    SERVER_ERROR: "Lỗi hệ thống!!!",
  },
};

export const skillNoti = {
  SUCCESS:{
    CREATE: "Thành công tạo kỹ năng mới!!!",
    UPDATE: "Thành công cập nhật kỹ năng!!!",
  },

  ERROR:{
    CREATE: "Không tạo được kỹ năng mới!!!",
    UPDATE: "Không cập nhật được kỹ năng!!!",
    BLANK_NAME: "Tên kỹ năng không được để trống!!!",
  },
};

export const positionNoti = {
  SUCCESS: {
    CREATE: "Thành công tạo vị trí mới!!!",
    UPDATE: "Thành công cập nhật vị trí!!!",
  },

  ERROR: {
    CREATE: "Không tạo được vị trí mới!!!",
    UPDATE: "Không cập nhật được vị trí!!!",
    BLANK_NAME: "Tên vị trí không được để trống!!!",
  },
};
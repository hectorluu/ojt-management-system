import * as React from "react";
import Card from "@mui/material/Card";
import { certificateStatusColor, defaultCourseImage } from "logic/constants/global";
import CertificateImage from "./part/CertificateImage";
import CertificateName from "./part/CertificateName";
import Gap from "views/components/common/Gap";
import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { Link } from "react-router-dom";
import classNames from "logic/utils/classNames";
import Chip from "views/components/chip/Chip";
import CheckIcon from '@mui/icons-material/Check';

export default function CertificateCardDisplay({ certificate, onClickSubmit, isLoading, error }) {
  const [link, setLink] = React.useState("");

  return (
    <Card
      sx={{ display: "flex" }}
      className="rounded-2xl hover:shadow-xl transition duration-500 ease-in-out"
    >
      <div className="flex items-center gap-x-[5px] w-full">
        <CertificateImage className="h-[266px] flex-1" image={certificate?.courseImg || defaultCourseImage} />
        <div className="flex-auto max-w-[600px]">
          <CertificateName className="mb-4 text-xl font-bold">
            {certificate?.courseName}
          </CertificateName>
          <TextField
            fullWidth
            error={error ? true : false}
            helperText={error}
            name="link"
            placeholder="https://example.com"
            onChange={(e) => setLink(e.target.value)}
            onBlur={(e) => setLink(e.target.value)}
            InputProps={{
              readOnly: certificate?.status === 4 ? true : false,
            }}
            inputProps={{ maxLength: 500 }}
          />
          <Gap />
          <div className={classNames(
            "w-4/4 rounded-full bg-primary h-[5px] mb-6",
            certificateStatusColor.find((color) => color.value === certificate?.status).color
          )}></div>
          <Button
            component={Link}
            to={`/trainee-course-detail/${certificate?.courseId}`}
            variant="contained"
          >
            Chi Tiết
          </Button>
          {certificate?.status === 4 ?
            <Chip
              color="success"
              sx={{ float: "right" }}
              startIcon={<CheckIcon />}
            >
              Đã chấp thuận
            </Chip> :
            <LoadingButton
              component="label"
              variant="contained"
              onClick={() => onClickSubmit(certificate?.courseId, certificate?.status, link)}
              loading={isLoading}
              startIcon={<SaveIcon />}
              sx={{ float: "right" }}
            >
              Nộp chứng chỉ
            </LoadingButton>}
        </div>
      </div>
    </Card>
  );
}

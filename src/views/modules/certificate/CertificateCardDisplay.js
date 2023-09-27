import * as React from "react";
import Card from "@mui/material/Card";
import { certificateStatusColor, defaultCourseImage } from "logic/constants/global";
import CertificateImage from "./part/CertificateImage";
import CertificateName from "./part/CertificateName";
import Gap from "views/components/common/Gap";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { Link } from "react-router-dom";
import classNames from "logic/utils/classNames";
import Chip from "views/components/chip/Chip";
import CheckIcon from '@mui/icons-material/Check';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function CertificateCardDisplay({ certificate, onClickSubmit, isLoading, error, selected }) {
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    if (certificate) {
      setLink(certificate?.linkCertificate || "");
    };
  }, [certificate]);

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
            value={link}
            fullWidth
            error={certificate?.courseId === selected ? error ? true : false : false}
            helperText={certificate?.courseId === selected ? error : ""}
            name="link"
            placeholder="https://example.com"
            onChange={(e) => setLink(e.target.value)}
            onBlur={(e) => setLink(e.target.value)}
            inputProps={{
              maxLength: 500,
              readOnly: certificate?.status === 4 ? true : false,
            }}
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
          {link ? <IconButton aria-label="open-in-new" color="primary" onClick={() => window.open(link)}>
            <OpenInNewIcon />
          </IconButton> : null}
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
              loading={certificate?.courseId === selected ? isLoading : false}
              startIcon={<SaveIcon />}
              sx={{ float: "right" }}
            >
              {certificate.status === 5 ? "Nộp lại" : "Nộp chứng chỉ"}
            </LoadingButton>}
        </div>
      </div>
    </Card>
  );
}

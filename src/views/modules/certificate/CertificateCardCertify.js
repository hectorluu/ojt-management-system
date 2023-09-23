import * as React from "react";
import Card from "@mui/material/Card";
import { defaultCourseImage } from "logic/constants/global";
import CertificateImage from "./part/CertificateImage";
import CertificateName from "./part/CertificateName";
import Gap from "views/components/common/Gap";
import { Avatar, Button, CardContent, Collapse, IconButton, Stack, TextField, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CertificateCardCertify({ certificate, onClickProcess }) {
  const [expanded, setExpanded] = React.useState(false);
  const moment = require('moment');
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className="rounded-2xl hover:shadow-xl transition duration-500 ease-in-out border-solid border-2 border-slate-200"
      sx={{ height: "fit-content" }}>
      <div className="flex items-center gap-x-[5px] w-full">
        <CertificateImage className="h-[266px] flex-1" image={certificate?.courseImg || defaultCourseImage} />
        <div className="flex-auto max-w-[600px]">
          <CertificateName className="mb-4 text-xl font-bold">
            {certificate?.courseName}
          </CertificateName>
          <Gap />
          <Stack direction="row">
            <Avatar src={certificate.avatarURL} />
            <Typography variant="h3" sx={{ml: 1, mt: 1}}>{certificate.lastName + " " + certificate.firstName}</Typography>
          </Stack>
          <Gap />
          <Button
            component={Link}
            to={`/trainer-course-detail/${certificate?.courseId}`}
            variant="contained"
          >
            Chi Tiết
          </Button>
          {!expanded ?
            <Stack direction="row" sx={{ float: "right" }}>
              <IconButton aria-label="Từ chối"
                onClick={() => onClickProcess(false, certificate)}>
                <ClearIcon color="error" />
              </IconButton>
              <IconButton aria-label="Chấp thuận"
                onClick={() => onClickProcess(true, certificate)}>
                <CheckIcon color="success" />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Stack>
            : null}
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ngày đăng kí: {moment(certificate.enrollDate).format('DD/MM/YYYY')}</Typography>
          <Typography paragraph>Ngày nộp: {moment(certificate.submitDate).format('DD/MM/YYYY')}</Typography>
          <TextField
            value={certificate.linkCertificate}
            fullWidth
            name="link"
            placeholder="https://example.com"
            inputProps={{
              maxLength: 500,
              readOnly: true,
            }}
          />
        </CardContent>
        <Stack direction="row" sx={{ float: "right" }}>
          <IconButton aria-label="Từ chối"
            onClick={() => onClickProcess(false, certificate)}>
            <ClearIcon color="error" />
          </IconButton>
          <IconButton aria-label="Chấp thuận"
            onClick={() => onClickProcess(true, certificate)}>
            <CheckIcon color="success" />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
      </Collapse>
    </Card>
  );
}

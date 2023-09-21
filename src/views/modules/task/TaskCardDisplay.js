import * as React from "react";
import Card from "@mui/material/Card";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Avatar, CardActions, CardContent, CardHeader, Collapse, Typography } from "@mui/material";

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

export default function TaskCardDisplay({ task }) {
  const [expanded, setExpanded] = React.useState(false);
  const moment = require('moment');
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className="rounded-2xl border-0 py-3 pb-1 hover:shadow-xl transition duration-500 ease-in-out border-solid border-2 border-slate-200"
      sx={{ maxWidth: 345, height: "fit-content" }}>
      <CardHeader
        className={!expanded ? "text-ellipsis overflow-hidden whitespace-nowrap" : ""}
        // titleTypographyProps={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        avatar={
          <Avatar />
        }
        title={task?.name}
        subheader={"Ngày hoàn thành:" + moment(task?.finishTime).format('DD/MM/YYYY')}
      />
      {!expanded ?
        <>
          <CardContent>
            <Typography paragraph>Nhân viên: {moment(task?.startTime).format('DD/MM/YYYY')}</Typography>
            <Typography variant="body2" color="text.secondary" className="line-clamp-3 overflow-hidden">
              {task?.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ClearIcon color="error" />
            </IconButton>
            <IconButton aria-label="Chấp thuận">
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
          </CardActions>
        </> : null}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Nhân viên: {moment(task?.startTime).format('DD/MM/YYYY')}</Typography>
          <Typography paragraph>Mã số nhân viên: {moment(task?.startTime).format('DD/MM/YYYY')}</Typography>
          <Typography paragraph>Ngày tạo: {moment(task?.startTime).format('DD/MM/YYYY')}</Typography>
          <Typography paragraph>Hạn chót: {moment(task?.endTime).format('DD/MM/YYYY')}</Typography>
          <Typography paragraph>
            Mô tả công việc:
          </Typography>
          <Typography paragraph>
            {task?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Từ chối">
            <ClearIcon color="error" />
          </IconButton>
          <IconButton aria-label="Chấp thuận">
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
        </CardActions>
      </Collapse>
    </Card>
  );
}

import * as React from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@mui/material";
import Chip from "views/components/chip/Chip";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TaskCardDisplay({ task, onClickProcess }) {
  const [expanded, setExpanded] = React.useState(false);
  const moment = require("moment");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className="rounded-2xl border-0 py-3 pb-1 hover:shadow-xl transition duration-500 ease-in-out border-solid border-2 border-slate-200"
      sx={{ maxWidth: 345, height: "fit-content" }}
    >
      <CardHeader
        sx={!expanded ? {
          display: "flex",
          overflow: "hidden",
          "& .MuiCardHeader-content": {
            overflow: "hidden"
          }
        } : {}}
        titleTypographyProps={!expanded ? { noWrap: true } : {}}
        subheaderTypographyProps={!expanded ? { noWrap: true } : {}}
        avatar={<Avatar src={task.avatarURL} />}
        title={<span className="font-semibold">{task?.name}</span>}
        subheader={
          "Ngày hoàn thành: " + moment(task?.finishTime).format("DD/MM/YYYY")
        }
      />
      {!expanded ? (
        <>
          <CardContent>
            <Typography paragraph>
              <span className="text-base font-semibold">Nhân viên: </span>
              {task.traineeLastName + " " + task.traineeFirstName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="line-clamp-3 overflow-hidden"
            >
              {task?.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {task.processStatus === 1 ? (
              <>
                <IconButton
                  aria-label="Từ chối"
                  onClick={() => onClickProcess(false, task)}
                >
                  <ClearIcon color="error" />
                </IconButton>
                <IconButton
                  aria-label="Chấp thuận"
                  onClick={() => onClickProcess(true, task)}
                >
                  <CheckIcon color="success" />
                </IconButton>
              </>
            ) : (
              <Chip
                color={task.processStatus === 3 ? "error" : "success"}
                sx={{ marginLeft: "22px" }}
                startIcon={
                  task.processStatus === 3 ? <CloseIcon /> : <DoneIcon />
                }
              >
                {task.processStatus === 3 ? "Chưa đạt" : "Đạt"}
              </Chip>
            )}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </>
      ) : null}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <span className="text-base font-semibold">Nhân viên: </span>{" "}
            {task.traineeLastName + " " + task.traineeFirstName}
          </Typography>
          <Typography paragraph>
            <span className="text-base font-semibold">Mã số nhân viên: </span>
            {task.traineeRollNumber}
          </Typography>
          <Typography paragraph>
            <span className="text-base font-semibold">Ngày tạo: </span>
            {moment(task?.startTime).format("DD/MM/YYYY")}
          </Typography>
          <Typography paragraph>
            <span className="text-base font-semibold">Hạn chót: </span>
            {moment(task?.endTime).format("DD/MM/YYYY")}
          </Typography>
          <Typography paragraph>
            <span className="text-base font-semibold">Mô tả công việc: </span>
          </Typography>
          <Typography paragraph>{task?.description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {task.processStatus === 1 ? (
            <>
              <IconButton
                aria-label="Từ chối"
                onClick={() => onClickProcess(false, task)}
              >
                <ClearIcon color="error" />
              </IconButton>
              <IconButton
                aria-label="Chấp thuận"
                onClick={() => onClickProcess(true, task)}
              >
                <CheckIcon color="success" />
              </IconButton>
            </>
          ) : (
            <Chip
              color={task.processStatus === 3 ? "error" : "success"}
              sx={{ marginLeft: "22px" }}
              startIcon={
                task.processStatus === 3 ? <CloseIcon /> : <DoneIcon />
              }
            >
              {task.processStatus === 3 ? "Chưa đạt" : "Đạt"}
            </Chip>
          )}
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

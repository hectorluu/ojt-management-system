import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  useTheme,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { userPath } from "logic/api/apiUrl";
import { defaultUserIcon, genderOptions } from "logic/constants/global";
import { fDate } from "logic/utils/formatTime";
import { toast } from "react-toastify";

const AccountDetailPage = () => {
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchUserDetail() {
      try {
        const response = await axiosPrivate.get(userPath.GET_USER + userId);
        setUser(response.data);
      } catch (error) {}
    }
    fetchUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userAvatar = user?.avatarUrl || defaultUserIcon;

  const theme = useTheme();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    toast.success("Lưu thành công");
  };

  const renderListItemText = (label, value, field) => {
    if (isEditing) {
      return (
        <TextField
          value={value}
          onChange={(e) => setUser({ ...user, [field]: e.target.value })}
          variant="outlined"
          sx={{ width: "50%" }}
        />
      );
    }

    return <ListItemText primary={value} onClick={handleEditClick} />;
  };

  return (
    <MainCard>
      <div className="flex flex-col items-center -mt-20">
        <Avatar
          src={userAvatar}
          onError={(e) => {
            e.target.src = defaultUserIcon;
          }}
          sx={{
            ...theme.typography.mediumAvatar,
            margin: "8px 0 8px 8px !important",
            cursor: "pointer",
          }}
          className="w-32 h-32 border-4 border-white rounded-full pointer-events-none"
        />
        <div className="flex items-center space-x-2">
          <Typography variant="h3">
            {user.firstName + " " + user.lastName}
          </Typography>
        </div>
        {isEditing && (
          <div className="flex justify-center items-center mt-2">
            <Button variant="outlined" className="mt-1 p-2 rounded-lg bg-white">
              <span className="mx-auto">Chọn ảnh</span>
            </Button>
          </div>
        )}
      </div>
      <h4 className="text-xl text-gray-900 font-bold text-left ml-2 mt-5">
        Thông tin cá nhân
      </h4>
      <List className="mt-2 text-gray-700">
        <ListItem className="flex border-y py-2">
          <Typography className="font-bold w-24">Họ và tên:</Typography>
          {renderListItemText(
            "Họ và tên",
            user.firstName + " " + user.lastName,
            "name"
          )}
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Email:</Typography>
          {renderListItemText("Email", user.email, "email")}
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Số ĐT:</Typography>
          {renderListItemText("phoneNumber", user.phoneNumber, "phoneNumber")}
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Giới tính:</Typography>
          {isEditing ? (
            <TextField
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
              variant="outlined"
              sx={{ width: "50%" }}
              select
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <ListItemText
              primary={
                genderOptions.find((option) => option.value === user.gender)
                  ?.label
              }
            />
          )}
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Địa chỉ:</Typography>
          {renderListItemText("Địa chỉ", user.address, "address")}
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Ngày sinh:</Typography>
          {renderListItemText("Ngày sinh", fDate(user.birthday), "birthday")}
        </ListItem>
        <Divider />
        <ListItem className="flex border-b py-2">
          <Typography className="font-bold w-24">Vị trí:</Typography>
          {renderListItemText("Vị trí", user.positionName, "positionName")}
        </ListItem>
      </List>
      {isEditing && (
        <div className="flex justify-center items-center mt-2">
          <Button
            variant="outlined"
            onClick={handleSaveClick}
            className="p-2 rounded bg-white"
          >
            <span className="mx-auto">Lưu</span>
          </Button>
        </div>
      )}
    </MainCard>
  );
};

export default AccountDetailPage;

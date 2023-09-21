import { Label } from "@mui/icons-material";
import { Card, CardContent, CardHeader, FormGroup, Skeleton } from "@mui/material";
import FormRow from "views/components/common/FormRow";

const ProfileSkeleton = () => {

  return (
    <Card>
      <div className="relative w-full h-[100px] bg-gray-500 rounded"></div>
      <div className="flex flex-col items-center -mt-20">
        <Skeleton variant="circular" width={120} height={120} animation="wave" />
        <div className="flex items-center space-x-2">
          <Skeleton variant="rounded" width={210} height={40} animation="wave" />
        </div>
      </div>
      <CardHeader />
      <CardContent sx={{ pt: 0 }}>
        <FormRow>
          <FormGroup>
            <Label>Họ (*)</Label>
            <Skeleton variant="rounded" height={50} animation="wave" />
          </FormGroup>
          <FormGroup>
            <Label>Tên (*)</Label>
            <Skeleton variant="rounded" height={50} animation="wave" />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Email (*)</Label>
            <Skeleton variant="rounded" height={50} animation="wave" />
          </FormGroup>
          <FormGroup>
            <Label>Số điện thoại (*)</Label>
            <Skeleton variant="rounded" height={50} animation="wave" />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label>Địa chỉ (*)</Label>
          <Skeleton variant="rounded" height={50} animation="wave" />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label>Giới tính (*)</Label>
            <Skeleton variant="rounded" height={50} animation="wave" />
          </FormGroup>
          <FormGroup>
            <Label>Ngày sinh (*)</Label>
            <Skeleton variant="rounded" height={50} animation="wave" />
          </FormGroup>
        </FormRow>
        {/* This is the line to separate between section */}
        <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>

        <FormRow>
          <FormGroup>
            <Label>Mã số nhân viên (*)</Label>
            <Skeleton variant="rounded" height={50} animation="wave" />
          </FormGroup>
          <FormGroup>
            <Label>Vị trí (*)</Label>
            <Skeleton variant="rounded" height={50} animation="wave" />
          </FormGroup>
        </FormRow>
      </CardContent>
    </Card>
  );
};

export default ProfileSkeleton;

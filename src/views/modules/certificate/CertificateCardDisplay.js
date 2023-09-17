import * as React from "react";
import Card from "@mui/material/Card";
import { defaultCourseImage } from "logic/constants/global";
import CertificateImage from "./part/CertificateImage";
import CertificateCategory from "./part/CertificateCategory";
import CertificateName from "./part/CertificateName";
import CertificatePlatform from "./part/CertificatePlatform";
import Gap from "views/components/common/Gap";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

export default function CertificateCardDisplay({ certificate, onClickSubmit, isLoading }) {

  const certificatePosition = (certificate) => {
    let text = certificate?.coursePositions[0]?.positionName;
    for (let i = 1; i < certificate?.coursePositions.length; i++) {
      text = text + "," + certificate?.coursePositions[i]?.positionName;
    }
    return text;
  };

  return (
    <Card
      sx={{ display: "flex" }}
      className="rounded-2xl hover:shadow-xl transition duration-500 ease-in-out"
    >
      <div className="flex items-center gap-x-[5px] w-full">
        <CertificateImage className="h-[266px] flex-1" image={certificate?.imageURL || defaultCourseImage} />
        <div className="flex-auto max-w-[600px]">
          <CertificateCategory
            text={certificatePosition(certificate)}
            className="text-sm"
          ></CertificateCategory>
          <CertificateName className="mb-4 text-xl font-bold">
            {/* {certificate?.name} */}
            Course 
          </CertificateName>
          <TextField
            name="link"
            fullWidth
          />
          <Gap />
          <div className="w-4/4 rounded-full bg-primary h-[5px] mb-6"></div>
          <CertificatePlatform
            text={certificate?.platformName}
            className="text-sm"
          ></CertificatePlatform>
          <LoadingButton
            component="label"
            variant="contained"
            onClick={() => console.log("hello")}
            loading={isLoading}
            startIcon={<SaveIcon />}
            sx={{ float: "right" }}
          >
            Nộp chứng chỉ
          </LoadingButton>
        </div>
      </div>
    </Card>
  );
}

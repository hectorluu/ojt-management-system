import React from "react";
import CampCategory from "./parts/CampCategory";
import CampDesc from "./parts/CampDesc";
import CampImage from "./parts/CampImage";
import CampTitle from "./parts/CampTitle";
import CoursePlatform from "views/modules/course/part/CoursePlatform";

const CampaignFeature = () => {
  return (
    <div className="flex items-center gap-x-[30px] w-full max-w-[1048px]">
      <CampImage className="h-[266px] flex-1"></CampImage>
      <div className="flex-1 max-w-[435px]">
        <CampCategory text="Architecture" className="text-sm"></CampCategory>
        <CampTitle className="mb-4 text-xl font-bold">
          Remake - We Make architecture exhibition
        </CampTitle>
        <CampDesc className="mb-6 text-sm">
          Remake - We Make: an exhibition about architecture's social agency in
          the face of urbanisation
        </CampDesc>
        <div className="w-full rounded-full bg-[#EFEFEF] h-[5px] mb-6">
          <div className="w-4/4 h-full rounded-full bg-primary"></div>
        </div>
        <CoursePlatform
          text="Architecture"
          className="text-sm"
        ></CoursePlatform>
      </div>
    </div>
  );
};

export default CampaignFeature;
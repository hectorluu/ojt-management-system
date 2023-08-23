import {
  courseOptions,
  defaultCourseImage,
  positionOptions,
  skillLevel,
} from "logic/constants/global";
import { Fragment, useEffect, useState } from "react";
import { Input, Textarea } from "views/components/input";
import ImageUpload from "views/components/image/ImageUpload";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { Dropdown } from "views/components/dropdown";
import { Button } from "views/components/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { coursePath, skillPath } from "logic/api/apiUrl";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { courseNoti } from "logic/constants/notification";
import AddIcon from "@mui/icons-material/Add";

const CreateNewCoursePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { handleSubmit, control, reset, getValues } = useForm();
  const [coursePosition, setCoursePosition] = useState([
    { positionId: "", isCompulsory: "" },
  ]);
  const [courseSkills, setCourseSkills] = useState([
    { skillId: "", recommendedLevel: "", afterwardLevel: "" },
  ]);
  const [skillList, setSkillList] = useState([]);
  const [coursePic, setCoursePic] = useState(null);
  const [filteredSkillList, setFilteredSkillList] = useState([]);
  const [filteredPositionList, setFilteredPositionList] = useState([]);
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    removeSkillItems(courseSkills, skillList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSkills]);

  useEffect(() => {
    removePositionItems(coursePosition, positionOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePosition]);

  useEffect(() => {
    if (imageURL) {
      handleAddNewCourse(getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL]);

  const removeSkillItems = (rmItems, items) => {
    const filteredItems = items.filter(
      (item) => !rmItems.some((rmItem) => item.id === rmItem.skillId)
    );
    setFilteredSkillList(filteredItems);
  };

  const removePositionItems = (rmItems, items) => {
    const filteredItems = items.filter(
      (item) => !rmItems.some((rmItem) => item.value === rmItem.position)
    );
    setFilteredPositionList(filteredItems);
  };

  const fetchSkills = async () => {
    try {
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL_LIST + "?PageSize=" + 100000 + "&PageIndex=" + 1
      );
      setSkillList(response.data.data);
      setFilteredSkillList(response.data.data);
    } catch (error) {
      console.log("fetchSkills ~ error", error);
    }
  };

  const getDropdownLabel = (
    index,
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const position = coursePosition.slice();
    const value = position[index][name] || defaultValue;
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  const handleSelectDropdownOption = (index, name, value) => {
    const newArray = coursePosition.slice();
    newArray[index][name] = value;
    setCoursePosition(newArray);
  };

  const resetValues = () => {
    reset({});
  };

  const handleAddNewCourse = async (values) => {
    try {
      await axiosPrivate.post(coursePath.CREATE_COURSE, {
        ...values,
        coursePosition,
        courseSkills,
        imageURL,
      });
      toast.success(courseNoti.SUCCESS.CREATE);
      resetValues();
      setCoursePosition([{ positionId: "", isCompulsory: "" }]);
      setCourseSkills([
        { skillId: "", recommendedLevel: "", afterwardLevel: "" },
      ]);
      setCoursePic(null);
    } catch (error) {
      toast.error(error);
    }
  };



  const handleAddPositionField = () => {
    if (
      filteredPositionList.length > 0 &&
      coursePosition.length < positionOptions.length
    ) {
      const newField = {
        positionId: "",
        isCompulsory: "",
      };
      setCoursePosition([...coursePosition, newField]);
    } else {
      toast.error(courseNoti.ERROR.POSITION_OVERFLOW);
    }
  };

  async function uploadFile() {
    if (coursePic) {
      try {
        const imageRef = ref(storage, "images/courses/" + coursePic.name);
        await uploadBytes(imageRef, coursePic).then(async (snapshot) => {
          await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
            await setImageURL(downloadURL);
            console.log(imageURL);
          })
        });
      } catch (e) {
        toast.error(e);
      }
    } else {
      setImageURL(defaultCourseImage);
    }
  }

  const getSkillDropdownLabel = (
    index,
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const skills = courseSkills.slice();
    const value = skills[index][name] || defaultValue;
    const label = options.find((label) => label.id === value);
    return label ? label.name : defaultValue;
  };

  const handleAddSkillField = () => {
    if (
      filteredSkillList.length > 0 &&
      courseSkills.length < skillList.length
    ) {
      const newField = {
        skillId: "",
        recommendedLevel: "",
        afterwardLevel: "",
      };
      setCourseSkills([...courseSkills, newField]);
    } else {
      toast.error(courseNoti.ERROR.SKILL_OVERFLOW);
    }
  };

  const onChangeCourseSkill = (index, name, value) => {
    const newArray = courseSkills.slice();
    newArray[index][name] = value;
    setCourseSkills(newArray);
  };

  const getLevelDropdownLabel = (
    index,
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const levels = courseSkills.slice();
    const value = levels[index][name] !== undefined ? levels[index][name] : defaultValue;
    const label = options.find((label) => label.value === value);
    return label !== undefined ? label.label : defaultValue;
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo khóa học mới
          </h1>
          <form onSubmit={handleSubmit(uploadFile)}>
            <FormRow>
              <FormGroup>
                <Label>Tên khóa học (*)</Label>
                <Input
                  control={control}
                  name="name"
                  placeholder="Ex: Object-oriented programming"
                  autoComplete="off"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Nền tảng (*)</Label>
                <Input
                  control={control}
                  name="platformName"
                  placeholder="Ex: Udemy"
                  autoComplete="off"
                ></Input>
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>Link (*)</Label>
              <Input
                control={control}
                name="link"
                placeholder=""
                autoComplete="off"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Mô tả khóa học *</Label>
              <Textarea
                name="description"
                placeholder="Viết mô tả về khóa học...."
                control={control}
              ></Textarea>
            </FormGroup>
            <FormRow>
              <FormGroup>
                <Label>Tải ảnh khóa học (*)</Label>
                <ImageUpload
                  onChange={setCoursePic}
                  name="imageURL"
                ></ImageUpload>
              </FormGroup>
              {coursePic && (
                <FormGroup>
                  <Label>Preview</Label>
                  <label className="w-full h-[200px] border border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center">
                    <img
                      className="w-full h-full object-contain"
                      src={URL.createObjectURL(coursePic)}
                      alt="img"
                    ></img>
                  </label>
                </FormGroup>
              )}
            </FormRow>
            {/* This is the line to separate between section */}
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            {coursePosition.map((coursePositions, index) => (
              <FormRow key={index}>
                <FormGroup>
                  <Label>Vị trí (*)</Label>
                  <Dropdown>
                    <Dropdown.Select
                      placeholder={getDropdownLabel(
                        index,
                        "position",
                        positionOptions,
                        "Lựa chọn"
                      )}
                    ></Dropdown.Select>
                    <Dropdown.List>
                      {filteredPositionList.map((option) => (
                        <Dropdown.Option
                          key={option.value}
                          onClick={() =>
                            handleSelectDropdownOption(
                              index,
                              "positionId",
                              option.value
                            )
                          }
                        >
                          <span className="capitalize">{option.label}</span>
                        </Dropdown.Option>
                      ))}
                    </Dropdown.List>
                  </Dropdown>
                </FormGroup>
                <FormGroup>
                  <Label>Bắt buộc / Không bắt buộc (*)</Label>
                  <Dropdown>
                    <Dropdown.Select
                      placeholder={getDropdownLabel(
                        index,
                        "isCompulsory",
                        courseOptions,
                        "Lựa chọn"
                      )}
                    ></Dropdown.Select>
                    <Dropdown.List>
                      {courseOptions.map((option) => (
                        <Dropdown.Option
                          key={option.value}
                          onClick={() =>
                            handleSelectDropdownOption(
                              index,
                              "isCompulsory",
                              option.value
                            )
                          }
                        >
                          <span className="capitalize">{option.label}</span>
                        </Dropdown.Option>
                      ))}
                    </Dropdown.List>
                  </Dropdown>
                </FormGroup>
              </FormRow>
            ))}
            <button
              className="rounded-full"
              type="button"
              onClick={() => handleAddPositionField()}
            >
              <AddIcon></AddIcon> Thêm vị trí
            </button>
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            {courseSkills.map((courseSkills, index) => (
              <div key={index}>
                <FormGroup>
                  <Label>Kỹ năng (*)</Label>
                  <Dropdown>
                    <Dropdown.Select
                      placeholder={getSkillDropdownLabel(
                        index,
                        "skillId",
                        skillList,
                        "Lựa chọn"
                      )}
                    ></Dropdown.Select>
                    <Dropdown.List>
                      {filteredSkillList.map((option) => (
                        <Dropdown.Option
                          key={option.id}
                          onClick={() =>
                            onChangeCourseSkill(index, "skillId", option.id)
                          }
                        >
                          <span className="capitalize">{option.name}</span>
                        </Dropdown.Option>
                      ))}
                    </Dropdown.List>
                  </Dropdown>
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <Label>Trình độ khuyến nghị (*)</Label>
                    <Dropdown>
                      <Dropdown.Select
                        placeholder={getLevelDropdownLabel(
                          index,
                          "recommendedLevel",
                          skillLevel,
                          "Lựa chọn"
                        )}
                      ></Dropdown.Select>
                      <Dropdown.List>
                        {skillLevel.map((option) => (
                          <Dropdown.Option
                            key={option.value}
                            onClick={() =>
                              onChangeCourseSkill(
                                index,
                                "recommendedLevel",
                                option.value
                              )
                            }
                          >
                            <span className="capitalize">{option.label}</span>
                          </Dropdown.Option>
                        ))}
                      </Dropdown.List>
                    </Dropdown>
                  </FormGroup>
                  <FormGroup>
                    <Label>Trình độ hoàn thành (*)</Label>
                    <Dropdown>
                      <Dropdown.Select
                        placeholder={getLevelDropdownLabel(
                          index,
                          "afterwardLevel",
                          skillLevel,
                          "Lựa chọn"
                        )}
                      ></Dropdown.Select>
                      <Dropdown.List>
                        {skillLevel.map((option) => (
                          <Dropdown.Option
                            key={option.value}
                            onClick={() =>
                              onChangeCourseSkill(
                                index,
                                "afterwardLevel",
                                option.value
                              )
                            }
                          >
                            <span className="capitalize">{option.label}</span>
                          </Dropdown.Option>
                        ))}
                      </Dropdown.List>
                    </Dropdown>
                  </FormGroup>
                </FormRow>
              </div>
            ))}
            <button type="button" onClick={() => handleAddSkillField()}>
              Thêm kỹ năng
            </button>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Bước tiếp theo{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewCoursePage;

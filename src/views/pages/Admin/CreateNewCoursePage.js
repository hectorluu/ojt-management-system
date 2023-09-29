import {
  courseOptions,
  defaultCourseImage,
  skillLevel,
} from "logic/constants/global";
import { Fragment, useEffect, useState } from "react";
import ImageUpload from "views/components/image/ImageUpload";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { coursePath, positionPath, skillPath } from "logic/api/apiUrl";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { courseNoti, generalNoti } from "logic/constants/notification";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { courseValid } from "logic/utils/validateUtils";

const CreateNewCoursePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { handleSubmit } = useForm();
  const [coursePosition, setCoursePosition] = useState([
    { positionId: "", isCompulsory: "" },
  ]);
  const [courseSkills, setCourseSkills] = useState([
    { skillId: "", recommendedLevel: "", afterwardLevel: "" },
  ]);
  const [skillList, setSkillList] = useState([]);
  const [coursePic, setCoursePic] = useState(null);
  const [filteredSkillList, setFilteredSkillList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [filteredPositionList, setFilteredPositionList] = useState([]);
  const [imageURL, setImageURL] = useState();
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [platformName, setPlatformName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
    fetchPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    removeSkillItems(courseSkills, skillList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSkills]);

  useEffect(() => {
    removePositionItems(coursePosition, positionList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePosition]);

  useEffect(() => {
    if (imageURL) {
      handleAddNewCourse();
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
      (item) => !rmItems.some((rmItem) => item.id === rmItem.positionId)
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
      toast.error(error?.response?.data);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION_LIST +
        "?PageSize=" +
        100000 +
        "&PageIndex=" +
        1
      );
      setPositionList(response.data.data);
      setFilteredPositionList(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const handleAddNewCourse = async () => {
    try {
      await axiosPrivate.post(coursePath.CREATE_COURSE, {
        name,
        platformName,
        description,
        link,
        imageURL,
        coursePosition,
        courseSkills,
      });
      toast.success(courseNoti.SUCCESS.CREATE);
      setIsLoading(false);
      navigate("/course-list");
    } catch (error) {
      toast.error(error?.response?.data);
      setIsLoading(false);
    }
  };

  const handleAddPositionField = () => {
    if (
      filteredPositionList.length > 0 &&
      coursePosition.length < positionList.length
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
    setIsLoading(true);
    const course = {
      name,
      platformName,
      description,
      link,
      coursePosition,
      courseSkills,
    };
    const valid = courseValid(course);
    setError(valid);

    let check = false;

    for (const key in valid) {
      if (key !== "courseSkills" && key !== "coursePosition" && valid[key] !== "") {
        check = true;
        break; // If any non-empty value is found, exit the loop
      } else if (key === "coursePosition" && Array.isArray(valid[key])) {
        for (const item of valid[key]) {
          for (const itemKey in item) {
            if (item[itemKey] !== "") {
              check = true;
              break; // If any non-empty value is found, exit the loop
            }
          }
          if (check) {
            break; // If any non-empty value is found, exit the loop
          }
        }
      } else if (key === "courseSkills" && Array.isArray(valid[key])) {
        for (const item of valid[key]) {
          for (const itemKey in item) {
            if (item[itemKey] !== "") {
              check = true;
              break; // If any non-empty value is found, exit the loop
            }
          }
          if (check) {
            break; // If any non-empty value is found, exit the loop
          }
        }
      }
    }
    if (!check) {
      if (coursePic) {
        try {
          const imageRef = ref(storage, "images/courses/" + coursePic.name);
          await uploadBytes(imageRef, coursePic).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
              await setImageURL(downloadURL);
            });
          });
        } catch (e) {
          toast.error(generalNoti.ERROR.UPLOAD_FAIL);
        }
      } else {
        setImageURL(defaultCourseImage);
      }
    }
    setIsLoading(false);
  }

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

  const handleSelectDropdownOption = (index, name, value) => {
    const newArray = coursePosition.slice();
    newArray[index][name] = value;
    setCoursePosition(newArray);
  };

  const handleRemoveSkillField = () => {
    let temp = courseSkills.slice();
    temp.pop();
    setCourseSkills(temp);
  };

  const handleRemovePositionField = () => {
    let temp = coursePosition.slice();
    temp.pop();
    setCoursePosition(temp);
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
                <TextField
                  error={error?.name ? true : false}
                  helperText={error?.name}
                  name="name"
                  placeholder="Ex: Object-oriented programming"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => setName(e.target.value)}
                  inputProps={{ maxLength: 100 }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Nền tảng (*)</Label>
                <TextField
                  error={error?.platformName ? true : false}
                  helperText={error?.platformName}
                  name="platformName"
                  placeholder="Ex: Udemy"
                  onChange={(e) => setPlatformName(e.target.value)}
                  onBlur={(e) => setPlatformName(e.target.value)}
                  inputProps={{ maxLength: 100 }}
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label>Link (*)</Label>
              <TextField
                error={error?.link ? true : false}
                helperText={error?.link}
                name="link"
                placeholder="Ex: Udemy"
                onChange={(e) => setLink(e.target.value)}
                onBlur={(e) => setLink(e.target.value)}
                inputProps={{ maxLength: 500 }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Mô tả khóa học *</Label>
              <TextField
                multiline
                error={error?.description ? true : false}
                helperText={error?.description}
                fullWidth
                InputProps={{
                  inputComponent: TextareaAutosize,
                  inputProps: {
                    minRows: 5,
                    maxRows: 8,
                    maxLength: 500,
                    placeholder: "Viết mô tả về khóa học....",
                    onChange: (e) => setDescription(e.target.value),
                    onKeyDown: (e) => setDescription(e.target.value),
                  },
                }}
              />
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
              <div key={index}>
                <FormRow key={index}>
                  <FormGroup>
                    <Label>Vị trí (*)</Label>
                    <Autocomplete
                      disablePortal={false}
                      options={filteredPositionList}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Chọn vị trí"
                          error={
                            error?.coursePosition?.[index]?.positionId
                              ? true
                              : false
                          }
                          helperText={
                            error?.coursePosition?.[index]?.positionId
                          }
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          handleSelectDropdownOption(
                            index,
                            "positionId",
                            newValue.id
                          );
                        } else {
                          handleSelectDropdownOption(index, "positionId", "");
                        }
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Bắt buộc / Không bắt buộc (*)</Label>
                    <Autocomplete
                      disablePortal={false}
                      options={courseOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Lựa chọn"
                          error={
                            error?.coursePosition?.[index]?.isCompulsory
                              ? true
                              : false
                          }
                          helperText={
                            error?.coursePosition?.[index]?.isCompulsory
                          }
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          handleSelectDropdownOption(
                            index,
                            "isCompulsory",
                            newValue.value
                          );
                        } else {
                          handleSelectDropdownOption(index, "isCompulsory", "");
                        }
                      }}
                    />
                  </FormGroup>
                </FormRow>
              </div>
            ))}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              className="mb-2"
            >
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => handleRemovePositionField()}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => handleAddPositionField()}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            {courseSkills.map((courseSkills, index) => (
              <div key={index}>
                <FormGroup>
                  <Label>Kỹ năng (*)</Label>
                  <Autocomplete
                    disablePortal={false}
                    options={filteredSkillList}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Chọn kỹ năng"
                        error={
                          error?.courseSkills?.[index]?.skillId ? true : false
                        }
                        helperText={error?.courseSkills?.[index]?.skillId}
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        onChangeCourseSkill(index, "skillId", newValue.id);
                      } else {
                        onChangeCourseSkill(index, "skillId", "");
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <Label>Trình độ khuyến nghị (*)</Label>
                    <Autocomplete
                      disablePortal={false}
                      options={skillLevel}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Lựa chọn"
                          error={
                            error?.courseSkills?.[index]?.recommendedLevel
                              ? true
                              : false
                          }
                          helperText={
                            error?.courseSkills?.[index]?.recommendedLevel
                          }
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          onChangeCourseSkill(
                            index,
                            "recommendedLevel",
                            newValue.value
                          );
                        } else {
                          onChangeCourseSkill(index, "recommendedLevel", "");
                        }
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Trình độ hoàn thành (*)</Label>
                    <Autocomplete
                      disablePortal={false}
                      options={skillLevel}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Lựa chọn"
                          error={
                            error?.courseSkills?.[index]?.afterwardLevel
                              ? true
                              : false
                          }
                          helperText={
                            error?.courseSkills?.[index]?.afterwardLevel
                          }
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          onChangeCourseSkill(
                            index,
                            "afterwardLevel",
                            newValue.value
                          );
                        } else {
                          onChangeCourseSkill(index, "afterwardLevel", "");
                        }
                      }}
                    />
                  </FormGroup>
                </FormRow>
              </div>
            ))}
            <Stack direction="row" spacing={1} justifyContent="center">
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => handleRemoveSkillField()}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => handleAddSkillField()}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
                isLoading={isLoading}
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

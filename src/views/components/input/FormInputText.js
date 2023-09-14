import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
const FormInputText = (props) => {
  const {
    control,
    name,
    type = "text",
    placeholder = "",
    error= "",
    label= "",
    children,
    ...rest
  } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextField
      helperText={error ? error.message : null}
      type={type}
      error={error? true : false}
      fullWidth
      label={label}
      variant="outlined"
      placeholder={placeholder}
      {...rest}
      {...field}
    />
  );
};

export default FormInputText;
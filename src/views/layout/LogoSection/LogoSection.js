import { useDispatch, useSelector } from "react-redux";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports

import Logo from "views/components/Logo";

const MENU_OPEN = "@customization/MENU_OPEN";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      className="pointer-events-none"
    >
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;

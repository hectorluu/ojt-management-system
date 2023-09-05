// action - state management
import * as actionTypes from "logic/store/actions";

export const initialState = {
  isOpen: [], // for active default menu
  defaultId: "default",
  opened: true,
  borderRadius: 12,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id],
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened,
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius,
      };
    default:
      return state;
  }
};

export default customizationReducer;

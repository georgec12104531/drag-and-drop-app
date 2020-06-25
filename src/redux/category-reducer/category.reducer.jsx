import CategoryTypes from "./category.types";
import { INIT_STATE } from "../../constants/constants";

const INITIAL_STATE = {
  storeData: INIT_STATE,
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  const { REMOVE_CARD, ADD_AND_REMOVE_CARD, ADD_REWARD } = CategoryTypes;
  let newState = state.storeData.slice();
  switch (action.type) {
    case ADD_REWARD:
      const {
        items: { targetGroupIndex, targetCard, dragGroupIndex, dragCard },
      } = action;

      newState[targetGroupIndex].items[targetCard].val =
        newState[dragGroupIndex].items[dragCard].val;
      return { storeData: newState };
      break;
    case REMOVE_CARD:
      const {
        category: { groupIndex, card },
      } = action;
      newState[groupIndex].items[card] = "";
      return { storeData: newState };
      break;
    case ADD_AND_REMOVE_CARD:
      console.log("action", action);
      const {
        category: { current, target, value },
      } = action;
      console.log(current, target, value);
      newState = state.storeData.slice();
      return { storeData: newState };

    default:
      return state;
  }
};

export default categoryReducer;

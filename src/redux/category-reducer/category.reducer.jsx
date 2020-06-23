import CategoryTypes from "./category.types";

const INITIAL_STATE = {
  storeData: [
    { title: "rewards", items: ["", "R1", "R2", "R3", "R4", "R5", "R6"] },
    { title: "category 1", items: ["C1", "R1", "R2", "", "", "", ""] },
    { title: "category 2", items: ["C2", "", "R2", "R3", "", "", ""] },
    { title: "category 3", items: ["C3", "", "", "R3", "", "", ""] },
  ],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  // console.log('Im hit!!!!)
  console.log("intial", state);
  let newState = state.storeData.slice();
  switch (action.type) {
    case CategoryTypes.REMOVE_CARD:
      const {
        category: { groupIndex, card },
      } = action;

      newState[groupIndex].items[card] = "";

      console.log("newState before return", newState);
      return { storeData: newState };
      break;
    case CategoryTypes.ADD_AND_REMOVE_CARD:
      // {
      //   current: {
      //     groupIndex: dragItem.current.groupIndex,
      //     card: dragItem.current.card,
      //   },
      //   target: {
      //     groupIndex: targetItem.groupIndex,
      //     card: targetItem.card,
      //   },
      //   value: dragItemNode.current.textContent,
      // }
      console.log("action", action);
      const {
        category: { current, target, value },
      } = action;
      console.log(current, target, value);

      //   newList[dragItem.current.groupIndex].items[dragItem.current.card] =
      //   "";
      // newList[targetItem.groupIndex].items[targetItem.card] =
      //   dragItemNode.current.textContent;
      newState = state.storeData.slice();
      return { storeData: newState };

    default:
      return state;
  }
};

export default categoryReducer;

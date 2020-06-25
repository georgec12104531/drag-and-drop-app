import CategoryTypes from "./category.types";

export const addReward = (items) => ({
  type: CategoryTypes.ADD_REWARD,
  items,
});

export const addAndRemoveCard = ({ current, target, value }) => ({
  type: CategoryTypes.ADD_AND_REMOVE_CARD,
  category: { current, target, value },
});

export const removeCard = ({ groupIndex, card }) => ({
  type: CategoryTypes.REMOVE_CARD,
  category: { groupIndex, card },
});

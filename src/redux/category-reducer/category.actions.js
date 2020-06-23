import CategoryTypes from "./category.types";

export const addCard = (item1, item2) => ({
  type: CategoryTypes.ADD_CARD,
  category: { item1, item2 },
});

export const addAndRemoveCard = ({ current, target, value }) => ({
  type: CategoryTypes.ADD_AND_REMOVE_CARD,
  category: { current, target, value },
});

export const removeCard = ({ groupIndex, card }) => ({
  type: CategoryTypes.REMOVE_CARD,
  category: { groupIndex, card },
});

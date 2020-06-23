import { combineReducers } from "redux";

import categoryReducer from "./category-reducer/category.reducer.jsx";

export default combineReducers({
  category: categoryReducer,
});

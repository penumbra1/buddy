import { combineReducers } from "redux";
import search from "./search/searchReducer";
import favorites from "./favorites/favoritesReducer";

export default combineReducers({ search, favorites });

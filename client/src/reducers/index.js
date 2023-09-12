import { combineReducers } from "redux";

import authReducer from "./AuthReducers";
import userReducer from "./UserReducers"
import orderReducer from "./OrderReducers"

export const reducers = combineReducers({authReducer,userReducer,orderReducer})
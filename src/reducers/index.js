import { combineReducers } from "redux";

import authReducer from './authReducer.js'
import adminReducer from "./adminReducer.js";
import postReducer from "./postReducer.js";

export const reducers = combineReducers({authReducer , admin: adminReducer,postReducer})
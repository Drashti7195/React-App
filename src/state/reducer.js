import {STORE_USER_LIST,STORE_GET_USER_DATA} from "../type/action-type"
import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';


  const userlist = createReducer([], {
    [STORE_USER_LIST]: (state, { list }) => list, 
  });

  const data = createReducer({}, {
    [STORE_GET_USER_DATA]: (state, { data }) => data, 
  });

  export default combineReducers({
    userlist,
    data
  });
  
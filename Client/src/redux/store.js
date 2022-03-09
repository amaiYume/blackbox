import { createStore, applyMiddleware } from "redux";

import userReducer from "./user/user_reducer";




const store = createStore(userReducer);

export default store;
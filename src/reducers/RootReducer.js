import {combineReducers} from "redux";

// USER REDUCERS
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({ 
    
    User: UserReducer,
});

export default RootReducer;
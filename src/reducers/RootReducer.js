import {combineReducers} from "redux";

// USER REDUCERS
import UserReducer from "./UserReducer";
import PartnerReducer from "./PartnerReducer";

const RootReducer = combineReducers({ 
    User: UserReducer,
    ModifyType: PartnerReducer,
});

export default RootReducer;
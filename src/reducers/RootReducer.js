import {combineReducers} from "redux";

// USER REDUCERS
import UserReducer from "./UserReducer";
import PartnerReducer from "./PartnerReducer";

// ARTICLE REDUCERS
import TypeArticleReducer from "./TypeArticleReducer";

const RootReducer = combineReducers({ 
    User: UserReducer,
    ModifyType: PartnerReducer,
    TypeArticle: TypeArticleReducer
});

export default RootReducer;
import {combineReducers} from "redux";

import {shopReducer} from "@/redux/shop/shopReducer";
import {userReducer} from "@/redux/user/userReducer";

export const rootReducer = combineReducers({
    shop: shopReducer,
    user: userReducer
});
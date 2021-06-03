import {rootReducer} from "@/redux/rootReducer";
import {compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
const Store = createStore(rootReducer, compose( composeWithDevTools()));
export default Store;
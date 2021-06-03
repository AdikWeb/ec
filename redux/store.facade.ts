import Store from "@/redux/store";
export const storeDispatch = <T>(type: string, payload: T) => Store.dispatch({type, payload});

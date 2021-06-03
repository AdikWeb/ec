import {
    LOGIN_USER,
    USER_LOADING,
    SHOW_AUTH_MODAL,
    USER_INVALID_DATA,
    SET_USER_ROLE,
    USER_CHECKED
} from "@/redux/user/user.const";

interface StateProps {
    auth: boolean;
    alerts: string | null;
    authToken: string;
    authLoading: boolean;
    authChecked: boolean;
    userRole: string[]
}

const initState: StateProps = {
    auth: false,
    alerts: null,
    authToken: '',
    authLoading: false,
    authChecked: false,
    userRole: []
}

export const userReducer = (state = initState, action: any) => {
    switch (action.type) {
        case LOGIN_USER :
            return {...state, authToken: action.payload}
        case SHOW_AUTH_MODAL :
            return {...state, openAuthModal: action.payload}
        case USER_LOADING :
            return {...state, authLoading: action.payload}
        case USER_INVALID_DATA :
            return {...state, alerts: action.payload}
        case SET_USER_ROLE :
            return {...state, userRole: action.payload ? state.userRole.concat([action.payload]) : []}
        case USER_CHECKED :
            return {...state, authChecked: action.payload}
    }
    return state;
};
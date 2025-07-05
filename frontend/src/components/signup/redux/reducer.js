import { ERROR_REGISTER_REQUEST_DATA, INIT_REGISTER_REQUEST_DATA, SET_REGISTER_REQUEST_DATA } from "./action";

const initialState = {
    data: [],
    isLoading: false,
    error: ''
}

const registerReducer = (state=initialState, action)=>{
    switch(action.type){
        case INIT_REGISTER_REQUEST_DATA: 
        return {
            ...state,
            isLoading: true,
            error: ''
        }

        case SET_REGISTER_REQUEST_DATA: 
        return {
            ...state,
            data: action.payload,
            isLoading: false,
            error: ''
        }

        case ERROR_REGISTER_REQUEST_DATA: 
        return {
            ...state,
            data: [],
            isLoading: false,
            error: action.payload
        }

        default:
            return state;
    }
};

export default registerReducer
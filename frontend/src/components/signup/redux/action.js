
 export   const INIT_REGISTER_REQUEST_DATA  = 'INIT_REGISTER_REQUEST_DATA';
 export   const SET_REGISTER_REQUEST_DATA = 'SET_REGISTER_REQUEST_DATA'
 export   const ERROR_REGISTER_REQUEST_DATA = 'ERROR_REGISTER_REQUEST_DATA';

 export function initRegisterRequestData(){
    return {type:INIT_REGISTER_REQUEST_DATA }
 }

 export function setRegisterRequestData(data){
    return {type:SET_REGISTER_REQUEST_DATA, payload: data }
 }

 export function errorRegisterRequestData(error){
    return {type:ERROR_REGISTER_REQUEST_DATA, payload: error }
 }
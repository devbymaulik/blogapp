export const INIT_GET_POSTS_DATA = 'INIT_GET_POSTS_DATA';
export const SET_GET_POSTS_DATA  = 'SET_GET_POSTS_DATA';
export const ERROR_GET_POSTS_DATA = 'ERROR_GET_POSTS_DATA';

export function initGetPostsData(){
    return {type:INIT_GET_POSTS_DATA}
};

export function setGetPostsData(data){
    return {type:SET_GET_POSTS_DATA, payload: data}
}

export function errorGetPostsData(error){
    return {type:ERROR_GET_POSTS_DATA, payload: error}
}
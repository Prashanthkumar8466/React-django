import { PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS } from "../../constants";

import {Api} from '../../api'

export const getproducts=()=>{
    return(dispatch)=>{
        dispatch({
            type:PRODUCT_LIST_REQUEST
        });
        Api.get('/product/')
        .then(response =>{
            dispatch({
                type:PRODUCT_LIST_SUCCESS,
                payload:response.data
            });
        })
        .catch(error =>{
            dispatch({
                type:PRODUCT_LIST_FAIL,
                error:error.message
            })
            console.error("fetch data error",error)
        })
    }
}
import { PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS } from "../../constants";

const initialProducts={
    products:[],
    isLoading:false,
    error:null,
}

const Productreducer =(state=initialProducts,action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{
                ...state,
                isLoading:true,
                error:null,
            };
        case PRODUCT_LIST_SUCCESS:
            return{
                ...state,
                isLoading:false,
                products:action.payload,
            };
        case PRODUCT_LIST_FAIL:
            return{
                ...state,
                isLoading:false,
                error:action.error,
            }
        default:
            return state;
    }
}

export default Productreducer
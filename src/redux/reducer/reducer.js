import { init } from "../init"

export const appReducer=(state=init,action)=>{
    switch(action.type){
        case 'Cart_Products':
            return{
                ...state,
                cart:[...state.cart,action.payload]
            };
            default:
                return state
    }
}
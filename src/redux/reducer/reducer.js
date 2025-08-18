import { init } from "../init"

export const appReducer=(state=init,action)=>{
    switch(action.type){
        case 'Cart_Products':
            return{
                ...state,
                cart:[...state.cart,action.payload]
            };
        case 'REMOVE_FROM_CART' :
            return{
                ...state,
                cart:state.cart.filter(product=>product.id !== action.payload)
            }
            default:
                return state
    }
}
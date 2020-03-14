import { GET_MONITOR, SET_LOADING, GET_DETAIL,CLEAR_ID } from '../type'

export default (state, action) => {
    const { type, payload = {} } = action
    const { loading, monitor, total, detail,currentId } = payload

    switch (type) {
        case SET_LOADING:
            return {
                ...state, //对state中状态字段解构
                loading: loading
            };

        case GET_MONITOR:
            return {
                ...state,
                monitor: monitor,
                total: total
            };

        case GET_DETAIL:
            return {
                ...state,
                detail: detail,
                currentId:currentId
            }
     
        case CLEAR_ID:
            return{
                ...state,
                currentId:0
            }    


        default:
            return state;
    }

}
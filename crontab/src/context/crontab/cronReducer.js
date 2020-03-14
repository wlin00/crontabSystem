import { GET_NODE, SET_LOADING } from '../type'

export default (state, action) => {
    const { type, payload = {} } = action
    const { loading, node,total } = payload

    switch (type) {
        case SET_LOADING:
            return {
                ...state, //对state中状态字段解构
                loading: loading
            };

        case GET_NODE:
            return {
                ...state,
                node: node,
                total:total
            };

        default:
            return state;
    }

}
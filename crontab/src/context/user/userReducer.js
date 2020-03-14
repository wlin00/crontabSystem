import { GET_LOGINUSER, GET_ALLUSER,ClEAR_USER, SET_LOADING } from '../type'

export default (state, action) => {
    const { type, payload = {} } = action
    const { loading, list,allUser,total } = payload

    switch (type) {
        case SET_LOADING:
            return {
                ...state, //对state中状态字段解构
                loading: loading
            };

        case ClEAR_USER:
            return {
                ...state,
                loginUser: {}
            };
        case GET_LOGINUSER:
            return {
                ...state,
                list: list,
            };
        case GET_ALLUSER:
            return {
                ...state,
                allUser: allUser,
                total:total,
            };

        default:
            return state;
    }

}
import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import axios from 'axios'
import {message} from 'antd'

import { GET_LOGINUSER,GET_ALLUSER,ClEAR_USER, SET_LOADING } from '../type'



const UserState = props => {
    //初始化状态
    const initialState = {
        list: {},
        allUser:{},
        loading: false,
        total:0,
        // userInfo:{},
        // repos:[]
    };

    //使用useReducer，即state关联Reducer
    const [state, dispatch] = useReducer(UserReducer, initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；

    //实现方法区域                                                          
    //getLoginUser
    const getLoginUser = async _id => { //根据login名获取user信息
        setLoading(true)//只要开始请求数据，更改为loading状态   
        const res = await axios.post('/zjj/user/getUserById',{Id:_id})
        if(res.data.err===-1){
            message.info('参数错误')
            setLoading(false)
            return
        }
        if(res.data.err===-2){
            message.info('用户查询失败，请重试')
            setLoading(false)
            return
        }
        dispatch({
            type: GET_LOGINUSER,
            payload: {
                list: res.data.list[0]
            }
        })
        setLoading(false)
    };

     //getLoginUser
     const getAllUser = async right => { //根据login名获取user信息
        setLoading(true)//只要开始请求数据，更改为loading状态
        const res = await axios.post('/zjj/user/getUserByRight',{right})
        if(res.data.err===-1){
            message.info('参数错误')
            setLoading(false)
            return
        }
        if(res.data.err===-2){
            message.info('查询失败，请重试')
            setLoading(false)
            return
        }
        dispatch({
            type: GET_ALLUSER,
            payload: {
                allUser: res.data.list,
                total: res.data.total
            }
        })
        setLoading(false)
    };

    //clear users
    const clearUser = () => {
        dispatch({
            type: ClEAR_USER
        })
    };

    //set loading
    const setLoading = (loading) => {
        dispatch({
            type: SET_LOADING, //使用dispatch提交到Reducer中
            payload: { loading }
        })
    }

    return (<UserContext.Provider value={{
        list: state.list,
        allUser:state.allUser,
        loading: state.loading,
        total:state.total,
        // userInfo:state.userInfo,
        // repos:state.repos,
        setLoading,
        clearUser,
        getLoginUser,
        getAllUser,
    }}>{props.children}</UserContext.Provider>)


}
export default UserState

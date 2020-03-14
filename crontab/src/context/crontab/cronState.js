import React, { useReducer } from 'react';
import CronContext from './cronContext';
import CronReducer from './cronReducer';
import axios from 'axios'
import {message} from 'antd'

import { GET_NODE, SET_LOADING } from '../type'



const CronState = props => {
    //初始化状态
    const initialState = {
        node: {},
        loading: false,
        total:0

        // allUser:{},
        // total:0,
        // userInfo:{},
        // repos:[]
    };

    //使用useReducer，即state关联Reducer
    const [state, dispatch] = useReducer(CronReducer, initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；

    //实现方法区域                                                          
    //getLoginUser
    const getNode = async () => { //根据login名获取user信息
        setLoading(true)//只要开始请求数据，更改为loading状态
        
        const res = await axios.get('/crontab/job/list',{})
        if(res.status!==200){
            message.info('网络错误')
            setLoading(false)
            return
        }
        if(res.data.errno!==0){
            message.info('请求失败')
            setLoading(false)
            return
        }
        console.log(res.data.data)
        dispatch({
            type: GET_NODE,
            payload: {
                node: res.data.data,
                total:res.data.data.length
            }
        })

        setLoading(false)
    };

    //  //getLoginUser
    //  const getAllUser = async right => { //根据login名获取user信息
    //     setLoading(true)//只要开始请求数据，更改为loading状态
        
    //     const res = await axios.post('http://127.0.0.1:3001/user/getUserByRight',{right})
    //     if(res.data.err===-1){
    //         message.info('参数错误')
    //         setLoading(false)
    //         return
    //     }
    //     if(res.data.err===-2){
    //         message.info('查询失败，请重试')
    //         setLoading(false)
    //         return
    //     }
    //     dispatch({
    //         type: GET_ALLUSER,
    //         payload: {
    //             allUser: res.data.list,
    //             total: res.data.total
    //         }
    //     })

    //     setLoading(false)
    // };

    // //clear users
    // const clearUser = () => {
    //     dispatch({
    //         type: ClEAR_USER
    //     })
    // };

    //set loading
    const setLoading = (loading) => {
        dispatch({
            type: SET_LOADING, //使用dispatch提交到Reducer中
            payload: { loading }
        })
    }

    return (<CronContext.Provider value={{
        node: state.node,
        loading: state.loading,
        total:state.total,

        setLoading,
        getNode,
    }}>{props.children}</CronContext.Provider>)


}
export default CronState

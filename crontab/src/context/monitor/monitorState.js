import React, { useReducer } from 'react';
import MonitorContext from './monitorContext';
import MonitorReducer from './monitorReducer';
import axios from 'axios'
import {message} from 'antd'

import { GET_MONITOR, SET_LOADING,GET_DETAIL,CLEAR_ID } from '../type'



const MonitorState = props => {
    //初始化状态
    const initialState = {
        monitor: {},
        detail:{},
        loading: false,
        total:0,
        currentId:0

    };

    //使用useReducer，即state关联Reducer
    const [state, dispatch] = useReducer(MonitorReducer, initialState) //函数参数1：当前提交的reduver       函数参数2：当前提交的状态值 ；

    //实现方法区域                                                          
    //getMonitor
    const getMonitor = async () => { //根据login名获取user信息
        setLoading(true)//只要开始请求数据，更改为loading状态
        const res = await axios.get('/api/hosts/status',{})
        if(res.status!==200){
            message.info('请求错误')
            setLoading(false)
            return
        }
        dispatch({
            type: GET_MONITOR,
            payload: {
                monitor: res.data,
                total:res.data.length
            }
        })
        setLoading(false)
    };
    // api/graphs/?host_id=3&time_range=latest  


      //getMonitorDetail
      const getMonitorDetail = async (id) => { //根据login名获取user信息
        setLoading(true)//只要开始请求数据，更改为loading状态
        let res = null
        try{
           res = await axios.get(`/api/graphs/?host_id=${id}&time_range=latest`)
        }
        catch(err){
            message.info(err)
            return Promise.reject()
        }
        if(res.status!==200){
            message.info('请求错误')
            setLoading(false)
            return
        }
        dispatch({
            type: GET_DETAIL,
            payload: {
                detail: res.data[0].data,
                currentId:id
            }
        })
        setLoading(false)
    };
   
    //set loading
    const setLoading = (loading) => {
        dispatch({
            type: SET_LOADING, //使用dispatch提交到Reducer中
            payload: { loading }
        })
    }

    //页面销毁，清除当前主机id
    const clearId= ()=>{
        dispatch({
            type:CLEAR_ID,
        })
        
    }

    return (<MonitorContext.Provider value={{
        monitor: state.monitor,
        loading: state.loading,
        total:state.total,
        detail:state.detail,
        currentId:state.currentId,

        setLoading,
        getMonitor,
        getMonitorDetail,
        clearId
    }}>{props.children}</MonitorContext.Provider>)


}
export default MonitorState

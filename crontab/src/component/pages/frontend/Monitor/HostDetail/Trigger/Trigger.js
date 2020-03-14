import React, { useState, useContext, useEffect } from 'react'
import { Typography, Input, Table, Tag, Button } from 'antd'
import MonitorContext from '../../../../../../context/monitor/monitorContext'
import { Link, NavLink, } from 'react-router-dom'


import '../Trigger/Trigger.scss'



const Trigger = (props) => {
    //页面挂载成功，useContext拉取远端数据
    const monitorContext = useContext(MonitorContext)
    const { getMonitorDetail, clearId, monitor, loading, total, detail, currentId,setId } = monitorContext



    useEffect(() => {  //useEffect 重构生命周期didMount

        // eslint-disable-next-line
    }, [])


    console.log(detail)
    console.log('currentId',currentId,typeof currentId)

    // console.log(_id,typeof _id)
    // console.log('monitor', monitor,total)
    // console.log('currentList:',current)


    const { Text } = Typography
    const { Search } = Input

    
    return (
        <div className='Trigger'>
                 222 222 
        </div>
    )
}

export default Trigger





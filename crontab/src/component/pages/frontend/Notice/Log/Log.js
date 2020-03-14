import React, { useState, useContext, useEffect } from 'react'
import { Typography, Input, Table, Tag, message } from 'antd'
import CronContext from '../../../../../context/crontab/cronContext'
import axios from 'axios'
import moment from 'moment'

import '../Log/Log.scss'



const Log = (props) => {
    const [total,setTotal]=useState(0)
    const [logData, setLogData] = useState({})
    const cronContext = useContext(CronContext)
    const { node, getNode, } = cronContext



    const { logName } = props //获取父组件传参


    useEffect(() => {  //useEffect 重构生命周期didMount
        getLog()

        let task = node[logName].name

        console.log('log_name', task)
        // eslint-disable-next-line
    }, [])


    //获取日志列表
    const getLog = () => {
        //由于axios源码内部转换post请求参数为JSON.Stringify
        //所以这里使用URLSearchParams键值对传参
        let param = new URLSearchParams()
        let task = node[logName].name
        param.append('name', task)

        axios.post('/crontab/job/log', param)
            .then((data) => {
                if (data.status === 200) {
                    if (data.data.errno !== 0) {
                        message.info('查看任务日志失败');
                        return
                    }
                    if(data.data.data.length===0){
                        setLogData({})
                    }
                    if (data.data.data.length > 0) {
                        setLogData(data.data.data)
                        setTotal(data.data.data.length)
                    }
                    console.log(data.data.data)

                }
            })
            .catch((err) => { message.info(err) })
    }


    //分页
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${total}条`,
        pageSize: 5,
        current: currentPage,
        total: total,
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        onChange: (current) => changePage(current),
    }

    const changePageSize = (a, b) => {
        console.log(a, b)
    }

    const changePage = (v) => {
        console.log(v)
        setCurrentPage(v)
    }

    // const paginationProps = {
    //     showSizeChanger: true,
    //     showQuickJumper: false,
    //     showTotal: () => `共${totals}条`,
    //     pageSize: this.state.pageSize,
    //     current: page.pageNum,
    //     total: page.total,
    //     onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
    //     onChange: (current) => this.changePage(current),
    // }






    const columns = [
        {
            title: '任务名',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'shell命令',
            dataIndex: 'shell',
            key: 'shell',
            render: text => <span>{text}</span>,
        },
        {
            title: '错误原因',
            dataIndex: 'false',
            key: 'false',
        },
        {
            title: '脚本输出',
            dataIndex: 'output',
            key: 'output',
        },
        {
            title: '计划开始时间',
            dataIndex: 'planTime',
            key: 'planTime',
        },
        {
            title: '实际调度时间',
            dataIndex: 'realTime',
            key: 'realTime',
        },
        {
            title: '开始执行时间',
            dataIndex: 'begin',
            key: 'begin',
        },
        {
            title: '执行结束时间',
            dataIndex: 'end',
            key: 'end',
        },

    ];

    const data = []; // 初始化antd表格
    if (logData.length !== undefined) {
        logData.forEach((item, index) => {
            data.push({
                key: String(index + 1),

                name: item.jobName ? item.jobName : '暂无',
                shell: item.command ? item.command : '暂无',
                false: item.err ? item.err : '暂无',
                output: item.output ? item.output : '暂无',
                planTime: item.planTime ? moment(item.planTime).format('YYYY-MM-DD HH:mm:ss.SSS') : '暂无',
                realTime: item.scheduleTime ? moment(item.scheduleTime).format('YYYY-MM-DD HH:mm:ss.SSS') : '暂无',
                begin: item.startTime ? moment(item.startTime).format('YYYY-MM-DD HH:mm:ss.SSS') : '暂无',
                end: item.endTime ? moment(item.endTime).format('YYYY-MM-DD HH:mm:ss.SSS') : '暂无',


            })

        })
    }

    // if (loading) { return (<Spinner style={{ width: '300px' }}></Spinner>) }
    return (
        <div className='Table3'>
            <div className='Table3-table' style={{ marginBottom: '10px' }}>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>
        </div>
    )
}

export default Log





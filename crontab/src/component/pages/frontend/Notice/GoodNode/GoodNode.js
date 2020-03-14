import React, { useState, useEffect } from 'react'
import { Typography, Input, Table, Tag, message } from 'antd'
// import CronContext from '../../../../../context/crontab/cronContext'
import axios from 'axios'
// import moment from 'moment'

import '../GoodNode/GoodNode.scss'



const GoodNode = (props) => {
    const [goodNode,setGoodNode]=useState([])
    const [total,setTotal]=useState(0)
    // const [logData, setLogData] = useState({})
    // const cronContext = useContext(CronContext)
    // const { node, getNode, } = cronContext
    useEffect(() => {  //useEffect 重构生命周期didMount
        getGoodNode()
        // eslint-disable-next-line
    }, [])


    //获取日志列表
    const getGoodNode = () => {
        //由于axios源码内部转换post请求参数为JSON.Stringify
        //所以这里使用URLSearchParams键值对传参
        // let param = new URLSearchParams()
        // let task = node[logName].name
        // param.append('name', task)

        axios.get('/crontab/worker/list', {})
            .then((data) => {
                if (data.status === 200) {
                    if (data.data.errno !== 0) {
                        message.info('获取健康节点失败');
                        return
                    }
                    if(data.data.data.length===0){
                        setGoodNode([])
                    }
                    if (data.data.data.length > 0) {
                        setGoodNode(data.data.data)
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
            title: '节点IP',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        
    ];

    const data = []; // 初始化antd表格
    if (goodNode.length !== undefined) {
        goodNode.forEach((item, index) => {
            data.push({
                key: String(index + 1),

                name: item ? item : '暂无',


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

export default GoodNode





import React, { useState, useContext, useEffect } from 'react'
import { Typography, Input, Table, Tag, Button } from 'antd'
import MonitorContext from '../../../../../context/monitor/monitorContext'
import Spinner from '../../../../laout/Spinner'
import { Link, NavLink, Route} from 'react-router-dom'

import MonitorDetail from '../HostDetail/MonitorDetail/MonitorDetail'
import Trigger from '../HostDetail/Trigger/Trigger'

import '../HostDetail/HostDetail.scss'



const HostDetail = (props) => {
    //页面挂载成功，useContext拉取远端数据
    const monitorContext = useContext(MonitorContext)
    const { getMonitorDetail, clearId, monitor, loading, total, detail, currentId,setId } = monitorContext

    let _id; //存放当前请求的主机id，首选从redux里拿
    if (currentId) {
        _id = Number(currentId)
    } else {
        _id = Number(props.location.query.id) 
        // _id=3
    }
    console.log('currentId',currentId,typeof currentId)

    useEffect(() => {  //useEffect 重构生命周期didMount
            getMonitorDetail(_id)
        return handleComponentWillUnmount

        // eslint-disable-next-line
    }, [])

    const handleComponentWillUnmount = () => {
        clearId()
    }

    console.log(detail)
    console.log(_id,typeof _id)

    // console.log('monitor', monitor,total)
    // console.log('currentList:',current)


    const { Text } = Typography
    const { Search } = Input

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



    // key: item.id?item.id:String(index+1),
    // name: item.name?item.name:'暂无',
    // ip_addr: item.command?item.command:'暂无',
    // statu: item.cronExpr?item.cronExpr:'暂无',
    // uptime: item.cronExpr?item.cronExpr:'暂无',
    // total_services: item.cronExpr?item.cronExpr:'暂无',
    // last_update: item.cronExpr?item.cronExpr:'暂无',


    const columns = [
        {
            title: '主机',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => <Link to={`/monitor/${index}`} style={{ color: '#337AB7' }}>{text}</Link>,
        },
        {
            title: 'Ip地址',
            dataIndex: 'ip_addr',
            key: 'ip_addr',
        },
        {
            title: '状态',
            dataIndex: 'statu',
            key: 'statu',
        },
        {
            title: '上传时间',
            dataIndex: 'uptime',
            key: 'uptime',
        },
        {
            title: '总服务',
            dataIndex: 'total_services',
            key: 'total_services',
        },
        {
            title: '最后更新',
            dataIndex: 'last_update',
            key: 'last_update',
        },


        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span className='redLink' style={{ color: 'red' }}>删除</span>
                </span>
            ),
        },
    ];

    const data = []; // 初始化antd表格
    // if (allUser.length !== undefined) {
    //     allUser.forEach((item, index) => {
    //         data.push({
    //             key: String(index + 1),
    //             name: item.name ? item.name : '未填写',
    //             phone: item.phone ? item.phone : '未填写',
    //             mail: item.mail ? item.mail : (item.us ? item.us : '未填写'),
    //             tags: item.right === 0 ? ['普通用户'] : ['管理员']
    //         })

    //     })
    // }

    if (monitor.length !== undefined) {
        monitor.forEach((item, index) => {
            data.push({
                key: item.id ? item.id : String(index + 1),
                name: item.name ? item.name : '暂无',
                ip_addr: item.ip_addr ? item.ip_addr : '暂无',
                statu: item.statu ? item.statu : '暂无',
                uptime: item.uptime ? item.uptime : '暂无',
                total_services: item.total_services ? item.total_services : '暂无',
                last_update: item.last_update ? item.last_update : '暂无',
                // oknum: item.cronExpr?item.cronExpr:'暂无',

            })

        })
    }


    if (loading) { return (<Spinner style={{ width: '300px' }}></Spinner>) }
    return (
        <div className='Host'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>已监控主机列表详情</Text>
                <Link to='/monitor' className='HostDetail-link' ><Button className='HostDetail-btn' type='danger'>返回</Button></Link>
            </div>

            {/* <div className='Host-table' style={{ marginBottom: '10px' }}>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div> */}

            <ul className='HostDetail-ul'>
                <li className='HostDetail-ul__li'><NavLink exact activeClassName="HostDetail-ul__li--active" className='HostDetail-ul__li--link' to='/monitor/monitorDetail'>趋势图表</NavLink></li>
                <li className='HostDetail-ul__li'><NavLink exact activeClassName="HostDetail-ul__li--active" className='HostDetail-ul__li--link' to='/monitor/monitorDetail/trigger'>触发事件</NavLink></li>
            </ul>

            <div style={{ width: '100%', }}>
                <Route path='/monitor/monitorDetail' exact component={MonitorDetail} />
                <Route path="/monitor/monitorDetail/trigger" component={Trigger} />

            </div>
        </div>
    )
}

export default HostDetail





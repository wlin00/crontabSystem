import React, { useEffect, useState, useContext } from 'react'
import { Typography, Input, Table, Tag, Modal, Button, message, Icon } from 'antd'
import CronContext from '../../../../../context/crontab/cronContext'
import Spinner from '../../../../laout/Spinner'
import axios from 'axios'
import { SyncOutlined } from '@ant-design/icons';
import Log from '../Log/Log'
import GoodNode from '../GoodNode/GoodNode'

import '../List/List.scss'

const List = () => {

    //reactHook区域
    const cronContext = useContext(CronContext)
    const { node, loading, getNode, total } = cronContext

    useEffect(() => {
        getNode()
    }, [])


    //存储当前是第几个删除任务
    const [current, setCurrent] = useState(0)
    //存储当前是第几个强杀任务
    const [currentKill, setCurrentKill] = useState(0)
    //存储当前某个任务的日志
    const [currentLog, setCurrentLog] = useState(0)
    //存储当前第几个编辑的任务
    const [currentEdit, setCurrentEdit] = useState(0)


    //清空任务操作
    const clearData = () => {
        setName('')
        setShell('')
        setCron('')
    }

    //页面刷新
    const handleRefresh = () => {
        getNode()
    }


    //弹窗表单
    const [name, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [shell, setShell] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [cron, setCron] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    //编辑
    const [nameEdit, setNameEdit] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [shellEdit, setShellEdit] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [cronEdit, setCronEdit] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管



    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handleShellChange = (val) => {
        if (val.target.value.length > 25) { return }
        setShell(val.target.value)
    }
    const handleCronChange = (val) => {
        if (val.target.value.length > 25) { return }
        setCron(val.target.value)
    }

    //编辑任务部分
    const handleNameEditChange = (val) => {
        if (val.target.value.length > 30) { return }
        setNameEdit(val.target.value)
    }
    const handleShellEditChange = (val) => {
        if (val.target.value.length > 25) { return }
        setShellEdit(val.target.value)
    }
    const handleCronEditChange = (val) => {
        if (val.target.value.length > 25) { return }
        setCronEdit(val.target.value)
    }

    //弹窗    
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [visible4, setVisible4] = useState(false)
    const [visible5, setVisible5] = useState(false)
    const [visible6, setVisible6] = useState(false)


    //新建任务部分
    const showModal = () => {
        setVisible(true)
    };

    const handleOk = e => {
        setVisible(false)
        if (!name || !shell || !cron) {
            message.info('请输入正确任务信息！')
            return false;
        }

        axios.post('/crontab/job/save',{name:name,command:shell,cronExpr:cron},{
            headers:{'Content-Type':'json'}
        } )
            .then((data) => {
                if (data.status === 200) {
                    console.log(data)
                    if (data.data.errno !== 0) {
                        message.info(data.data.msg);
                        clearData()
                        return
                    }
                    message.info('添加任务成功')
                    clearData()
                    setTimeout(() => {
                        getNode()
                    }, 300)
                }

            })
            .catch((err) => { message.info(err) })
    };

    const handleCancel = e => {
        setVisible(false)
    };


    //删除任务部分

    const showModal2 = (index) => {
        setVisible2(true)
        console.log('index= ' + index)
        console.log(node)
        setCurrent(index)
        setNameEdit(node[currentEdit].name)
        setShellEdit(node[currentEdit].command)
        setCronEdit(node[currentEdit].cronExpr)
    };

    if(node.length>0){
  

    }

    const handleOk2 = e => {
        setVisible2(false)
        //由于axios源码内部转换post请求参数为JSON.Stringify
        //所以这里使用URLSearchParams键值对传参
        let param = new URLSearchParams()
        let task = node[current].name
        param.append('name', task)

        axios.post('/crontab/job/delete', param)
            .then((data) => {
                if (data.status === 200) {
                    console.log(data)
                    if (data.data.errno !== 0) {
                        message.info('删除失败');
                        return
                    }
                    message.info('删除成功')
                    setTimeout(() => {
                        getNode()
                    }, 300)
                }

            })
            .catch((err) => { message.info(err) })
    };

    const handleCancel2 = e => {
        setVisible2(false)
    };

    //强杀任务部分
    const showModal3 = (index) => {
        setVisible3(true)
        console.log('index= ' + index)
        console.log(node)
        setCurrentKill(index)
    };

    const handleOk3 = e => {
        setVisible3(false)
        //由于axios源码内部转换post请求参数为JSON.Stringify
        //所以这里使用URLSearchParams键值对传参
        let param = new URLSearchParams()
        let task = node[currentKill].name
        param.append('name', task)

        axios.post('/crontab/job/kill', param)
            .then((data) => {
                if (data.status === 200) {
                    console.log(data)
                    if (data.data.errno !== 0) {
                        message.info('强杀任务失败');
                        return
                    }
                    message.info('强杀任务成功')
                    setTimeout(() => {
                        getNode()
                    }, 300)
                }
            })
            .catch((err) => { message.info(err) })
    };

    const handleCancel3 = e => {
        setVisible3(false)
    };


    //查看日志部分
    const showModal4 = (index) => {
        setVisible4(true)
        setCurrentLog(index)
    };

    const handleCancel4 = e => {
        setVisible4(false)
    };

     //查看健康节点部分
     const showModal5 = (index) => {
        setVisible5(true)
    };

    const handleCancel5 = e => {
        setVisible5(false)
    };

    //编辑任务部分
      const showModal6 = (index) => {
        setVisible6(true)
        console.log('index= ' + index)
        console.log(node)
        setCurrentEdit(index)
        setNameEdit(node[index].name)
        setShellEdit(node[index].command)
        setCronEdit(node[index].cronExpr)
    };

    const handleOk6 = e => {
        //由于axios源码内部转换post请求参数为JSON.Stringify
        //所以这里使用URLSearchParams键值对传参
        // let param = new URLSearchParams()
        // let task = node[currentEdit].name
        // param.append('name', task)
        console.log(nameEdit,shellEdit,cronEdit)

        axios.post('/crontab/job/save',{name:nameEdit,command:shellEdit,cronExpr:cronEdit},{
            headers:{'Content-Type':'json'}
        } )
            .then((data) => {
                if (data.status === 200) {
                    console.log(data)
                    if (data.data.errno !== 0) {
                        message.info(data.data.msg);
                        clearData()
                        return
                    }
                    message.info('修改任务成功')
                    clearData()
                    setTimeout(() => {
                        getNode()
                    }, 300)
                }

            })
            .catch((err) => { message.info(err) })

        setVisible6(false)

    };

    const handleCancel6 = e => {
        setVisible6(false)
    };


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
            title: '任务名称',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'shell命令',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: 'cron表达式',
            dataIndex: 'cron',
            key: 'cron',
        },
        {
            title: '正在执行的主机ip',
            dataIndex: 'ip',
            key: 'ip',
            render: text => <span>{text}</span>,
        },

        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    <span onClick={() => showModal6(index + (currentPage - 1) * 5)} className='redLink d_btn' style={{ backgroundColor: '#5bc0de' }}>编辑</span>
                    <span onClick={() => showModal2(index + (currentPage - 1) * 5)} className='redLink d_btn' style={{ backgroundColor: '#d9534f' }}>删除</span>
                    <span onClick={() => showModal3(index + (currentPage - 1) * 5)} className='redLink d_btn' style={{ backgroundColor: '#f0ad4e' }}>强杀</span>
                    <span onClick={() => showModal4(index + (currentPage - 1) * 5)} className='redLink d_btn' style={{ backgroundColor: '#5cb85c' }}>日志</span>

                </span>
            ),
        },
    ];

    const data = [];

    if (node.length !== undefined) {
        node.forEach((item, index) => {
            data.push({
                key: String(index + 1),
                name: item.name,
                order: item.command,
                cron: item.cronExpr,
                ip: '127.0.0.1'
            })

        })
    }


    const { Text } = Typography
    // const {ReloadOutlined } = Input


    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <div className='List'>
            <div>
                <Modal
                    title="新建任务"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div className='List-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">任务名称</Text>
                        <Input
                            style={{marginBottom:'10px'}}
                            className="List-wrap__input"
                            placeholder="请输入任务名"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className='List-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">shell命令</Text>
                        <Input
                            style={{marginBottom:'10px'}}
                            className="List-wrap__input"
                            placeholder="请输入shell命令"
                            value={shell}
                            onChange={handleShellChange}
                        />
                    </div>
                    <div className='List-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">cron表达式</Text>
                        <Input
                            style={{marginBottom:'10px'}}
                            className="List-wrap__input"
                            placeholder="请输入cron表达式"
                            value={cron}
                            onChange={handleCronChange}
                        />
                    </div>

                </Modal>
            </div>
            <div>
                <Modal
                    title='提示'
                    visible={visible2}
                    onOk={handleOk2}
                    onCancel={handleCancel2}
                >
                    <p style={{ fontWeight: 'bold' }}>
                        确认删除此节点？
                    </p>
                </Modal>
            </div>
            <div>
                <Modal
                    title='提示'
                    visible={visible3}
                    onOk={handleOk3}
                    onCancel={handleCancel3}
                >
                    <p style={{ fontWeight: 'bold' }}>
                        确认强制杀死此任务？
                    </p>
                </Modal>
            </div>
            <div>
                <Modal
                    width='1000px'
                    title="查看日志"
                    visible={visible4}
                    footer={null}
                    onCancel={handleCancel4}
                    destroyOnClose={true}

                >
                    <Log logName={currentLog}/>
                </Modal>
            </div>
            <div>
                <Modal
                    width='800px'
                    title="健康节点"
                    visible={visible5}
                    footer={null}
                    onCancel={handleCancel5}
                    destroyOnClose={true}
                >
                    <GoodNode/>
                </Modal>
            </div>
            <div>
                <Modal
                    title="编辑任务"
                    visible={visible6}
                    onOk={handleOk6}
                    onCancel={handleCancel6}
                >
                    <div className='List-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">任务名称</Text>
                        <Input
                            style={{marginBottom:'10px'}}
                            className="List-wrap__input"
                            placeholder="请输入任务名"
                            value={nameEdit}
                            onChange={handleNameEditChange}
                            disabled
                        />
                    </div>
                    <div className='List-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">shell命令</Text>
                        <Input
                            style={{marginBottom:'10px'}}
                            className="List-wrap__input"
                            placeholder="请输入shell命令"
                            value={shellEdit}
                            onChange={handleShellEditChange}
                        />
                    </div>
                    <div className='List-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">cron表达式</Text>
                        <Input
                            style={{marginBottom:'10px'}}
                            className="List-wrap__input"
                            placeholder="请输入cron表达式"
                            value={cronEdit}
                            onChange={handleCronEditChange}
                        />
                    </div>

                </Modal>
            </div>
            
            <div className='List-btnArea'>
                <Button className='List-btnArea__btn' onClick={showModal}>新建任务</Button>
                <Button className='List-btnArea__btn'  onClick={showModal5} style={{ backgroundColor: '#5cb85c' }} >健康节点</Button>
                <SyncOutlined onClick={handleRefresh} className='redLink' style={{ fontSize: '20px', position: 'relative', left: '5px' }} />
            </div>
            <div className='List-area'>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>
        </div>
    )
}


export default List




import React, { useState, useEffect, useContext } from 'react'
import { Typography, Input, Table, Tag } from 'antd'
import UserContext from '../../../../../../context/user/userContext'
import Spinner from '../../../../../laout/Spinner'

import '../Table1/Table1.scss'





const Table1 = (e) => {
    const imgUser = require('../../../../../../pic/27.png')

    const userContext = useContext(UserContext)
    const { getAllUser, allUser, loading, total } = userContext


    useEffect(() => {  //useEffect 重构生命周期didMount
        getAllUser(1)
        // eslint-disable-next-line
    }, [])

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



    const columns = [
        {
            title: '头像',
            dataIndex: 'img',
            key: 'img',
            render: src => <span>
                {<img className='Table1-img'
                    src={src}
                    alt='pic'
                />}
            </span>,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'mail',
            key: 'mail',
        },
        {
            title: '职务',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = 'geekblue';

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span style={{ color: 'red' }}>删除</span>
                </span>
            ),
        },
    ];

    const data = []; // 初始化antd表格
    if (allUser.length !== undefined) {
        allUser.forEach((item, index) => {
            data.push({
                key: String(index + 1),
                img: item.img ? item.img : imgUser,
                name: item.name ? item.name : '未填写',
                phone: item.phone ? item.phone : '未填写',
                mail: item.mail ? item.mail : (item.us ? item.us : '未填写'),
                tags: item.right === 0 ? ['普通用户'] : ['管理员']
            })

        })
    }



    if (loading) { return (<Spinner style={{ width: '300px' }}></Spinner>) }
    return (
        <div className='Table1'>
            <div className='Table1-search' >
                <Text>搜索：</Text>
                <Search
                    maxLength={20}
                    placeholder="输入用户信息搜索"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
            </div>
            <div className='Table1-table' style={{ marginBottom: '10px' }}>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>
        </div>
    )
}

export default Table1





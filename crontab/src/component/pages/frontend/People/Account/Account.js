import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import { Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import UserContext from '../../../../../context/user/userContext'
import Spinner from '../../../../laout/Spinner'

import '../Account/Account.scss'





const Account = (e) => {
    const userContext = useContext(UserContext)
    const { getLoginUser, loading, list } = userContext
    

    useEffect(() => {  //useEffect 重构生命周期didMount
        let _id = localStorage.getItem('_id')
        getLoginUser(_id)

        // eslint-disable-next-line
    }, [])


    //获取列表数据
    const { name, sex, mail, phone,img } = list



    const { Text } = Typography
    const imgPre = require('../../../../../pic/27.png')



    // if (loading) {
    //     return (<Spinner></Spinner>)
    // }   
    //people页显示加载loading

    return (

        <div className='Account'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>账户设置</Text>
            </div>
            <ul className='Account-ul'>
                <li className='Account-ul__li'><NavLink exact activeClassName="Account-ul__li--active" className='Account-ul__li--link' to='/people'>账户设置</NavLink></li>
                <li className='Account-ul__li'><NavLink activeClassName="Account-ul__li--active" className='Account-ul__li--link' to='/people/pwdManage'>更改密码</NavLink></li>

            </ul>
            <div className='Account-wrap'>
                <div className='Account-wrap__box'>
                    <div className='Account-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="Account-wrap__text Account-wrap__lr">真实姓名</Text>
                        <Text className='Account-wrap__textOld'>{name ? name : '未填写'}</Text>
                    </div>
                    <div className='checkUnusual-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="checkUnusual-wrap__text Account-wrap__lr">性别</Text>
                        <Text className='Account-wrap__textOld'>{sex ? (sex===1?'男':'女') : '未填写'}</Text>

                    </div>
                </div>
                
                <div className='Account-wrap__box'>
                    <div className='Account-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="Account-wrap__text Account-wrap__lr">电子邮箱</Text>
                        <Text className='Account-wrap__textOld'>{mail ? mail : '未填写'}</Text>

                    </div>
                    <div className='Account-wrap__div' style={{ justifyContent: 'flex-start' }}>
                        <Text className="Account-wrap__text Account-wrap__lr">联系方式</Text>
                        <Text className='Account-wrap__textOld'>{phone ? phone : '未填写'}</Text>

                    </div>
                </div>

                <div className='Account-wrap__box' style={{ width: '50%', marginTop: '25px' }}>
                    <div className='Account-wrap__div' style={{ justifyContent: 'flex-start',position:'relative',top:'10px' }}>
                        <Text className="Account-wrap__text  Account-wrap__lr">头像</Text>
                        <div className='Account-wrap__iconDiv'>
                            {!img && (<img
                                className='Account-wrap__icon'
                                src={imgPre}
                                alt='pic'
                            />)}
                              {img && (<img
                                className='Account-wrap__icon'
                                src={img}
                                alt='pic'
                            />)}

                        </div>
                    </div>
                </div>

                <div className='Account-wrap__bottom'>
                    <Link to='/people/accountEdit' style={{ height: '100%' }}><Button type='danger' className='Account-wrap__bottom--btn' >编辑</Button></Link>
                </div>
            </div>

        </div>
    )
}

export default Account

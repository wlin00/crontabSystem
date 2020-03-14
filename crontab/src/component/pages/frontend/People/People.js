import React, { useEffect, useContext } from 'react'
import Navbar from '../../../laout/Navbar'
import { Typography } from 'antd'
import Account from './Account/Account'
import AddressBook from './AddressBook/AddressBook'
import DateManage from './DateManage/DateManage'
import PwdManage from '../People/Account/pwdManage/pwdManage'
import AccountEdit from '../People/Account/AccountEdit/AccountEdit'
//页面挂载后获取数据
import UserContext from '../../../../context/user/userContext'

import '../People/People.scss'



import { Link, Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


const People = (e) => {

    const imgUser = require('../../../../pic/27.png')
    const { Text } = Typography
     //实例话context
     const userContext = useContext(UserContext)
     const { getLoginUser, list } = userContext
 
     useEffect(() => {  //useEffect 重构生命周期didMount
         let _id = localStorage.getItem('_id')
         getLoginUser(_id)
         // eslint-disable-next-line
     }, [])
        //获取列表数据
    const { name, img} = list

    //获取账号名
    let username = localStorage.getItem('name').split('@')[0]


    return (<div >
        <Navbar title="西华毕设" />
        <div className="container" >
            <div className='People'>
                <div className='People-left'>
                    <div className='People-left__item1'>人事门户</div>
                    <div className='People-left__pic'>
                        { !img && <img className='People-left__pic--img'
                            src={imgUser}
                            alt='pic'
                        />}
                        {img && <img className='People-left__pic--img'
                            src={img} 
                            alt='pic'
                        />}
                    </div>
                    <div className='People-left__item2'>{name?name:username}</div>
                    <Link className='People-left__item3' to='/people'>
                        <img className='People-left__item3--img'
                            src={require('../../../../pic/27.png')}
                            alt='pic'
                        />
                        <Text className='People-left__item3--text'>账户设置</Text>
                    </Link>
                    <Link className='People-left__item3' to='/people/addressBook'>
                        <img className='People-left__item3--img'
                            style={{ position: 'relative', right: '5%' }}
                            src={require('../../../../pic/28.png')}
                            alt='pic'
                        />
                        <Text style={{ position: 'relative', right: '5%' }} className='People-left__item3--text'>人员管理</Text>
                    </Link>
                    <Link className='People-left__item3' to='/people/dateManage'>
                        <img className='People-left__item3--img'
                            src={require('../../../../pic/13.png')}
                            alt='pic'
                        />
                        <Text className='People-left__item3--text'>日程管理</Text>
                    </Link>
                </div>
                <div className='People-bfc'>
                    <div className='People-right'>
                        {/* 子路由区域 */}

                        <Route path='/people' exact component={Account} />
                        <Route path='/people/addressBook' component={AddressBook} />
                        <Route path='/people/dateManage' component={DateManage} />

                        <Route path='/people/pwdManage' component={PwdManage} />
                        <Route path='/people/AccountEdit' component={AccountEdit} />



                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default People

import React, { useEffect, useContext } from 'react'
import Navbar from '../../../laout/Navbar'
import { Typography } from 'antd'
//页面挂载后获取数据
import UserContext from '../../../../context/user/userContext'
import Host from '../Monitor/Host/Host'
import HostDetail from '../Monitor/HostDetail/HostDetail'
import Trigger from '../Monitor/HostDetail/Trigger/Trigger'


import '../Monitor/Monitor.scss'



import { Link, Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


const Monitor = (e) => {

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
            <div className='Monitor'>
                <div className='Monitor-left'>
                    <div className='Monitor-left__item1'>任务监控</div>
                    <div className='Monitor-left__pic'>
                        { !img && <img className='Monitor-left__pic--img'
                            src={imgUser}
                            alt='pic'
                        />}
                        {img && <img className='Monitor-left__pic--img'
                            src={img} 
                            alt='pic'
                        />}
                    </div>
                    <div className='Monitor-left__item2'>{name?name:username}</div>
                    <Link className='Monitor-left__item3' to='/monitor'>
                        <img className='Monitor-left__item3--img'
                            src={require('../../../../pic/7.png')}
                            alt='pic'
                        />
                        <Text className='Monitor-left__item3--text'>主机列表</Text>
                    </Link>
                    <Link className='Monitor-left__item3' to='/monitor'>
                        <img className='Monitor-left__item3--img'
                            style={{ position: 'relative', right: '5%' }}
                            src={require('../../../../pic/1.png')}
                            alt='pic'
                        />
                        <Text style={{ position: 'relative', right: '5%' }} className='People-left__item3--text'>报警列表</Text>
                    </Link>
                    <Link className='Monitor-left__item3' to='/monitor'>
                        <img className='Monitor-left__item3--img'
                            src={require('../../../../pic/33.png')}
                            alt='pic'
                        />
                        <Text className='Monitor-left__item3--text'>流量监控</Text>
                    </Link>
                </div>
                <div className='Monitor-bfc'>
                    <div className='Monitor-right'>
                        {/* 子路由区域 */}

                        <Route path='/monitor' exact component={Host} />
                        <Route path='/monitor/monitorDetail'   component={HostDetail} />

                        <Route path='/monitor/trigger' exact component={Trigger} />



                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Monitor

import React, { useContext, useEffect } from 'react'
import Navbar from '../../../laout/Navbar'
import { Typography } from 'antd'
import HotProcess from '../Index/HotProcess/HotProcess'
import RequestProcess from '../Index/RequestProcess/RequestProcess'
import TrackProcess from '../Index/TrackProcess/TrackProcess'
import Task from '../Index/Task/Task'
import overTimeReq from './requestArea/overTimeReq/overTimeReq'
import vacationReq from './requestArea/vacationReq/vacationReq'
import checkUnusual from './requestArea/checkUnusual/checkUnusual'
import sealReq from './requestArea/sealReq/sealReq'
import cardReq from './requestArea/cardReq/cardReq'
import expenseReq from './requestArea/expenseReq/expenseReq'
import travelReq from './requestArea/travelReq/travelReq'
import pactReq from './requestArea/pactReq/pactReq'
//页面挂载后获取数据
import Spinner from '../../../laout/Spinner'
import UserContext from '../../../../context/user/userContext'





import { Link, Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


import '../Index/Index.scss'


const Home = (e) => {

    const imgUser = require('../../../../pic/27.png')
    const { Text } = Typography
    //实例话context
    const userContext = useContext(UserContext)
    const { getLoginUser, loading, list } = userContext

    useEffect(() => {  //useEffect 重构生命周期didMount
        let _id = localStorage.getItem('_id')
        getLoginUser(_id)
        // eslint-disable-next-line
    }, [])

    //获取列表数据
    const { name, img} = list

    //获取账号名
    
    let username = localStorage.getItem('name')?localStorage.getItem('name').split('@')[0]:'暂无'


     
  
    return (<div >
        <Navbar title="西华毕设" />
        <div className="container" >
            <div className='Index'>
                <div className='Index-left'>
                    <div className='Index-left__item1'>功能中心</div>
                    <div className='Index-left__pic'>
                        {!img && <img className='Index-left__pic--img'
                            src={imgUser}
                            alt='pic'
                        />}
                        {img &&
                            <img className='Index-left__pic--img'
                                src={img}
                                alt='pic'
                            />}

                    </div>
                    <div className='Index-left__item2'>{name ? name : username}</div>
                    <Link className='Index-left__item3' to='/index/requestProcess'>
                        <img className='Index-left__item3--img'
                            src={require('../../../../pic/16.png')}
                            alt='pic'
                        />
                        <Text className='Index-left__item3--text'>全部功能</Text>
                    </Link>
                    <Link className='Index-left__item3' to='/index/trackProcess'>
                        <img className='Index-left__item3--img'
                            src={require('../../../../pic/37.png')}
                            alt='pic'
                        />
                        <Text className='Index-left__item3--text'>模块2</Text>
                    </Link>
                    <Link className='Index-left__item3' to='/index/task'>
                        <img className='Index-left__item3--img'
                            src={require('../../../../pic/4.png')}
                            alt='pic'
                        />
                        <Text className='Index-left__item3--text'>模块3</Text>
                    </Link>
                </div>
                <div className='Index-bfc'>
                    <div className='Index-right'>
                        {/* 子路由区域 */}

                        <Route path='/index' exact component={HotProcess} />
                        <Route path="/index/requestProcess" component={RequestProcess} />
                        <Route path="/index/trackProcess" component={TrackProcess} />
                        <Route path="/index/task" component={Task} />

                        <Route path="/index/overTimeReq" component={overTimeReq} />
                        <Route path="/index/vacationReq" component={vacationReq} />
                        <Route path="/index/checkUnusual" component={checkUnusual} />
                        <Route path="/index/sealReq" component={sealReq} />
                        <Route path="/index/cardReq" component={cardReq} />
                        <Route path="/index/expenseReq" component={expenseReq} />
                        <Route path="/index/travelReq" component={travelReq} />
                        <Route path="/index/pactReq" component={pactReq} />

                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home

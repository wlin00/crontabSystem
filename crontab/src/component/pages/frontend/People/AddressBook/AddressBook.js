import React from 'react'
import { Typography } from 'antd'

import '../AddressBook/AddressBook.scss'
import { NavLink, Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import Table1 from '../AddressBook/Table1/Table1'
import Table2 from '../AddressBook/Table2/Table2'
import Table3 from '../AddressBook/Table3/Table3'
import Table4 from '../AddressBook/Table4/Table4'
import Table5 from '../AddressBook/Table5/Table5'


const AddressBook = (e) => {


    const { Text } = Typography


    return (
        <div className='AddressBook'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>人员管理</Text>
            </div>

            <div className='AddressBook-wrap'>
                <div className='AddressBook-nav'>
                    <ul className='AddressBook-nav__ul'>

                        <li className='AddressBook-nav__li'>
                            <NavLink className='AddressBook-navLink' exact activeClassName='AddressBook-nav__li--active' to='/people/addressBook'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/10.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>管理员</Text>
                            </NavLink>
                        </li>
                        <li className='AddressBook-nav__li'>
                            <NavLink className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active' to='/people/addressBook/table3'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/5.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>普通用户</Text>
                            </NavLink>
                        </li>

                        {/* <li className='AddressBook-nav__li'>
                            <NavLink className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active' to='/people/addressBook/table2'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/2.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>分类2</Text>
                            </NavLink>
                        </li>
                        <li className='AddressBook-nav__li'>
                        <NavLink className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active'  to='/people/addressBook/table4'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/25.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>分类4</Text>
                        </NavLink>
                        </li> */}
                        {/* <li className='AddressBook-nav__li'>
                            <NavLink className='AddressBook-navLink' activeClassName='AddressBook-nav__li--active' to='/people/addressBook/table5'>
                                <img className='AddressBook-nav__img'
                                    src={require('../../../../../pic/24.png')}
                                    alt='pic'
                                />
                                <Text className='AddressBook-nav__text'>分类5</Text>
                            </NavLink>
                        </li> */}

                    </ul>
                </div>
                <div className='AddressBook-bfc'>
                    <div className='AddressBook-bfc__right'>
                        <Route exact path='/people/addressBook' component={Table1}></Route>

                        <Route exact path='/people/addressBook/table2' component={Table2}></Route>
                        <Route exact path='/people/addressBook/table3' component={Table3}></Route>
                        <Route exact path='/people/addressBook/table4' component={Table4}></Route>
                        <Route exact path='/people/addressBook/table5' component={Table5}></Route>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default AddressBook

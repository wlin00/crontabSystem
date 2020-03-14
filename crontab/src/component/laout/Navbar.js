import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import { Menu, Dropdown, Icon, message, Popconfirm } from 'antd'
import axios from 'axios'

const Navbar = (props) => {
    const { title } = props
    let name = localStorage.getItem('name')
    let login = localStorage.getItem('login')
    let mess = login ? name.split('@')[0] + '，欢迎' : '请登陆'

    useEffect(() => {  //useEffect 重构生命周期didMount -- 记住用户的登陆
        let name = localStorage.getItem('name')
        let login = localStorage.getItem('login')
        console.log(name, login)
        if (!login) {
            message.info('请您先登陆！');
            setTimeout(() => {
                // props.history.push({ pathname: '/' })
                window.location.href = '/'
            }, 1000)
        }
        // eslint-disable-next-line
    }, [])

    const logOut = () => { //摧毁sessionId
        axios.post('/zjj/user/logOut', {}).then((data) => {
            console.log(data, login)
            if (data.status === 200) {
                if (data.data.err === 0) {
                    //注销成功
                    message.info('用户注销成功！');
                    localStorage.removeItem('name') //删除本地缓存
                    localStorage.removeItem('login')
                    setTimeout(() => {
                        // props.history.push({ pathname: '/' })
                        window.location.href = '/'
                    }, 1000)

                } else {
                    message.info('用户注销失败，请重试！');
                    return false
                }
            }
        })
    }

    const cancel = () => {
        message.info('已取消注销')
    }

    const menu = (
        <Menu>
            <Menu.Item>

                {login &&
                    <Popconfirm
                        title="退出登陆"
                        // width={100}
                        style={{ width: '1000px' }}
                        onConfirm={logOut}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span href="#">退出登陆</span>
                    </Popconfirm>
                }

                {!login && <Link to="/">
                    请您登陆
                </Link>}
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className="navbar App-header">
            <div className='nav-color'>
                {title}
            </div>
            <ul className="nav_ul">
                <li><NavLink className="link" activeClassName="nav_active" to="/index">功能中心</NavLink></li>
                <li><NavLink className="link" activeClassName="nav_active" to="/notice">任务发布</NavLink></li>
                <li><NavLink className="link" activeClassName="nav_active" to="/monitor">任务监控</NavLink></li>
                <li><NavLink className="link" activeClassName="nav_active" to="/people">管理中心</NavLink></li>
            </ul>
            <ul className='nav_ul2'>
                <Dropdown overlay={menu} className='dropDown'>
                    {/* // eslint-disable-next-line  */}
                    <li className="link"
                        style={{ fontSize: '21px' }}
                    >
                        {mess}
                        <Icon className='navIcon'
                            spin
                            style={{
                                fontWeight: 'bolder', fontSize: '25px'
                                , position: 'relative', top: '2px'
                            }}
                            type="down" />
                    </li>
                </Dropdown>
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {  //设置默认值
    title: '西华毕设',
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
};
export default Navbar

import React, { useState, useContext, useEffect } from 'react'
import { Button, Input, Typography, message,Icon } from 'antd'
// import axios from 'axios'
import AlertContext from '../../context/alert/alertContext'
import axios from 'axios'

const Login = (props) => {

    const alertContext = useContext(AlertContext) //实例化一个context，调用其中state 的方法
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [password, setPass] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const { Text } = Typography


    useEffect(() => {  //useEffect 重构生命周期didMount -- 记住用户的登陆
        let name = localStorage.getItem('name')
        let login = localStorage.getItem('login')
        console.log(name, login)
        if (login) {
            props.history.push({ pathname: '/index' })
            alertContext.setAlert(`欢迎回来, 尊敬的${name}`, "dark") //此处子组件调用父组件方法，通过函数回调的形式进行传值
        }
        // eslint-disable-next-line
    }, [])



    const clearData = () => {
        setName('')   //clear data 
        setPass('')   //clear data 
    }

    const handleGoRegister = () => {
        props.history.push('/regist')
    }


    // 登陆
    const handleLogin = (e) => {
        let us = username,
            ps = password
        if (!us || !ps) {
            message.info('用户名或密码不能为空');
            return
        };
        // eslint-disable-next-line
        axios.post('/zjj/user/login', { us, ps }).
            then((data) => {
                if (data.status === 200) {
                    if (data.data.err === -3) {
                        message.info('用户名或密码不正确！');
                        clearData();
                    }
                    else if (data.data.err === -5) {
                        message.info('该用户已经登陆！');
                        clearData();
                    }
                    else {
                        if(data.data.msg){
                            localStorage.setItem('name', data.data.msg.name) //登陆信息存在本地缓存
                            localStorage.setItem('login', data.data.msg.login)
                            localStorage.setItem('_id', data.data.data[0]._id)
                            localStorage.setItem('right', data.data.data[0].right) //1--管理员权限；0--普通用户
    
    
                        }
                   
                        
                        props.history.push({ pathname: '/index' })
                        alertContext.setAlert("欢迎登陆！", "dark") //此处子组件调用父组件方法，通过函数回调的形式进行传值
                    }
                }
            })
            .catch((err) => { console.log(err) });
    }

    // 数据双向绑定
    const handleNameChange = (val) => {
        setName(val.target.value)
    }
    const handlePassChange = (val) => {
        setPass(val.target.value)
    }


    return (
        <div className="page-login"
            style={{ backgroundSize: 'cover', width: '100%', height: '100%', backgroundImage: "url(" + require("../../pic/29.jpg") + ")" }}
        >
            {/* <Logo/> */}
            <div className='login-wrap'>
                <div><Text strong className='linkFont'>西华毕设</Text></div>
                <span className='rootFont' >姓名：</span>
                <Input
                    className='login-name loginInp'
                    value={username}
                    placeholder="请输入邮箱账号"
                    onChange={handleNameChange}
                />
                <span className="login-span rootFont">密码：</span>
                <Input
                    className="loginInp"
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={handlePassChange}
                />

                <div className='login-btn'><Button type="primary"
                    onClick={handleLogin}
                >登陆</Button></div>
                <div className='hover-btn'><Icon type='login' className='login-icon' /><span className='loginFont'
                    onClick={handleGoRegister}
                >还没账号，去注册</span></div>
            </div>
        </div>
    )
}






export default Login


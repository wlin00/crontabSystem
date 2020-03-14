import React, {  useState } from 'react'
import { NavLink } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import { Typography, Input, Button, message } from 'antd'

import '../pwdManage/pwdManage.scss'
import axios from 'axios'




const PwdManage = (props) => {



    const [pwdOld, setPwdOld] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [pwdNew1, setPwdNew1] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [pwdNew2, setPwdNew2] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    // const { MonthPicker, RangePicker } = DatePicker;

    // 数据双向绑定
    const handlePwdOldChange = (val) => {
        if (val.target.value.length > 25) { return }
        setPwdOld(val.target.value)
    }
    const handlePwdNew1Change = (val) => {
        if (val.target.value.length > 25) { return }
        setPwdNew1(val.target.value)
    }
    const handlePwdNew2Change = (val) => {
        if (val.target.value.length > 25) { return }
        setPwdNew2(val.target.value)
    }

    const clearData = ()=>{
        setPwdNew1('')
        setPwdNew2('')
        setPwdOld('')
    }
    const handleSubmit = () => {
        let _id = localStorage.getItem('_id')
        if (!pwdOld || !pwdNew1 || !pwdNew2) {
            message.info('请输入原密码/密码！')
            return
        }
        if (pwdNew2 !== pwdNew1) {
            message.info('两次输入密码不一致！')
            return
        }
        if (pwdNew1.length < 6) {
            message.info('密码长度位6-25位')
            return
        }
        if (pwdNew2.length < 6) {
            message.info('密码长度位6-25位')
            return
        }

        axios.post('/zjj/user/updatePwd', { _id, ps: pwdOld, newPs1: pwdNew1, newPs2: pwdNew2 })
            .then((data) => {
                if (data.status === 200) {
                    if (data.data.err === -3) {
                        message.info('该用户不存在');
                        clearData();
                    }
                    else if (data.data.err === -2) {
                        message.info(data.data.msg);
                        clearData();
                    }
                    else {
                        message.info(data.data.msg);
                        clearData();
                    }
                }

            })
            .catch((err) => { message.info(err) })

    }

    const { Text } = Typography

    return (
        <div className='pwdManage'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>账户设置</Text>
            </div>
            <ul className='pwdManage-ul'>
                <li className='pwdManage-ul__li'><NavLink exact activeClassName="pwdManage-ul__li--active" className='Account-ul__li--link' to='/people'>账户设置</NavLink></li>
                <li className='pwdManage-ul__li'><NavLink activeClassName="pwdManage-ul__li--active" className='Account-ul__li--link' to='/people/pwdManage'>更改密码</NavLink></li>

            </ul>
            <div className='pwdManage-wrap'>
                <div className='pwdManage-wrap__box'>
                    <div className='pwdManage-wrap__div' style={{ width: '65%' }}>
                        <Text className="pwdManage-wrap__text">原密码</Text>
                        <Input

                            className="pwdManage-wrap__input"
                            placeholder="请输入原密码"
                            value={pwdOld}
                            onChange={handlePwdOldChange}
                        />
                    </div>
                </div>
                
                <div className='pwdManage-wrap__box'>

                    <div className='pwdManage-wrap__div' style={{ width: '65%' }}>
                        <Text className="pwdManage-wrap__text">新密码</Text>
                        <Input
                            className="pwdManage-wrap__input"
                            placeholder="请输入新密码"
                            value={pwdNew1}
                            type='password'
                            onChange={handlePwdNew1Change}
                        />
                    </div>
                </div>

                <div className='pwdManage-wrap__box' style={{ marginTop: '25px' }}>
                    <div className='pwdManage-wrap__div' style={{ width: '65%' }}>
                        <Text className="pwdManage-wrap__text">确认密码</Text>
                        <Input
                            className="pwdManage-wrap__input"
                            placeholder="请确认新密码"
                            value={pwdNew2}
                            type='password'
                            onChange={handlePwdNew2Change}
                        />
                    </div>

                </div>




                <div className='pwdManage-wrap__bottom'>
                    <Button type='danger' className='pwdManage-wrap__bottom--btn' onClick={handleSubmit}>确认修改</Button>
                </div>
            </div>

        </div>
    )
}

export default PwdManage

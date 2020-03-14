import React, { Component } from 'react'
import { Button, Input, Icon, message } from 'antd'
import axios from 'axios'

class Regist extends Component { //此组件未使用hook重构，因无可复用逻辑和useContext操作；
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            mailNum: '',
            btnMessage: '点击获取邮箱验证码',
            btnFlag: false,
            serverMail: 0 //记录服务器端的邮箱验证码
        }
        this.flag = false
        this.interval = null
    }

    componentWillUnmount(){
        clearTimeout(this.interval)
    }


    //清空数据
    clearData() {
        this.setState({ username: '', password: '', mailNum: '' })
    }

    // 去登陆
    handleGoLogin() {
        this.props.history.push('/login')
    }

    // 注册
    handleRegist() {
        // eslint-disable-next-line 
        let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/ //邮箱正则验证
        let psReg =/^[0-9a-zA-Z]{6,25}$/ //密码正则校验
        let { username: us, password: ps, mailNum, serverMail } = this.state;
        console.log(us, ps, '1', mailNum, '2', serverMail);

        if (!ps || !us) {
            message.info('请输入账号或密码');
            return false
        }
        if (!reg.test(us)) {
            message.info('请输入正确邮箱账号格式');
            return false
        }
        if(!psReg.test(ps)){
            message.info('请输入6-25位数字或字母作为密码');
            return false
        }
        if (mailNum !== serverMail) {
            message.info('邮箱验证码不正确');
            return false;
        }

        // eslint-disable-next-line 
        axios.post('/zjj/user/reg', { us, ps, code: mailNum }).
            then((data) => {
                if (data.status === 200) {
                    console.log(data.data.code, data.status, data.statusText, data.headers);
                    this.setState({ btnFlag: false, btnMessage: '点击获取邮箱验证码' })
                    if (data.data.err === -3) {
                        message.info('该用户已存在！');
                        this.clearData();
                    }
                    else {
                        message.info('用户注册成功');
                        this.clearData();
                    }
                }
            })
            .catch((err) => { console.log(err) });
    }

    //获取验证码
    getNoteValue() {
        if (this.flag) { return } //标识符节流
        this.flag = true
        const { username: mail } = this.state //获取用户注册的邮箱
        // eslint-disable-next-line
        let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/ //邮箱正则验证
        if (!reg.test(mail)) { 
            message.info('请输入正确的邮箱格式');
            setTimeout(()=>{
                window.location.reload() 
             },1000)
        }
        else {
            // eslint-disable-next-line 
            axios.post('/zjj/user/getMailCode', { mail: mail }).
                then((data) => {
                    if (data.status === 200) {
                        console.log(data.data.code, data.status, data.statusText, data.headers);
                        this.setState({ serverMail: data.data.code },
                            () => { console.log('server' + this.state.serverMail, 'client' + this.state.mailNum) })//记录serverMail
                        //60s内禁用按钮
                        this.setState({ btnFlag: true, btnMessage: '60s后可重新获取' })
                        message.info('已发送邮箱验证码');
                        this.interval = setTimeout(() => {
                            this.setState({ btnFlag: false, btnMessage: '点击获取邮箱验证码' })
                        }, 1000 * 60)
                        this.flag = false
                    }
                })
                .catch((err) => { console.log(err); this.flag = false });
        }
    }

    // 数据双向绑定
    handleNameChange(val) {
        if (val.target.value.length > 25) { return }

        this.setState({
            username: val.target.value
        })
    }
    handlePassChange(val) {
        if (val.target.value.length > 25) { return }
        this.setState({
            password: val.target.value
        })
    }
    handleMailChange(val) {
        if (val.target.value.length > 4) { return }
        this.setState({
            mailNum: parseInt(val.target.value)
        })
    }


    render() {
        const { username, password, mailNum } = this.state
        return (
            <div className="page-login"
                 style={{width:'100%',height:'100%',backgroundImage: "url(" + require("../../pic/img2.jpg") + ")"}}     
            >
                {/* <Logo/> */}
                <div className='login-wrap'>
                    <span className='rootFont'>您要注册的账号：</span>
                    <Input
                        className='login-name loginInp'
                        value={username}
                        length={20}
                        placeholder="请输入您要注册的邮箱"
                        onChange={val => this.handleNameChange(val)}
                    />
                    <span className="login-span rootFont">账号密码：</span>
                    <Input
                        className="loginInp"
                        type="password"
                        length={20}
                        placeholder="请输入注册的密码(至少六位字母或数字)"
                        value={password}
                        onChange={val => this.handlePassChange(val)}
                    />
                    <Button
                        disabled={this.state.btnFlag}
                        onClick={() => this.getNoteValue()}
                        className="mail-btn">{this.state.btnMessage}</Button>
                    <Input
                        // maxLength={4}
                        type="number"
                        className='login-name'
                        placeholder="请输入4位邮箱验证码"
                        value={mailNum}
                        onChange={val => this.handleMailChange(val)}
                    />
                    <div className='login-btn'><Button type="primary"
                        onClick={this.handleRegist.bind(this)}
                    >注册</Button></div>
                    <div className='hover-btn'><Icon type='login' className='login-icon' /><span className='loginFont'
                        onClick={this.handleGoLogin.bind(this)}
                    >已有账号，去登陆</span></div>
                </div>
            </div>
        )
    }


}



export default Regist


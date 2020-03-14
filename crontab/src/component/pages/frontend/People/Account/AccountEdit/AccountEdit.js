import React, { useEffect, useState, useContext, useRef } from 'react'
import { Typography, Input, Button, Select, message, Icon, Upload } from 'antd'
import { Link } from 'react-router-dom'
import UserContext from '../../../../../../context/user/userContext'
import Spinner from '../../../../../laout/Spinner'
import axios from 'axios'
import '../AccountEdit/AccountEdit.scss'




const AccountEdit = (props) => {
    const userContext = useContext(UserContext) //实例话context
    const { getLoginUser, loading, list } = userContext

    const fileUpload = useRef(null)



    useEffect(() => {  //useEffect 重构生命周期didMount
        let _id = localStorage.getItem('_id')
        getLoginUser(_id)
        // eslint-disable-next-line
    }, [])
    const { name: name_api, mail: mail_api, phone: phone_api, img: img_api } = list


    const [username, setName] = useState(name_api ? name_api : ''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [phone, setPhone] = useState(phone_api ? phone_api : ''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [mail, setMail] = useState(mail_api ? mail_api : ''); // reactHook 重构： 使用useState重构state，进行状态接管



    const { Text } = Typography
    const { Option } = Select
    const reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/ //邮箱正则验证


    // 数据双向绑定
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 20) { return }
        setName(val.target.value)
    }
    const handlePhoneChange = (val) => {
        if (val.target.value.length > 35) { return }
        setPhone(val.target.value)
    }
    const handleMailChange = (val) => {
        if (val.target.value.length > 35) { return }
        setMail(val.target.value)
    }

    const clearData = () => {
        setName('')
        setType('')
        setMail('')
        setPhone('')
    }
    const handleSubmit = () => {
        if (!type || !username || !mail || !phone) {
            message.info('请正确输入用户信息')
            clearData()
            return
        }
        if (username.length < 2 || username.length > 35) {
            message.info('用户姓名长度为2-35位之间')
            clearData()
            return
        }
        if (!reg.test(mail)) {
            message.info('请输入正确邮箱格式')
            clearData()
            return
        }
        if (mail.length < 8 || mail.length > 35) {
            message.info('用户邮箱长度为8-35位之间')
            clearData()
            return
        }
        if (phone.length < 8 || phone.length > 35) {
            message.info('联系方式长度为8-35位之间')
            clearData()
            return
        }
        let _id = localStorage.getItem('_id')
        let sex = type === '男' ? 1 : 2
        let _phone = parseInt(phone)

        axios.post('/zjj/user/updateUser', { _id, name: username, sex, mail, phone: _phone }).then(
            (data) => {
                if (data.status === 200) {
                    if (data.data.err === -1) {
                        message.info('参数错误');
                        clearData();
                    }
                    else if (data.data.err === -2) {
                        message.info('服务器错误,请刷新');
                        clearData();
                    }
                    else {
                        message.info('更改成功');
                        clearData();
                        setTimeout(() => {
                            props.history.push({ pathname: '/people' })
                        }, 1000)
                    }
                }
            })

    }
    const updateImg = (imgUrl) => {
        let _id = localStorage.getItem('_id')
        axios.post('/zjj/user/updateImg', { _id, img: imgUrl }).then(
            (data) => {
                if (data.status === 200) {
                    if (data.data.err === -1) {
                        message.info('参数错误');
                    }
                    else if (data.data.err === -2) {
                        message.info('服务器错误,请刷新');
                    }
                    else {
                        message.info('上传成功');
                        setTimeout(() => {
                            props.history.push({ pathname: '/people' })
                        }, 1000)
                    }
                }
            })
    }

    const handleSubmit2 = () => {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        if (fileUpload.current.files[0] === undefined) {
            message.info('请上传文件！')
            return
        }
        let formData = new FormData()
        formData.append('file', fileUpload.current.files[0])


        axios.post('/zjj/file/upload', formData,config).then(data => {
            if (data.status === 200) {
                if (data.data.err === -1) {
                    message.info('上传文件过大！')
                    return
                }
                if (data.data.err === -2) {
                    message.info('上传文件类型不正确！')
                    return
                }
                let link = 'http://l1nkkk.xyz:3001'
                let imgUrl = data.data.img

                return updateImg(link+imgUrl)

            }
        }).catch(err => {
            message.ingo(err)
        })


    }



    if (loading) { return (<Spinner></Spinner>) }
    return (
        <div className='AccountEdit'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>账户编辑</Text>
                <Link to='/people' className='AccountEdit-link' ><Button className='AccountEdit-btn' type='danger'>返回</Button></Link>
            </div>
            <div className='AccountEdit-wrap'>
                <div className='AccountEdit-wrap__box'>
                    <div className='AccountEdit-wrap__div'>
                        <Text className="AccountEdit-wrap__text">真实姓名</Text>
                        <Input
                            className="AccountEdit-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className='checkUnusual-wrap__div'>
                        <Text className="checkUnusual-wrap__text">性别</Text>
                        <Select
                            className="checkUnusual-wrap__input"
                            placeholder="请选择性别"
                            onChange={handleTypeChange}
                        >
                            <Option value='男'>男</Option>
                            <Option value='女'>女</Option>
                        </Select>
                    </div>
                </div>
                
                <div className='AccountEdit-wrap__box'>
                    <div className='AccountEdit-wrap__div'>
                        <Text className="Account-wrap__text">电子邮箱</Text>
                        <Input
                            className="AccountEdit-wrap__input"
                            placeholder="请输入邮箱"
                            value={mail}
                            onChange={handleMailChange}
                        />
                    </div>
                    <div className='AccountEdit-wrap__div'>
                        <Text className="Account-wrap__text">联系方式</Text>
                        <Input
                            className="AccountEdit-wrap__input"
                            placeholder="请输入电话/座机"
                            value={phone}
                            type='number'
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>

                <div className='AccountEdit-wrap__bottom'>
                    <Button className='AccountEdit-wrap__bottom--btn' onClick={handleSubmit}>保存</Button>
                </div>
            </div>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>头像编辑</Text>
            </div>
            <div className='AccountEdit-wrap__box' style={{ width: '50%', marginTop: '25px' }}>
                <div className='AccountEdit-wrap__div' style={{ position: 'relative', top: '50px', left: '7%' }}>
                    <Text className="AccountEdit-wrap__text">头像</Text>
                    <input type="file" ref={fileUpload} />
                </div>
            </div>
            <div className='AccountEdit-wrap__bottom'>
                <Button className='AccountEdit-wrap__bottom--btn' onClick={handleSubmit2}>保存</Button>
            </div>
        </div>
    )
}

export default AccountEdit



//


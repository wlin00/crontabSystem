import React, { useState
    // , useContext
 } from 'react'
import { Typography, Input, Button, DatePicker,Select } from 'antd'
import {Link} from 'react-router-dom'
import '../checkUnusual/checkUnusual.scss'



const CheckUnusual = () => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [time, setTime] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管


    const { Text } = Typography
    const { Option } = Select

    // 数据双向绑定
    const handleTitleChange = (val) => {
        if(val.target.value.length>30){return}
        setTitle(val.target.value)
    }
    const handleNameChange = (val) => {
        if(val.target.value.length>30){return}
        setName(val.target.value)
    }
    const handleTimeChange = (val) => {
        if(val.target.value.length>5){return}
        setTime(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if(val.target.value.length>140){return}
        setNotice(val.target.value)
    }
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleSubmit = () => {
        console.log(type)
    }

    return (
        <div className='checkUnusual'>
            <div className='navText'>
                <Text strong className='navFont'>考核异常申请</Text>
            </div>
            <div className='checkUnusual-wrap'>
                <div className='checkUnusual-wrap__title'>考核异常申请</div>
                <div className='checkUnusual-wrap__box'>
                    <div className='checkUnusual-wrap__div'>
                        <Text  className="checkUnusual-wrap__text">主题</Text>
                        <Input
                            className="checkUnusual-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='checkUnusual-wrap__div'>
                        <Text  className="checkUnusual-wrap__text">姓名</Text>
                        <Input
                            className="checkUnusual-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='checkUnusual-wrap__box'>
                    <div className='checkUnusual-wrap__div'>
                        <Text  className="checkUnusual-wrap__text">日期</Text>
                        <DatePicker className="checkUnusual-wrap__input"></DatePicker>
                        </div>
                    <div className='checkUnusual-wrap__div'>
                        <Text  className="checkUnusual-wrap__text">缺勤时间</Text>
                        <Input
                            className="checkUnusual-wrap__input"
                            placeholder="请输入小时数"
                            value={time}
                            type='number'
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>

                <div className='checkUnusual-wrap__box' style={{marginTop:'25px',width:'50%'}}>
                    <div className='checkUnusual-wrap__div'>
                        <Text  className="checkUnusual-wrap__text">休假类型</Text>
                        <Select
                            className="checkUnusual-wrap__input"
                            placeholder="请输入回报方式"
                            onChange={handleTypeChange}
                        >

                            <Option value='1'>选项一</Option>
                            <Option value='2'>选项二</Option>
                            <Option value='3'>选项三</Option>

                        </Select>
                    </div>
                    
                </div>

                    
                    <div className='checkUnusual-wrap__notice'>
                        <Text  className="checkUnusual-wrap__text">备注</Text>
                        <textarea
                            className="checkUnusual-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>

                <div className='checkUnusual-wrap__bottom'>
                    <Button type='danger' className='checkUnusual-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{height:'100%'}}><Button className='checkUnusual-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default CheckUnusual

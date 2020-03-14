import React, { useState
    // , useContext
 } from 'react'
import { Typography, Input, Button, DatePicker,Select } from 'antd'
import {Link} from 'react-router-dom'

import '../vacationReq/vacationReq.scss'



const VacationReq = (e) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [time, setTime] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [work, setWork] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    // const { MonthPicker, RangePicker } = DatePicker;
    const { Option } = Select
    const { Text } = Typography
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
    const handleWorkChange = (val) => {
        if(val.target.value.length>25){return}
        setWork(val.target.value)
    }
    const handleSubmit = () => {
        console.log(type,username)
    }



    return (
        <div className='vacationReq'>
            <div className='navText'>
                <Text strong className='navFont'>休假及外出申请</Text>
            </div>

            <div className='vacationReq-wrap'>
                <div className='vacationReq-wrap__title'>休假及外出申请</div>
                <div className='vacationReq-wrap__box'>
                    <div className='vacationReq-wrap__div'>
                        <Text  className="vacationReq-wrap__text">主题</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='vacationReq-wrap__div'>
                        <Text  className="vacationReq-wrap__text">姓名</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='vacationReq-wrap__box'>
                    <div className='vacationReq-wrap__div'>
                        <Text  className="vacationReq-wrap__text">日期</Text>
                        <DatePicker className="vacationReq-wrap__input"></DatePicker>
                        </div>
                    <div className='vacationReq-wrap__div'>
                        <Text  className="vacationReq-wrap__text">申请时长</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入小时数"
                            value={time}
                            type='number'
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{marginTop:'25px'}}>
                    <div className='vacationReq-wrap__div'>
                        <Text  className="vacationReq-wrap__text">休假类型</Text>
                        <Select
                            className="vacationReq-wrap__input"
                            placeholder="请选择回报方式"
                            onChange={handleTypeChange}
                        >

                            <Option value='1'>选项一</Option>
                            <Option value='2'>选项二</Option>
                            <Option value='3'>选项三</Option>

                        </Select>
                    </div>
                    <div className='vacationReq-wrap__div' >
                        <Text  className="vacationReq-wrap__text">休假单位</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入工作内容"
                            value={work}
                            onChange={handleWorkChange}
                        />
                    </div>
                </div>

                    
                    <div className='vacationReq-wrap__notice'>
                        <Text  className="vacationReq-wrap__text">申请原因</Text>
                        <textarea
                            className="vacationReq-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>

               
                <div className='vacationReq-wrap__bottom'>
                    <Button type='danger' className='vacationReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{height:'100%'}}><Button className='vacationReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>
                

        </div>
    )
}

export default VacationReq

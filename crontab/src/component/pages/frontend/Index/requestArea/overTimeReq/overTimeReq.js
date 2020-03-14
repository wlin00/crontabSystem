import React, { useState
    // , useContext
 } from 'react'
import { Typography, Input, Button, DatePicker } from 'antd'
import {Link} from 'react-router-dom'
import '../overTimeReq/overTimeReq.scss'



const OverTimeReq = () => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [time, setTime] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [payback, setPayback] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [work, setWork] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    // const { MonthPicker, RangePicker } = DatePicker;

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
    const handlePaybackChange = (val) => {
        if(val.target.value.length>25){return}
        setPayback(val.target.value)
    }
    const handleWorkChange = (val) => {
        if(val.target.value.length>25){return}
        setWork(val.target.value)
    }
    const handleSubmit = () => {
    }

    return (
        <div className='overTimeReq'>
            <div className='navText'>
                <Text strong className='navFont'>加班申请</Text>
            </div>
            <div className='overTimeReq-wrap'>
                <div className='overTimeReq-wrap__title'>加班申请</div>
                <div className='overTimeReq-wrap__box'>
                    <div className='overTimeReq-wrap__div'>
                        <Text  className="overTimeReq-wrap__text">主题</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='overTimeReq-wrap__div'>
                        <Text  className="overTimeReq-wrap__text">姓名</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='overTimeReq-wrap__box'>
                    <div className='overTimeReq-wrap__div'>
                        <Text  className="overTimeReq-wrap__text">日期</Text>
                        <DatePicker className="overTimeReq-wrap__input"></DatePicker>
                        </div>
                    <div className='overTimeReq-wrap__div'>
                        <Text  className="overTimeReq-wrap__text">申请时长</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入小时数"
                            value={time}
                            type='number'
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>

                <div className='overTimeReq-wrap__box' style={{marginTop:'25px'}}>
                    <div className='overTimeReq-wrap__div'>
                        <Text  className="overTimeReq-wrap__text">回报方式</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入回报方式"
                            value={payback}
                            onChange={handlePaybackChange}
                        />
                    </div>
                    <div className='overTimeReq-wrap__div' >
                        <Text  className="overTimeReq-wrap__text">工作内容</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入工作内容"
                            value={work}
                            onChange={handleWorkChange}
                        />
                    </div>
                </div>

                    
                    <div className='overTimeReq-wrap__notice'>
                        <Text  className="overTimeReq-wrap__text">备注</Text>
                        <textarea
                            className="overTimeReq-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>

                <div className='overTimeReq-wrap__bottom'>
                    <Button type='danger' className='overTimeReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{height:'100%'}}><Button className='overTimeReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default OverTimeReq

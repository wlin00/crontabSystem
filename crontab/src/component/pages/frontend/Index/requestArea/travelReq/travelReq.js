import React, {
    useState
    // , useContext
} from 'react'
import { Typography, Input, Button, DatePicker, Radio } from 'antd'
import { Link } from 'react-router-dom'
import '../travelReq/travelReq.scss'

const TravelReq = () => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [time, setTime] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [radioValue, setRadioValue] = useState(1)


    const { Text } = Typography
    // 数据双向绑定
    const handleTitleChange = (val) => {
        if (val.target.value.length > 30) { return }
        setTitle(val.target.value)
    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handleTimeChange = (val) => {
        if (val.target.value.length > 5) { return }
        setTime(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if (val.target.value.length > 140) { return }
        setNotice(val.target.value)
    }
    const handleRadioChange = (val) => {
        setRadioValue(val.target.value)
    }
    const handleSubmit = () => {
    }

    return (
        <div className='travelReq'>
            <div className='navText'>
                <Text strong className='navFont'>差旅申请</Text>
            </div>
            <div className='travelReq-wrap'>
                <div className='travelReq-wrap__title'>差旅申请</div>
                <div className='travelReq-wrap__box'>
                    <div className='travelReq-wrap__div'>
                        <Text  className="travelReq-wrap__text">主题</Text>
                        <Input
                            className="travelReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='travelReq-wrap__div'>
                        <Text  className="travelReq-wrap__text">姓名</Text>
                        <Input
                            className="travelReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>

                <div className='travelReq-wrap__box' style={{width:'50%',marginTop:'25px'}}>
                    <div className='travelReq-wrap__div'>
                        <Text  className="travelReq-wrap__text">申请类型</Text>
                        <Radio.Group onChange={handleRadioChange}
                                     value={radioValue}
                                     className="travelReq-wrap__input"
                                     >
                            <Radio value={1}>国内出差</Radio>
                            <Radio value={2}>国外出差</Radio>
                        </Radio.Group>
                    </div>
                </div>
                
                <div className='travelReq-wrap__box'>
                    <div className='travelReq-wrap__div'>
                        <Text  className="travelReq-wrap__text">开始时间</Text>
                        <DatePicker className="travelReq-wrap__input"></DatePicker>
                    </div>
                    <div className='travelReq-wrap__div'>
                        <Text  className="travelReq-wrap__text">出差天数</Text>
                        <Input
                            className="travelReq-wrap__input"
                            placeholder="请输入出差时间(天)"
                            value={time}
                            type='number'
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>


                <div className='travelReq-wrap__notice'>
                    <Text  className="travelReq-wrap__text">出差事由</Text>
                    <textarea
                        className="travelReq-wrap__textarea"
                        value={notice}
                        type='textarea'
                        onChange={handleNoticeChange}
                    />
                </div>

                <div className='travelReq-wrap__bottom'>
                    <Button type='danger' className='travelReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess/personnel' style={{ height: '100%' }}><Button className='travelReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default TravelReq

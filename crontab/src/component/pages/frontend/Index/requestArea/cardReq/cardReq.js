import React, {
    useState
    // , useContext
} from 'react'
import { Typography, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import '../cardReq/cardReq.scss'



const CardReq = () => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [mail, setMail] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [number, setNumber] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [called, setCalled] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管


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
    const handleMailChange = (val) => {
        if (val.target.value.length > 5) { return }
        setMail(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if (val.target.value.length > 140) { return }
        setNotice(val.target.value)
    }
    const handleNumberChange = (val) => {
        if (val.target.value.length > 25) { return }
        setNumber(val.target.value)
    }
    const handleCalledChange = (val) => {
        if (val.target.value.length > 25) { return }
        setCalled(val.target.value)
    }
    const handleSubmit = () => {
        console.log(called)
    }

    return (
        <div className='cardReq'>
            <div className='navText'>
                <Text strong className='navFont'>名片申请</Text>
            </div>
            <div className='cardReq-wrap'>
                <div className='cardReq-wrap__title'>名片申请</div>
                <div className='cardReq-wrap__box'>
                    <div className='cardReq-wrap__div'>
                        <Text  className="cardReq-wrap__text">主题</Text>
                        <Input
                            className="cardReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='cardReq-wrap__div'>
                        <Text  className="cardReq-wrap__text">姓名</Text>
                        <Input
                            className="cardReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='cardReq-wrap__box'>
                    <div className='cardReq-wrap__div'>
                        <Text  className="cardReq-wrap__text">职称</Text>
                        <Input
                            className="cardReq-wrap__input"
                            placeholder="请输入职称"
                            value={called}
                            onChange={handleCalledChange}
                        />
                    </div>
                    <div className='cardReq-wrap__div'>
                        <Text  className="cardReq-wrap__text">电子邮箱</Text>
                        <Input
                            className="cardReq-wrap__input"
                            placeholder="请输入您的邮箱"
                            value={mail}
                            onChange={handleMailChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{marginTop:'25px',width:'50%'}}>
                    <div className='vacationReq-wrap__div' >
                        <Text  className="vacationReq-wrap__text">联系方式</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入联系方式"
                            value={number}
                            type='number'
                            onChange={handleNumberChange}
                        />
                    </div>
                </div>


                <div className='cardReq-wrap__notice'>
                    <Text  className="cardReq-wrap__text">说明</Text>
                    <textarea
                        className="cardReq-wrap__textarea"
                        value={notice}
                        type='textarea'
                        onChange={handleNoticeChange}
                    />
                </div>

                <div className='cardReq-wrap__bottom'>
                    <Button type='danger' className='cardReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{ height: '100%' }}><Button className='cardReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default CardReq

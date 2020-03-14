import React, {
    useState
    // , useContext
} from 'react'
import { Typography, Input, Button, DatePicker,Select} from 'antd'
import { Link } from 'react-router-dom'
import '../expenseReq/expenseReq.scss'



const ExpenseReq = () => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [money, setMoney] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState('')
    const [receip,setReceip] = useState('')
    const [account,setAccount] = useState('')

    const { Text } = Typography
    const { Option } = Select

    // 数据双向绑定
    const handleTitleChange = (val) => {
        if (val.target.value.length > 30) { return }
        setTitle(val.target.value)
    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handleMoneyChange = (val) => {
        if (val.target.value.length > 25) { return }
        setMoney(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if (val.target.value.length > 140) { return }
        setNotice(val.target.value)
    }
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleReceiptChange =(val) =>{
        if (val.target.value.length > 35) { return }
        setReceip(val.target.value)
    }
    const handleAccountChange =(val) =>{
        if (val.target.value.length > 35) { return }
        setAccount(val.target.value)
    }
    const handleSubmit = () => {
        console.log(type)
    }

    return (
        <div className='expenseReq'>
            <div className='navText'>
                <Text strong className='navFont'>费用报销</Text>
            </div>
            <div className='expenseReq-wrap'>
                <div className='expenseReq-wrap__title' style={{marginBottom:'1px'}}>费用报销</div>
                <div className='expenseReq-wrap__box' style={{marginBottom:'-20px'}}>
                    <div className='expenseReq-wrap__div' >
                        <Text  className="expenseReq-wrap__text">主题</Text>
                        <Input
                            className="expenseReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='expenseReq-wrap__div'>
                        <Text  className="expenseReq-wrap__text">姓名</Text>
                        <Input
                            className="expenseReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='expenseReq-wrap__box'>
                    <div className='expenseReq-wrap__div'>
                        <Text  className="expenseReq-wrap__text">付款日期</Text>
                        <DatePicker className="expenseReq-wrap__input"></DatePicker>
                    </div>
                    <div className='expenseReq-wrap__div'>
                        <Text  className="expenseReq-wrap__text">报销金额</Text>
                        <Input
                            className="expenseReq-wrap__input"
                            placeholder="请输入报销金额数(元)"
                            value={money}
                            type='number'
                            onChange={handleMoneyChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{ marginTop: '15px' }}>
                    <div className='vacationReq-wrap__div'>
                        <Text  className="vacationReq-wrap__text">付款方式</Text>
                        <Select
                            className="vacationReq-wrap__input"
                            placeholder="请选择付款方式"
                            onChange={handleTypeChange}
                        >
                            <Option value='银行卡'>银行卡</Option>
                            <Option value='支付宝'>支付宝</Option>

                        </Select>
                    </div>
                    <div className='vacationReq-wrap__div' >
                        <Text  className="vacationReq-wrap__text">发票抬头</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入发票抬头"
                            value={receip}
                            onChange={handleReceiptChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{ marginTop: '15px',width:'50%' }}>
                    <div className='vacationReq-wrap__div' >
                        <Text  className="vacationReq-wrap__text">交易账号</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入银行卡号/支付宝账号"
                            value={account}
                            onChange={handleAccountChange}
                        />
                    </div>
                </div>


                <div className='expenseReq-wrap__notice'>
                    <Text  className="expenseReq-wrap__text">说明</Text>
                    <textarea
                        className="expenseReq-wrap__textarea"
                        value={notice}
                        type='textarea'
                        onChange={handleNoticeChange}
                    />
                </div>

                <div className='expenseReq-wrap__bottom'>
                    <Button type='danger' className='expenseReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess/expense' style={{ height: '100%' }}><Button className='expenseReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default ExpenseReq

import React, { useState } from 'react'
import { Typography, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

import '../NewOrder/NewOrder.scss'

const NewOrder = () => {
    const { Text } = Typography
    const [name, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [order, setOrder] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [cron, setCron] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    const handleNameChange = (val) => {
        if (val.target.value.length > 25) { return }
        setName(val.target.value)
    }

    const handleOrderChange = (val) => {
        if (val.target.value.length > 25) { return }
        setOrder(val.target.value)
    }

    const handleCronChange = (val) => {
        if (val.target.value.length > 35) { return }
        setCron(val.target.value)
    }

    const handleSubmit = () => {
        console.log(name,order,cron)
    }
    return (
        <div className='NewOrder'>
            <div className='NewOrder-btnArea'>
                <Link className='NewOrder-btnArea__btn' to='/notice' style={{ backgroundColor: '#ff0000' }} >返回</Link>
                <Text className='NewOrder-btnArea__font'>编辑任务</Text>
            </div>


            <div className='NewOrder-wrap'>
                <div className='NewOrder-wrap__box' style={{ marginTop: '25px', width: '100%' }}>
                    <div className='NewOrder-wrap__div' >
                        <Text className="NewOrder-wrap__text">任务名称</Text>
                        <Input
                            className="NewOrder-wrap__input"
                            placeholder="请输入任务名称"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>

                <div className='NewOrder-wrap__box' style={{ marginTop: '25px', width: '100%' }}>
                    <div className='NewOrder-wrap__div' >
                        <Text className="NewOrder-wrap__text">shell命令</Text>
                        <Input
                            className="NewOrder-wrap__input"
                            placeholder="请输入shell命令"
                            value={order}
                            onChange={handleOrderChange}
                        />
                    </div>
                </div>

                <div className='NewOrder-wrap__box' style={{ marginTop: '25px', width: '100%' }}>
                    <div className='NewOrder-wrap__div' >
                        <Text className="NewOrder-wrap__text">cron表达式</Text>
                        <Input
                            className="NewOrder-wrap__input"
                            placeholder="请输入cron表达式"
                            value={cron}
                            onChange={handleCronChange}
                        />
                    </div>
                </div>


                <div className='NewOrder-wrap__bottom'>
                    <Button style={{backgroundColor:'#0099ff',color:'#fff'}} className='cardReq-wrap__bottom--btn' onClick={handleSubmit}>保存</Button>
                </div>

            </div>


        </div>
    )
}


export default NewOrder 
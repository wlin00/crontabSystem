import React from 'react'
import { Typography } from 'antd'

import '../Task/Task.scss'


const Task = (e) => {


    const { Text } = Typography


    return (
        <div className='Task'>
            <div className='navText'><Text strong className='navFont'>进行中的任务</Text></div>
            <div className='navFinish'>
                <Text>您目前暂无代办任务</Text>
                <Text className='navFinishJump'>查看已完成代办任务>></Text>
            </div>
        </div>
    )
}

export default Task

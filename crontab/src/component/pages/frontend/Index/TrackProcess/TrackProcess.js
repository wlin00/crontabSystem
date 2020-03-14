import React from 'react'
import { Typography } from 'antd'

import '../TrackProcess/TrackProcess.scss'


const TrackProcess = (e) => {


    const { Text } = Typography


    return (
        <div className='TrackProcess'>

            <div className='navText'><Text strong className='navFont'>进行中的申请</Text></div>
            <div className='navFinish'>
                <Text>您目前暂无申请</Text>
                <Text className='navFinishJump'>查看已完成申请>></Text>
            </div>
        </div>
    )
}

export default TrackProcess

import React from 'react'
import { Typography } from 'antd'
import {Link} from 'react-router-dom'

import '../HotProcess/HotProcess.scss'



const HotProcess = (e) => {


    const { Text } = Typography


    return (
        <div className='HotProcess'>
            <div className='navText'>
                <Text strong className='navFont'>推荐功能</Text>
            </div>
            <div className='navWrap'>
                <div className='navItem'>
                    <Link
                        to='/index/overTimeReq' 
                        className='navBox'>
                        <img
                        src={require('../../../../../pic/33.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>功能1</Text>
                </div>
                <div className='navItem'>
                    <Link 
                        to='/index/vacationReq'
                        className='navBox'><img
                        src={require('../../../../../pic/36.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>功能2</Text>
                </div>
                <div className='navItem'>
                    <Link 
                        to='/index/checkUnusual'
                        className='navBox'><img
                        src={require('../../../../../pic/32.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>功能3</Text>
                </div>
                <div className='navItem'>
                    <Link 
                        to='/index/expenseReq'
                        className='navBox'><img
                        src={require('../../../../../pic/34.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>功能4</Text>
                </div>
                <div className='navItem'>
                    <Link 
                        to='index/travelReq'
                        className='navBox'><img
                        src={require('../../../../../pic/35.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>功能5</Text>
                </div>
            </div>

        </div>
    )
}

export default HotProcess

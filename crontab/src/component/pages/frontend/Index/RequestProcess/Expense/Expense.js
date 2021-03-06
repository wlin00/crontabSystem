import React from 'react'
import { Typography } from 'antd'
import {Link} from 'react-router-dom'

import '../Expense/Expense.scss'


const Expense = (e) => {


    const { Text } = Typography


    return (
        <div className='Expense'>
         <div className='navWrap'>
                <div className='navItem'>
                    <Link 
                        to='/index/expenseReq'
                        className='navBox'><img
                        src={require('../../../../../../pic/34.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>管理中心</Text>
                </div>
                <div className='navItem'>
                    <Link 
                        to='/index/pactReq'
                        className='navBox'><img
                        src={require('../../../../../../pic/37.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>功能bb</Text>
                </div>
            </div>

        </div>
    )
}

export default Expense

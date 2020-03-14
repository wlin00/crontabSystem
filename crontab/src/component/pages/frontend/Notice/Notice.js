import React from 'react'
import Navbar from '../../../laout/Navbar'
import '../Notice/Notice.scss'
import List from '../Notice/List/List'
import {Route} from 'react-router-dom'

const Notice = (e) => {

    return (<div>
        <Navbar title="西华毕设" />
        <div className="container" >
            <div className='Notice'>
                <div className='Notice-title'>
                    分布式Crontab
                </div>
                <div className='Notice-route'>
                    <Route exact path='/notice' component={List}></Route>

                </div>

            </div>
        </div>
    </div>
    )
}

export default Notice

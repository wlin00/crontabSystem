import React,{Fragment} from 'react'
import Search from '../users/Search'
import User from '../users/User'
import Navbar from './Navbar'


const Home = () => {
    return (
        <Fragment>
            <Navbar title="西华毕设"  />
            <div className="container" >
            <Search/>
            <User/>
            </div>
        </Fragment>
    )
}

export default Home

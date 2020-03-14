import React from 'react';
import './App.css';
import NotFound from './component/laout/NotFound'
import Alert from './component/laout/Alert'
import Index from './component/pages/frontend/Index/Index'
import Notice from './component/pages/frontend/Notice/Notice'
import Monitor from './component/pages/frontend/Monitor/Monitor'
import People from './component/pages/frontend/People/People'
import overTimeReq from './component/pages/frontend/Index/requestArea/overTimeReq/overTimeReq'
import Regist from './component/laout/Regist'
import Login from './component/laout/Login'

//useContext中state返回的Provider，包裹AppJs，回调渲染模式
import AlertState from "./context/alert/alertState";
import GithubState from './context/github/githubState'
import UserState from "./context/user/userState";
import CronState from './context/crontab/cronState'
import MonitorState from './context/monitor/monitorState'

import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'


const App = () => {  //Hooks重构App.js


  return (
    <MonitorState>
    <CronState>
    <UserState>
      <GithubState>
        <AlertState>
          <Router>
            <div className="App">
              <Alert />
              {/* 路由切换部分 */}
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/regist" component={Regist} />

                <Route path="/index" component={Index} />
                <Route path="/notice" component={Notice} />
                <Route path="/monitor" component={Monitor} />
                <Route path="/people" component={People} />
                <Route path="/index/overTimeReq" component={overTimeReq} />




                <Route component={NotFound} />
                <Redirect to='/'/>

              </Switch>
            </div>
          </Router>
        </AlertState>
      </GithubState>
    </UserState>
    </CronState>
    </MonitorState>
  )
}

export default App;

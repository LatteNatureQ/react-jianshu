import React, {Component} from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from '../components/App/app'
import Login from '../components/login/login'
import Register from '../components/register/register'
import Home from '../components/home/home'
import Detail from '../components/detail/detail'
import Collections from '../components/collections/collections'

export default class myRouter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/home' component={Home}/>
                    <Route path='/detail/:slug' component={Detail}/>
                    <Route path='/collections/:slug' component={Collections}/>
                    <Redirect from='/' to='/home'/>
                </Switch>
            </HashRouter>
        )
    }
}

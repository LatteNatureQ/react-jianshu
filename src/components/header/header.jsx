import React,{Component} from 'react'
import './header.css'
import {Icon} from 'antd-mobile'
export default class Header extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='header-wrap'>
                <div className='header-wrap-l'>
                    <img src="//cdn2.jianshu.io/asimov/src/assets/image/nav-logo.faf216af.png" alt=""/>
                    <p>创作你的创作</p>
                </div>
                <div className='header-wrap-r'>
                    免费下载 <Icon type='right'></Icon>
                </div>
            </div>
        )
    }
}

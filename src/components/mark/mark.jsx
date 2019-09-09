import React, {Component} from 'react'
import {Icon} from 'antd-mobile'
import './mark.css'

export default class Mark extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props.isShow)
    }

    render() {
        return (
            <div className='mark-wrap' style={this.props.isShow ? {opacity: 1,zIndex:99} : {opacity: 0,zIndex:-1}}>
                开启完美人生中 &nbsp;&nbsp; <Icon type='loading'></Icon>
            </div>
        )
    }
}

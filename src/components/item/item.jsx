import React, {Component} from 'react'
import './item.css'
import {Link} from 'react-router-dom'

export default class MyItem extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props.list)
    }

    render() {
        return (
            <Link to={'/detail/'+this.props.list.slug}>
                <li className='comment--list-list'>
                    <div>
                        <p className='comment--list-list-title'>
                            {this.props.list.title}
                        </p>
                        <p className='comment--list-list-content'>
                            {this.props.list.public_abbr}
                        </p>
                        <p className='comment--list-list-online'>
                            <span> <i style={{color: '#ec8579'}}
                                      className='fa fa-diamond'></i> {(this.props.list.total_fp_amount / 1000).toFixed(3)}</span>
                            <span>{this.props.list.user.nickname}</span>
                            <span> <i className='fa fa-heart'></i> {(this.props.list.likes_count / 1000).toFixed(1)}k</span>
                        </p>
                    </div>
                    <div className='avatar'>
                        <img src={this.props.list.user.avatar}/>
                    </div>
                </li>
            </Link>
        )
    }
}

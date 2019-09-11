import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../header/header'
import './home.css'
import {Icon} from 'antd-mobile';
import axios from '../../http/http'
import Item from '../item/item'
import Mark from '../mark/mark'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recommended_collections: [],
            comment_list: [],
            isShow: true
        }
    }

    handelRequest = (url, key) => {
        axios.get(url)
            .then(res => {
                console.log(res)
                // console.log(key)
                this.setState({
                    [key]: res.data
                })
                if (this.state.recommended_collections.length != 0 && this.state.comment_list.length != 0) {
                    this.setState({
                        isShow: false
                    })
                }
            })
    }
    componentDidMount = () => {
        this.handelRequest('other/recommended_collections', 'recommended_collections')
        this.handelRequest('other/comment_list', 'comment_list')

    }

    render() {
        return (
            <div>
                <Header></Header>
                <Mark isShow={this.state.isShow}/>
                <div className='collection-recommended'>
                    <div className='collection-recommended-l'>
                        <span>热门专题</span>
                        <span className='icon'><Icon type='loading'></Icon>
                        <span>换一批</span>
                        </span>
                    </div>
                    <div className='collection-recommended-r'>
                        <ul>
                            {this.state.recommended_collections.map((item, index) => <Link key={index} to={'collections/'+item.slug}>
                                <li >{item.title}</li>
                            </Link>)}
                        </ul>
                    </div>
                </div>
                <div className='comment-list'>
                    <ul>
                        {this.state.comment_list.map((item, index) => <Item list={item.object.data} key={index}/>)}
                    </ul>
                </div>
            </div>
        )
    }
}

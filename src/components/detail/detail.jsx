import React, {Component} from 'react'
import axios from '../../http/http'
import './detail.css'
import {formMat} from "../../common/fomat";
import Header from '../header/header'
import Mark from '../mark/mark'

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment_detail: {},
            userInfo: {},
            badges: {},
            isShow: true
        }
    }

    componentDidMount = () => {
        axios.get('other/comment_detail?slug=' + this.props.match.params.slug).then(res => {
            if (res.data.user.badges[0]) {
                this.setState({
                    comment_detail: res.data,
                    userInfo: res.data.user,
                    badges: res.data.user.badges[0]
                })
                if (this.state.comment_detail) {
                    this.setState({
                        isShow: false
                    })
                }
            } else {
                this.setState({
                    comment_detail: res.data,
                    userInfo: res.data.user,
                    badges: res.data.user.badges
                })
                if (this.state.comment_detail) {
                    this.setState({
                        isShow: false
                    })
                }
            }

        })
    }

    render() {
        return (
            <div className='detail'>
                <Header></Header>
                <Mark isShow={this.state.isShow}/>
                <div className='detail-wrap'>

                    <div className='detail-wrap-title'>
                        {this.state.comment_detail.public_title}
                    </div>
                    <div className='detail-wrap-content'>
                        <div className='detail-wrap-content-t'>
                            <div className='detail-wrap-content-t-t'>
                                <p><img className='avatar' src={this.state.userInfo.avatar} alt=""/>
                                </p>
                                <p>{this.state.userInfo.nickname}</p>
                                <p>
                                    <img className='badges_img' src={this.state.badges.image_url} alt=""/>
                                </p>
                                <p>
                                    {this.state.badges.text}
                                </p>
                            </div>
                            <div className='detail-wrap-content-t-b'>
                                <i style={{color: '#f07d87'}} className='fa fa-diamond'></i>
                                <p>{this.state.comment_detail.total_fp_amount / 1000}</p>
                                <p>{formMat(this.state.comment_detail.first_shared_at)}</p>
                            </div>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{__html: this.state.comment_detail.free_content}}
                            className='detail-wrap-content-b'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

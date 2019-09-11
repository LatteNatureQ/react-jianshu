import React, {Component} from 'react'
import './comment.css'
import {Link} from 'react-router-dom'
export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment_new: []
        }

    }

    componentWillReceiveProps = nextProps => {
        this.setState({
            comment_new: nextProps.commentNew
        })
    }

    render() {
        return (

            <ul className='comment_new_wrap'>
                {this.state.comment_new.map((value, index) =>
                    <Link key={index} to={'/detail/' + value.object.data.slug}>
                        <li>
                            <div>
                                <p className='title'>{value.object.data.title}</p>
                                <p className='content'>{value.object.data.public_abbr}</p>
                                <p className='info'>
                                    <i className='fa fa-diamond' style={{color: '#e76f60'}}></i>
                                    &nbsp;
                                    <span>{value.object.data.total_fp_amount / 1000}</span>
                                    &nbsp;
                                    <span>{value.object.data.user.nickname}</span>
                                    &nbsp;&nbsp;&nbsp;
                                    <i className='fa fa-comment'></i>
                                    &nbsp;
                                    <span>{value.object.data.public_comments_count}</span>
                                    &nbsp;&nbsp;
                                    <i className='fa fa-heart'></i>
                                    &nbsp;
                                    <span>{value.object.data.likes_count}</span>
                                </p>
                            </div>
                            <div className='comment_new_wrap_li_b'>
                                <img className='icon_user'
                                     src={value.object.data.list_image_url + '?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160/format/webp'}
                                     alt=""/>
                            </div>
                        </li>
                    </Link>
                )}
            </ul>
        )
    }
}

import React, {Component} from 'react'
import './collections.css'
import Header from '../header/header'
import axios from '../../http/http'
import {Button, TabBar} from 'antd-mobile'
import {Link} from 'react-router-dom'

export default class Collections extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: {},
            owner: {},
            selectTabbar: {
                sel1: false,
                sel2: true,
                sel3: false
            },
            comment_new_config: {
                slug: this.props.match.params.slug,
                page: 1,
                count: 10
            },
            comment_new: []

        }
        // console.log(this.props.match.params.slug)
    }

    handelHttp = () => {
        axios.get('http://47.107.225.115:8080/other/collections?slug=' + this.props.match.params.slug).then(res => {
            this.setState({
                collections: res.data,
                owner: res.data.owner
            })
        })
    }
    handelLoadMore = () => {
        let {page} = this.state.comment_new_config
        page++
        this.setState({
            comment_new_config: {
                slug: this.props.match.params.slug,
                page,
                count: 10
            }
        })
        this.getComment_new(page)

    }
    getComment_new = (page = 1, count = 10) => {
        axios.get('http://47.107.225.115:8080/other/comment_new', {
            params: {
                slug: this.state.comment_new_config.slug,
                page,
                count
            }
        }).then(res => {
            console.log(res.data)
            this.state.comment_new.push(...res.data)
            this.setState({
                comment_new: this.state.comment_new
            })

        })
    }
    componentDidMount = () => {
        this.handelHttp()
        this.getComment_new()
    }

    render() {
        return (
            <div className='Collections-wrap'>
                <Header/>
                <div className='Collections-wrap-t'>
                    <img className='avatar' src={this.state.collections.image} alt=""/>
                    <div>
                        <p className='title'>{this.state.collections.title}</p>
                        <p>{this.state.owner.nickname}编,{(Math.round(this.state.collections.notes_count / 1000) / 10)}万篇文章,{(Math.round(this.state.collections.subscribers_count / 1000) / 10)}万人关注</p>
                        <div dangerouslySetInnerHTML={{__html: this.state.collections.content_in_full}}
                             className='info'></div>
                        <Button type="primary">+关注</Button>
                    </div>
                </div>

                <div className='Collections-wrap-b'>
                    <TabBar tabBarPosition="top" tintColor='#108ee9'>
                        <TabBar.Item onPress={() => {
                            this.setState({
                                selectTabbar: {
                                    sel1: true
                                },
                            });
                        }} selected={this.state.selectTabbar.sel1} title='最新收录' icon={<div style={{
                            display: 'none'
                        }}
                        />} selectedIcon={<div style={{
                            display: 'none'
                        }}
                        />}>
                            1
                        </TabBar.Item>
                        <TabBar.Item onPress={() => {
                            this.setState({
                                selectTabbar: {
                                    sel2: true
                                },
                            });
                        }} selected={this.state.selectTabbar.sel2} title='最新评论' icon={<div style={{
                            display: 'none'
                        }}
                        />} selectedIcon={<div style={{
                            display: 'none'
                        }}
                        />}>
                            <ul className='comment_new_wrap'>
                                {this.state.comment_new.map((value, index) =>
                                    <Link to={'/detail/' + value.object.data.slug}>
                                        <li key={index}>
                                            <div>
                                                <p className='title'>{value.object.data.title}</p>
                                                <p className='content'>{value.object.data.public_abbr}</p>
                                                <p className='info'>年轻人,创业不要总</p>
                                            </div>
                                            <div className='comment_new_wrap_li_b'>
                                                <img className='icon_user'
                                                     src={value.object.data.list_image_url + '?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160/format/webp'}
                                                     alt=""/>
                                            </div>
                                        </li>
                                    </Link>
                                )}
                                <div className='more' onClick={this.handelLoadMore}>加载更多</div>
                            </ul>
                        </TabBar.Item>
                        <TabBar.Item onPress={() => {
                            this.setState({
                                selectTabbar: {
                                    sel3: true
                                },
                            });
                        }} selected={this.state.selectTabbar.sel3} title='热门' icon={<div style={{
                            display: 'none'
                        }}
                        />} selectedIcon={<div style={{
                            display: 'none'
                        }}
                        />}>
                            3
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}

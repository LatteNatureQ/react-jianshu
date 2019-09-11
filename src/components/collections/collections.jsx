import React, {Component} from 'react'
import './collections.css'
import Header from '../header/header'
import axios from '../../http/http'
import {Button, TabBar} from 'antd-mobile'
import {Link} from 'react-router-dom'
import Comment from '../comment_component/comment'

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
                count: 10,
                order_by: 'commented_at'
            },
            commented_at: [],
            added_at: [],
            top: []

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
                count: 10,
                order_by: 'commented_at'
            }
        })
        this.getComment_new(page)

    }
    getComment_new = (page = 1, count = 10, order_by = 'commented_at') => {
        axios.get('http://47.107.225.115:8080/other/comment_new', {
            params: {
                slug: this.state.comment_new_config.slug,
                page,
                count,
                order_by
            }
        }).then(res => {
            this.state[order_by].push(...res.data)
            this.setState({
                [order_by]: this.state[order_by]
            })

        })
    }
    componentDidMount = () => {
        this.handelHttp()
        this.getComment_new(1, 10, 'commented_at')
        this.getComment_new(1, 10, 'added_at')
        this.getComment_new(1, 10, 'top')
    }

    // item 点击
    handelPress = (e) => {
        console.log(e)
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
                            <Comment commentNew={this.state.added_at}/>
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
                            <Comment commentNew={this.state.commented_at}/>

                        </TabBar.Item>
                        <TabBar.Item onPress={() => {
                            this.setState({
                                selectTabbar: {
                                    sel3: true
                                },
                            });
                        }} selected={this.state.selectTabbar.sel3} title='热门'
                                     icon={<div style={{
                                         display: 'none'
                                     }}
                                     />} selectedIcon={<div style={{
                            display: 'none'
                        }}
                        />}>
                            <Comment commentNew={this.state.top}/>
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}

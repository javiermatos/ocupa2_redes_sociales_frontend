import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import qs from 'qs';
import APIClientAbortManager from '../../api/APIClientAbortManager';
import apiClient from '../../api/client';
import {TWITTER_API_URL} from '../../settings';
import {twitterPostLike, twitterPostDislike, twitterPostRetweet, twitterPostUnretweet} from './utils';
import {reverse} from '../../router';
import Link from '../../Link';


class Post extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userName: null,
            userScreenName: null,
            post: null,

            waitingResponse: true,
        };

        this.apiClientAbortManager = new APIClientAbortManager();
    }

    getPostById = (postId) => {
        this.apiClientAbortManager
            .make(apiClient.get(TWITTER_API_URL + `/statuses/retweets/${postId}.json`))
            .then((response) => {
                console.log(response.body);
                const [post, ...rest] = response.body;
                this.setState({post: post});
            })
            .finally(() => {
                this.setState({waitingResponse: false});
            });
    };

    componentDidMount() {
        const {userId, userName, userScreenName} = qs.parse(window.location.search, { ignoreQueryPrefix: true });
        this.setState({
            userId: parseInt(userId),
            userName: userName,
            userScreenName: userScreenName,
        });
        this.getPostById(this.props.id);
    }

    render() {
        if (this.state.post === null) {
            return (<div>Loading tweet {this.props.id}</div>)
        }

        return (
            <div>
                <h1>Twitter Post Metadata</h1>
                <table className="table mt-4">
                    <thead className="thead-dark">
                    <tr>
                        <th width="30%">Description</th>
                        <th width="70%">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Tweet ID</td>
                        <td>{this.props.id}</td>
                    </tr>
                    <tr>
                        <td>User ID</td>
                        <td>
                            <Link
                                to={reverse('twitterUser', {
                                    userId: this.state.userId,
                                    userName: this.state.userName,
                                    userScreenName: this.state.userScreenName,
                                })}
                            >
                                {this.state.userId}
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>User Name</td>
                        <td>{this.state.userName}</td>
                    </tr>
                    <tr>
                        <td>User Screen Name</td>
                        <td>{this.state.userScreenName}</td>
                    </tr>
                    <tr>
                        <td>Likes Count</td>
                        <td>{this.state.post.likeCount}</td>
                    </tr>
                    <tr>
                        <td>Retweets Count</td>
                        <td>{this.state.post.retweetCount}</td>
                    </tr>
                    <tr>
                        <td>Replies Count</td>
                        <td>{this.state.post.replyCount}</td>
                    </tr>
                    </tbody>
                </table>
                <button
                    className="btn btn-primary"
                    onClick={(event) => {
                        twitterPostLike(this.props.userKey, this.props.id).then((response) => {
                            this.getPostById(this.props.id);
                        });
                    }}
                >
                    <i className="fas fa-thumbs-up"/>
                </button>
                <button
                    className="btn btn-danger ml-2"
                    onClick={(event) => {
                        twitterPostDislike(this.props.userKey, this.props.id).then((response) => {
                            this.getPostById(this.props.id);
                        });
                    }}
                >
                    <i className="fas fa-thumbs-down"/>
                </button>
                <button
                    className="btn btn-primary ml-4"
                    onClick={(event) => {
                        twitterPostRetweet(this.props.userKey, this.props.id).then((response) => {
                            this.getPostById(this.props.id);
                        });
                    }}
                >
                    <i className="fas fa-bell"/>
                </button>
                <button
                    className="btn btn-danger ml-2"
                    onClick={(event) => {
                        twitterPostUnretweet(this.props.userKey, this.props.id).then((response) => {
                            this.getPostById(this.props.id);
                        });
                    }}
                >
                    <i className="fas fa-bell-slash"/>
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.email,
    userId: state.auth.twitterUserId,
    userKey: state.auth.twitterKey,
});

export default connect(mapStateToProps, null)(Post);

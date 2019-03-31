import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import APIClientAbortManager from '../../api/APIClientAbortManager';
import apiClient from '../../api/client';
import {INSTAGRAM_API_URL} from '../../settings';
import qs from 'qs';
import {reverse} from '../../router';
import Link from '../../Link';
import {instagramPostLike, instagramPostDislike} from './utils';


class Post extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            post: null,

            waitingResponse: true,
        };

        this.apiClientAbortManager = new APIClientAbortManager();
    }

    getPostById = (postId) => {
        this.apiClientAbortManager
            .make(apiClient.get(INSTAGRAM_API_URL + `/media/${postId}` + qs.stringify({
                fields: ['id', 'username', 'media_type', 'like_count', 'comments_count'].join(','),
            }, {addQueryPrefix: true})))
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
        this.getPostById(this.props.id);
    }

    render() {
        if (this.state.post === null) {
            return (<div>Loading post {this.props.id}</div>);
        }

        return (
            <div>
                <h1>Instagram Post Metadata</h1>
                <table className="table mt-4">
                    <thead className="thead-dark">
                    <tr>
                        <th width="30%">Description</th>
                        <th width="70%">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Post ID</td>
                        <td>{this.state.post.id}</td>
                    </tr>
                    <tr>
                        <td>User ID</td>
                        <td>
                            <Link to={reverse('instagramUser', {id: this.state.post.userId})}>
                                {this.state.post.userId}
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>Media Type</td>
                        <td>{this.state.post.mediaType}</td>
                    </tr>
                    <tr>
                        <td>Likes Count</td>
                        <td>{this.state.post.likeCount}</td>
                    </tr>
                    <tr>
                        <td>Comments Count</td>
                        <td>{this.state.post.commentsCount}</td>
                    </tr>
                    </tbody>
                </table>
                <button
                    className="btn btn-primary"
                    onClick={(event) => {
                        instagramPostLike(this.props.userId, this.props.id).then((response) => {
                            this.getPostById(this.props.id);
                        });
                    }}
                >
                    <i className="fas fa-thumbs-up"/>
                </button>
                <button
                    className="btn btn-danger ml-2"
                    onClick={(event) => {
                        instagramPostDislike(this.props.userId, this.props.id).then((response) => {
                            this.getPostById(this.props.id);
                        });
                    }}
                >
                    <i className="fas fa-thumbs-down"/>
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.email,
    userId: state.auth.instagramUserId,
    userKey: state.auth.instagramKey,
});

export default connect(mapStateToProps, null)(Post);

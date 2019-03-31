import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {connect} from 'react-redux';
import APIClientAbortManager from '../../api/APIClientAbortManager';
import apiClient from '../../api/client';
import {INSTAGRAM_API_URL} from '../../settings';
import {reverse} from '../../router';
import Link from '../../Link';


const SEARCH_CRITERION_RECENT_MEDIA = 'recent_media';
const SEARCH_CRITERION_TOP_MEDIA = 'top_media';


class SearchPostsByHashtag extends React.Component {

    static propTypes = {
        userId: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            hashtag: '',
            hashtagId: null,
            searchCriterion: SEARCH_CRITERION_RECENT_MEDIA,
            waitingResponse: false,

            postList: [],
            postListError: null,
        };

        this.apiClientAbortManager = new APIClientAbortManager();
    }

    getPostsByHashtag = (hashtagId, searchCriterion) => {
        this.apiClientAbortManager
            .make(apiClient.get(INSTAGRAM_API_URL + `/${hashtagId}/${searchCriterion}` + qs.stringify({
                user_id: this.props.userId,
            }, {addQueryPrefix: true})))
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        postList: response.body.data,
                        postListError: null,
                    });
                }
                else {
                    this.setState({
                        postList: [],
                        postListError: 'No post found for hashtag.',
                    });
                }
            })
            .finally(() => {
                this.setState({waitingResponse: false});
            });
    };

    getHashtag = (hashtag) => {
        this.setState({waitingResponse: true});
        this.apiClientAbortManager
            .make(apiClient.get(INSTAGRAM_API_URL + '/ig_hashtag_search' + qs.stringify({
                q: hashtag,
                user_id: this.props.userId,
            }, {addQueryPrefix: true})))
            .then((response) => {
                const hashtagId = response.body.id;
                this.getPostsByHashtag(hashtagId, this.state.searchCriterion);
            })
            .catch((error) => {
                this.setState({waitingResponse: false});
            });
    };


    handleSubmit = (event) => {
        event.preventDefault();
        this.getHashtag(this.state.hashtag);
    };

    render() {
        const content = (this.state.postListError === null)
            ? (
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th>Post ID</th>
                        <th>Media Type</th>
                        <th>Like Count</th>
                        <th>Comments Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.postList.map((post, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={reverse('instagramPost', {id: post.id})}>
                                    {post.id}
                                </Link>
                            </td>
                            <td>{post.mediaType}</td>
                            <td>{post.likeCount}</td>
                            <td>{post.commentsCount}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td className="table-dark" colSpan={4}>
                            <strong>Posts: {this.state.postList.length}</strong>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            )
            : (
                <div className="alert alert-danger" role="alert">
                    No result found!
                </div>
            );

        return (
            <div>
                <h1>Search Instagram Posts</h1>
                <form
                    className="form-inline"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search posts by hashtag"
                        value={this.state.hashtag}
                        onChange={(event) => {
                            this.setState({hashtag: event.target.value});
                        }}
                    />
                    <select
                        className="form-control ml-3"
                        onChange={(event) => {
                            console.log(event.target.value);
                            this.setState({searchCriterion: event.target.value});
                        }}
                    >
                        <option value={SEARCH_CRITERION_RECENT_MEDIA}>Recent media</option>
                        <option value={SEARCH_CRITERION_TOP_MEDIA}>Top media</option>
                    </select>
                    <input
                        className="btn btn-primary ml-3"
                        type="submit"
                        value="Search"
                        disabled={this.state.waitingResponse}
                    />
                </form>
                <div className="mt-4">
                    {content}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.email,
    userId: state.auth.instagramUserId,
    userKey: state.auth.instagramKey,
});

export default connect(mapStateToProps, null)(SearchPostsByHashtag);

import React from 'react';
import qs from 'qs';
import APIClientAbortManager from '../../api/APIClientAbortManager';
import apiClient from '../../api/client';
import {TWITTER_API_URL} from '../../settings';
import {reverse} from '../../router';
import Link from '../../Link';


class SearchPostsByHashtag extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hashtag: '',

            waitingResponse: false,

            postList: [],
            postListError: null,
        };

        this.apiClientAbortManager = new APIClientAbortManager();
    }

    getPostsByHashtag = (hashtag) => {
        this.setState({waitingResponse: true});
        this.apiClientAbortManager
            .make(apiClient.get(TWITTER_API_URL + '/search/tweets.json' + qs.stringify({
                q: hashtag,
            }, {addQueryPrefix: true})))
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        postList: response.body,
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.getPostsByHashtag(this.state.hashtag);
    };

    render() {
        const content = (this.state.postListError === null)
            ? (
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th>Tweet ID</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Screen Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.postList.map((post, index) => (
                        <tr key={index}>
                            <td>
                                <Link
                                    to={reverse('twitterPost', {
                                        id: post.tweetId,
                                        userId: post.userid,
                                        userName: post.name,
                                        userScreenName: post.screenName,
                                    })}
                                >
                                    {post.tweetId}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    to={reverse('twitterUser', {
                                        userId: post.userid,
                                        userName: post.name,
                                        userScreenName: post.screenName,
                                    })}
                                >
                                    {post.userid}
                                </Link>
                            </td>
                            <td>{post.name}</td>
                            <td>{post.screenName}</td>
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
                <h1>Search Twitter Posts</h1>
                <form
                    className="form-inline"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search post by hashtag"
                        value={this.state.hashtag}
                        onChange={(event) => {
                            this.setState({hashtag: event.target.value});
                        }}
                    />
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

export default SearchPostsByHashtag;

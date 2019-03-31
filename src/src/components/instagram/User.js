import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import APIClientAbortManager from '../../api/APIClientAbortManager';
import apiClient from '../../api/client';
import {INSTAGRAM_API_URL} from '../../settings';
import qs from 'qs';
import {instagramUserFollow, instagramUserUnfollow} from './utils';


class User extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            user: null,

            waitingResponse: true,
        };

        this.apiClientAbortManager = new APIClientAbortManager();
    }

    getUserById = (userId) => {
        this.apiClientAbortManager
            .make(apiClient.get(INSTAGRAM_API_URL + `/${userId}` + qs.stringify({
                fields: ['id', 'username', 'follower_count', 'media_count'].join(','),
            }, {addQueryPrefix: true})))
            .then((response) => {
                console.log(response.body);
                const [user, ...rest] = response.body;
                this.setState({user: user});
            })
            .finally(() => {
                this.setState({waitingResponse: false});
            });
    };

    componentDidMount() {
        this.getUserById(this.props.id);
    }

    render() {
        if (this.state.user === null) {
            return (<div>Loading user {this.props.id}</div>);
        }

        return (
            <div>
                <h1>Instagram User Metadata</h1>
                <table className="table mt-4">
                    <thead className="thead-dark">
                    <tr>
                        <th width="30%">Description</th>
                        <th width="70%">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>User ID</td>
                        <td>{this.state.user.id}</td>
                    </tr>
                    <tr>
                        <td>User Name</td>
                        <td>{this.state.user.username}</td>
                    </tr>
                    <tr>
                        <td>Followers Count</td>
                        <td>{this.state.user.followerCount}</td>
                    </tr>
                    <tr>
                        <td>Media Count</td>
                        <td>{this.state.user.mediaCount}</td>
                    </tr>
                    </tbody>
                </table>
                <button
                    className="btn btn-primary"
                    onClick={(event) => {
                        instagramUserFollow(this.props.userId, this.props.id).then((response) => {
                            this.getUserById(this.props.id);
                        });
                    }}
                >
                    <i className="fas fa-user"/>
                </button>
                <button
                    className="btn btn-danger ml-2"
                    onClick={(event) => {
                        instagramUserUnfollow(this.props.userId, this.props.id).then((response) => {
                            this.getUserById(this.props.id);
                        });
                    }}
                >
                    <i className="fas fa-user-slash"/>
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

export default connect(mapStateToProps, null)(User);

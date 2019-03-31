import React from 'react';
import {connect} from 'react-redux';
import qs from 'qs';


class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userName: null,
            userScreenName: null,
        };
    }

    componentDidMount() {
        const {userId, userName, userScreenName} = qs.parse(window.location.search, { ignoreQueryPrefix: true });
        this.setState({
            userId: parseInt(userId),
            userName: userName,
            userScreenName: userScreenName,
        });
    }

    render() {
        return (
            <div>
                <h1>Twitter User Metadata</h1>
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
                        <td>{this.state.userId}</td>
                    </tr>
                    <tr>
                        <td>User Name</td>
                        <td>{this.state.userName}</td>
                    </tr>
                    <tr>
                        <td>Followers Count</td>
                        <td>{this.state.userScreenName}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.email,
    userId: state.auth.twitterUserId,
    userKey: state.auth.twitterKey,
});

export default connect(mapStateToProps, null)(User);

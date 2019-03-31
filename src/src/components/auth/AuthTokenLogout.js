import PropTypes from 'prop-types';
import React from 'react';
import Link from '../../Link';
import {reverse} from '../../router';


class AuthTokenLogout extends React.Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.func.isRequired,
    };

    componentDidMount() {
        if (this.props.isAuthenticated()) {
            this.props.logout();
        }
    }

    render() {
        return (
            <div>
                <h1>Logout</h1>
                <Link to={reverse('login')}><i className="fa fa-sign-in-alt"/> Log in</Link>
            </div>
        );
    }
}

export default AuthTokenLogout;

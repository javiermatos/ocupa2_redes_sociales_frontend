import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators, isAuthenticated} from '../../auth';
import AuthTokenLogout from './AuthTokenLogout';


class AuthTokenLogoutContainer extends React.Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,
    };

    render() {
        return (
            <AuthTokenLogout
                logout={this.props.logout}
                isAuthenticated={isAuthenticated}
            />
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    logout: actionCreators.logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthTokenLogoutContainer);

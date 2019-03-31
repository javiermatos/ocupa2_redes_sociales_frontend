import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators, isAuthenticated} from '../../auth';
import AuthTokenLogin from './AuthTokenLogin';


class AuthTokenLoginContainer extends React.Component {

    static propTypes = {
        email: PropTypes.string,
        errors: PropTypes.object,
        next: PropTypes.string,
        login: PropTypes.func.isRequired,
    };

    login = (email) => {
        this.props.login(email);
    };

    render() {
        return (
            <AuthTokenLogin
                email={this.props.email}
                errors={this.props.errors}
                next={this.props.next}
                login={this.login}
                isAuthenticated={isAuthenticated}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.email,
    errors: state.auth.errors,
    next: state.router.queries.next,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    login: actionCreators.login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthTokenLoginContainer);

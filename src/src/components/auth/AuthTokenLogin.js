import PropTypes from 'prop-types';
import React from 'react';
import Link from '../../Link';
import {reverse} from '../../router';


class AuthTokenLogin extends React.Component {

    static propTypes = {
        email: PropTypes.string,
        errors: PropTypes.object,
        next: PropTypes.string,
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.email);
    };

    render() {
        let errors = null;
        if (this.props.errors && this.props.errors.hasOwnProperty('non_field_errors')) {
            errors = this.props.errors.non_field_errors.map((error, index) => (<div key={index}>{error}</div>));
        }

        let content = null;
        if (this.props.isAuthenticated()) {
            content = (
                <React.Fragment>
                    <div className="alert alert-success" role="alert">
                        You are actually logged in as {this.props.email}
                    </div>
                    {(this.props.next !== undefined && this.props.next !== reverse('main'))
                        ? (<Link to={this.props.next}>Continue to {this.props.next}</Link>)
                        : null
                    }
                    <br/>
                    <Link to={reverse('main')}><i className="fa fa-home"/> Main</Link>
                    <br/>
                    <Link to={reverse('logout')}><i className="fa fa-sign-out-alt"/> Logout</Link>
                </React.Fragment>
            );
        }
        else {
            content = (
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Enter email"
                            onChange={(event) => {
                                this.setState({email: event.target.value});
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
            );
        }

        return (
            <div>
                <h1>Login</h1>
                {errors}
                {content}
            </div>
        );
    }
}

export default AuthTokenLogin;

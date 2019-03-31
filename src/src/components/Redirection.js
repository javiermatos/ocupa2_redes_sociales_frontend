import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {go, push, replace} from 'redux-first-routing';


class Redirection extends React.Component {

    static propTypes = {
        to: PropTypes.string.isRequired,
    };

    componentDidMount() {
        this.props.push(this.props.to);
    }

    render() {
        return (
            <React.Fragment>
                Redirecting to {this.props.to}...
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    router: state.router,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    push: push,
    replace: replace,
    go: go,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Redirection);

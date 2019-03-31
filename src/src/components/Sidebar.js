import React from 'react';
import Link from '../Link';
import {reverse} from '../router';


class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <h5>Ocupa2 Nosotros</h5>
                <ul className="nav flex-column">
                    <Link className="nav-link" to={reverse('main')}>
                        <i className="fa fa-home fa-lg fa-fw"/> Home
                    </Link>
                </ul>
                <ul className="nav flex-column">
                    <Link className="nav-link" to={reverse('instagramSearchPostByHashtag')}>
                        <i className="fab fa-instagram fa-lg fa-fw"/> Instagram
                    </Link>
                </ul>
                <ul className="nav flex-column">
                    <Link className="nav-link" to={reverse('twitterSearchPostByHashtag')}>
                        <i className="fab fa-twitter fa-lg fa-fw"/> Twitter
                    </Link>
                </ul>
                <ul className="nav flex-column">
                    <a className="nav-link" href="/admin/" target="_blank">
                        <i className="fa fa-wrench fa-lg fa-fw"/> Admin
                    </a>
                </ul>
                <ul className="nav flex-column">
                    <a className="nav-link" href="/grafana/" target="_blank">
                        <i className="fa fa-chart-bar fa-lg fa-fw"/> Grafana
                    </a>
                </ul>
                <ul className="nav flex-column">
                    <Link className="nav-link" to={reverse('logout')}>
                        <i className="fa fa-sign-out-alt fa-lg fa-fw"/>Logout
                    </Link>
                </ul>
            </div>
        );
    }
}

export default Sidebar;

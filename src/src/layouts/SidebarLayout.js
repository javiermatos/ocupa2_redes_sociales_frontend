import React from 'react';
import Sidebar from '../components/Sidebar';


class SidebarLayout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row my-3">
                    <div className="col-3">
                        <Sidebar/>
                    </div>
                    <div className="col-9">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default SidebarLayout;

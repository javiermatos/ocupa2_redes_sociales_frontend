import React from 'react';


class DefaultLayout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row my-3">
                    <div className="col-12">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default DefaultLayout;

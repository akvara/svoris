import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div className="small">
                Loading {this.props.what} ...
            </div>
        );
    }
}

export default Loading;

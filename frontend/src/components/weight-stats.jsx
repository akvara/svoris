import React, { Component } from 'react';

class WeightStats extends Component {
    /* The Renderer */
    render() {
        let min = this.props.items.min;
        let max = this.props.items.max;

        return (
            <div>
                Min: {min.value} ({min.for_date}) Max: {max.value} ({max.for_date})
            </div>
        );
    }
}

export default WeightStats;

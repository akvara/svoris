import React, { Component } from 'react';

class WeightStats extends Component {
    /* The Renderer */
    render() {
        let min = this.props.items.min;
        let max = this.props.items.max;

        return (
            <div>
                Min: <b>{min.value}</b> ({min.for_date}) Max: <b>{max.value}</b> ({max.for_date})
            </div>
        );
    }
}

export default WeightStats;

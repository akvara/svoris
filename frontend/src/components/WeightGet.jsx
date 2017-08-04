import React, { Component } from 'react';

class Weight extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        }
    }

    minus(which) {
        var newValue = {};

        if (this.state[which] > 10) {
            newValue[which] = this.state[which] - 5;
        } else if (this.state[which] > 1) {
            newValue[which] = this.state[which] - 1;
        }
        this.setState(newValue, this.updateConfigValue.bind(this, which));
    }

    plus(which) {
        var newValue = {};

        if (this.state[which] >= 10) {
            newValue[which] = this.state[which] + 5;
        } else {
            newValue[which] = this.state[which] + 1;
        }
        this.setState(newValue, this.updateConfigValue.bind(this, which));
    }

    buttonMinus(which) {
        return <button className="btn btn-sm" ref="minus" onClick={this.minus.bind(this, which)}>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
        </button>
    }

    buttonPlus(which) {
        return <button className="btn btn-sm" ref="plus" onClick={this.plus.bind(this, which)}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
    }

    render() {

        return (
            <div className="pre-scrollable">
                <table>
                    <tbody>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                        <tr>
                            <td>2017-08-01</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Weight;

import React, { Component } from 'react';
// import * as Utils from '../utils/utils.js';

class WeightPost extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            weight: [9, 4, 3]
        }
    }

    formatDate() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        return year + '-' + ("00" + month).slice(-2)  + '-' + ("00" + day).slice(-2);
    }

    minus(which) {
        var newValue = this.state.weight;

        if (newValue[which] > 0) {
            newValue[which] --;
            this.setState({weight: newValue}, this.debug);
        }
    }

    plus(which) {
        var newValue = this.state.weight;

        if (newValue[which] < 9) {
            newValue[which] ++;
            this.setState({weight: newValue}, this.debug);
        }
    }

    debug() {
        console.log('this.state:', this.state);
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
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>{this.buttonPlus(0)}</td>
                        <td>{this.buttonPlus(1)}</td>
                        <td>&nbsp;</td>
                        <td>{this.buttonPlus(2)}</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td className="digits">{this.state.weight[0]}</td>
                        <td className="digits">{this.state.weight[1]}</td>
                        <td className="digits">.</td>
                        <td className="digits">{this.state.weight[2]}</td>
                        <td>&nbsp;</td>
                        <td><button>{ this.formatDate() }</button></td>
                    </tr>
                    <tr>
                        <td>{this.buttonMinus(0)}</td>
                        <td>{this.buttonMinus(1)}</td>
                        <td>&nbsp;</td>
                        <td>{this.buttonMinus(2)}</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        );

    }
}

export default WeightPost;

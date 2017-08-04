import React, { Component } from 'react';
import Button from './button';
import * as Utils from '../utils/utils';


class WeightPost extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            weight: [9, 4, 3],
            submitting: false
        }
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

    submit() {
        this.setState({ submitting: true })
        // $.post(
        //     UrlUtils.getWeightUrl()
        //     .done(this.setUserSettings(settings))
        //     .fail((err) => {
        //         console.log(err);
        //     })
    }

    render() {
        const {error, handleSubmit, submitting, currentLanguage} = this.props;
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>{this.buttonPlus(0)}</td>
                        <td>{this.buttonPlus(1)}</td>
                        <td>&nbsp;</td>
                        <td>{this.buttonPlus(2)}</td>
                    </tr>
                    <tr>
                        <td className="digits">{this.state.weight[0]}</td>
                        <td className="digits">{this.state.weight[1]}</td>
                        <td className="digits">.</td>
                        <td className="digits">{this.state.weight[2]}</td>
                    </tr>
                    <tr>
                        <td>{this.buttonMinus(0)}</td>
                        <td>{this.buttonMinus(1)}</td>
                        <td>&nbsp;</td>
                        <td>{this.buttonMinus(2)}</td>
                    </tr>
                    </tbody>
                </table>
                <br />
                <Button submit={false} loading={this.state.submitting} disabled={this.state.submitting} onClick={this.submit.bind(this)}>
                    { Utils.formatDate(new Date().toISOString()) }
                </Button>
            </div>

        );

    }
}

export default WeightPost;

import React, { Component } from 'react';
import Button from './button';
import * as Utils from '../utils/utils';
import * as UrlUtils from '../utils/url-utils';
import $ from 'jquery';

class WeightInput extends Component {
    constructor(props, context) {
        super(props, context);

        let weight = props.last ? props.last : 91.2

        this.for_date = Utils.formatDate(new Date().toISOString())

        this.state = {
            weight: Utils.numToArr(weight),
            submitting: false
        }
    }

    callback(i) {
        this.props.callback(i);
    }

    minus(which) {
        var newValue = this.state.weight;

        if (newValue[which] > 0) {
            newValue[which] --;
        }
        this.setState({weight: newValue});
    }

    plus(which) {
        var newValue = this.state.weight;

        if (newValue[which] < 9) {
            newValue[which] ++;
        }
        this.setState({weight: newValue});
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

    processSubmitSuccess() {
        this.callback()
        this.setState({ submitting: false })
    }

    processSubmitFailure(responseData, textStatus, errorThrown) {
        this.setState({ submitting: false })
        console.log('POST error:', responseData, textStatus, errorThrown);
    }

    submit() {
        // console.log('this.state.weight:', this.state.weight);
        this.setState({ submitting: true })

        // console.log(Utils.arrToNum(this.state.weight));
        $.ajax({
            type: 'POST',
            url: UrlUtils.getWeightUrl(),
            crossDomain: true,
            data: { for_date: this.for_date, weight: Utils.arrToNum(this.state.weight, 10) },
            dataType: 'json',
            success: this.processSubmitSuccess.bind(this),
            error: this.processSubmitFailure.bind(this)
        });


        // $.post(
            // UrlUtils.getWeightUrl()
            // )
        // .done()
        // .fail((err) => {
            // console.log(err);
        // })
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
                    { this.for_date }
                </Button>
            </div>

        );

    }
}

export default WeightInput;

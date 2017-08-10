import React, { Component } from 'react';
import Button from '../button';
import * as Utils from '../../utils/utils';
import * as UrlUtils from '../../utils/url-utils';
import $ from 'jquery';

class PressureInput extends Component {
    constructor(props, context) {
        super(props, context);

        this.for_date = Utils.formatDate(new Date().toISOString())
        this.for_hour = new Date().getHours()

        this.state = {
            data: {
                sys: props.sys ? props.sys : 120,
                dia: props.dia ? props.dia : 80,
                pul: props.pul ? props.pul : 70,
            },
            submitting: false,
            submitted: false
        }
    }

    minus(which) {
        var newValue = this.state.data;

        if (newValue[which] > 0) {
            newValue[which] --
        }
        this.setState({data: newValue});
    }

    plus(which) {
        var newValue = this.state.data;

        if (newValue[which] < 250) {
            newValue[which] ++;
        }
        this.setState({data: newValue});
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
        this.props.callback();
        this.setState({ submitting: false, submitted: true })
    }

    processSubmitFailure(responseData, textStatus, errorThrown) {
        this.setState({ submitting: false })
        console.log('POST error:', responseData, textStatus, errorThrown);
    }

    submit() {
        this.setState({ submitting: true })

        $.ajax({
            type: 'POST',
            url: UrlUtils.getPressureUrl(),
            crossDomain: true,
            data: {
                for_date: this.for_date,
                for_hour: this.for_hour,
                sys: this.state.data.sys,
                dia: this.state.data.dia,
                pul: this.state.data.pul
            },
            dataType: 'json',
            success: this.processSubmitSuccess.bind(this),
            error: this.processSubmitFailure.bind(this)
        });
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>{this.buttonMinus('sys')}</td>
                        <td className="digits">{this.state.data.sys}</td>
                        <td>{this.buttonPlus('sys')}</td>
                    </tr>
                    <tr>
                        <td>{this.buttonMinus('dia')}</td>
                        <td className="digits">{this.state.data.dia}</td>
                        <td>{this.buttonPlus('dia')}</td>
                    </tr>
                    <tr>
                        <td>{this.buttonMinus('pul')}</td>
                        <td className="digits">{this.state.data.pul}</td>
                        <td>{this.buttonPlus('pul')}</td>
                    </tr>
                    </tbody>
                </table>
                <br />
                <Button submit={true} loading={this.state.submitting} disabled={this.state.submitting || this.state.submitted} onClick={this.submit.bind(this)}>
                    { this.for_date } { ("00" + this.for_hour).slice(-2) }:00
                </Button>
            </div>
        )
    }
}

export default PressureInput;

import React, {Component} from 'react';
import Button from '../button';
import * as Utils from '../../utils/utils';
import * as UrlUtils from '../../utils/url-utils';
import $ from 'jquery';

class PressureInput extends Component {
    constructor(props, context) {
        super(props, context);

        this.for_date = Utils.formatDate(new Date().toISOString());
        this.for_hour = new Date().getHours();

        this.state = {
            data: {
                sys: props.sys ? props.sys : 120,
                dia: props.dia ? props.dia : 80,
                pul: props.pul ? props.pul : 70,
            },
            submitting: false,
            submitted: false
        };
    }

    performOp(op, which, extreme) {
        let newValue = this.state.data;
        if (op === 'minus') {
            if (newValue[which] > extreme) {
                newValue[which]--;
                this.setState({data: newValue});
            }
        } else {
            if (newValue[which] < extreme) {
                newValue[which]++;
                this.setState({data: newValue});
            }
        }
    }

    buttonMath(operation, which, extreme) {
        return (
            <button
                className="btn btn-sm"
                ref={operation + which}
                onClick={this.performOp.bind(this, operation, which, extreme)}
            >
                <span className={'glyphicon glyphicon-' + operation} aria-hidden="true">
                </span>
            </button>
        );
    }

    processSubmitSuccess() {
        this.props.callback();
        this.setState({submitting: false, submitted: true});
    }

    processSubmitFailure(responseData, textStatus, errorThrown) {
        this.setState({submitting: false});
        console.log('POST error:', responseData, textStatus, errorThrown);
    }

    submit() {
        this.setState({submitting: true});

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
                        <td>{this.buttonMath('minus', 'sys', 70)}</td>
                        <td className="digits">{this.state.data.sys}</td>
                        <td>{this.buttonMath('plus', 'sys', 250)}</td>
                    </tr>
                    <tr>
                        <td>{this.buttonMath('minus', 'dia', 50)}</td>
                        <td className="digits">{this.state.data.dia}</td>
                        <td>{this.buttonMath('plus', 'dia', 150)}</td>
                    </tr>
                    <tr>
                        <td>{this.buttonMath('minus', 'pul', 40)}</td>
                        <td className="digits">{this.state.data.pul}</td>
                        <td>{this.buttonMath('plus', 'pul', 160)}</td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <Button submit={true}
                        loading={this.state.submitting}
                        disabled={this.state.submitting || this.state.submitted}
                        onClick={this.submit.bind(this)}>
                    {this.for_date} {('00' + this.for_hour).slice(-2)}:00
                </Button>
            </div>
        );
    }
}

export default PressureInput;

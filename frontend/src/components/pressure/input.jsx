import React, { Component } from 'react';
import Select from 'react-select';
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
            sys: props.sys ? props.sys : 120,
            dia: props.dia ? props.dia : 80,
            pul: props.pul ? props.pul : 70,
            submitting: false,
            submitted: false
        }
    }

     processSubmitSuccess() {
        this.callback()
        this.setState({ submitting: false, submitted: true })
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
            url: UrlUtils.getPressureUrl(),
            crossDomain: true,
            data: {
                for_date: this.for_date,
                for_hour: this.for_hour,
                sys: this.state.sys,
                dia: this.state.dia,
                pul: this.state.pul
            },
            dataType: 'json',
            success: this.processSubmitSuccess.bind(this),
            error: this.processSubmitFailure.bind(this)
        });
    }

    logChange(val) {
        console.log("Selected: " + JSON.stringify(val));
    }

    render() {
        var options = [
          { value: 120, label: '120' },
          { value: 121, label: '121' }
        ];
        return <div>
 <select>
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
            <Button submit={false} loading={this.state.submitting} disabled={this.state.submitting} onClick={this.submit.bind(this)}>
                { this.for_date } { this.for_hour }:00
            </Button>
        </div>
    }
}

export default PressureInput;

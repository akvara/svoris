import React from 'react';
import ReactDOM from 'react-dom';

import WeightInput from './weight-input';
import WeightOutput from './weight-output';
import WeightStats from './weight-stats';
import WeightChart from './weight-chart';

import * as UrlUtils from '../utils/url-utils';
import * as Utils from '../utils/utils';

import $ from 'jquery';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.which = 'Svoris';
        this.data = []
    }

    callback(i) {
        console.log('callback:', i);
        this.requestData()
    }

    componentWillMount() {
        this.requestData()
    }

    snatchData(data) {
        var arr = []
        data.forEach(function(element) {
            arr.push({'for_date': Utils.formatDate(element.for_date), 'weight': element.weight});
        });
        return arr;
    }

    requestData() {
        if (this.which === 'Svoris') {
            return $.get(
                UrlUtils.getWeightUrl()
            )
            .done((data) => {
                // console.log('data:', JSON.stringify(data) );
                this.weightsReceived(data)
            })
            .fail((err) => {
                console.log(err);
            });
        } else {

        }
    }

    weightsReceived(data) {
        let snatched = this.snatchData(data);

        Utils.sortArrOfObjectsByParam(snatched, 'weight', false)
        let stats = {
            'min': {
                value: snatched[0].weight,
                for_date: snatched[0].for_date
            },
            'max': {
                value: snatched[1].weight,
                for_date: snatched[1].for_date
            }
        }
        ReactDOM.render(<WeightStats items={stats}/>, document.getElementById('stats'));
        Utils.sortArrOfObjectsByParam(snatched, 'for_date', false)
        ReactDOM.render(<WeightChart items={snatched}/>, document.getElementById('chart'));
        Utils.sortArrOfObjectsByParam(snatched, 'for_date', true)
        ReactDOM.render(<WeightOutput items={snatched}/>, document.getElementById('output'));
        ReactDOM.render(<WeightInput last={data[0].weight} callback={this.callback.bind(this)}/>, document.getElementById('input'));
    }

    render() {
        return (
            <div>
                <h1>{this.which}</h1>
            </div>
        );
    }
}

export default App;

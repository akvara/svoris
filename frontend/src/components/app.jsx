import React from 'react';
import ReactDOM from 'react-dom';
import WeightInput from './weight/input';
import WeightOutput from './weight/output';
import WeightStats from './weight/stats';
import WeightChart from './weight/chart';
import PressureInput from './pressure/input';
import PressureOutput from './pressure/output';
import PressureStats from './pressure/stats';
import PressureChart from './pressure/chart';
import * as UrlUtils from '../utils/url-utils';
import * as Utils from '../utils/utils';
import $ from 'jquery';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {which: 'Svoris'};
    }

    switchMode() {
        if (this.state.which === 'Svoris') {
            this.requestData('Spaudimas');
            this.setState({which: 'Spaudimas'});
        } else {
            this.requestData('Svoris');
            this.setState({which: 'Svoris'});
        }
    }

    callback() {
        this.requestData(this.state.which);
    }

    componentWillMount() {
        this.requestData('Svoris');
    }

    snatchWeightData(data) {
        let arr = [];
        data.forEach(function (element) {
            arr.push({
                'for_date': Utils.formatDate(element.for_date),
                'weight': element.weight,
                'date': new Date(Utils.formatDate(element.for_date))
            });
        });
        return arr;
    }

    snatchPressureData(data) {
        let arr = [];
        data.forEach(function (element) {
            arr.push({
                'for_date': Utils.formatDate(element.for_date),
                'for_hour': element.for_hour,
                'sys': element.sys,
                'dia': element.dia,
                'pul': element.pul,
                'date': new Date(Utils.formatDate(element.for_date))
            });
        });
        return arr;
    }

    requestData(which) {
        if (which === 'Svoris') {
            $.get(UrlUtils.getWeightUrl())
                .done((data) => {
                    this.weightsReceived(data);
                })
                .fail((err) => {
                    console.log(err);
                });
        } else {
            $.get(UrlUtils.getPressureUrl())
                .done((data) => {
                    this.pressuresReceived(data);
                })
                .fail((err) => {
                    console.log(err);
                });
        }
    }

    weightsReceived(data) {
        if (!data.length) {
            return ReactDOM.render(
                <WeightInput last={90} callback={this.callback.bind(this)} />, document.getElementById('input')
            );
        }

        let snatched = this.snatchWeightData(data);

        let by_weight = Utils.sortArrOfObjectsByParam(snatched, 'weight').slice();

        let stats = {
            'min': {
                value: by_weight[0].weight,
                for_date: by_weight[0].for_date
            },
            'max': {
                value: by_weight[by_weight.length - 1].weight,
                for_date: by_weight[by_weight.length - 1].for_date
            }
        };

        let by_date_asc = Utils.sortByDate(snatched, false).slice();
        let by_date_desc = Utils.sortByDate(snatched, true).slice();

        ReactDOM.render(<WeightInput last={by_date_asc[by_date_asc.length - 1].weight}
                                     callback={this.callback.bind(this)} />, document.getElementById('input'));
        ReactDOM.render(<WeightChart items={by_date_asc} />, document.getElementById('chart'));
        ReactDOM.render(<WeightStats items={stats} />, document.getElementById('stats'));
        ReactDOM.render(<WeightOutput items={by_date_desc} />, document.getElementById('output'));
    }

    pressuresReceived(data) {
        if (!data.length) {
            return ReactDOM.render(
                <PressureInput
                    callback={this.callback.bind(this)}
                />,
                document.getElementById('input')
            );
        }
        let snatched = this.snatchPressureData(data);

        let stats = {};

        let by_date_asc = Utils.sortByDate(snatched, false).slice();
        let by_date_desc = Utils.sortByDate(snatched, true).slice();

        ReactDOM.render(
            <PressureInput callback={this.callback.bind(this)} />, document.getElementById('input')
        );
        ReactDOM.render(<PressureChart items={by_date_asc} />, document.getElementById('chart'));
        ReactDOM.render(<PressureStats items={stats} />, document.getElementById('stats'));
        ReactDOM.render(<PressureOutput items={by_date_desc} />, document.getElementById('output'));
    }

    render() {
        return (
            <div>
                <br />
                <button onClick={this.switchMode.bind(this)}>Spaudimas / Svoris</button>

                <h1>{this.state.which}</h1>
            </div>
        );
    }
}

export default App;

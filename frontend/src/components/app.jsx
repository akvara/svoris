import React from 'react';
import ReactDOM from 'react-dom';

import WeightInput from './weight/input';
import WeightOutput from './weight/output';
import WeightStats from './weight/stats';
import WeightChart from './weight/chart';
import * as UrlUtils from '../utils/url-utils';
import * as Utils from '../utils/utils';
import $ from 'jquery';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = { which: 'Svoris' } ;
    }

    switch() {
        if (this.state.which === 'Svoris') { this.setState({ which: 'Spaudimas' }) } else this.setState({ which: 'Svoris' })
        this.requestData()
    }

    callback() {
        this.requestData()
    }

    componentWillMount() {
        this.requestData()
    }

    snatchData(data) {
        var arr = []
        data.forEach(function(element) {
            arr.push({'for_date': Utils.formatDate(element.for_date), 'weight': element.weight, date: new Date(Utils.formatDate(element.for_date))});
        });
        return arr;
    }

    requestData() {
        if (this.state.which === 'Svoris') {
            $.get(
                UrlUtils.getWeightUrl()
            )
            .done((data) => {
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
        // console.log('snatched:', snatched);

        let by_weight = Utils.sortArrOfObjectsByParam(snatched, 'weight').slice();
        // console.log('pagal weight:', by_weight);


        let stats = {
            'min': {
                value: by_weight[0].weight,
                for_date: by_weight[0].for_date
            },
            'max': {
                value: by_weight[by_weight.length - 1].weight,
                for_date: by_weight[by_weight.length - 1].for_date
            }
        }

        var by_date_asc = Utils.sortByDate(snatched, false).slice();
        console.log('pagal by_date_asc:', by_date_asc);

        var by_date_desc = Utils.sortByDate(snatched, true).slice();
        console.log('pagal by_date_desc:', by_date_desc);


        ReactDOM.render(<WeightInput last={by_date_asc[by_date_asc.length - 1].weight} callback={this.callback.bind(this)}/>, document.getElementById('input'));
        ReactDOM.render(<WeightChart items={by_date_asc}/>, document.getElementById('chart'));
        ReactDOM.render(<WeightStats items={stats}/>, document.getElementById('stats'));
        ReactDOM.render(<WeightOutput items={by_date_desc}/>, document.getElementById('output'));
    }

    render() {
        return (
            <div>
                <br />
                <button onClick={this.switch.bind(this)} >Spaudimas / Svoris</button>

                <h1>{this.state.which}</h1>
            </div>
        );
    }
}

export default App;

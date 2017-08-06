import React from 'react';
import ReactDOM from 'react-dom';

import WeightInput from './weight-input';
import WeightOutput from './weight-output';

import * as UrlUtils from '../utils/url-utils';
import $ from 'jquery';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.which = 'svoris';
        this.data = []
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.requestData()
    }

    requestData() {
        if (this.which === 'svoris') {
            return $.get(
                UrlUtils.getWeightUrl()
            )
            .done((data) => {
                console.log('weights Received');

                this.weightsReceived(data)
            })
            .fail((err) => {
                console.log(err);
                this.setWeights([])
            });
        } else {

        }
    }

    weightsReceived(data) {
        this.data = data
        ReactDOM.render(<WeightInput last = {data[0].weight}/>, document.getElementById('input'));
        // ReactDOM.render(<WeightInput last="90.1"/>, document.getElementById('output'));
        ReactDOM.render(<WeightOutput items = {data}/>, document.getElementById('output'));
    }


    render() {
        return (
            <div>
                <h1>[Čia bus Toggle mygtukas]</h1>
                <br />
            </div>
        );
    }
}

export default App;

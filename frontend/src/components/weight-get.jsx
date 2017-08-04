import React from 'react';
import Lister from './lister';
import * as UrlUtils from '../utils/url-utils';
import * as Utils from '../utils/utils';
import $ from 'jquery';

class WeightGet extends Lister {
    constructor(props, context) {
        super(props, context);
        // var items = []
        // for (var i=19; i>0; i--) {
            // items.push({for_date: '2017-07-' + i, weight: i + 70 + "." + i})
        // }
        this.state = {
            items: [],
            notYetLoaded: false
        }
    }

    loadData() {
        return $.get(
            UrlUtils.getWeightUrl()
        )
        .done((data) => { this.setWeights(data) })
        .fail((err) => {
            console.log(err);
            this.setWeights([])
        });
    }

    setWeights(data) {
        // console.log('data:', data);
        this.setState({ items: data})
    }

    formatItem(item) {
        return <div>{item.weight} <span className="small"> - {Utils.formatDate(item.for_date)}</span></div>
    }

}

export default WeightGet;

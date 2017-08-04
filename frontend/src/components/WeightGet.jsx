import React, { Component } from 'react';
import Lister from './Lister';

class WeightGet extends Lister {
    constructor(props, context) {
        super(props, context);
        var items = []
        for (var i=19; i>0; i--) {
            items.push({for_date: '2017-07-' + i, weight: i + 70 + "." + i})
        }
        this.state = {
            items: items,
            notYetLoaded: false
        }
    }

    formatItem(item) {
        return <div>{item.weight} <span className="small"> - {item.for_date}</span></div>
    }

}

export default WeightGet;

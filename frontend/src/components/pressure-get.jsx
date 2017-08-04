import React, { Component } from 'react';
import Lister from './lister';

class PressureGet extends Lister {
    constructor(props, context) {
        super(props, context);
        var items = []
        for (var i=19; i>0; i--) {
            items.push({for_date: '2017-07-' + i, sys: i + 120, dia: i + 70, pul: i + 50})
        }
        this.state = {
            items: items,
            notYetLoaded: false
        }
    }

    formatItem(item) {
        return <div>{item.sys}/{item.dia}/{item.pul} <span className="small"> - {item.for_date}</span></div>
    }

}

export default PressureGet;

import React from 'react';
import Lister from './lister';
import * as UrlUtils from '../utils/url-utils';
import * as Utils from '../utils/utils';
import $ from 'jquery';

class WeightOutput extends Lister {
    constructor(props, context) {
        super(props, context);
    }

    formatItem(item) {
        return <div>{item.weight} <span className="small"> - {Utils.formatDate(item.for_date)}</span></div>
    }

}

export default WeightOutput;

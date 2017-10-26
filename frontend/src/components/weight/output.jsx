import React from 'react';
import Lister from './../lister';
import * as Utils from '../../utils/utils';

class WeightOutput extends Lister {
    formatItem(item) {
        return <div>{item.weight.toFixed(1)} <span className="small"> - {Utils.formatDate(item.for_date)}</span></div>
    }
}

export default WeightOutput;

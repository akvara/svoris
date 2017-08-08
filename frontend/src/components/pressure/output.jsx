import React from 'react';
import Lister from './../lister';
import * as Utils from '../../utils/utils';

class PressureOutput extends Lister {
    formatItem(item) {
        return <div>{item.sys}/{item.dia}/{item.pul} <span className="small"> - {Utils.formatDate(item.for_date)}</span></div>
    }
}

export default PressureOutput;

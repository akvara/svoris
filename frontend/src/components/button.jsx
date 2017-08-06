import React from 'react';
import classnames from 'classnames';
// import Icon from './icon';

export default function Button(props) {
    const {
        type = 'primary',
        className = '',
        submit = false,
        loading = false,
        children = null,
        ...restprops
    } = props;

    const btnprops = {
        ...restprops,
        className: classnames(className, 'btn', `btn-${type}`, {'btn-loading': loading}),
        type: submit
            ? 'submit'
            : 'button'
    };

    if (loading) {
        return (
            <button {...btnprops}>
                Submitting ..
            </button>
        );
    }

    return (
        <button {...btnprops}>
            {children}
        </button>
    );
}

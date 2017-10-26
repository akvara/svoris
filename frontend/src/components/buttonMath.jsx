import React from 'react';

const ButtonMath = props => {
    return (
        <button className="btn btn-sm" onClick={props.onClick(props.which)}>
            <span className={"glyphicon glyphicon-" + props.op} aria-hidden="true"></span>
        </button>
    )
}

export default ButtonMath;
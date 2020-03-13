import React from 'react';

function FormGroup(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.html}>{props.label}</label>
            {props.children}
        </div>
    )
}
export default FormGroup
import React from 'react';

const square = props => {
    let disabled = props.disabled || false;
    
    if(disabled) {
        return (
            <div className={ props.aclass }>{ props.day }</div>
        )
    }

    return (
        <div className={ props.aclass } onClick={ () => props.clicked({
            value: props.date, 
            bookings: props.bookings, 
            selectedDays: props.selected
        }) } >{ props.day }</div>
    );
}

export default square;
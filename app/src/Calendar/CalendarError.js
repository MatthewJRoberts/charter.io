import React from 'react';

const calendarError = props => {

    let errClasses = ["calendarError"];
    errClasses.push(props.type);

    if(props.noline) {
        errClasses.push('noline');
    }

    return (
        <div className={errClasses.join(' ')}>
            { props.error }
        </div>
    )
}

export default calendarError;
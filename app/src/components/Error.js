import React from 'react';

const error = props => {

    let classType = 'notify';
    if(props.second) {
        classType = 'notifySecond';
    }

    let err = null;
    if(props.err.value) {
        switch(props.err.type) {
            case 'positive':
                err = (
                    <div className={`${classType} positive`} onClick={ props.clicked }>
                        { props.err.value }
                    </div>
                );
                break;
            case 'negative':
                err = (
                    <div className={`${classType} negative`} onClick={ props.clicked }>
                        { props.err.value }
                    </div>
                );
                break;
            default: 
                err = null;
                break;
        }
    }

    return (
        <div>
            { err }
        </div>
    )
}

export default error;
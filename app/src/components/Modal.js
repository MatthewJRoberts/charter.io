import React from 'react';

const modal = props => {

    let dimmerClasses = "dimmer";
    if(props.active) {
        dimmerClasses = "dimmer active";
    }

    return (
        <div className={dimmerClasses}>
            <div className="modal">
                <div className="main">
                    { props.children } 
                </div>
                <div className="footer">
                    <a className="button positive">Confirm</a>
                    <a className="button" onClick={ () => props.toggle() }>Cancel</a>
                </div>
            </div>
        </div>
    );
}

export default modal;
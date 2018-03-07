import React from 'react';
import { NavLink } from 'react-router-dom';

const header = props => {
    return (
        <div className="container">
            <header>
                <div className="top">
                    <div className="brand">
                        <h2 style={{padding: '0.25em 0.5em', margin: '0', textShadow: '0px 1px 2px rgba(0,0,0,0.3)'}}><i className="far fa-calendar-alt"></i> Charter.io</h2>
                    </div>
                    <div className="extra">
                        <a className="social"><i className="fas fa-file-alt"></i></a>
                        <a className="social"><i className="fas fa-info-circle"></i></a>
                    </div>
                </div>
                <div className="bottom">
                    <div className="links">
                        <NavLink to="/" className="primary" exact={true} activeClassName="active">Requests</NavLink>
                        <NavLink to="/bookings" className="primary" exact={true} activeClassName="active">Bookings</NavLink>
                        <NavLink to={`/calendar/${ props.id }`} className="primary" exact={true} activeClassName="active">Calendar</NavLink>
                    </div>
                    <div className="links2">
                        <div className="secondary">
                            <i className="fas fa-sort-down" style={{position: 'relative', top: '-2px', left: '-2px'}}></i> My Account
                            <div className="outer">
                                <div className="inner">
                                    <NavLink to="/account">Settings</NavLink>
                                    <a onClick={ props.userSignout }>Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default header;
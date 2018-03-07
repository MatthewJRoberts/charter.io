import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from './../store/actions/index';
import Error from './../components/Error';
import ReqBookings from './../components/ReqBookings';
import ReqBookingAdd from './../components/ReqBookingsAdd';
import ReqBookingSelect from '../components/ReqBookingSelect';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <Error err={ this.props.error } clicked={ this.props.error_remove } />
                </div>
                <div className="container" style={{padding: '1em', boxSizing: 'border-box'}}>
                    <p>Add a Booking Manually</p>
                    <ReqBookingAdd addbooking={ this.props.addbooking } addbookingchange={ this.props.booking_change } addbookingsubmit={ this.props.booking_add } userid={ this.props.user._id } />

                    <p>Requested Bookings</p>
                    <button className="button" onClick={ () => this.props.booking_all({userid: this.props.user._id}) }><i className="fas fa-sync-alt" style={{paddingRight: '4px'}}></i> Refresh</button>
                    <ReqBookings 
                        bookings={ this.props.bookings }
                        bookingDelete={ this.props.booking_delete }
                        bookingUpdate={ this.props.booking_update }
                        token={ this.props.token }
                        accepted={ false } 
                        booking_select={ this.props.booking_select } />

                    <p>Selected Booking</p>
                    <ReqBookingSelect selectedBooking={ this.props.selectedBooking } bookings={ this.props.bookings } />
                </div>
            </div>
        );
        
    }
}

const mapStateToProps = state => {
    return {
        error: state.misc.error,
        bookings: state.booking.bookings,
        addbooking: state.booking.addbooking,
        user: state.user.user,
        token: state.user.auth.token,
        selectedBooking: state.booking.selectedBooking
    }
}

const mapDispatchToProps = dispatch => {
    return {
        error_remove: () => dispatch(actionCreators.error_remove()),
        booking_change: payload => dispatch(actionCreators.booking_change(payload)),
        booking_add: payload => dispatch(actionCreators.booking_add(payload)),
        booking_delete: payload => dispatch(actionCreators.booking_delete(payload)),
        booking_update: payload => dispatch(actionCreators.booking_update(payload)),
        booking_all: (payload) => dispatch(actionCreators.booking_all(payload)),
        booking_select: payload => dispatch(actionCreators.booking_select(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from './../store/actions/index';
import Error from './../components/Error';
import ReqBookings from './../components/ReqBookings';
import ReqBookingSelect from '../components/ReqBookingSelect';
import Modal from './../components/Modal';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Modal 
                    active={ this.props.modalActive } 
                    toggle={ this.props.modal_toggle }
                    onConfirm={ false }>Are you sure?</Modal>
                <div className="container">
                    <Error err={ this.props.error } clicked={ this.props.error_remove } />
                </div>
                <div className="container" style={{padding: '1em', boxSizing: 'border-box'}}>
                    <p>Bookings</p>
                    <ReqBookings 
                        bookings={ this.props.bookings } 
                        bookingDelete={ this.props.booking_delete }
                        bookingUpdate={ this.props.booking_update }
                        token={ this.props.token }
                        accepted={ true }
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
        user: state.user.user,
        token: state.user.auth.token,
        modalActive: state.misc.modal.active,
        selectedBooking: state.booking.selectedBooking
    }
}

const mapDispatchToProps = dispatch => {
    return {
        error_remove: () => dispatch(actionCreators.error_remove()),
        booking_delete: payload => dispatch(actionCreators.booking_delete(payload)),
        modal_toggle: () => dispatch(actionCreators.modal_toggle()),
        booking_update: payload => dispatch(actionCreators.booking_update(payload)),
        booking_select: payload => dispatch(actionCreators.booking_select(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from './../store/actions/index';
import Squares from './Squares';
import CalendarError from './CalendarError';

class Calendar extends Component {

    componentDidMount() {
        this.props.calender_set();
        if(!this.props.infoLoaded) {
            if(this.props.bookings.length === 0) {
                this.props.calendar_info({calendarid: this.props.match.params['id']});
            }
        }
    }

    componentDidUpdate() {
        

        if(this.props.progress === 1) {
            if(this.props.selectedDays.start === 0 || this.props.selectedDays.end === 0) {
                if(this.props.error.msg !== 'No Dates Selected.') {
                    this.props.calendar_error({type: '', msg: 'No Dates Selected.'});
                }
            } else if(this.props.selectedDays.start <= new Date().getTime()) {
                if(this.props.error.msg !== 'Invalid Dates Selected.') { 
                    this.props.calendar_error({type: 'negative', msg: 'Invalid Dates Selected.'});  
                }
            } else if(this.props.selectedDays.start > new Date().getTime()) {
                if(this.props.error.msg !== 'Valid Dates Selected.') { 
                    this.props.calendar_error({type: 'positive', msg: 'Valid Dates Selected.'});  
                }
            }
        }
    }

    render() {
        // Variables
        const months = [
            {m:'January', d:31}, 
            {m:'February', d:28}, 
            {m:'March', d:31}, 
            {m:'April', d:30}, 
            {m:'May', d:31}, 
            {m:'June', d:30}, 
            {m:'July', d:31}, 
            {m:'August', d:31}, 
            {m:'September', d:30}, 
            {m:'October', d:31}, 
            {m:'November', d:30}, 
            {m:'December', d:31}
        ];
        // Leap Year
        if((this.props.selectedYear % 4) === 0) {
            months[1].d = 29;
        }

        let calendarSection = (
            <Squares 
                months={ months }
                calendar_mod={ this.props.calendar_mod }
                calendar_select={ this.props.calendar_select }
                selectedDays={ this.props.selectedDays }
                selectedMonth={ this.props.selectedMonth }
                selectedYear={ this.props.selectedYear }
                bookings={ this.props.bookings }
                error={ this.props.error }
                customerInfo={ this.props.customerInfo }
                calendar_post={ this.props.calendar_post }
                calendar_progress={ this.props.calendar_progress }
                calendar_input={ this.props.calendar_input }
                calendarID={ this.props.match.params['id'] } />
        )

        let detailSection = (
            <section className="details">
                <CalendarError type={ this.props.error.type } error={ this.props.error.msg } noline={true} />
                <p className="title1">To Book:</p>
                <h2 className="title">{ this.props.info.email || "Contact Me" }</h2>
                <p className="title2">Or fill in the form below: </p>

                <div className="form" style={{width: '50%', margin: '0 auto'}}>
                    <label>Enter Full Name</label>
                    <div className="cols">
                        <input 
                            type="text" 
                            placeholder="Full Name"
                            value={ this.props.customerInfo.fullname }
                            onChange={ e => this.props.calendar_input({type: 'fullname', value: e.target.value}) } />
                    </div>
                    <label>Enter Email Address</label>
                    <div className="cols">
                        <input 
                            type="text" 
                            placeholder="Email Address"
                            value={ this.props.customerInfo.email }
                            onChange={ e => this.props.calendar_input({type: 'email', value: e.target.value}) } />
                    </div>
                    <label>Enter Phone Number (Optional)</label>
                    <div className="cols">
                        <input 
                            type="text" 
                            placeholder="Phone Number (Optional)"
                            value={ this.props.customerInfo.phone }
                            onChange={ e => this.props.calendar_input({type: 'phone', value: e.target.value}) } />
                    </div>
                    <div className="cols">
                        <button onClick={ () => this.props.calendar_progress({up: true, customerInfo: this.props.customerInfo}) } style={{margin: '0'}}>Continue</button>
                    </div>
                </div>
            </section>
        )

        let endSection = (
            <section className="end" style={{paddingTop: '12em', textAlign: 'center'}}>
                <h3>Your Message Has Been Sent!</h3>
                <p>I will get back to you shortly...</p>
            </section>
        )

        return (
            <div className="container">

                <div className="calendar">

                    { this.props.progress === 0 ? detailSection: null }

                    { this.props.progress === 1 ? calendarSection : null }

                    { this.props.progress === 2 ? endSection : null }

                </div>

            </div>
        )

    }
}

const mapDispatchToProps = dispatch => {
    return {
        calendar_mod: payload => dispatch(actionCreators.calendar_mod(payload)),
        calender_set: () => dispatch(actionCreators.calender_set()),
        calendar_info: payload => dispatch(actionCreators.calendar_info(payload)),
        calendar_select: payload => dispatch(actionCreators.calendar_select(payload)),
        calendar_progress: payload => dispatch(actionCreators.calendar_progress(payload)),
        calendar_error: payload => dispatch(actionCreators.calendar_error(payload)),
        calendar_input: payload => dispatch(actionCreators.calendar_input(payload)),
        calendar_post: payload => dispatch(actionCreators.calendar_post(payload))
    }
}

const mapStateToProps = state => {
    return {
        selectedMonth: state.calendar.selectedMonth,
        selectedYear: state.calendar.selectedYear,
        bookings: state.calendar.bookings,
        selectedDays: state.calendar.selectedDays,
        progress: state.calendar.progress,
        error: state.calendar.error,
        customerInfo: state.calendar.customerInfo,
        info: state.calendar.info,
        infoLoaded: state.calendar.infoLoaded
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
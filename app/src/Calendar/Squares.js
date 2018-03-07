import React from 'react';

import CalendarError from './CalendarError';
import Square from './Square';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}
const dateFormat = timestamp => {
    if(timestamp === 0) {
        return 'N/A';
    }
    return `${days[new Date(timestamp).getDay()]} ${ordinal_suffix_of(new Date(timestamp).getDate())} ${months[new Date(timestamp).getMonth()]}`;
}


const squares = props => {
    let displayDays = [];
    let dayCounter = 0;

    let firstDayOfTheMonth = new Date(`${props.selectedYear}-${props.selectedMonth+1}-1`).getDay();
    let priorMonthDays = 0
    if(props.selectedMonth === 0) {
        priorMonthDays = props.months[11].d - (firstDayOfTheMonth);
    } else {
        priorMonthDays = props.months[props.selectedMonth-1].d - (firstDayOfTheMonth);
    }

    // Display Prior Months Days
    for(let i = 0; i < firstDayOfTheMonth; i++) {
        priorMonthDays += 1;
        displayDays.push(
            <Square 
                key={i+'prior'} 
                aclass="day prior" 
                disabled={true}
                day={priorMonthDays} />
        );
        dayCounter += 1;
    }

    // Loops Through Days of the Month
    for(let i = 0; i < props.months[props.selectedMonth].d; i++) {

        // Day CSS Classes
        let dayClasses = ["day"];

        // Highlight Current Date
        if(props.selectedYear === new Date().getFullYear()) {
            // Current Year
            if(props.selectedMonth === new Date().getMonth()) {
                // Current Month
                if(i+1 === new Date().getDate()) {
                    // Current Day
                    dayClasses.push("today");
                }
            }
        }

        // Disables Booked Days 
        let cd = new Date(`${props.selectedYear}-${props.selectedMonth+1}-${i+1}`).getTime();
        if(props.bookings) {
            for(let x = 0; x < props.bookings.length; x++) {
                if(
                    (cd <= props.bookings[x].date.end) && 
                    (cd >= props.bookings[x].date.start - 3600000)
                ) {
                    dayClasses.push("disabled");
                }
            }
        }

        // Highlight Selected Days
        if(props.selectedDays) {
            if(props.selectedDays.start <= new Date().getTime()) {
                if(
                    (cd <= props.selectedDays.end) && 
                    (cd >= props.selectedDays.start)
                ) {
                    dayClasses.push('selectedWarning');
                }
                // Hightlight Selected DAY
                if((cd === props.selectedDays.start) || (cd === props.selectedDays.end)) {
                    dayClasses.push('actualWarning');
                }
            } else {
                if(
                    (cd <= props.selectedDays.end) && 
                    (cd >= props.selectedDays.start)
                ) {
                    dayClasses.push('selected');
                }
                // Hightlight Selected DAY
                if((cd === props.selectedDays.start) || (cd === props.selectedDays.end)) {
                    dayClasses.push('actual');
                }
            }
        }    

        displayDays.push(
            <Square 
                key={i} 
                aclass={ dayClasses.join(' ') } 
                day={i+1}
                date={cd}
                clicked={ props.calendar_select }
                bookings={ props.bookings }
                selected={ props.selectedDays } />
        );
        dayCounter += 1;
    }

    let remaining = 35 - dayCounter;
    if(remaining >= 0) {
        for(let i = 0; i < remaining; i++) {
            displayDays.push(
                <Square 
                    key={i+'after'} 
                    aclass="day prior" 
                    disabled={true}
                    day={i+1} />
            );
        }
    }

    return (
        <section>
            <div className="header">
                <div className="left">
                    <a className="arrow" onClick={ () => props.calendar_mod({up:false}) }><i className="fas fa-chevron-left"></i></a>
                </div>
                <div className="center">
                    <h3>{ props.months[props.selectedMonth].m }</h3>
                    <p>{ props.selectedYear }</p>
                </div>
                <div className="right">
                    <a className="arrow" onClick={ () => props.calendar_mod({up:true}) }><i className="fas fa-chevron-right"></i></a>
                </div>
            </div>
            <CalendarError type={ props.error.type } error={ props.error.msg } />
            <div className="grid">
                <div className="left">
                    <div className="weekdays">
                        <p>Sunday</p>
                        <p>Monday</p>
                        <p>Tuesday</p>
                        <p>Wednesday</p>
                        <p>Thursday</p>
                        <p>Friday</p>
                        <p>Saturday</p>
                    </div>
                    <div className="main">
                        { displayDays }
                    </div>
                </div>
                <div className="right sidebar">
                    <h1>Selection</h1>
                    <h2>{dateFormat(props.selectedDays.start)} - {dateFormat(props.selectedDays.end)}</h2>
                    <textarea 
                        placeholder="Optional Message"
                        value={ props.customerInfo.message }
                        onChange={ e => props.calendar_input({type: 'message', value: e.target.value}) }></textarea>
                    <p className="info"><b>Email Address:</b> { props.customerInfo.email }</p>
                    <p className="info"><b>Phone Number:</b> { props.customerInfo.phone }</p>
                    <footer>
                        <p className="total">Send Message</p>
                        <a 
                            className="button" 
                            onClick={ e => props.calendar_post({customerInfo: props.customerInfo, selectedDays: props.selectedDays, calendarid: props.user._id}) }
                            style={{
                                border: 'solid 1px #1565c0',
                                float: 'right'
                            }}>Book</a>
                        <a 
                            className="button" 
                            onClick={ () => props.calendar_progress({up: false, customerInfo: props.customerInfo}) }
                            style={{
                                border: 'solid 1px #1565c0',
                                color: '#1565c0',
                                background: 'rgba(0,0,0,0)',
                                float: 'right'
                            }}>Back to Details</a>
                    </footer>
                </div>
            </div>
        </section>
    )
}

export default squares;
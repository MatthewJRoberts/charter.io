import React from 'react';

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

const reqBookingSelect = props => {

    let display = null;
    if(props.selectedBooking !== null) {
        let book = props.bookings[props.selectedBooking];
        if(book === undefined) {
            return null;
        }
        display = (
            <div className="selectGrid">
                <div className="name">
                    <h4>Full Name: { book.customer.fullname }</h4>
                </div>
                <div className="email">
                    <h4>Email Address: { book.customer.contact.email }</h4>
                </div>
                <div className="phone">
                    <h4>Phone Number: { book.customer.contact.phone }</h4>
                </div>
                <div className="message">
                    <p>{ book.customer.message }</p>
                </div>
                <div className="date">
                    { dateFormat(book.date.start) } - { dateFormat(book.date.end) }
                </div>
            </div>
        )
    }

    return (
        <div className="selectedBooking">
            { display }
        </div>
    )
}

export default reqBookingSelect;
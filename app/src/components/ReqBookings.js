import React from 'react';

const reqBookings = props => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dateFormat = timestamp => {
        return `${days[new Date(timestamp).getDay()]} ${new Date(timestamp).getDate()} ${months[new Date(timestamp).getMonth()]} ${new Date(timestamp).getFullYear()}`;
    }

    let bookings = (
        <li>
            <div className="details"><b>No Bookings Found...</b></div>
            <div className="actions"></div>
        </li>
    );

    props.bookings.sort(function(a, b) {
        return parseFloat(a.date.start) - parseFloat(b.date.start);
    });

    if(props.bookings.length > 0) {
        bookings = props.bookings.map((book, i) => {

            if(book.accepted === props.accepted) {
                return (
                    <li key={book._id} onClick={ () => props.booking_select({index: i}) }>
                        <div className="details"><b>{ book.customer.fullname }</b> | { dateFormat(book.date.start) } - { dateFormat(book.date.end) }</div>
                        <div className="actions">
                            <a className="action" style={{background: '#23a712'}}
                                onClick={ () => props.bookingUpdate({
                                    id: book._id,
                                    data: {
                                        ...book,
                                        accepted: !book.accepted
                                    },
                                    token: props.token
                                }) }>
                                <i className="fas fa-arrow-up" style={{paddingRight: '0.2em'}}></i> Switch</a>
                            <a className="action" style={{background: '#c01515'}}
                                onClick={ () => props.bookingDelete({id: book._id, token: props.token}) }>
                                <i className="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    </li>
                )
            } else {
                return null;
            }

        });
    }

    return (
        <ul className="primary">
            { bookings }
        </ul>
    )
}

export default reqBookings;
import React from 'react';

const reqBookingsAdd = props => {

    const formSignup = (e) => {
        e.preventDefault();
        props.addbookingsubmit({data: props.addbooking, userid: props.userid});
    }

    return (
        <form className="form" onSubmit={ e => formSignup(e) }>
            <div className="cols">
                <p>
                    <label>Fullname:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Fullname" 
                        value={ props.addbooking.customer.fullname }
                        onChange={ e => props.addbookingchange({type:'fullname', value:e.target.value}) } />
                </p>
                <p>
                    <label>Phone Number:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Phone Number" 
                        value={ props.addbooking.customer.phone }
                        onChange={ e => props.addbookingchange({type:'phone', value:e.target.value}) } />
                </p>
                <p>
                    <label>Email Address:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Email Address" 
                        value={ props.addbooking.customer.email }
                        onChange={ e => props.addbookingchange({type:'email', value:e.target.value}) } />
                </p>
            </div>
            <br/>
            <div className="cols">
                <p>
                    <label>Start Date:</label>
                    <input type="date" onChange={(e) =>props.addbookingchange({type:'start', value:e.target.value})} />
                </p>
                <p>
                    <label>End Date:</label>
                    <input type="date" onChange={(e) =>props.addbookingchange({type:'end', value:e.target.value})} />
                </p>
            </div>
            <p style={{textAlign: 'right'}}>
                <button type="submit" className="positive">Add Booking</button>
            </p>
        </form>
    )
}

export default reqBookingsAdd;
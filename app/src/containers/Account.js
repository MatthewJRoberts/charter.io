import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from './../store/actions/index';
import Error from './../components/Error';
import Header from './../components/Header';

class Account extends Component {

    componentDidMount() {
        if(Object.keys(this.props.user).length !== 0) {
            this.props.user_edit_set();
        }
    }

    render() {
        
        const formSignup = (e) => {
            e.preventDefault();
            this.props.user_edit_apply({info: {
                email: this.props.editUser.email
            }});
        }

        return (
            <div>
                <Header userSignout={ this.props.user_signout } id={ this.props.user._id } />
                <div className="container">
                    <Error err={ this.props.error } clicked={ this.props.error_remove } />
                </div>
                <div className="container" style={{padding: '1em', boxSizing: 'border-box'}}>
                    <p>Add your calendar to your website: </p>
                    <code>
                        {`<iframe src="http://localhost:3000/calendar/${ this.props.user._id }" width=100%" height="600px"></iframe>`}
                    </code>
                    <p>Account Settings</p>
                    <form className="form" onSubmit={ e => formSignup(e) }>
                        <div className="cols">
                            <p>
                                <label>Enter Email Address: </label>
                                <input 
                                    type="text"
                                    placeholder="Email Address"
                                    value={ this.props.editUser.email }
                                    onChange={ e => this.props.user_edit_input({type: 'email', value: e.target.value}) } />
                            </p>
                        </div>
                        <div className="cols">
                            <p>
                                <button type="submit">Change Information</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        error: state.misc.error,
        editUser: state.user.editUser,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        error_remove: () => dispatch(actionCreators.error_remove()),
        user_signout: () => dispatch(actionCreators.user_signout()),
        user_edit_input: payload => dispatch(actionCreators.user_edit_input(payload)),
        user_edit_set: payload => dispatch(actionCreators.user_edit_set()),
        user_edit_apply: payload => dispatch(actionCreators.user_edit_apply(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actionCreators from './../store/actions/index';
import Error from './../components/Error';

class Signup extends Component {

    render() {

        const formSignup = (e) => {
            e.preventDefault();
            this.props.user_signup(this.props.userInput);
        }

        return (
            <div className="overlay">
                <Error err={ this.props.error } clicked={ this.props.error_remove } second={true} />
                <div className="pos_center"> 
                    <h2 style={{padding: '0.25em 0.5em', margin: '0', textShadow: '0px 1px 2px rgba(0,0,0,0.3)', color: '#fff'}}><i className="far fa-calendar-alt"></i> Charter.io</h2>
                    <form className="form" onSubmit={ (e) => formSignup(e) }>
                        <div className="cols">
                            <input 
                                type="text" 
                                placeholder="Username"
                                value={ this.props.userInput.username } 
                                onChange={ (e) => this.props.user_input({ input: 'username', value: e.target.value }) } />
                        </div>
                        <div className="cols">
                            <input 
                                type="password" 
                                placeholder="Password"
                                value={ this.props.userInput.password } 
                                onChange={ (e) => this.props.user_input({ input: 'password', value: e.target.value }) } />
                        </div>
                        <div className="cols">
                            <input 
                                type="password" 
                                placeholder="Confirm Password"
                                value={ this.props.userInput.passwordConfirm } 
                                onChange={ (e) => this.props.user_input({ input: 'passwordConfirm', value: e.target.value }) } />
                        </div>
                        <div className="cols">
                            <button type="submit">Register</button>
                            <NavLink to="/signin" className="linked">Back to Login</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInput: state.user.userInput,
        error: state.misc.error
    }
}

const mapStateToDispatch = dispatch => {
    return {
        user_input: (payload) => dispatch(actionCreators.user_input(payload)),
        user_signup: (payload) => dispatch(actionCreators.user_signup(payload)),
        error_remove: () => dispatch(actionCreators.error_remove())
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Signup);
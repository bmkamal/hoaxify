import { render } from "@testing-library/react";
import React, { Component } from "react";

export class UserSignUpPage extends React.Component {

    state = {
        displayName: '',
        userName: '',
        password: '',
        repeatPassword: ''
    }
    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({displayName: value});
    };
    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({userName: value});
    };
    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({password: value});
    };
    onChangeRepeatPassword = (event) => {
        const value = event.target.value;
        this.setState({repeatPassword: value});
    };
    onClickSignup = () => {
        const user = {
            userName: this.state.userName,
            displayName: this.state.displayName,
            password: this.state.password
        };
        this.props.actions.postSignup(user);
    };
    render(){
        return(
            <div>
                <h1> Sign Up </h1>
                <div>
                    <input placeholder='Your display name' 
                        value = {this.state.displayName} 
                        onChange = {this.onChangeDisplayName}
                    />
                </div>
                <div>
                    <input placeholder='Your username' 
                        value = {this.state.userName} 
                        onChange = {this.onChangeUsername}
                    />
                </div>
                <div>
                    <input placeholder='Your password' 
                        type="password" 
                        value = {this.state.password} 
                        onChange = {this.onChangePassword} 
                    />
                </div>
                <div>
                    <input placeholder='Repeat your password' 
                        type="password"
                        value = {this.state.repeatPassword} 
                        onChange = {this.onChangeRepeatPassword}
                    />
                </div>
                <div>
                    <button onClick = {this.onClickSignup} > Sign Up </button>
                </div>
            </div>
        )
    }

}

UserSignUpPage.defaultProps = {
    actions: {
        postSignup: () =>
          new Promise((resolve, reject) => {
            resolve({});
          })
      }
}
export default UserSignUpPage;
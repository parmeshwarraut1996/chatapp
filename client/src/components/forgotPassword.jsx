import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { forgotPassword } from "../services/userServices";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";

//ForgotPassword Component
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailTest: RegExp(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/),
            helperText: "",
            error: false,
            token: "",
            snackbaropen: false,
            snackbarmsg: ''
        };
    }

    //sendMail in button
    sendMail = event => {
        if (this.state.error) {
            event.preventDefault();
            console.log("Send Mail Button clicked");
            let data = {
                email: this.state.email
            };
            forgotPassword(data).then(response => {
                if (response.status === 200) {
                    this.setState({
                        token: response.data.data.token
                    })
                    localStorage.setItem('token', response.data.data.token);
                    this.setState({ snackbarmsg: `Email  successfully sent to ${data.email} `, snackbaropen: true });
                } else {
                    this.setState({ snackbarmsg: "Make sure email already registered", snackbaropen: true });
                }
            });
        }
        else
            this.setState({ snackbarmsg: "Invalid input", snackbaropen: true });
    }

    //setState for email field
    onChangeEmail = event => {
        if (this.state.emailTest.test(event.target.value)) {
            this.setState({
                helperText: "",
                error: false,
                email: event.target.value
            });
        } else {
            this.setState({
                helperText: "*invalid email format",
                error: true,
                email: event.target.value
            });
        }
    }

    //close snackbar
    handleClose = () => {
        this.setState({ snackbaropen: false });
    }

    //Render and User Interface for Forgot Password
    render() {
        return (
            <MuiThemeProvider>
                <div className="forgotPassContainer">
                    <div className="forgetPassForm">
                        <h1>ForgotPassword</h1>
                        <div>
                            <div className="inputFieldForgotPass">
                                <TextField
                                    variant="standard"
                                    label="Email"
                                    onChange={this.onChangeEmail}
                                />
                                <p>{this.state.helperText}</p>
                            </div>
                        </div>
                        <Button id="btnForgPass" onClick={e => this.sendMail(e)}>
                            SendMail
                                </Button>
                    </div>
                    <Snackbar open={this.state.snackbaropen} autoHideDuration={3000} onClose={this.handleClose}
                        message={<span>{this.state.snackbarmsg}</span>}
                        action={[
                            <IconButton key="close" arial-label="close" coloe="inherit" onClick={this.handleClose}>
                                x</IconButton>
                        ]}>
                    </Snackbar>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default ForgotPassword;
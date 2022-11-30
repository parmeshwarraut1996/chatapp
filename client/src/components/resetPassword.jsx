import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MultiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { resetPassword } from "../services/userServices";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";

//ResetPassword Component
class ResetPassword extends Component {
    //constructor
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            passwordErrText: "",
            confirmPasswordErrText: "",
            error: false,
            token: "",
            snackbaropen: false,
            snackbarmsg: ''
        };
    }

    //close snackbar
    handleClose = () => {
        this.setState({ snackbaropen: false });
    }

    //ComponentDidMount in Life cycle function be used
    componentDidMount = () => {
        console.log("localStorage: \n" + localStorage)
        const token = localStorage.getItem('token');
        this.setState({ token: token });
        console.log("token", JSON.stringify(token));
    }

    //reset Password Event Handler
    resetPassword = event => {
        if (this.state.error) {
            event.preventDefault();
            console.log("login clicked");
            let data = {
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            };
            console.log(data);
            //Calling the API using axios method
            resetPassword(data, this.state.token).then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert("Password successfully changed");
                    this.props.history.push({
                        pathname: "/",
                        state: { username: this.state.username }
                    });
                } else {
                    this.setState({ snackbarmsg: "Make sure that password and confirm password is same", snackbaropen: true });
                }
            });
        }
        else
            this.setState({ snackbarmsg: "Invalid input", snackbaropen: true });
    }
    //setState for confirm password field
    onChangeConfirmPassword = event => {
        if (event.target.value.length > 4) {
            this.setState({
                confirmPasswordErrText: "",
                error: true,
                confirmPassword: event.target.value
            });
        } else {
            this.setState({
                confirmPasswordErrText: "*minimum of 5 letters",
                error: false,
                confirmPassword: event.target.value
            });
        }
    }
    //setState for password field
    onChangePassword = event => {
        if (event.target.value.length > 4) {
            this.setState({
                passwordErrText: "",
                error: true,
                password: event.target.value
            });
        } else {
            this.setState({
                passwordErrText: "*minimum of 5 letters",
                error: false,
                password: event.target.value
            });
        }
    }

    //Render function && User Interface for resetPassword
    render() {
        return (
            <MultiThemeProvider>
                <div className="resetPassContainer">
                    <div className="resetPassForm">
                        <h1>ResetPassword</h1>
                        <div>
                            <div className="inputFieldresetPass">
                                <TextField
                                    variant="standard"
                                    type="password"
                                    label="Password"
                                    onChange={this.onChangePassword}
                                />
                                <p>{this.state.passwordErrText}</p>
                            </div>
                            <div className="inputFieldresetPass">
                                <TextField
                                    variant="standard"
                                    type="password"
                                    label="Confirm Password"
                                    onChange={this.onChangeConfirmPassword}
                                />
                                <p>{this.state.confirmPasswordErrText}</p>
                            </div>
                        </div>
                        <Button id="btnResetPass" onClick={e => this.resetPassword(e)}>
                            SUBMIT
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
            </MultiThemeProvider>
        );
    }
}

export default ResetPassword;
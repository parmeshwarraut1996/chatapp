import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { login } from "../services/userServices";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";

//login Component
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailTest: RegExp(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/),
            error: false,
            emailErrText: "",
            passwordErrText: "",
            username: "",
            snackbaropen: false,
            snackbarmsg: ''
        };
    }
    //Forgot password
    forgotpassword = event => {
        this.props.history.push("/forgotPassword");
    }
    //Reset password
    register = event => {
        this.props.history.push("/register");
    }
    //SignIn
    signIn = event => {
        if (this.state.error) {
            event.preventDefault();
            console.log("login clicked");
            let data = {
                email: this.state.email,
                password: this.state.password
            };
            console.log(data);
            login(data).then(response => {
                if (response.status === 200) {
                    localStorage.setItem('email',this.state.email);
                    localStorage.setItem('name',response.data.data.name);
                    setTimeout(this.props.history.push({
                        pathname: "/dashBoard",
                        state: { username: this.state.username }
                    }), 3000);
                } else {
                    console.log(response);
                    this.setState({ snackbarmsg: "Email or password is incorect", snackbaropen: true });
                }
            });
        } else
            this.setState({ snackbarmsg: "Invalid input", snackbaropen: true });
    }

    //close snackbar
    handleClose = () => {
        this.setState({ snackbaropen: false });
    }

    //setState of email field
    onChangeEmail = event => {
        if (this.state.emailTest.test(event.target.value)) {
            this.setState({
                emailErrText: "",
                error: true,
                email: event.target.value
            });
        } else {
            this.setState({
                emailErrText: "*invalid email format",
                error: false,
                email: event.target.value
            });
        }
    }

    //setState of password field
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

    //render function and UI of Login page
    render() {
        return (
            <section>
                <div className="logcontainer">
                    <div className="logForm">
                        <h1>LogIn</h1>
                        <div>
                            <div className="inputFieldlog">
                                <TextField
                                    variant="standard"
                                    label="Email"
                                    onChange={this.onChangeEmail}
                                />
                                <p>{this.state.emailErrText}</p>
                            </div>
                            <div className="inputFieldlog">
                                <TextField
                                    variant="standard"
                                    type="password"
                                    label="Password"
                                    onChange={this.onChangePassword}
                                />
                                <p>{this.state.passwordErrText}</p>
                            </div>
                        </div>
                        <Button id="subbtnlog" onClick={e => this.signIn(e)}>
                            Login
                        </Button>
                        <div className="footer">
                            <Button id="forgotstyle" onClick={e => this.forgotpassword(e)}>
                                ForgotPassword
                        </Button>
                            <Button id="registerstyle" onClick={e => this.register(e)}>
                                SignUp
                        </Button>
                        </div>
                    </div>
                    <Snackbar open={this.state.snackbaropen} autoHideDuration={3000} onClose={this.handleClose}
                        message={<span>{this.state.snackbarmsg}</span>}
                        action={[
                            <IconButton key="close" arial-label="close" coloe="inherit" onClick={this.handleClose}>
                                x</IconButton>
                        ]}>
                    </Snackbar>
                </div>
            </section>
        );
    }
}

export default Login;


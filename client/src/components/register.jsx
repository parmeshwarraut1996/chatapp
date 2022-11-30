import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";
import { register } from "../services/userServices";

//Register Component
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            country: "",
            nameTest: RegExp(/[a-z]{2,20}/),
            emailTest: RegExp(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/),
            countryTest: RegExp(/[a-z]{3,20}/),
            nameErrText: "",
            emailErrText: "",
            passwordErrText: "",
            countryErrText: "",
            error: false,
            username: "",
            snackbaropen: false,
            snackbarmsg: ''
        };
    }

    handleClose = () => {
        this.setState({ snackbaropen: false });
    }
    //register Event Handler
    RegisterBtn = event => {
        if (this.state.error) {
            event.preventDefault();
            console.log("Register clicked");
            let data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                country: this.state.country
            };

            console.log(data);
            register(data).then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({ snackbarmsg: `Successfully registered ${this.state.username}`, snackbaropen: true });
                    alert("Successfully registered")
                    this.props.history.push({
                        pathname: "/",
                    });
                } else {
                    console.log(response);
                    this.setState({ snackbarmsg: `${response}`, snackbaropen: true });
                }
            });
        }
        else
            this.setState({ snackbarmsg: 'Invalid input', snackbaropen: true });
    }
    //setState for email field and validation
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
    // setState for password field and validation
    onChangePassword = event => {
        if (event.target.value.length < 4) {
            this.setState({
                passwordErrText: "*minimum of 5 letters ",
                error: false,
                password: event.target.value
            });
        } else {
            this.setState({
                passwordErrText: "",
                error: true,
                password: event.target.value
            });
        }
    }
    //setState for Name field and validation
    onChangeName = event => {
        if (this.state.nameTest.test(event.target.value)) {
            this.setState({
                nameErrText: "",
                error: true,
                name: event.target.value
            });
        } else {
            this.setState({
                nameErrText: "*minimum of 3 letters",
                error: false,
                name: event.target.value
            });
        }
    }
    // setState for Country field && validation
    onChangeCountry = event => {
        if (this.state.countryTest.test(event.target.value)) {
            this.setState({
                countryErrText: "",
                error: true,
                country: event.target.value
            });
        } else {
            this.setState({
                countryErrText: "*minimum of 3 letters",
                error: false,
                country: event.target.value
            });
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className="regcontainer">
                    <div className="regForm">
                        <h1>SignUp</h1>
                        <div>
                            <div className="inputFieldreg">
                                <TextField
                                    variant="standard"
                                    label="Name"
                                    onChange={this.onChangeName}
                                />
                                <p>{this.state.nameErrText}</p>
                            </div>
                            <div className="inputFieldreg">
                                <TextField
                                    variant="standard"
                                    label="Email"
                                    onChange={this.onChangeEmail}
                                />
                                <p>{this.state.emailErrText}</p>
                            </div>
                            <div className="inputFieldreg">
                                <TextField
                                    variant="standard"
                                    type="password"
                                    label="Password"
                                    onChange={this.onChangePassword}
                                />
                                            <p>{this.state.passwordErrText}</p>
                            </div>
                            <div className="inputFieldreg">
                                    <TextField
                                        variant="standard"
                                        label="Country"
                                        onChange={this.onChangeCountry}
                                    />
                                    <p>{this.state.countryErrText}</p>
                                </div>
                            </div>
                            <Button id="btnreg" onClick={e => this.RegisterBtn(e)}>
                                SignUp
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

export default Register;
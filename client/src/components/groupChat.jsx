import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemTest from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getUser, getChat, saveChat } from "../services/userServices";
import io from "socket.io-client";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';

class gropuChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            messagebox: "",
            users: [],
            email: "",
            grpMessages: [],
            snackbaropen: false,
            snackbarmsg: '',
        };
        this.socket = io(process.env.REACT_APP_BASE_URL);
    }

    componentDidMount = () => {
        const email = localStorage.getItem("email");
        this.setState({ email: email });
        getUser(email).then(response => {
            if (response.status === 200) {
                this.setState({
                    users: response.data.data,
                    name: localStorage.getItem('name')
                });
                console.log(this.state.users)
            } else {
                this.setState({ snackbarmsg: "Error while getting user", snackbaropen: true });
            }
        });
        
        ///recevice data through socketio
        this.socket.on('getMessage', data => {
            console.log(data);
            this.addNewMessage(data);
        });

        let data = {
            from: "",
            to: ""
        };
        getChat(data).then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.setState({
                    grpMessages: response.data
                });
            } else {
                this.setState({ snackbarmsg: "Chat can't be retrieved", snackbaropen: true });
            }
        });
    }

    //getting chat from server
    addNewMessage = data => {
        console.log(data);
        this.setState({ grpMessages: [...this.state.grpMessages, data] });
        console.log(this.state.grpMessages)

        saveChat(data).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ messagebox: '' });
            } else {
                this.setState({ snackbarmsg: "msg not sent", snackbaropen: true });
            }
        });
    };

    //set messagebox
    messagebox = event => {
        this.setState({
            messagebox: event.target.value
        });
    }

    //sending the message to server
    sendMessage = event => {
        this.setState({
            messagebox: ''
        })
        console.log("1st emit the message")
        if (this.state.receiver !== '') {
            this.socket.emit('sendMessage', {
                from: this.state.name,
                chat: this.state.messagebox
            })
        } else {
            this.setState({ snackbarmsg: "pls click the recevier", snackbaropen: true });
        }
    }

    //close snackbar
    handleClose(event) {
        this.setState({ snackbaropen: false });
    }
    //logout
    logOut(event) {
        this.props.history.push({
            pathname: "/",
        });
        localStorage.setItem("email", '');
    }

    //List the item 
    usersList = event => {


    }
    getGrpChat = event => {

    }

    render() {
        return (
            <div >
                <div className="dashBoardHeader">
                    <h2 className="welcomeBox">
                        {this.state.name}
                    </h2>
                    <Button className="dashboardlogout" variant="outlined" onClick={e => this.logOut(e)}>
                        Logout
                </Button>
                </div>
                <div className="flex">
                    <div className="usersList">
                        <List>
                            {this.state.users.map((user, index) => (
                                <ListItem>
                                    <PersonIcon></PersonIcon> <ListItemTest primary={user.name} style={{ padding: '3%' }} />
                                </ListItem>
                            ))
                            }
                        </List>
                    </div>
                    <div className="chatWindow" >
                        <List style={{ maxHeight: '77vh', overflow: 'auto', padding: '5px' }} >
                            {this.state.grpMessages.map(msgs => {
                                if (msgs.from !== this.state.name) {
                                    return (
                                        <div className='senderDiv'>
                                            <PersonIcon></PersonIcon>
                                            <p className="sender"> {msgs.from}: {msgs.chat}</p>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className="reciveDiv">
                                            <p className="recive">{msgs.chat}</p>
                                        </div>
                                    )
                                }
                            })}

                        </List>
                        <div className="textField">
                            <TextField
                                variant="outlined"
                                className="chatBox"
                                value={this.state.messagebox}
                                placeholder="Type a message"
                                onChange={this.messagebox}
                            >
                            </TextField>

                            <Button className="sendButton" variant="contained" onClick={e => this.sendMessage(e)}>
                                SEND
                                </Button>

                        </div>
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
        );
    }

}
export default gropuChat;
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
import GroupIcon from '@material-ui/icons/Group';

const socket = io.connect(process.env.REACT_APP_BASE_URL);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            messagebox: "",
            users: [],
            receiver: "",
            email: "",
            messages: [],
            userdata: [],
            grpMessages: [],
            snackbaropen: false,
            snackbarmsg: '',
            show: false
        };
    }

    componentDidMount(){
        const email = localStorage.getItem("email");
        this.setState({
            email: email,
            name: localStorage.getItem('name')
        });
        console.log(this.state.name, "1", this.state.email, " 2  ", email);
        getUser(email).then(response => {
            if (response.status === 200) {
                this.setState({
                    users: response.data.data,
                });
                console.log(this.state.users)
            } else {
                this.setState({ snackbarmsg: "Error while getting user", snackbaropen: true });
            }
        });
        let data = {
            from: this.state.name,
            to: this.state.receiver
        };
        console.log(data)
        // getChat(data).then(response => {
        //     console.log(response.data)
        //     if (response.status === 200) {
        //         this.setState({
        //             messages: response.data
        //         });
        //     } else {
        //         this.setState({ snackbarmsg: "Chat can't be retrieved", snackbaropen: true });
        //     }
        // });
        ///recevice data through socketio
        const sender = localStorage.getItem("name");
        console.log("sender",sender);
        
        socket.on(sender, data => {
            const usermsg = this.state.messages;
            usermsg.push(data);
            console.log(data);
            this.setState({ messages: usermsg });
            console.log(this.state.messages)
        });
    }

    //set messagebox
    messagebox = event => {
        this.setState({
            messagebox: event.target.value
        });
        
    }

    //sending the message to server
    sendMessage = event => {
         event.preventDefault();
      let data={
        from: this.state.name,
        to: this.state.receiver,
        chat: this.state.messagebox
    }
        console.log("1st emit the message")
        if (this.state.receiver !== '') {
            socket.emit('sendMessage', data
               )
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
    usersList = async event => {
        console.log(event.target.innerText)
        await this.setState({
            receiver: event.target.innerText
        });
        let data = {
            from: this.state.name,
            to: this.state.receiver
        };
        await getChat(data).then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.setState({
                    messages: response.data
                });
            } else {
                this.setState({ snackbarmsg: "Chat can't be retrieved", snackbaropen: true });
            }
        });
    }
    getGrpChat = event => {
        console.log("grp chat")
        this.props.history.push("/grpChat");
    }

    render() {
        const msgs = this.state.messages.map(msgs => {
            return (
                <div>
                    {msgs.from !== this.state.name ?
                        (
                            <div className='senderDiv'>
                                <PersonIcon></PersonIcon>
                                <p className="sender"> {msgs.chat}</p>
                            </div>
                        ) : (
                            <div className="reciveDiv">
                                <p className="recive"> {msgs.chat}</p>
                            </div>
                        )
                    }
                </div>
            )
        })
        return (
            <section>
                <div className="dashBoardHeader">
                    <h2 className="welcomeBox">
                        {this.state.name}
                    </h2>
                    <h2>
                        {this.state.receiver}
                    </h2>
                    <Button className="dashboardlogout" variant="outlined" onClick={e => this.logOut(e)}>
                        Logout
                </Button>
                </div>
                <div className="flex">
                    <div className="usersList">
                        <List>
                            <ListItem button onClick={e => this.getGrpChat(e)}>
                                <GroupIcon></GroupIcon> <ListItemTest primary={"GrpChat"} style={{ padding: '3%' }} />
                            </ListItem>

                            {this.state.users.map((user, index) => (
                                <ListItem key={index.toString()} button onClick={e => this.usersList(e)}>
                                    <PersonIcon></PersonIcon> <ListItemTest primary={user.name} style={{ padding: '3%' }} />
                                </ListItem>
                            ))
                            }

                        </List>
                    </div>
                    <div className="chatWindow" >
                        <List style={{ maxHeight: '77vh', overflow: 'auto', padding: '5px' }} >
                            {msgs}
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
            </section>
        );
    }

}
export default Dashboard;
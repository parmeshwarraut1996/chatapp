import axios from "axios";
import apiConstants from "../apiConstant/apiConstant"

//Calling the register API using axios
export async function register(data) {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + apiConstants.singUp, data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//Calling the login API using axios
export async function login(data) {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + apiConstants.login, data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//Calling the Forgot Password API using axios
export async function forgotPassword(data) {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + apiConstants.forgotPassword, data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}
//Calling the ResetPAssword API using axios
export async function resetPassword(data, token) {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + apiConstants.resetPassword, data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//Calling the getUser API using axios
export async function getUser(email) {
    try {

        console.log(process.env.REACT_APP_BASE_URL + apiConstants.getUser + `?email=${email}`)
        const response = await axios.get(process.env.REACT_APP_BASE_URL + apiConstants.getUser + `?email=${email}`);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getChat(data) {
    try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + apiConstants.getChat + `?from=${data.from}&to=${data.to}`);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveChat(data) {
    try {
        const response = await axios.put(process.env.REACT_APP_BASE_URL + apiConstants.saveChat, data, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}
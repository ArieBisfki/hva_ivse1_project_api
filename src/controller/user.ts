import User, {Gender, Goal} from '../models/User'
import {AddUserRequestHandler, GetUserRequestHandler} from "../models/endpoint/user";

const getUser: GetUserRequestHandler = async (req, res, next) => {
    let id = req.params.id;

    let user: User = {
        id: 3,
        email: "arie_bisfki@live.nl",
        password: "Yeetyeet1!",
        firstName: "Arie",
        lastName: "Bisfki",
        username: "arie_yeet",
        prefix: ""
    };
    console.log("testtses:   " + req.params);

    return res.status(200).json({
        message: user
    });
};


const addUser: AddUserRequestHandler = (req, res, next) => {

    let body = req.body;

    console.log("user is saved!");
    console.log(body);


    return res.status(200).json({
        message: body
    });
}

export default {getUser, addUser};


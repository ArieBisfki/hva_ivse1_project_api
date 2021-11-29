import {AddUserRequestHandler, GetUserRequestHandler} from "../models/endpoint/user";
import * as users from "../data/users.json";

const getUser: GetUserRequestHandler = async (req, res, next) => {
    let id = req.params.id;

    const user = users.Arie;
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


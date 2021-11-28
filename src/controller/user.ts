import {Gender, Goal, User} from '../models/User'
import {AddUserRequestHandler, GetUserRequestHandler} from "../models/endpoint/user";

const getUser: GetUserRequestHandler = async (req, res, next) => {
    let id = req.params.id;

    let user: User = {
        id: 3,
        gender: Gender.MALE,
        goal: Goal.LOSE_WEIGHT,
        email: "arie_bisfki@live.nl",
        password: "Yeetyeet1!",
        profilePicture: "Screenshot_20190628-131408_YouTube.jpg",
        firstName: "Arie",
        lastName: "Bisfki",
        username: "arie_yeet",
        height: 180,
        weight: 76,
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


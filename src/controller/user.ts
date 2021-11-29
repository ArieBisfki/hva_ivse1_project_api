import {Gender, Goal, User} from '../models/User'
import jwt, { Secret } from 'jsonwebtoken';

import {LoginUserRequestHandler, GetUserRequestHandler, AddUserRequestHandler, RegisterUserRequestHandler} from "../models/endpoint/user";
import { container } from 'tsyringe';
import { DI_TOKEN } from '../di/Registry';


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

const userRepository: Map<string, User> = new Map([['arie_bisfki@live.nl', user]]);

const getUser: GetUserRequestHandler = async (req, res, next) => {
    let id = req.params.id;
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

const loginUser: LoginUserRequestHandler = (req, res, next) => {

    let user = userRepository.get(req.body.username);

    if(user == null){
        return res.status(404).end("User is not found or doesn't exist!");
    }else if(req.body.password.trim == null || req.body.password !== user.password){
        return res.status(401).end("Wrong username or password!");

    }
        //return res.status(200).header('application/json').json(generateToken(req.body.username));

}

const generateToken = (username: string) => {
    //return jwt.sign({},,);
}

const registerUser: RegisterUserRequestHandler = (req, res, next) => {

    let user = userRepository.get(req.body.username);

    //check if username doesnt exist..
    if(user != null){
        return res.status(403).end("A user with that username already exists!");
    }else{
        user
    }
}

var authenticateToken: LoginUserRequestHandler = (req, res, next) => {
    
    const authHeader = req.headers['authorization']
    const token = authHeader;

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET!, (err: any, user: any) => {
        console.log(err)

    if (err) return res.sendStatus(403)

    req.body = user
    next()
  })
  
}

export default {getUser, addUser, authenticateToken, loginUser, registerUser};


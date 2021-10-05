import {Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { ReadVResult } from 'fs';
import {User} from '../models/User'

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    //get the user from id passed by queryparam
    let id: string = req.params.id;

    let user = {"email": "arie_bisfki@live.nl",
                "password": "Yeetyeet1!",
                "profilePicture": "Screenshot_20190628-131408_YouTube.jpg",
                "firstName": "Arie",
                "lastName": "Bisfki",
                "prefix": ""};
                console.log("testtses:   " + req.params);

    return res.status(200).json({
        message: user
    });
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {

    let body: User = req.body;
    
    console.log("user is saved!");
    console.log(body);


    return res.status(200).json({
        message: body
    });
}

export default { getUser, addUser};


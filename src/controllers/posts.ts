import {Request, Response, NextFunction } from 'express';
import acios, {AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}
import "reflect-metadata";
import http from 'http';
import morgan from 'morgan';
import express from 'express';
import routes from './routes/routes';
import setupEnv from "./utils/env";
import inMemRepos from "./utils/InitUtil/inMemRepos";
import "./populateInMemDb";

setupEnv();

const router = express();
router.use(morgan('dev'));

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

router.use((req, res, next) => {

    res.header('Access-control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

    if(req.method === 'option') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next()
});

router.use('/', routes);

// router.use((req, res, next) => {
//     const error = new Error('not found');
//     return res.status(404).json({
//         message: error.message
//     });
// });


const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}...`));

const inMemReposInit = new inMemRepos();

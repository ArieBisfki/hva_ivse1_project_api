import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;


// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    (req: Request, res: Response) => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured.`);
}

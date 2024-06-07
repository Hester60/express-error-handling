import express, {Application, Router, Request, Response} from 'express';
import errorHandler from "./middlewares/errorHandler";
import asyncWrapper from "./middlewares/asyncWrapper";
import {InternalServerError, NotFound, Unauthorized} from "http-errors";

const router: Router = express.Router();
const PORT: string = process.env.PORT as string;
const app: Application = express();

app.use(express.json()); // parser

// This route will throw an error depending on query param
router.get('/', asyncWrapper(async (req: Request, res: Response): Promise<Response> => {
    const errorParam: string | undefined = req.query.error as string;
    let errorNb: number | undefined = errorParam ? parseInt(errorParam) : undefined;

    if (!errorNb || ![401, 404, 500].includes(errorNb)) {
        return res.status(200).json({message: 'Please provide an error number between 404, 401, 500'});
    }

    console.log(errorNb);
    // All these errors will be handled by the error handler middleware
    switch (errorNb) {
        case 401:
            throw Unauthorized('Unauthorized error');
        case 404:
            throw NotFound('Not found error');
        default:
            throw new Error('Internal/Unexpected Server Error');
    }
}));

app.use(router);

app.use(errorHandler); //keep this line at the end to handle ALL ERRORS

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

app.on('error', (error: any) => {
    console.error(error);
});
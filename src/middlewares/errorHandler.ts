import {NextFunction, Request, Response} from 'express';
import {HttpError} from "http-errors";

type ErrorResponseObj = { status: number, error: string, message: string };

/**
 * According to express documentation https://expressjs.com/en/guide/error-handling.html
 *
 * Using this error handler as middleware will help you to handle and format errors of your app.
 * Here, you can manipulate any error. It avoids to return error response into controller functions and not to crash
 * you app with an unexpected error.
 * This is eventually the place where you can log errors into your database.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
export default (
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
): Response => {
    // Build/Format error object
    const createError = (error: Error | HttpError): ErrorResponseObj => {
        let status: number = 500;
        const message: string = error.message;
        const name: string = error.name;

        if (error instanceof HttpError) {
            status = error.statusCode;
        }

        return {
            status,
            message,
            error: name,
        }
    }

    const formattedError: ErrorResponseObj = createError(err);

    return res.status(formattedError.status).json(formattedError);
};
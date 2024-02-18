import { Response, Request, NextFunction } from 'express';

const guard = (role: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            // TODO: send token to auth service
            // TODO: compare token-given and code-set role numbers
            next();
        } catch (error) {
            res.status(401).send();
            console.error(error);
        }
    };
};

export default guard;

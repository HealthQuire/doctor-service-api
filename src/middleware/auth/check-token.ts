import { Response, Request, NextFunction } from 'express';

const guard = async (role: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            // TODO: send token to auth service
            // TODO: compare token-given and code-set role numbers
        } catch (error) {
            console.error(error);
        }
    };
};

export default guard;

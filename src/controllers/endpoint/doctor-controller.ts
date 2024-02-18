import { Router, Request, Response } from 'express';
import guard from '../../middleware/auth/check-token';

const router = Router();

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(503);
    }
});

export default router;

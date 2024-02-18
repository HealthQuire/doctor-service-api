import { Router, Request, Response } from 'express';
import Doctor from "../../database/schemas/doctor/doctor-schema"
import guard from '../../middleware/auth/check-token';

const router = Router();

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const doctors = await Doctor.find().lean().exec();
        res.json(doctors);
    } catch (error) {
        res.sendStatus(503);
    }
});

router.get('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const doctors = await Doctor.findById(req.params.id).lean().exec();
        res.json(doctors);
    } catch (error) {
        res.sendStatus(503);
    }
});

export default router;

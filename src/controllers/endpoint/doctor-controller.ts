import { Router, Request, Response } from 'express';
import Doctor from '../../database/schemas/doctor/doctor-schema';
import guard from '../../middleware/auth/check-token';

const router = Router();

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        const doctors = await Doctor.find().lean().exec();
        res.json(doctors);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const doctors = await Doctor.findById(req.params.id).lean().exec();
        res.json(doctors);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.post('/', guard(0), async (req: Request, res: Response) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.json(doctor);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.patch('/', guard(0), async (req: Request, res: Response) => {
    try {
    } catch (error) {
        res.sendStatus(500);
    }
});

router.delete('/', guard(0), async (req: Request, res: Response) => {
    try {
    } catch (error) {
        res.sendStatus(500);
    }
});

export default router;

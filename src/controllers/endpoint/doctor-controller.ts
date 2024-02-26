import { Router, Request, Response } from 'express';
import Doctor from '../../database/schemas/doctor/doctor-schema';
import guard from '../../middleware/auth/check-token';
import Messages from '../../static-data/messages';

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
        const doctor = await Doctor.findById(req.params.id).lean().exec();
        if (!doctor) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(doctor);
        }
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

router.patch('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .exec();
        if (!doctor) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(doctor);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

router.delete('/', guard(0), async (req: Request, res: Response) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id).lean().exec();
        if (!doctor) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json({ message: 'Doctor successfully deleted' });
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

export default router;

/*
 * Timecell Controller
 */

import guard from '../../middleware/auth/check-token';
import { Request, Response, Router } from 'express';
import TimeCell from '../../database/schemas/timecell/timecell-schema';
import Messages from '../../static-data/messages';
import { CUSTOMER_SCHEMA_ID, DOCTOR_SCHEMA_ID } from '../../database/schemas/names';

const router = Router();

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        const timecells = await TimeCell.find()
            .populate(DOCTOR_SCHEMA_ID)
            .populate(CUSTOMER_SCHEMA_ID)
            .lean()
            .exec();
        res.json(timecells);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const timecell = await TimeCell.findById(req.params.id)
            .populate(DOCTOR_SCHEMA_ID)
            .populate(CUSTOMER_SCHEMA_ID)
            .lean()
            .exec();
        if (!timecell) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(timecell);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/today/:doctorid', guard(0), async (req: Request, res: Response) => {
    try {
        const timecells = await TimeCell.find({ doctor: req.params.doctorid, date: new Date() })
            .populate(DOCTOR_SCHEMA_ID)
            .populate(CUSTOMER_SCHEMA_ID)
            .lean()
            .exec();
        res.json(timecells);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/currentweek/:doctorid', guard(0), async (req: Request, res: Response) => {
    const nextSevenDays: Array<Date> = new Array(7).fill(null).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    try {
        const timecells = await TimeCell.find({
            doctor: req.params.doctorid,
            date: { $in: nextSevenDays }
        })
            .populate(DOCTOR_SCHEMA_ID)
            .populate(CUSTOMER_SCHEMA_ID)
            .lean()
            .exec();
        res.json(timecells);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', guard(0), async (req: Request, res: Response) => {
    try {
        const timecell = new TimeCell(req.body);
        await timecell.save();
        res.json(timecell);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/', guard(0), async (req: Request, res: Response) => {
    try {
        const timecell = await TimeCell.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .exec();
        if (!timecell) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(timecell);
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

router.delete('/', guard(0), async (req: Request, res: Response) => {
    try {
        const timecell = await TimeCell.findByIdAndDelete(req.params.id).lean().exec();
        if (!timecell) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json({ message: 'Doctor successfully deleted' });
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

export default router;

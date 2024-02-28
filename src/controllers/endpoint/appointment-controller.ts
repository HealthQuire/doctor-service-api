/*
 * Appointment Controller
 */

// TODO: Add validation through other services

import { Router, Request, Response } from 'express';
import Appointment from '../../database/schemas/appointment/appointment-schema';
import guard from '../../middleware/auth/check-token';
import Messages from '../../static-data/messages';
import TimeCell from '../../database/schemas/timecell/timecell-schema';

const router = Router();

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.find().lean().exec();
        res.json(appointments);
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

router.get('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findById(req.params.id).lean().exec();
        if (!appointment) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(appointment);
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

router.post('/', guard(0), async (req: Request, res: Response) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/publish', guard(0), async (req: Request, res: Response) => {
    try {
        const description = req.body.description;
        const timecell = new TimeCell({
            doctorid: req.body.doctorid,
            customerid: req.body.customerid,
            datetime: req.body.datetime,
            comment: req.body.comment
        });
        await timecell.save();
        const appointment = new Appointment({
            description: description,
            timecellid: timecell.id
        });
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
            .lean()
            .exec();
        if (!appointment) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(appointment);
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

router.delete('/', guard(0), async (req: Request, res: Response) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id).lean().exec();
        if (!appointment) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json({ message: 'Doctor successfully deleted' });
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

export default router;

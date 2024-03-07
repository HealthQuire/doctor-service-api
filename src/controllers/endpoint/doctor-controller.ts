/*
 * Doctor Controller
 */

// TODO: Add validation through other services

import { Router, Request, Response } from 'express';
import Doctor, { IDoctor } from '../../database/schemas/doctor/doctor-schema';
import guard from '../../middleware/auth/check-token';
import Messages from '../../static-data/messages';
import axios from 'axios';
import mongoose from 'mongoose';

const router = Router();

export interface IDoctorBodyData {
    userid: string;
    medcentreid: string;
    firstname: string;
    lastname: string;
    fathername?: string;
    age: number;
    year_started: number;
    medservicesids: Array<string>;
    description?: string;
}

export interface IDoctorCreateData {
    email: string;
    password: string;
    phone?: string;
    avatarURL?: string;
    medcentreid: string;
    firstname: string;
    lastname: string;
    fathername?: string;
    age: number;
    year_started: number;
    medservicesids: Array<string>;
    description?: string;
}

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        const doctors = await Doctor.find().lean().exec();
        res.json(doctors);
    } catch (error) {
        res.sendStatus(500).send(error);
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
        res.sendStatus(500).send(error);
    }
});

router.post('/create', guard(0), async (req: Request, res: Response) => {
    try {
        const TEMP_USER_SERVICE_URL = 'http://localhost:3000/user-service';
        const userServiceHook = await axios.post(TEMP_USER_SERVICE_URL + 'user', {
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            avatarURL: req.body.avatarURL
        });

        if (userServiceHook.status !== 200) {
            throw new Error('User service error');
        }

        const doctorData: IDoctor = {
            _id: new mongoose.Types.ObjectId(),
            userid: userServiceHook.data.id,
            medcentreid: req.body.medcentreid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            fathername: req.body.fathername,
            age: req.body.age,
            year_started: req.body.year_started,
            medservicesids: req.body.medservicesids,
            description: req.body.description
        };
        const doctor = new Doctor(doctorData);
        await doctor.save();
        res.json(doctor);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', guard(0), async (req: Request, res: Response) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.json(doctor);
    } catch (error) {
        res.status(500).send(error);
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
        res.sendStatus(500).send(error);
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
        res.sendStatus(500).send(error);
    }
});

export default router;

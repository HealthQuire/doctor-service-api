import { Router, Request, Response } from 'express';
import Customer, { ICustomer } from '../../database/schemas/customer/customer-schema';
import guard from '../../middleware/auth/check-token';
import Messages from '../../static-data/messages';
import Doctor, { IDoctor } from '../../database/schemas/doctor/doctor-schema';
import axios from 'axios';
import mongoose from 'mongoose';

const router = Router();

export interface ICustomerCreateData {
    email: string;
    password: string;
    phone?: string;
    avatarURL?: string;
    birthdate: string;
    gender: boolean;
    comment?: string;
}

export interface ICustomerBodyData {}

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find().lean().exec();
        res.json(customers);
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

router.get('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findById(req.params.id).lean().exec();
        if (!customer) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(customer);
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

        const customerData: ICustomer = {
            _id: new mongoose.Types.ObjectId(),
            userid: userServiceHook.data.id,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            comment: req.body.comment
        };
        const customer = new Doctor(customerData);
        await customer.save();
        res.json(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', guard(0), async (req: Request, res: Response) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.json(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .exec();
        if (!customer) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(customer);
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

router.delete('/', guard(0), async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id).lean().exec();
        if (!customer) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(customer);
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

export default router;

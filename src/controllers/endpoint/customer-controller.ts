import { Router, Request, Response } from 'express';
import Customer, { ICustomer } from '../../database/schemas/customer/customer-schema';
import guard from '../../middleware/auth/check-token';
import Messages from '../../static-data/messages';
import Doctor, { IDoctor } from '../../database/schemas/doctor/doctor-schema';
import axios from 'axios';
import mongoose from 'mongoose';
import createUser from '../utils/create-user';
import getUserById from '../utils/get-user-by-id';

const router = Router();

export interface ICustomerCreateData {
    email: string;
    password: string;
    phone?: string;
    firstname: string;
    lastname: string;
    fathername?: string;
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
            const user = await getUserById(customer.userid);
            res.json({
                ...user,
                ...customer
            });
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
});

router.post('/create', guard(0), async (req: Request, res: Response) => {
    try {
        const userData = await createUser({
            email: req.body.email,
            password: req.body.password,
            role: 1,
            phone: req.body.phone,
            avatarUrl: req.body.avatarUrl,
            status: 'active'
        });

        const customerData: ICustomer = {
            _id: new mongoose.Types.ObjectId(),
            userid: userData.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            fathername: req.body.fathername,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            comment: req.body.comment
        };
        const customer = new Customer(customerData);
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

router.delete('/:id', guard(0), async (req: Request, res: Response) => {
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

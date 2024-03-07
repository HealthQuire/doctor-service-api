import { Router, Request, Response } from 'express';
import Customer from '../../database/schemas/customer/customer-schema';
import guard from '../../middleware/auth/check-token';
import Messages from '../../static-data/messages';
import Doctor from '../../database/schemas/doctor/doctor-schema';

const router = Router();

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

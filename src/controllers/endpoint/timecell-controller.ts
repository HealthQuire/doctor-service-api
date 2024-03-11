/*
 * Timecell Controller
 */

import guard from '../../middleware/auth/check-token';
import { Request, Response, Router } from 'express';
import TimeCell from '../../database/schemas/timecell/timecell-schema';
import Messages from '../../static-data/messages';
import { CUSTOMER_SCHEMA_ID, DOCTOR_SCHEMA_ID } from '../../database/schemas/names';
import Doctor from '../../database/schemas/doctor/doctor-schema';

const router = Router();

// 1 GET /
// 1 GET /:id
// 2 GET today/:doctorid
// 2 GET currentweek/:doctorid
// 3 POST /
// 3 PATCH /:id
// 3 DELETE /:id

router.get('/', guard(0), async (req: Request, res: Response) => {
    const filter = {
        ...(req.query.end && req.query.start
            ? {
                  date: {
                      $gte: req.query.start,
                      $lte: req.query.end
                  }
              }
            : {}),

        ...(req.query.customerid ? { customer: req.query.customerid } : {}),
        ...(req.query.doctorid ? { doctor: req.query.doctorid } : {})
    };
    try {
        const timecells = await TimeCell.find(filter)
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
    const today = new Date();
    today.setSeconds(0);
    today.setHours(0);
    today.setMinutes(0);
    today.setMilliseconds(0);
    try {
        //const timecells = await TimeCell.find({ date: today })
        const timecells = await TimeCell.find({})
            .populate(DOCTOR_SCHEMA_ID)
            .populate(CUSTOMER_SCHEMA_ID)
            .lean()
            .exec();
        res.json(
            timecells.filter((timecell) => String(timecell.doctor._id) === req.params.doctorid)
        );
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/currentweek/:doctorid', guard(0), async (req: Request, res: Response) => {
    const nextSevenDays: Array<string> = new Array(7).fill(null).map((_, i) => {
        const date = new Date();
        date.setSeconds(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setMilliseconds(0);
        date.setDate(date.getDate() + i);
        return String(date);
    });

    console.log('DAYS: ', nextSevenDays);

    try {
        const timecells = await TimeCell.find({})
            .populate(DOCTOR_SCHEMA_ID)
            .populate(CUSTOMER_SCHEMA_ID)
            .lean()
            .exec();
        // console.log(timecells);
        console.log(
            'FILTERED:',
            timecells.filter((item) => {
                console.log(
                    item.date,
                    '-',
                    new Date('2024-03-14T00:00:00.000Z'),
                    String(item.date) == String(new Date('2024-03-14T00:00:00.000Z'))
                );
                return item.date == new Date('2024-03-14T00:00:00.000Z');
            })
        );

        // 2024-03-14T00:00:00.000Z
        // 2024-03-14T00:00:00.000Z

        res.json(
            timecells.filter(
                (timecell) =>
                    String(timecell.doctor._id) == req.params.doctorid &&
                    nextSevenDays.includes(String(new Date(timecell.date)))
            )
        );
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

router.patch('/:id', guard(0), async (req: Request, res: Response) => {
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

router.delete('/:id', guard(0), async (req: Request, res: Response) => {
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

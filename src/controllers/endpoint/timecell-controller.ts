import guard from '../../middleware/auth/check-token';
import { Request, Response } from 'express';
import router from './doctor-controller';
import TimeCell from '../../database/schemas/timecell/timecell-schema';
import Messages from '../../static-data/messages';

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        const timecells = await TimeCell.find().lean().exec();
        res.json(timecells);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const timecell = await TimeCell.findById(req.params.id).lean().exec();
        if (!timecell) {
            res.status(404).send(Messages.NOT_FOUND);
        } else {
            res.json(timecell);
        }
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

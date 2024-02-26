import guard from '../../middleware/auth/check-token';
import { Request, Response } from 'express';
import router from './doctor-controller';
import TimeCell from '../../database/schemas/timecell/timecell-schema';

router.get('/', guard(0), async (req: Request, res: Response) => {
    try {
        const timecells = await TimeCell.find().lean().exec();
        res.json(timecells);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get('/:id', guard(0), async (req: Request, res: Response) => {
    try {
        const timecell = await TimeCell.findById(req.params.id).lean().exec();
        res.json(timecell);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.post('/', guard(0), async (req: Request, res: Response) => {
    try {
        const timecell = new TimeCell(req.body);
        await timecell.save();
        res.json(timecell);
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

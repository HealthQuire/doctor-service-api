import { check } from 'express-validator';
import { Validation } from '../static-data/messages';

const doctorValidator = [
    check('userid').notEmpty().withMessage(Validation.Doctor.fieldEmpty),
    check('medcentreid').notEmpty().withMessage(Validation.Doctor.fieldEmpty),
    check('firstname').notEmpty().withMessage(Validation.Doctor.fieldEmpty),
    check('lastname').notEmpty().withMessage(Validation.Doctor.fieldEmpty),
    check('fathername').notEmpty().withMessage(Validation.Doctor.fieldEmpty),
    check('age').notEmpty().withMessage(Validation.Doctor.fieldEmpty),
    check('year_started').notEmpty().withMessage(Validation.Doctor.fieldEmpty),
    check('specialization').notEmpty().withMessage(Validation.Doctor.fieldEmpty),
    check('experience').isNumeric().withMessage(Validation.Doctor.fieldEmpty),
    check('email').isEmail().withMessage(Validation.Doctor.invalidEmail)
];

// userid: string;
// medcentreid: string;
// firstname: string;
// lastname: string;
// fathername?: string;
// age: number;
// year_started: number;
// medservicesids: Array<string>;
// description?: string;

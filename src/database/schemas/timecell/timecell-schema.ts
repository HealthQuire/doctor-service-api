import { Schema, model } from 'mongoose';
import { TIMECELL_SCHEMA_ID } from '../names';

export interface ITimeCell {
    doctorid: string;
    customerid: string;
    comment?: string;
    datetime: Date;
}

const TimeCellSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    customerid: {
        type: String,
        required: true,
        unique: true
    },
    comment: {
        type: String,
        required: false,
        maxLength: 1000
    },
    datetime: {
        type: false,
        required: true
    }
});

const TimeCell = model<ITimeCell>(TIMECELL_SCHEMA_ID, TimeCellSchema);

export default TimeCell;

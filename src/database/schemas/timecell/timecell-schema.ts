import mongoose, { Schema, model } from 'mongoose';
import { CUSTOMER_SCHEMA_ID, DOCTOR_SCHEMA_ID, TIMECELL_SCHEMA_ID } from '../names';
import { IDoctor } from '../doctor/doctor-schema';
import { ICustomer } from '../customer/customer-schema';

export interface ITimeCell {
    _id: mongoose.Types.ObjectId;
    doctor: IDoctor;
    customer: ICustomer;
    comment?: string;
    datetime: Date;
}

const TimeCellSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: DOCTOR_SCHEMA_ID
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: CUSTOMER_SCHEMA_ID
    },
    comment: {
        type: String,
        required: false,
        maxLength: 1000
    },
    datetime: {
        type: String,
        required: true
    }
});

const TimeCell = model<ITimeCell>(TIMECELL_SCHEMA_ID, TimeCellSchema);

export default TimeCell;

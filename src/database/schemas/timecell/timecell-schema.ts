import mongoose, { Schema, model } from 'mongoose';
import { CUSTOMER_SCHEMA_ID, DOCTOR_SCHEMA_ID, TIMECELL_SCHEMA_ID } from '../names';
import { IDoctor } from '../doctor/doctor-schema';
import { ICustomer } from '../customer/customer-schema';

export interface ITimeCell {
    _id: mongoose.Types.ObjectId;
    doctor: IDoctor;
    customer: ICustomer;
    comment?: string;
    date: Date;
    time: string;
}

const TimeCellSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: DOCTOR_SCHEMA_ID,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: CUSTOMER_SCHEMA_ID,
        required: true
    },
    comment: {
        type: String,
        required: false,
        maxLength: 1000
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        validate: {
            validator: function (v) {
                if (!v) {
                    return true;
                }
                return /([01]?[0-9]|2[0-3]):[0-5][0-9]/.test(v);
            },
            message: (props) => `${props.value} is not valid time!`
        }
    }
});

const TimeCell = model<ITimeCell>(TIMECELL_SCHEMA_ID, TimeCellSchema);

export default TimeCell;

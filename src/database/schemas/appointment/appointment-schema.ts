import mongoose, { Schema, model } from 'mongoose';
import {
    APPOINTMENT_SCHEMA_ID,
    CUSTOMER_SCHEMA_ID,
    DOCTOR_SCHEMA_ID,
    TIMECELL_SCHEMA_ID
} from '../names';
import { ITimeCell } from '../timecell/timecell-schema';
import { IDoctor } from '../doctor/doctor-schema';
import { ICustomer } from '../customer/customer-schema';

export interface IAppointment {
    _id: mongoose.Types.ObjectId;
    timecell: ITimeCell;
    doctor: IDoctor;
    customer: ICustomer;
    title: string;
    content: string;
    status: number;
}

const AppointmentSchema = new Schema({
    timecell: {
        type: Schema.Types.ObjectId,
        ref: TIMECELL_SCHEMA_ID
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: DOCTOR_SCHEMA_ID
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: CUSTOMER_SCHEMA_ID
    },
    title: {
        type: String,
        required: false,
        maxLength: 1000
    },
    content: {
        type: String,
        required: false,
        maxLength: 10000
    }
});

const Appointment = model<IAppointment>(APPOINTMENT_SCHEMA_ID, AppointmentSchema);

export default Appointment;

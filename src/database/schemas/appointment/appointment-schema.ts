import { Schema, model } from 'mongoose';
import { APPOINTMENT_SCHEMA_ID, DOCTOR_SCHEMA_ID, TIMECELL_SCHEMA_ID } from '../names';
import { ITimeCell } from '../timecell/timecell-schema';
import { IDoctor } from '../doctor/doctor-schema';

export interface IAppointment {
    timecell: ITimeCell;
    doctor: IDoctor;
    customer: unknown;
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
        type: String,
        required: true
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

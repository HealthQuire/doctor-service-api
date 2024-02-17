import { Schema, model } from 'mongoose';
import { APPOINTMENT_SCHEMA_ID } from '../names';

export interface IAppointment {
    timecellid: string;
    description?: string;
}

const AppointmentSchema = new Schema({
    timecellid: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    }
});

const Appointment = model<IAppointment>(APPOINTMENT_SCHEMA_ID, AppointmentSchema);

export default Appointment;

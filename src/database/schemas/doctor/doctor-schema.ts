import { Schema, model } from "mongoose"
import {DOCTOR_SCHEMA_ID} from "../names";

export interface IDoctor {
    userid: string,
    medcentreid: string,
    firstname: string,
    lastname: string,
    fathername?: string,
    age: number,
    year_started: number,
    medservicesids: Array<string>,
    description?: string
}

const DoctorSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    medcentreid: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    fathername: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true,
    },
    year_started: {
        type: Number,
        required: true,
    },
    medservicesids: {
        type: [Number],
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
})

const Doctor = model<IDoctor>(DOCTOR_SCHEMA_ID, DoctorSchema)

export default Doctor

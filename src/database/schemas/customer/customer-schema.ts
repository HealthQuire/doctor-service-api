import mongoose, { Schema, model } from 'mongoose';
import { CUSTOMER_SCHEMA_ID } from '../names';

export interface ICustomer {
    _id: mongoose.Types.ObjectId;
    userid: string;
    firstname: string;
    lastname: string;
    fathername?: string;
    birthdate: Date;
    gender: boolean;
    comment?: string;
}

const CustomerSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: false
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
});

const Customer = model<ICustomer>(CUSTOMER_SCHEMA_ID, CustomerSchema);

export default Customer;

import { Schema, model } from 'mongoose';
import { CUSTOMER_SCHEMA_ID } from '../names';

export interface ICustomer {
    userid: string;
    birthdate: Date;
    gender: boolean;
    comment?: string;
}

const CustomerSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
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

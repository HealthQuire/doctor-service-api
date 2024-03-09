import * as bodyParser from 'body-parser';
import express from 'express';
import doctorController from './endpoint/doctor-controller';
import appointmentController from './endpoint/appointment-controller';
import timecellController from './endpoint/timecell-controller';
import customerController from './endpoint/customer-controller';
import cors from 'cors';

class App {
    public express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
        });
        this.express.use(cors());

        this.express.use('/doctor', doctorController);
        this.express.use('/timecell', timecellController);
        this.express.use('/appointment', appointmentController);
        this.express.use('/customer', customerController);
    }
}

export default new App().express;

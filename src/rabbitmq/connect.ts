import * as dotenv from 'dotenv';
import amqplib from 'amqplib';

dotenv.config();

const connect = async () => {
    try {
        const amqpServer = `amqp://localhost:${process.env.RABBITMQ_PORT as string}`;
        const connection = await amqplib.connect(amqpServer);
        const channel = await connection.createChannel();

        await channel.assertQueue('order');
    } catch (error) {
        console.log(error);
    }
};

export default connect;

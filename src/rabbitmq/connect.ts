import * as dotenv from 'dotenv';
import amqplib from 'amqplib';

dotenv.config();

interface IAmpqlibData {
    channel: amqplib.Channel;
    connection: amqplib.Connection;
}

const AMQPConnect = async (): Promise<IAmpqlibData> => {
    try {
        const amqpServer = `amqp://localhost:${process.env.RABBITMQ_PORT}`;
        const connection = await amqplib.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue('order');
        return {
            channel: channel,
            connection: connection
        };
    } catch (error) {
        console.error(error);
        return {
            channel: null,
            connection: null
        };
    }
};

export default AMQPConnect;

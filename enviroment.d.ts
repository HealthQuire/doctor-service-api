declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            MONGO_URI: string;
            SECRET: string;
            AUTH_URL: string;
            RABBITMQ_PORT: string;
        }
    }
}

export {};

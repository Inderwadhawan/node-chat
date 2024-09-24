import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export default class WinstonLogging {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.json(),
            transports: [
                new DailyRotateFile({
                    filename: "logs/%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    zippedArchive: true,
                    maxSize: "20m",
                    maxFiles: "14d",
                }),
            ],
        });
    }

    private getTimeStamp = (): string => {
        return new Date().toISOString();
    };

    info = (namespace: string, message?: string, object?: any): void => {
        if (object) {
            this.logger.info(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`, { object });
        } else {
            this.logger.info(`[${this.getTimeStamp()}] [INFO] [${namespace}] ${message}`);
        }
    };

    warn = (namespace: string, message: string, object?: any): void => {
        if (object) {
            this.logger.warn(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`, { object });
        } else {
            this.logger.warn(`[${this.getTimeStamp()}] [WARN] [${namespace}] ${message}`);
        }
    };

    error = (namespace: string, message?: string, object?: any): void => {
        if (object) {
            this.logger.error(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`, { object });
        } else {
            this.logger.error(`[${this.getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
        }
    };

    debug = (namespace: string, message?: string, object?: any): void => {
        if (object) {
            this.logger.debug(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, { object });
        } else {
            this.logger.debug(`[${this.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
        }
    };
}

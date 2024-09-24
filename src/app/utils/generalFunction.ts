import { StatusCodes } from "http-status-codes";
import { IResponse } from "../interfaces/api";
import { Response } from "express";
import WinstonLogging from "../services/winston.service";

export class ReqResData {

	public readonly result: IResponse;

	constructor(success: boolean, statusCode: StatusCodes, message?: string, data?: any, total?: number, count?: any) {
		this.result = {
			success,
			statusCode,
			message,
			data,
			total,
			count,
		};
	}

	send = (res: Response): any => {
		const logger = new WinstonLogging();

		// logger.info("RahulMalodia logs", JSON.stringify(this.result));

		return res.status(this.result.statusCode).send(this.result);
	};

}

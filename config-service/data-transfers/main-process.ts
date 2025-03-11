import { Connection } from "mongoose";
import { LoggerInstance } from "moleculer";

class MainProcess {
	public logger: LoggerInstance;
	public dbConnection: Connection | null;
	public models: any;

    constructor(logger: LoggerInstance, dbConnection: Connection | null, models: any) {
        this.logger = logger;
        this.dbConnection = dbConnection;
        this.models = models;
    }
}

export = MainProcess;

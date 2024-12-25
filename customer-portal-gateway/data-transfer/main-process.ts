import { LoggerInstance, ServiceBroker } from "moleculer";

class MainProcess {
  public logger: LoggerInstance;
  public models?: any;
  public broker: ServiceBroker;
}

export = MainProcess;

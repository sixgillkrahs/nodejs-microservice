import * as fs from "fs";
import { LoggerInstance, ServiceBroker } from "moleculer";
import { INTERNAL_CODES, STATE } from "goopay-library/defined/state-code";
import { RequestHelper, ResponseHelper } from "goopay-library/helpers";
import MainProcess from "../data-transfer/main-process";
import { MIME_TYPE } from "../defined/app-setting";
import { SVC_ENV } from "../svc-env";


// Logic biên bản đối soát tháng
class NapasReconcileReportLogic {
  private readonly logger: LoggerInstance;
  private readonly broker: ServiceBroker;

  public constructor(mainProcess: MainProcess) {
    this.logger = mainProcess.logger;
    this.broker = mainProcess.broker;
  }

  public async exportReport(req, res): Promise<any> {
    const langCode = RequestHelper.getLangCode(this.broker);
		const { reconcileId } = req.$params.query;
    if (!reconcileId ) {
      return ResponseHelper.resFailed(INTERNAL_CODES.MISSING_PARAM, STATE.FAILED, langCode);
    }
    try {
      const generateResult: any = await this.broker.call(
        `${SVC_ENV.get().NAPAS_CONNECTOR_SERVICE}.exportNapasReconcile`,
        { reconcileId },
        { meta: this.broker.meta }
      );

      // Build pipe return to fe
      if (!fs.existsSync(generateResult?.data)) {
        return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED, langCode);
      }

      const fileName = generateResult?.data.replace(/^.*[\\\/]/, "");
      // eslint-disable-next-line capitalized-comments
      res.writeHead(200, {
        "Content-Type": MIME_TYPE.getMimeType(fileName.split(".").pop()),
        "Content-Disposition": `attachment; filename=${fileName}`,
        "Access-Control-Expose-Headers": "*"
      });
      const stream = fs.createReadStream(generateResult.data);
      stream.pipe(res);
      stream.on("end", () => res.end());
      stream.on("error", err => res.end(err));
    } catch (error) {
      this.logger.error(error);
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED, langCode, error);
    }
  }
}
export = NapasReconcileReportLogic;

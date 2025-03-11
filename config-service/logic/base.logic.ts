import { Context, LoggerInstance } from "moleculer";
import { MainProcess, Response } from "../data-transfers";
import { INTERNAL_CODES, STATE } from "goopay-library/defined/state-code";
import { RequestHelper, ResponseHelper } from "goopay-library/helpers";
import { BaseModel } from "../models";

class BaseLogic {
  private readonly baseModel: BaseModel;
  constructor(mainProcess: MainProcess) {
    this.baseModel = mainProcess.models.BaseModel;
  }

  public async getConfigByKey(context: Context): Promise<Response> {
    try {
      const params = RequestHelper.getParams(context);
      const langCode = RequestHelper.getLangCode(context);
      const { key } = params;
      if (!key) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.MISSING_PARAM,
          STATE.FAILED,
          langCode
        );
      }
      // const resp = await this.baseModel.findOne({ key: key });
      const resp = await this.baseModel.getAll({});

      console.log(resp);
      return ResponseHelper.resOK(1);
    } catch (error) {
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }
}

export = BaseLogic;

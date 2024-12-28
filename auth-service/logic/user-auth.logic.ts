import { Context, LoggerInstance } from "moleculer";
import { MainProcess, Response } from "../data-transfers";
import { INTERNAL_CODES, STATE } from "goopay-library/defined/state-code";
import { UserAuthModel } from "../models";
import { RequestHelper, ResponseHelper } from "goopay-library/helpers";
import { UserAuthEntity } from "../data-transfers/entities";
import { USER_TYPE } from "../defined/app-setting";
const { hash, compareHash } = require("../lib/helper");

class UserAuthLogic {
  private readonly userAuthModel: UserAuthModel;
  constructor(mainProcess: MainProcess) {
    this.userAuthModel = mainProcess.models.UserAuthModel;
  }

  public async createUserAuth(context: Context): Promise<Response> {
    try {
      const params = RequestHelper.getParams(context);
      const langCode = RequestHelper.getLangCode(context);
      const currentUser = RequestHelper.getCurrentAccount(context);
      if (!params || !params.userId) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.MISSING_PARAM,
          STATE.FAILED,
          langCode
        );
      }
      const userAuthObj = {
        userId: params.userId,
        userType:
          currentUser.userType === USER_TYPE.SUPER_ADMIN
            ? USER_TYPE.ORG_ADMIN
            : USER_TYPE.USER,
        email: params.email,
        social: params.social,
        password: hash(params.password),
        createdBy: currentUser.email || params.email,
        isActive: params.isActive,
      };
      const result = await this.userAuthModel.create(userAuthObj);
      return ResponseHelper.resOK(result);
    } catch (error) {
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }
}

export = UserAuthLogic;

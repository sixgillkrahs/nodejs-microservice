import { Context, LoggerInstance } from "moleculer";
import { MainProcess, Response } from "../data-transfers";
import { INTERNAL_CODES, STATE } from "goopay-library/defined/state-code";
import { UserModel } from "../models";
import { RequestHelper, ResponseHelper } from "goopay-library/helpers";
import { USER_TYPE } from "../defined/app-setting";
import { SVC_ENV } from "../svc-env";
const { hash, compareHash } = require("../lib/helper");

class UserLogic {
  private readonly userModel: UserModel;
  constructor(mainProcess: MainProcess) {
    this.userModel = mainProcess.models.UserModel;
  }

  public async createUser(context: Context): Promise<Response> {
    try {
      const params = RequestHelper.getParams(context);
      const langCode = RequestHelper.getLangCode(context);
      const currentUser = RequestHelper.getCurrentAccount(context);
      const { fullName, email, password, dob } = params;
      if (!params || !fullName || !email || !password || !dob) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.MISSING_PARAM,
          STATE.FAILED,
          langCode
        );
      }
      if (params.email) {
        const existedFilter = { email: params.email };
        const checkExisted = await this.userModel.findOne(existedFilter);
        if (checkExisted && checkExisted._id) {
          return ResponseHelper.resFailed(
            INTERNAL_CODES.EXISTED,
            STATE.FAILED,
            langCode
          );
        }
      }
      const userObj = {
        fullName: params.fullName || null,
        dob: params.dob,
        phone: params.phone,
        phonePrefix: params.phonePrefix,
        userType:
          currentUser.userType === USER_TYPE.SUPER_ADMIN
            ? USER_TYPE.ORG_ADMIN
            : USER_TYPE.USER,
        email: params.email,
        address: params.address,
        gender: params.gender,
        note: params.note,
        isActive: params.isActive,
        createdBy: currentUser.email,
      };
      const result = await this.userModel.create(userObj);
      const userAuthObj = {
        userId: result.id,
        email: params.email,
        password: params.password,
        createdBy: currentUser.email,
        isActive: params.isActive,
      };
      await context.broker.call(
        `${SVC_ENV.get().AUTH_SERVICE}.createUserAuth`,
        userAuthObj,
        {
          meta: context.meta,
        }
      );
      return ResponseHelper.resOK(result.data);
    } catch (error) {
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }

  public async getUser(context: Context): Promise<Response> {
    try {
      const params = RequestHelper.getParams(context);
      const langCode = RequestHelper.getLangCode(context);
      if (!params._id) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.MISSING_PARAM,
          STATE.FAILED,
          langCode
        );
      }
      const result = await this.userModel.getById(params._id);
      return ResponseHelper.resOK(result);
    } catch (error) {
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }
}

export = UserLogic;

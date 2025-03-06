import { Context, LoggerInstance } from "moleculer";
import { MainProcess, Response } from "../data-transfers";
import { INTERNAL_CODES, STATE } from "goopay-library/defined/state-code";
import { UserAuthModel } from "../models";
import { RequestHelper, ResponseHelper } from "goopay-library/helpers";
import { SVC_ENV } from "../svc-env";
import { compareHash } from "../lib/helper";
import { BaseLogic } from "./base.logic";
const jwt = require("jsonwebtoken");
const _ = require("lodash");

class AuthLogic extends BaseLogic {
  private readonly userAuthModel: UserAuthModel;
  constructor(mainProcess: MainProcess) {
    super(mainProcess);
    this.userAuthModel = mainProcess.models.UserAuthModel;
  }

  public async signin(context: Context | any): Promise<Response> {
    try {
      const params = RequestHelper.getParams(context);
      const langCode = RequestHelper.getLangCode(context);
      const { userName, password } = params;
      if (!userName || !password) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.MISSING_PARAM,
          STATE.FAILED
        );
      }
      const filterUserAuth = {
        isDelete: { $ne: true },
        // isActive: true,
      };
      if (this.isValidEmail(userName)) {
        filterUserAuth["email"] = userName;
      } else {
        filterUserAuth["phone"] = userName;
      }
      const userAuth = await this.userAuthModel.findOne(filterUserAuth);
      if (_.isEmpty(userAuth)) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.LOGIN_FAILED,
          STATE.FAILED
        );
      }
      if (
        userAuth.lockoutUntil instanceof Date &&
        !isNaN(userAuth.lockoutUntil) &&
        userAuth.lockoutUntil.valueOf() > Date.now()
      ) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.ACCOUNT_LOCKED,
          STATE.FAILED,
          langCode,
          { lockoutUntil: userAuth.lockoutUntil }
        );
      }
      if (!compareHash(password, userAuth.password)) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.LOGIN_FAILED,
          STATE.FAILED
        );
      }
      if (!userAuth.isActive) {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.ACCOUNT_LOCKED,
          STATE.FAILED
        );
      }
      const result = await this.generateTokenAndGetUserDetail(
        context,
        userAuth,
        langCode
      );

      return ResponseHelper.resOK(result);
    } catch (error) {
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }

  public async register(context: Context | any): Promise<Response> {
    try {
      const params = RequestHelper.getParams(context);
      const langCode = RequestHelper.getLangCode(context);
      const currentUser = RequestHelper.getCurrentAccount(context);
      const resp = await context.broker.call(
        `${SVC_ENV.get().USER_SERVICE}.createUser`,
        params,
        {
          meta: context.meta,
        }
      );

      return ResponseHelper.resOK(resp);
    } catch (error) {
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }

  public async authenticate(context: Context | any): Promise<Response> {
    const params = RequestHelper.getParams(context);
    const langCode = RequestHelper.getLangCode(context);
    const currentUser = RequestHelper.getCurrentAccount(context);
    try {
      if (!SVC_ENV.get().JWT_KEY) {
        return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
      }
      const token = context.meta.headers.authorization.substring(7);
      const decoded = jwt.verify(token, SVC_ENV.get().JWT_KEY);
      const { exp, data } = decoded;
      if (Date.now() / 1000 - exp > 0) {
        return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
      }
      const { userId } = data;
      const userAuth = await this.userAuthModel.findOne({
        userId,
        isDelete: { $ne: true },
        isActive: true,
      });
      if (!userAuth._id) {
        return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
      }
      return ResponseHelper.resOK(data);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return ResponseHelper.resFailed(
          INTERNAL_CODES.TOKEN_EXPIRED,
          STATE.FAILED
        );
      }
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }

  public async authorize(context) {
    const params = RequestHelper.getParams(context);
    const langCode = RequestHelper.getLangCode(context);
    const currentUser = RequestHelper.getCurrentAccount(context);
    try {
      const { userId } = context.meta.user;
      const langCode = RequestHelper.getLangCode(context);
      const userAuth = await this.userAuthModel.findOne({
        userId,
        isDelete: { $ne: true },
        isActive: true,
      });
      if (!userAuth._id) {
        return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
      }
      //   if (userAuth.userType === "SUPER_ADMIN") {
      //     this.logger.info(
      //       `${SVC_ENV.get().SERVICE_NAME}.authorize -> userType = SUPER_ADMIN`
      //     );
      //     return ResponseHelper.resOK(true);
      //   }

      // roles of user
      //   const orgOfApp = (userAuth.orgs || []).find((o) =>
      //     o.apps.some((a) => a.appId === app.appId)
      //   );
      //   const { roleIds = [] } =
      //     (orgOfApp.apps || []).find((a) => a.appId === app.appId) || {};
      //   const roles = await this.roleModel.getAll({
      //     _id: { $in: roleIds.map((id) => FunctionHelper.convertToMongoId(id)) },
      //     isDelete: { $ne: true },
      //   });

      // permissions of user
      //   let permissionsIds = [];
      //   roles.forEach((role) =>
      //     permissionsIds.push(...(role.permissionIds || []))
      //   );
      //   const permissions = await this.permissionModel.getByIds(permissionsIds);
      //   const resourceIds = permissions.map((item) => item.resourceId);

      //   // actions
      //   let actionIds = [];
      //   permissions.forEach((permission) => {
      //     actionIds.push(...permission.resourceActions);
      //   });
      //   actionIds = Array.from(new Set(actionIds));
      //   const resources = await this.resourceModel.getByIds(resourceIds);

      //   let actionsOfResources = [];
      //   resources.forEach((r) => {
      //     actionsOfResources.push(...r.actions);
      //   });

      //   actionsOfResources = actionsOfResources.filter((a) =>
      //     actionIds.includes(a.uniKey)
      //   );

      //   const { path, method } = context.meta.rest;

      //   const hasAction = actionsOfResources.some(
      //     (action) => action.rest.method === method && action.rest.url === path
      //   );
      //   if (!hasAction) {
      //     const resourceOfAction = await this.resourceModel.findOne({
      //       "actions.rest.method": method,
      //       "actions.rest.url": path,
      //     });
      //     const action =
      //       resourceOfAction.actions.find(
      //         (a) => a.rest.method === method && a.rest.url === path
      //       ) || {};
      //     const actionName =
      //       (action.label || {})[langCode] || (action.label || {})["vi"];

      //     return ResponseHelper.resFailed(
      //       {
      //         CODE: 2,
      //         MESSAGE: {
      //           VI: `Không có quyền truy cập (${actionName})`,
      //           EN: `You do not have permission to access (${actionName})`,
      //         },
      //       },
      //       STATE.FAILED,
      //       langCode
      //     );
      //   }

      //   // limit access resource of GOOPAY IAM for all user
      //   await this.limitAccessResourceGoopayIAM(context);

      return ResponseHelper.resOK(true);
    } catch (err) {
      return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
    }
  }

  async getProfileByUserId(context, userId) {
    const user = await context.broker.call(
      `${SVC_ENV.get().USER_SERVICE}.getUser`,
      { _id: userId },
      { meta: context.meta }
    );
    const { data } = user;
    return {
      userId: userId,
      fullName: data.fullName,
      avatar: data.avatar,
      address: data.address,
      dob: data.dob,
    };
  }

  async generateTokenAndGetUserDetail(context, userAuth, langCode) {
    try {
      let profile: any = await this.getProfileByUserId(
        context,
        userAuth.userId
      );

      profile = {
        ...profile,
        email: userAuth.email,
        phone: userAuth.phone,
        userName: userAuth.email,
        userType: userAuth.userType,
      };

      let tokenExpired = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24h

      // create token record
      //   const tokenObj = await this.tokenModel.create({
      //     authId: userAuth._id.toString(),
      //     userId: userAuth.userId,
      //     orgId: userAuth.orgId,
      //     appId: userAuth.appId,
      //     routes,
      //     actions: [],
      //   });

      if (!SVC_ENV.get().JWT_KEY) {
        return ResponseHelper.resFailed(INTERNAL_CODES.FAILED, STATE.FAILED);
      }

      //   profile.tokenId = tokenObj._id.toString();
      const token = this.createToken(
        profile,
        tokenExpired,
        SVC_ENV.get().JWT_KEY
      );

      let result = {
        token,
        profile,
        // routes,
        passwordWarning: {},
      };

      //   if (
      //     passwordExpiryNoticeDays &&
      //     userAuth.passwordExpiredAt instanceof Date &&
      //     !isNaN(userAuth.passwordExpiredAt)
      //   ) {
      //     const dateToStartWarning = moment()
      //       .add(passwordExpiryNoticeDays, "days")
      //       .valueOf();
      //     const passwordExpiredAt = userAuth.passwordExpiredAt.valueOf();
      //     if (dateToStartWarning > passwordExpiredAt) {
      //       result.passwordWarning = {
      //         isGoingToExpired: true,
      //         passwordExpiredAt: userAuth.passwordExpiredAt,
      //       };
      //     }
      //   }
      return result;
    } catch (error) {
      console.log(
        "auth.logic generateTokenAndGetUserDetail with error: ",
        error
      );
      throw new Error(error);
    }
  }
  public isValidEmail(email: string): boolean {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}

export = AuthLogic;

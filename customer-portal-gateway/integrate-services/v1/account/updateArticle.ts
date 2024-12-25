import { Context } from "moleculer";
import IAction from "../../IAction";
import { SVC_ENV } from "../../../svc-env";


class UpdateArticle implements IAction {
  public readonly setting: object = {
    authenticate: true,
    authorization: true
  };
  public readonly handlerObj = {
    handler(ctx: Context) {
      return ctx.call(
        `${SVC_ENV.get().ARTICLE_SERVICE}.updateArticle`,
        ctx.params,
        { meta: ctx.meta }
      );;
    }
  };
  public getAction(): any {
    return Object.assign(this.setting, this.handlerObj);
  }
}

export = UpdateArticle;

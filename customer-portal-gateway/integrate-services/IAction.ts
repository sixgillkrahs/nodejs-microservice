import {Context} from "moleculer";

interface IAction {
  setting: object;
  handlerObj: {
    handler(ctx: Context);
  };
  getAction(): any;
}

export = IAction;

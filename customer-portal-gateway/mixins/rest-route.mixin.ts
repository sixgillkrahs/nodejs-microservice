export function RestRoute(methodName: string, routeName: string, actionName: string, setting: any) {
  const restSetting = { rest: { path: routeName, method: "rest" } };
  if (methodName) {restSetting.rest.method = methodName;}
  return {
    actions: {
      [actionName]: Object.assign(setting, restSetting)
    }
  };
}

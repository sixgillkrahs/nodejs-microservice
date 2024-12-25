import {INTERNAL_CODES, STATE} from "goopay-library/defined/state-code";
import {Context, Errors} from "moleculer";

function removeFieldOnlyUseBackend(res: any) {
  if (res.code !== INTERNAL_CODES.SUCCESS.CODE) {
    return res;
  }
  if (res.data && res.data.docs && res.data.docs.length > 0) {
    res.data.docs = res.data.docs.map(obj => {
      delete obj.isDelete;
      delete obj.searchInfo;
      delete obj.__v;
      return obj;
    });
    return res;
  }
  if (Array.isArray(res.data) && res.data.length > 0) {
    res.data = res.data.map(obj => {
      delete obj.isDelete;
      delete obj.searchInfo;
      delete obj.__v;
      return obj;
    });
    return res;
  }
  if (res.code && res.data) {
    delete res.data.isDelete;
    delete res.data.searchInfo;
    delete res.data.__v;
    return res;
  }
  return res;
}

export function processMappingMiddleware(ctx: Context, res: any) {
  if (!ctx || !ctx.action) {
    throw new Errors.MoleculerError("Processing failed", 505, "ERR_PROCESS");
  }
  /** Return data failed from service */
  if (res.code !== INTERNAL_CODES.SUCCESS.CODE) {
    return res;
  }
  removeFieldOnlyUseBackend(res);
  /** Not config select fields */
  if (!ctx.action.selectFields || ctx.action.selectFields.length < 1) {
    return res;
  }
  /** Processing select fields */
  /** Case data is object paging plugin: { docs: [], totalDocs, offset, limit } */
  if (res.data.docs && res.data.docs.length > 0) {
    res.data.docs = res.data.docs.map(obj => {
      const mappingObj = {};
      ctx.action.selectFields.map(selectFieldName => {
        mappingObj[selectFieldName] = obj[selectFieldName];
        return selectFieldName;
      });
      return mappingObj;
    });
    return res;
  }
  /** Case data is list object */
  if (Array.isArray(res.data) && res.data.length > 0) {
    res.data = res.data.map(obj => {
      const mappingObj = {};
      ctx.action.selectFields.map(selectFieldName => {
        mappingObj[selectFieldName] = obj[selectFieldName];
        return selectFieldName;
      });
      return mappingObj;
    });
    return res;
  }
  /** Case data is a object: code, data, message */
  if (res.code && res.data) {
    const dataReturn = {};
    ctx.action.selectFields.map(selectFieldName => {
      dataReturn[selectFieldName] = res.data[selectFieldName];
      return selectFieldName;
    });
    res.data = dataReturn;
    return res;
  }
  /** Return origin data from service */
  return res;
}

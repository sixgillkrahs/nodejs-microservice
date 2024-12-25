import _ from "lodash";
import { INTERNAL_CODES } from "goopay-library/defined/state-code";
import {FunctionHelper} from "goopay-library/helpers";
import { Errors } from "moleculer";

export function processResponseLanguageMiddleware(ctx, res) {
  if (!ctx || !ctx.action) {
    throw new Errors.MoleculerError("Processing failed", 505, "ERR_PROCESS");
  }
  /** Config at request header ==> Client want to get full language*/
  if (ctx.meta.headers["accept-full-language"]) {
    return res;
  }
  /** Return data failed from service */
  if (res.code !== INTERNAL_CODES.SUCCESS.CODE) {
    return res;
  }
  const reqLang = ctx.meta.headers["accept-language"] || "vi";
  const langFieldSettingAction = ctx.action.langFields;
  if (!langFieldSettingAction || langFieldSettingAction.length < 1) {
    return res;
  }
  /** Case data is object paging plugin: { docs: [], totalDocs, offset, limit } */
  if (res.data.docs && res.data.docs.length > 0) {
    res.data.docs = processDataArray(res.data.docs, langFieldSettingAction, reqLang);
    return res;
  }
  /** Case data is list object */
  if (Array.isArray(res.data) && res.data.length > 0) {
    res.data = processDataArray(res.data, langFieldSettingAction, reqLang);
    return res;
  }
  /** Case data is a object: code, data, message */
  if (res.code && res.data) {
    res.data = processDataObject(res.data, langFieldSettingAction, reqLang);
    return res;
  }
}

function processDataObject(obj, langFields, reqLang) {
  if (!obj || FunctionHelper.isEmpty(obj)) {
    return obj;
  }
  const dataReturn = obj;
  langFields.map(fieldKey => {
    /** Checking field setting as: "arr.label" || "obj.label..." */
    if (fieldKey.includes(".")) {
      const fieldArr = fieldKey.split(".");
      const firstKey = fieldArr[0];
      /** Case 1: root prop defined syntax array */
      if (firstKey.includes("[]")) {
        const dataForeach = dataReturn[firstKey.replace("[]","")];
        if (!dataForeach || dataForeach.length < 1) {
          return fieldKey;
        }
        for (let i = 0; i < dataForeach.length; i ++) {
          const fieldTran = fieldKey.replace("[]", `[${i}]`);
          const valueTrans = _.get(dataReturn, fieldTran);
          _.set(dataReturn, fieldTran, valueTrans ? valueTrans[reqLang] : "");
        }
      }
      /** Case 2: root prop defined syntax is object */
      else {
        const childPropArr = fieldArr.filter(x => x.includes("[]"));
        if (childPropArr && childPropArr.length > 0) {
          childPropArr.map(childField => {
            const dataForeach = dataReturn[firstKey][childField.replace("[]","")];
            if (!dataForeach || dataForeach.length < 1) {
              return childField;
            }
            for (let i = 0; i < dataForeach.length; i ++) {
              const fieldTran = fieldKey.replace(childField, childField.replace("[]", `[${i}]`));
              const valueTrans = _.get(dataReturn, fieldTran);
              _.set(dataReturn, fieldTran, valueTrans ? valueTrans[reqLang] : "");
            }
          });
        }
        /** Case object: all nested field are objects */
        else {
          const valueTrans = _.get(dataReturn, fieldKey);
          _.set(dataReturn, fieldKey, valueTrans? valueTrans[reqLang]: "");
        }
      }
      return fieldKey;
    }
    /** End */
    if (!obj[fieldKey]) {
      return fieldKey;
    }
    dataReturn[fieldKey] = obj[fieldKey][reqLang];
    return fieldKey;
  });
  return dataReturn;
}

function processDataArray(objs, langFields, reqLang) {
  if (!objs || FunctionHelper.isEmpty(objs)) {
    return objs;
  }
  const dataReturn = [];
  objs.map(obj => {
    const mapData = processDataObject(obj, langFields, reqLang);
    dataReturn.push(mapData);
    return obj;
  });
  return dataReturn;
}

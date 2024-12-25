import _ from "lodash";

const defaultLang = {
  vi: {},
  en: {}
};

export function processRequestLanguageMiddleware(ctx) {
  const method = ctx.action.rest.method;
  if (method === "POST") {
    return processWhenCreate(ctx);
  }
  /** WHEN UPDATING SHOULD DETECT AT LOGIC FUNC */
  return ctx;
}
function processWhenCreate(ctx) {
  const params = ctx.params;
  if (!params || !ctx.action.isProcessLangSubmit) {
    return ctx;
  }
  const langFields = ctx.action.langFields;
  if (!langFields || langFields.length < 1) {
    return ctx;
  }
  let definedLanguage = defaultLang;
  /** Case languages defined at app setting for each app and it already set at token */
  if (ctx.meta.user.app && ctx.meta.user.app.setting && ctx.meta.user.app.setting.language) {
    definedLanguage = ctx.meta.user.app.setting.language;
  }
  const paramKeys = _.keys(params);
  if (!paramKeys || paramKeys.length < 1) {
    return ctx;
  }
  /** Case: lang field setting is nested */
  langFields.map(langField => {
    /** Case complex field setting as: "arr.label" || "obj.label..." */
    if (langField.includes(".")) {
      const fieldArr = langField.split(".");
      const firstKey = fieldArr[0];
      /** Case 1: root prop defined syntax array */
      if (firstKey.includes("[]")) {
        const paramForeach = params[firstKey.replace("[]","")];
        for (let i = 0; i < paramForeach.length; i ++) {
          const fieldTran = langField.replace("[]", `[${i}]`);
          const valueTrans = _.get(params, fieldTran);
          const setLangVal = {};
          _.keys(definedLanguage).map(language => {
            setLangVal[language] = valueTrans;
            return language;
          });
          _.set(params, fieldTran, setLangVal);
        }
      }
      /** Case 2: root prop defined syntax is object */
      else {
        const childPropArr = fieldArr.filter(x => x.includes("[]"));
        if (childPropArr && childPropArr.length > 0) {
          childPropArr.map(childField => {
            const dataForeach = params[firstKey][childField.replace("[]","")];
            for (let i = 0; i < dataForeach.length; i ++) {
              const fieldTran = langField.replace(childField, childField.replace("[]", `[${i}]`));
              const valueTrans = _.get(params, fieldTran);
              const setLangVal = {};
              _.keys(definedLanguage).map(language => {
                setLangVal[language] = valueTrans;
                return language;
              });
              _.set(params, fieldTran, setLangVal);
            }
          });
        }
        /** Case object: all nested field are objects */
        else {
          const valueTrans = _.get(params, langField);
          const setLangVal = {};
          _.keys(definedLanguage).map(language => {
            setLangVal[language] = valueTrans;
            return language;
          });
          _.set(params, langField,setLangVal);
        }
      }
    }
    /** Case basic field */
    else {
      const keyField = paramKeys.find(pKey => pKey.toLowerCase() === langField.toLowerCase());
      if (!keyField) {
        return langField;
      }
      const setLangVal = {};
      _.keys(definedLanguage).map(language => {
        setLangVal[language] = params[keyField];
        return language;
      });
      params[keyField] = setLangVal;
    }
    return langField;
  });
  return ctx;
}


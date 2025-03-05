const modules = import.meta.glob<Record<string, any>>("./vi-VN/*.ts", {
  eager: true,
});

const dynamicLocale = import.meta.glob<Record<string, any>>(
  "../pages/**/**/**/vi-VN.ts",
  { eager: true }
);

const mergeMessages = (sources: Record<string, any>) => {
  return Object.values(sources).reduce((acc, mod) => {
    return { ...acc, ...mod.default };
  }, {});
};

const messagesFromModules = Object.values(modules).reduce((acc, mod) => {
  return { ...acc, ...mod.default };
}, {});

const messagesFromPages = mergeMessages(dynamicLocale);

const translations: Record<string, string> = {
  "language.vn": "Tiếng Việt",
  "language.en": "Tiếng Anh",
  ...messagesFromModules,
  ...messagesFromPages,
};

export default translations;

const modules = import.meta.glob<Record<string, any>>("./en-US/*.ts", {
  eager: true,
});

const dynamicLocale = import.meta.glob<Record<string, any>>(
  "../pages/**/**/**/en-US.ts",
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

export default {
  "language.vn": "Vietnamese",
  "language.en": "English",
  ...messagesFromModules,
  ...messagesFromPages,
};

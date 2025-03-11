const { createHash } = require("crypto");

const hash = (password) => {
  return createHash("sha256").update(password).digest("base64");
};

const compareHash = (password, hash) => {
  const passwordHashed = createHash("sha256").update(password).digest("base64");
  return passwordHashed === hash;
};

export { hash, compareHash };

import COMMON_CODES from "./common-codes";
import RESPONSE_CODE from "./response.code.json";

const DB_COLLECTION = {
	ACCOUNTS: "accounts",
};

const RESPONSE_CODES = {
	COMMON: COMMON_CODES,
	ERROR: RESPONSE_CODE.ERROR,
};

const LANGUAGE_DEFAULT: string = "vi";

const SUCCESS_CODE = 1;

export { DB_COLLECTION, LANGUAGE_DEFAULT, SUCCESS_CODE, RESPONSE_CODES };

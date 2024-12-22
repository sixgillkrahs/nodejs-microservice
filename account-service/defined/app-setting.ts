import { BUSSINESS_CODES } from './bussiness-codes';
import COMMON_CODES from "./common-codes";

const DB_COLLECTION = {
    ACCOUNT: "accounts",
};

const RESPONSE_CODES = { BUSSINESS: BUSSINESS_CODES, COMMON: COMMON_CODES };

const LANGUAGE_DEFAULT: string = "vi";

const SUCCESS_CODE = 1;

export { DB_COLLECTION, LANGUAGE_DEFAULT, BUSSINESS_CODES, SUCCESS_CODE, RESPONSE_CODES };

import {LANGUAGE_DEFAULT} from "../defined/app-setting";

interface MessageLang {
	EN: string;
	VI: string;
}

interface ValidationError {
	CODE: number;
	MESSAGE: MessageLang;
	STATUS_CODE: number;
}

class ValidationException extends Error {
	public readonly code: number;
	public readonly type: string;
	public constructor(validationError: ValidationError, langCode = LANGUAGE_DEFAULT.toLocaleUpperCase()) {
		super(validationError.MESSAGE[langCode.toLocaleUpperCase()]);
		this.name = "ValidationException";
		this.code = validationError.CODE;
		this.message = validationError.MESSAGE[langCode.toLocaleUpperCase()];
	}
}

export = ValidationException;

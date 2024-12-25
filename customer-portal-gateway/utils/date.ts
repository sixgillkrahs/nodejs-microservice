import _ from "lodash";
import moment from "moment";

const isValid = (str: any) =>
	!_.isNull(str) || !_.isEmpty(str) || !_.isUndefined(str);

export const dateTimeToGMT = (str: any, fm?: string) =>
	date(str, fm || DEFAULT_DATETIMES_FORMAT.vi);

const DEFAULT_DATETIMES_FORMAT = {
	vi: "DD/MM/YYYY HH:mm:ss",
	en: "MM/DD/YYYY HH:mm:ss"
};

export const date = (str: any, fm?: string) => {
	if (!isValid(str)) {
		return "";
	}
	const format = fm || DEFAULT_DATETIMES_FORMAT.vi;
	const d = moment(str).add(7, "hours");
	// check if str is datetime string
	if (d.isValid()) {
		return d.format(format);
	}
	const dd = moment(str, "x");
	// check if str is miliseconds
	if (dd.isValid()) {
		return dd.format(format);
	}
	return "Invalid date";
};
